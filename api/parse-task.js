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
- "quiz", "test" -> quiz. "mid", "midterm" -> mids. "final", "final exam" -> final. "presentation", "viva" -> presentation. "notice", "announcement" -> notice. Homework, assignment, project, report, submission -> assignment.
- If the sentence is unclear, ambiguous, or doesn't clearly match any of the above categories, use "notice" — do NOT default to "assignment" as a guess.
- Resolve weekday names, "tomorrow", "next week" etc. relative to today's date given above. Always pick the NEXT occurrence of a weekday, not today, unless the sentence explicitly says "today".
- Never explain your answer. Output raw JSON only.`;

  try {
    const aiRes = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
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