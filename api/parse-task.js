// /api/parse-task.js
// Vercel serverless function — runs server-side only.
// Takes free text like "Math quiz on Monday, high priority" and asks Gemini
// to extract structured task fields. The API key lives only in the Vercel
// environment variable GEMINI_API_KEY — it is never sent to the browser.
//
// Setup (one-time, on your Vercel project):
//   Project Settings → Environment Variables → add GEMINI_API_KEY = <your key>
//   (Get a key from https://aistudio.google.com/apikey if you don't have one)
//   Redeploy after adding it.

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { text } = req.body || {};
  if (!text || typeof text !== 'string' || !text.trim()) {
    res.status(400).json({ error: 'Missing "text" in request body' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // No key configured yet — tell the client so it can fall back to the
    // manual step-by-step flow instead of hanging or throwing a raw 500.
    res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server' });
    return;
  }

  // Give the model "today" so it can resolve relative dates ("Monday",
  // "next week") into an absolute date correctly, instead of guessing.
  const today = new Date();
  const todayIso = today.toISOString().slice(0, 10);
  const todayWeekday = today.toLocaleDateString('en-US', { weekday: 'long' });

  // Compute a couple of real "next occurrence" example dates off the actual
  // today, so the few-shot examples below are never stale or self-contradicting.
  const nextWeekdayIso = (targetDow) => {
    const d = new Date(today);
    const diff = ((targetDow - d.getDay() + 7) % 7) || 7; // always strictly in the future
    d.setDate(d.getDate() + diff);
    return d.toISOString().slice(0, 10);
  };
  const nextMonIso = nextWeekdayIso(1);
  const nextTueIso = nextWeekdayIso(2);
  const nextFriIso = nextWeekdayIso(5);

  const systemPrompt = `You extract structured student-task data from one short sentence.
Today's date is ${todayIso} (${todayWeekday}).

Return ONLY a single JSON object, no prose, no markdown fences, matching exactly this shape:
{
  "type": "assignment" | "quiz" | "mids" | "final" | "presentation" | "notice",
  "subject": string,      // the course/subject name, Title Case, e.g. "Database Systems". If genuinely unclear, use "General".
  "priority": "High" | "Medium" | "Low",   // infer from urgency words (e.g. "urgent", "important" -> High); default "Medium" if not indicated
  "due": string,           // an absolute date in YYYY-MM-DD format, resolved from today's date above. If no date is mentioned at all, use today's date.
  "note": string            // any extra detail from the sentence that isn't the subject/date/type (e.g. "bring calculator"). Empty string if none.
}

Rules:
- Word order in the input means NOTHING — treat the sentence as a bag of clues, not a fixed template. Scan the whole sentence independently for each field (type keyword, subject, day/date, priority word, extra detail) regardless of which one comes first, second, or last. "tue assignment" and "assignment tue" are identical. "mon ch6 math assignment" and "math assignment ch6 mon" are identical.
- "quiz", "test" -> quiz. "mid", "midterm" -> mids. "final", "final exam" -> final. "presentation", "viva" -> presentation. "notice", "announcement" -> notice. Homework, assignment, project, report, submission, "hw", "asg", "assign" -> assignment.
- The subject is whatever's left after you remove the type keyword, the day/date, and any priority word — it can sit anywhere in the sentence (before the type, after the type, before or after the day). E.g. in "tue assignment math" the subject is "Math" even though it comes last. In "assignment mon ch6 math" the subject is still "Math", pulled out from among the other tokens.
- If the sentence is unclear, ambiguous, or doesn't clearly match any of the above categories, use "notice" — do NOT default to "assignment" as a guess.
- A weekday reference counts as a date whether or not it's introduced by a word like "due"/"on"/"by", and no matter where in the sentence it appears — a day name or abbreviation anywhere (start, middle, end, sandwiched between other words) is a date, not just decoration. Treat "math assignment mon" exactly the same as "math assignment due on monday" or "mon math assignment" — all three resolve to the next Monday.
- Recognize 3-letter weekday abbreviations (mon, tue, wed, thu, fri, sat, sun) as equivalent to the full weekday name, case-insensitive, with or without a trailing period, in any position.
- Resolve weekday names/abbreviations, "tomorrow", "next week" etc. relative to today's date given above. Always pick the NEXT occurrence of a weekday, not today, unless the sentence explicitly says "today".
- Only use today's date for "due" when the sentence truly contains no date, day name/abbreviation, or relative-time word anywhere in it — a bare or mid-sentence weekday abbreviation is still a date and must never be treated as "no date mentioned."
- A chapter/unit reference in any form ("ch6", "ch 6", "chapter 6", "unit 3") is never the subject and never the type — pull it into "note" (normalize to e.g. "Chapter 6"), no matter where it falls in the sentence.
- Filler words that aren't the subject, type, day, priority, or a chapter reference (e.g. a stray "something", "please", "asap" outside its priority meaning) are simply dropped — don't force them into any field.
- Examples, using the real today's date given above — notice the field order is different in every one and the result is identical to the "natural" phrasing:
  "eng assignment due on mon" -> {type: assignment, subject: "Eng", due: ${nextMonIso}}
  "math assignment mon" -> {type: assignment, subject: "Math", due: ${nextMonIso}}
  "mon math assignment" -> {type: assignment, subject: "Math", due: ${nextMonIso}} (same as above, day moved to the front)
  "tue assignment math ch6" -> {type: assignment, subject: "Math", due: ${nextTueIso}, note: "Chapter 6"}
  "assignment ch6 math tue" -> identical result to the line above — only the order changed
  "physics quiz fri" -> due ${nextFriIso}
  "submit report" (no day, abbreviation, or relative word anywhere) -> due ${todayIso} (today)
- Never explain your answer. Output raw JSON only.`;

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
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents: [{ role: 'user', parts: [{ text: text.trim() }] }],
          generationConfig: {
            temperature: 0,
            maxOutputTokens: 300,
            responseMimeType: 'application/json'
          }
        })
      }
    );

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      console.error('Gemini API error:', aiRes.status, errText);
      // Truncate in case it's an unexpectedly large HTML error page rather than JSON
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

    // Strip accidental code fences just in case, then parse.
    const cleaned = raw.replace(/```json|```/g, '').trim();
    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error('Failed to parse AI response as JSON:', raw);
      res.status(502).json({ error: 'AI returned an unparseable response' });
      return;
    }

    // Validate/sanitize before handing back to the client.
    // Anything the model itself couldn't confidently classify (missing/invalid
    // type) falls into Notices rather than silently defaulting to Assignment.
    const validTypes = ['assignment', 'quiz', 'mids', 'final', 'presentation', 'notice'];
    const validPriorities = ['High', 'Medium', 'Low'];
    const result = {
      type: validTypes.includes(parsed.type) ? parsed.type : 'notice',
      subject: (typeof parsed.subject === 'string' && parsed.subject.trim()) ? parsed.subject.trim() : 'General',
      priority: validPriorities.includes(parsed.priority) ? parsed.priority : 'Medium',
      due: /^\d{4}-\d{2}-\d{2}$/.test(parsed.due) ? parsed.due : todayIso,
      note: typeof parsed.note === 'string' ? parsed.note.trim() : ''
    };

    res.status(200).json(result);
  } catch (err) {
    console.error('parse-task function error:', err);
    res.status(500).json({ error: 'Server error while parsing task' });
  }
}