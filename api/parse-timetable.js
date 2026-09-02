// /api/parse-timetable.js
// Vercel serverless function — runs server-side only.
// Takes an uploaded timetable (photo, PDF, or text pulled out of an Excel
// sheet) plus a typed command like "organize the schedule for BSAI section 3"
// and asks Gemini to pull out just the matching classes as structured JSON.
//
// Setup: same GEMINI_API_KEY env var already used by /api/parse-task.js —
// nothing new to configure if that's already working.

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
    parts.push({ text: `\nSpreadsheet content:\n${textContent.slice(0, 20000)}` });
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
            maxOutputTokens: 4000,
            responseMimeType: 'application/json'
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
    const raw =
      (data.candidates &&
        data.candidates[0] &&
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts[0] &&
        data.candidates[0].content.parts[0].text) || '';

    const cleaned = raw.replace(/```json|```/g, '').trim();
    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error('Failed to parse AI response as JSON:', raw);
      res.status(502).json({ error: 'AI returned an unparseable response' });
      return;
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

    res.status(200).json({ classes, note: typeof parsed.note === 'string' ? parsed.note : '' });
  } catch (err) {
    console.error('parse-timetable function error:', err);
    res.status(500).json({ error: 'Server error while parsing timetable' });
  }
}