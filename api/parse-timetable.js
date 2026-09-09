// /api/parse-timetable.js
// Vercel serverless function — runs server-side only.
// Takes an uploaded timetable (photo, PDF, or text pulled out of an Excel
// sheet) plus a typed command like "organize the schedule for BSAI section 3"
// and asks Gemini to pull out just the matching classes as structured JSON.
//
// Setup: same GEMINI_API_KEY env var already used by /api/parse-task.js —
// nothing new to configure if that's already working.

// If the model's response got cut off mid-JSON (usually because a big
// timetable produced more class objects than fit in the token budget),
// pull out every class object that DID finish before the cutoff instead of
// discarding the whole response. Scans for the "classes" array and walks
// brace depth to find each complete {...} entry.
function salvageTruncatedClasses(text) {
  const classesIdx = text.indexOf('"classes"');
  if (classesIdx === -1) return null;
  const arrStart = text.indexOf('[', classesIdx);
  if (arrStart === -1) return null;

  const results = [];
  let depth = 0;
  let objStart = -1;
  for (let i = arrStart + 1; i < text.length; i++) {
    const ch = text[i];
    if (ch === '{') {
      if (depth === 0) objStart = i;
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0 && objStart !== -1) {
        const objText = text.slice(objStart, i + 1);
        try {
          results.push(JSON.parse(objText));
        } catch (e) {
          // this one didn't finish cleanly either — stop, don't guess further
          break;
        }
        objStart = -1;
      }
    }
  }
  return results;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { command, mimeType, fileBase64, textContent } = req.body || {};

  if (!fileBase64 && !textContent) {
    res.status(400).json({ error: 'Provide either a file (fileBase64 + mimeType) or textContent' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server' });
    return;
  }

  const systemPrompt = `You extract class/shift schedule entries from a timetable
(which may be a photo, a PDF, or raw text pulled from a spreadsheet) and match
them against the person's instruction below.

Instruction from the user: "${(command || '').trim() || 'Organize the whole schedule shown.'}"

The timetable may list MULTIPLE sections, groups, or people (e.g. several
class sections, or several employees' shifts) in the same table/image. Only
return the rows that match the user's instruction. If the instruction doesn't
clearly narrow it down, or nothing matches, return every row you can read
instead of guessing wrong — do not invent rows that aren't actually present.

Return ONLY a single JSON object, no prose, no markdown fences, matching
exactly this shape:
{
  "classes": [
    {
      "subject": string,      // course/subject/shift name, Title Case
      "day": "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday",
      "startTime": string,    // 24-hour "HH:MM", e.g. "09:00"
      "endTime": string,      // 24-hour "HH:MM", e.g. "10:30"
      "teacher": string,      // instructor/supervisor name if shown, else ""
      "room": string          // room/location if shown, else ""
    }
  ],
  "note": string  // short note if something was ambiguous or couldn't be read, else ""
}

Rules:
- One JSON object per class/shift session per day it occurs (a class on Mon/Wed/Fri becomes 3 separate entries, one per day).
- Convert any 12-hour times (e.g. "2:00 PM") to 24-hour "HH:MM".
- If a field genuinely isn't shown, use "" — never invent a teacher, room, or time.
- Never explain your answer. Output raw JSON only.`;

  // Build the "contents" parts: text instruction + either an inline file or raw text
  const parts = [{ text: systemPrompt }];
  if (fileBase64 && mimeType) {
    parts.push({ inlineData: { mimeType, data: fileBase64 } });
  }
  if (textContent) {
    // Gemini 3.6 Flash has a ~1M token context window, so a large real
    // spreadsheet (a whole-university exam datesheet can be 1000+ rows /
    // 300K+ characters) is nowhere near its limit. The old 20,000-char cap
    // was silently chopping off 90%+ of bigger files before the model ever
    // saw them — including the person's own rows if they weren't near the
    // top. 400,000 chars comfortably covers real-world spreadsheets while
    // still protecting against a truly pathological file.
    parts.push({ text: `\nSpreadsheet content:\n${textContent.slice(0, 400000)}` });
  }

  try {
    const aiRes = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify({
          contents: [{ role: 'user', parts }],
          generationConfig: {
            temperature: 0,
            // A full weekly timetable can easily produce 30-40 class entries —
            // raised well above the old 4000 so real timetables don't get cut
            // off mid-response (which produces truncated, unparseable JSON).
            maxOutputTokens: 8192,
            responseMimeType: 'application/json',
            // Reading a table is mostly a vision task, not a reasoning one —
            // keep thinking minimal so its token spend doesn't eat into the
            // budget the actual class list needs.
            thinkingConfig: { thinkingLevel: 'minimal' }
          }
        })
      }
    );

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      console.error('Gemini API error:', aiRes.status, errText);
      res.status(502).json({ error: `Gemini API ${aiRes.status}: ${errText.slice(0, 300)}` });
      return;
    }

    const data = await aiRes.json();
    const candidate = data.candidates && data.candidates[0];
    const raw =
      (candidate &&
        candidate.content &&
        candidate.content.parts &&
        candidate.content.parts[0] &&
        candidate.content.parts[0].text) || '';
    const wasTruncated = candidate && candidate.finishReason === 'MAX_TOKENS';

    const cleaned0 = raw.replace(/```json|```/g, '').trim();
    // Pull out just the {...} in case the model added stray text around it.
    const firstBrace = cleaned0.indexOf('{');
    const lastBrace = cleaned0.lastIndexOf('}');
    const cleaned = (firstBrace !== -1 && lastBrace > firstBrace) ? cleaned0.slice(firstBrace, lastBrace + 1) : cleaned0;

    let parsed;
    let usedSalvage = false;
    try {
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      // Most likely cause: the response got cut off mid-object because the
      // timetable had more classes than fit in the token budget. Rather than
      // failing outright, salvage every class object that DID finish before
      // the cutoff — a partial result beats none, and we tell the person why
      // it's partial so they know to narrow it down or split the import.
      const salvaged = salvageTruncatedClasses(cleaned0);
      if (salvaged && salvaged.length > 0) {
        parsed = { classes: salvaged, note: '' };
        usedSalvage = true;
      } else {
        console.error('Failed to parse AI response as JSON:', raw);
        res.status(502).json({
          error: wasTruncated
            ? 'The timetable had too many classes to read in one go. Try narrowing it down (e.g. "only Monday and Tuesday classes") or splitting it into a couple of smaller imports.'
            : 'AI returned an unparseable response — try again, or use a clearer photo.'
        });
        return;
      }
    }

    const validDays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const rawClasses = Array.isArray(parsed.classes) ? parsed.classes : [];
    const classes = rawClasses
      .filter(c => c && validDays.includes(c.day))
      .map(c => ({
        subject:   (typeof c.subject === 'string' && c.subject.trim()) ? c.subject.trim() : 'Untitled',
        day:       c.day,
        startTime: /^\d{2}:\d{2}$/.test(c.startTime) ? c.startTime : '09:00',
        endTime:   /^\d{2}:\d{2}$/.test(c.endTime) ? c.endTime : '10:00',
        teacher:   typeof c.teacher === 'string' ? c.teacher.trim() : '',
        room:      typeof c.room === 'string' ? c.room.trim() : ''
      }));

    let note = typeof parsed.note === 'string' ? parsed.note : '';
    if (usedSalvage || wasTruncated) {
      note = `Only got through part of the timetable (it had a lot of classes) — found ${classes.length} before running out of room. Review what's here, then run the import again with "only <the remaining days>" to get the rest.` + (note ? ' ' + note : '');
    }

    res.status(200).json({ classes, note });
  } catch (err) {
    console.error('parse-timetable function error:', err);
    res.status(500).json({ error: 'Server error while parsing timetable' });
  }
}