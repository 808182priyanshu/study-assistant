const express = require("express");
const Groq = require("groq-sdk");

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/generate", async (req, res) => {
  try {
    const notes = req.body?.notes;

    if (!notes || notes.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Please enter some notes.",
      });
    }

    const prompt = `
You are an AI Study Assistant.

Read the notes below and return ONLY valid JSON.

Do not include markdown, explanations, comments or code fences.

If you cannot answer, still return this exact JSON structure.

{
  "title": "",
  "summary": "",
  "flashcards": [
    {
      "question": "",
      "answer": ""
    }
  ],
  "quiz": [
    {
      "question": "",
      "options": [
        "",
        "",
        "",
        ""
      ],
      "correctAnswer": 0
    }
  ]
}

Rules:
- Return ONLY JSON.
- Generate exactly 5 flashcards.
- Generate exactly 5 quiz questions.

Notes:
${notes}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_completion_tokens: 1200,
    });

    let text = completion?.choices?.[0]?.message?.content?.trim();

    if (!text) {
      return res.status(500).json({
        success: false,
        message: "AI returned an empty response.",
      });
    }

    // Remove markdown if AI returns code fences
    text = text.replace(/^```json/i, "");
    text = text.replace(/^```/, "");
    text = text.replace(/```$/, "").trim();

    let data;

    try {
      data = JSON.parse(text);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "AI returned invalid JSON.",
        raw: text,
      });
    }

    // Validate AI response shape
    if (
      !data ||
      typeof data !== "object" ||
      !data.title ||
      !data.summary ||
      !Array.isArray(data.flashcards) ||
      !Array.isArray(data.quiz)
    ) {
      return res.status(500).json({
        success: false,
        message: "AI returned an invalid response format.",
      });
    }

    return res.json({
      success: true,
      data,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;