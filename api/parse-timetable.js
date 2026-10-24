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

  const { getUser } = require('./_auth');
  const authedUser = await getUser(req);
  if (!authedUser) {
    res.status(401).json({ error: 'Please sign in again' });
    return;
  }

  const { command, mimeType, fileBase64, textContent, today: clientToday } = req.body || {};

  if (!fileBase64 && !textContent) {
    res.status(400).json({ error: 'Provide either a file (fileBase64 + mimeType) or textContent' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server' });
    return;
  }

  const todayIso = (typeof clientToday === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(clientToday))
    ? clientToday : new Date().toISOString().slice(0, 10);

  const systemPrompt = `You extract class/shift schedule entries from a timetable
(which may be a photo, a PDF, or raw text pulled from a spreadsheet) and match
them against the person's instruction below. Today's date is ${todayIso} — use
it only to fill in a missing year on a date that gives day/month but not year.

Instruction from the user: "${(command || '').trim() || 'Organize the whole schedule shown.'}"

The timetable may list MULTIPLE sections, groups, or people (e.g. several
class sections, or several employees' shifts) in the same table/image. Only
return the rows that match the user's instruction. If the instruction doesn't
clearly narrow it down, or nothing matches, return every row you can read
instead of guessing wrong — do not invent rows that aren't actually present.

Matching the instruction is a MEANING match, never a literal string match.
The person types casually and abbreviates — the data uses full official
names — and they will never match character-for-character. You must
recognize these as the same thing:
- Program abbreviations vs. their full name: "BSAI" / "BS AI" / "AI" means
  "BS Artificial Intelligence"; "BSCS" / "CS" means "BS Computer Science";
  "BSSE" / "SE" means "BS Software Engineering"; and the same pattern for
  any other "BS<Letters>" abbreviation against a full "BS <Full Words>"
  program name in the data — expand the abbreviation and compare meaning,
  not spelling. Also match a plain department/subject word (e.g. "AI") to
  any program whose name contains it, and match "Lateral", "ADP", or similar
  qualifiers only when the person actually says them.
- Semester phrasing: "semester 2" / "sem 2" / "2nd semester" / "2nd" / "2" —
  all the same semester, regardless of which of these forms the data uses.
- Section/group letters and numbers should match however they're written:
  "section blue" = "Blue section" = "Blue".
- If the instruction gives a program and/or semester, treat rows as a match
  only when they satisfy ALL the criteria mentioned, matched by meaning as
  above — but never reject a row just because the data's wording differs
  from the person's wording when the meaning is clearly the same.
- Before including ANY row in your output, check its own Program field and
  its own Semester field individually against the instruction — a row from
  a different semester or a different program NEVER belongs in the result,
  even if it's sitting right next to rows that DO match, even if the course
  name or time looks similar, and even if the table has hundreds of other
  rows to scan through. Go row by row; do not skim or extrapolate a pattern
  from nearby rows.
- Only report "nothing matched" in the "note" field after you've actually
  checked the full data for a meaning-based match, not a literal one.

Return ONLY a single JSON object, no prose, no markdown fences, matching
exactly this shape:
{
  "classes": [
    {
      "subject": string,      // course/subject/shift name, Title Case
      "day": "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday",
      "date": string | null,  // absolute "YYYY-MM-DD" if the source gives a REAL calendar date for this entry (e.g. an exam datesheet showing "20th-July-2026"); null if this is an ordinary recurring weekly class with no specific date attached, just a weekday pattern
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
- CRITICAL — real dates vs. recurring weekly classes: if the source shows an
  actual calendar date (a specific day+month, with or without a year, like
  "20th-July-2026", "20/7", "July 20") for an entry — which is typical of an
  EXAM DATESHEET, a one-time event, or any schedule that happens on specific
  dates rather than every week — set "date" to that as "YYYY-MM-DD" (fill in
  the year from today's date above only if the source doesn't give one), and
  set "day" to the weekday that date actually falls on. If the source is an
  ordinary recurring weekly class timetable with no specific date attached
  (just "Monday 9-10am" repeating every week) set "date" to null and only
  fill "day".
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

  // Gemini calls can be slow or overloaded. The old code had no per-call
  // timeout, so ONE hung request ate the whole 60s Vercel limit and the user
  // just saw "timeout, try again later". Now every attempt gets its own
  // time cap, transient failures (429/500/503/timeouts) move on quickly, and
  // if the primary model keeps failing we fall back to a second model.
  const DEADLINE = Date.now() + 54000; // stay under maxDuration (60s)
  // Each attempt has its own time cap so a hung request can't eat the whole
  // budget, and the fallback model is guaranteed a turn (the 2nd attempt).
  const ATTEMPTS = [
    { model: 'gemini-3.8-flash', cap: 22000 },
    { model: 'gemini-3.6-flash', cap: 18000 },
    { model: 'gemini-3.5-flash-lite', cap: Infinity }
  ];
  // Every model has its OWN quota bucket on Google's side, so a 429 (quota)
  // on one model just moves on to the next one. Each model is tried at most
  // once per click, so one click can never burn more than 3 requests.
  const attemptLog = []; // shown in the error message so failures are diagnosable
  function note(model, status, text) {
    let msg = (text || '').toString();
    try { msg = JSON.parse(msg).error.message || msg; } catch (e) {}
    attemptLog.push(`${model}: ${status} ${msg.replace(/\s+/g, ' ').slice(0, 140)}`);
  }
  async function callGeminiWithRetry(body) {
    let lastStatus = 502, lastErrText = '', quota429Text = '';
    for (let i = 0; i < ATTEMPTS.length; i++) {
      const remaining = DEADLINE - Date.now();
      if (remaining < 4000) break;
      const { model, cap } = ATTEMPTS[i];
      const attemptBody = JSON.parse(JSON.stringify(body));
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), Math.min(cap, remaining - 500));
      const t0 = Date.now();
      try {
        const aiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
            body: JSON.stringify(attemptBody),
            signal: ctrl.signal
          }
        );
        if (aiRes.ok) { clearTimeout(timer); console.log('Gemini ok', model, (Date.now() - t0) + 'ms'); return aiRes; }
        lastStatus = aiRes.status;
        lastErrText = await aiRes.text();
        clearTimeout(timer);
        note(model, aiRes.status, lastErrText);
        console.error('Gemini attempt failed', model, aiRes.status, (Date.now() - t0) + 'ms', lastErrText.slice(0, 300));
        if (aiRes.status === 401 || aiRes.status === 403) break;
        if (aiRes.status === 429) quota429Text = lastErrText;
      } catch (err) {
        clearTimeout(timer);
        lastStatus = err.name === 'AbortError' ? 504 : 502;
        lastErrText = err.message;
        note(model, err.name === 'AbortError' ? 'timeout' : 'network', err.message);
        console.error('Gemini attempt error', model, err.name, (Date.now() - t0) + 'ms', err.message);
      }
      await new Promise(r => setTimeout(r, 300));
    }
    if (quota429Text) return { ok: false, status: 429, text: async () => quota429Text };
    return { ok: false, status: lastStatus, text: async () => lastErrText };
  }

  try {
    const aiRes = await callGeminiWithRetry({
      contents: [{ role: 'user', parts }],
      generationConfig: {
        temperature: 0,
        // Gemini 3.6 Flash's real ceiling is 65,536 output tokens (not the
        // much smaller number assumed earlier) — plenty of headroom to
        // give thinking real budget without risking truncation again.
        maxOutputTokens: 32768,
        responseMimeType: 'application/json',
        // Filtering a ~2000-row table by multiple criteria (program AND
        // semester) needs actual checking, not just fast pattern-matching,
        // so this stays above 'minimal' — but 'high' was making every
        // import slow (long "Reading the timetable…" waits) and more
        // likely to hit Gemini-side overload or the serverless function's
        // own timeout before a response came back. 'low' keeps real
        // reasoning for the matching logic while cutting typical response
        // time significantly.
        thinkingConfig: { thinkingLevel: 'low' }
      }
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      console.error('Gemini API error:', aiRes.status, errText);
      let friendly;
      if (aiRes.status === 429) {
        // Say WHICH limit was hit, so it's clear whether to wait a minute or a day.
        const perDay = /PerDay/i.test(errText);
        const perMin = /PerMinute/i.test(errText);
        const delay = (errText.match(/"retryDelay":\s*"([^"]+)"/) || [])[1];
        friendly = "Google says this API key is out of quota on all the models Amigo tries" +
          (perDay ? " — the DAILY limit is used up (it resets once a day; or use a key with billing enabled)." :
           perMin ? " — the PER-MINUTE limit was hit" + (delay ? "; Google says retry in about " + delay : "; wait a minute") + "." :
           ". Check usage at https://aistudio.google.com.");
      } else if (aiRes.status === 401 || aiRes.status === 403) {
        friendly = 'The Gemini API key is missing, invalid, or not authorized for this project — check the GEMINI_API_KEY set in Vercel.';
      } else if (aiRes.status === 504) {
        friendly = "Google's AI took too long to answer (it did not respond in time, even after retrying). Please try again in a moment. If it keeps happening, try a narrower instruction like \"BSAI semester 3\", or a smaller/cropped file.";
      } else if (aiRes.status === 503 || aiRes.status === 500) {
        friendly = "Google's AI service is briefly overloaded and didn't recover after a few automatic retries — this is temporary on their end, not a bug. Please try again in a moment.";
      } else {
        friendly = `Gemini API ${aiRes.status}: ${errText.slice(0, 300)}`;
      }
      if (attemptLog.length) friendly += ' [Details: ' + attemptLog.join(' | ') + ']';
      res.status(502).json({ error: friendly });
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
        date:      /^\d{4}-\d{2}-\d{2}$/.test(c.date) ? c.date : null,
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