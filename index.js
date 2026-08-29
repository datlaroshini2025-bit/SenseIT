import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "15mb" }));

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-3.6-flash";

const history = [];

app.post("/analyze", async (req, res) => {
  try {
    const { image, command } = req.body;

    if (!image) {
      return res.status(400).json({ error: "Missing 'image' (base64 string) in request body." });
    }

    const prompt =
      `The user is blind or low-vision and said: "${command || "describe what you see"}". ` +
      `Describe what's in this image clearly and concisely for audio narration. ` +
      `If it's a document or form, read the key text aloud in the order it appears. ` +
      `If asked about a specific color, name the color directly. ` +
      `Keep it under 100 words unless it's a document that needs full reading. ` +
      `Do not use markdown, headers, or bullet points — this text will be spoken aloud.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                { inline_data: { mime_type: "image/jpeg", data: image } },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errBody = await response.text();
      console.error("Gemini API error:", response.status, errBody);
      return res.status(502).json({ error: "AI service error. Please try again." });
    }

    const data = await response.json();
    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I couldn't generate a description. Please try again.";

    history.unshift({
      id: Date.now(),
      command: command || null,
      response: text,
      timestamp: new Date().toISOString(),
    });
    if (history.length > 50) history.pop();

    res.json({ text });
  } catch (err) {
    console.error("Server error in /analyze:", err);
    res.status(500).json({ error: "Something went wrong processing that. Please try again." });
  }
});

app.get("/history", (req, res) => {
  res.json({ sessions: history });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
///////committttt
