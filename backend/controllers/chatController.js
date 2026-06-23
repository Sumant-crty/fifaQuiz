const { GoogleGenerativeAI } = require("@google/generative-ai");

const AI_MODEL = process.env.AI_MODEL || "gemini-2.5-flash";

const SYSTEM_PROMPT = `You are a FIFA World Cup expert assistant embedded in a quiz app.
The current date is June 2026. The 2026 FIFA World Cup is currently underway.

CRITICAL INSTRUCTION — SEARCH RESULTS TAKE ABSOLUTE PRIORITY:
- You have access to Google Search. Use it for EVERY question about match results, scores, standings, goals, players, or any fact.
- When Google Search returns results, use ONLY those facts. Do NOT mix in your own training knowledge.
- If search results contradict what you previously knew, always trust the search results.
- For live 2026 World Cup questions (scores, who qualified, knockout results), ALWAYS search first.

=== 2026 FIFA WORLD CUP CONTEXT ===
- Edition: 23rd FIFA World Cup
- Hosts: United States, Canada, Mexico (first ever 3-nation host)
- Dates: June 11 – July 19, 2026
- Teams: 48 teams (expanded from 32 for the first time)
- Matches: 104 total (up from 64)
- Format: 12 groups of 4 teams; top 2 from each group + 8 best third-placed teams advance to Round of 32
- Final venue: MetLife Stadium, East Rutherford, New Jersey, USA

Answer all World Cup questions from 1930 to the ongoing 2026 tournament.
Keep answers concise, factual, and engaging.
If asked something unrelated to FIFA/football, politely redirect back to World Cup topics.`;

exports.chat = async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    if (!message || !message.trim())
      return res.status(400).json({ message: "Message is required" });

    if (!process.env.GOOGLE_API_KEY || process.env.GOOGLE_API_KEY === "your_google_api_key_here")
      return res.status(500).json({ message: "GOOGLE_API_KEY not configured in .env" });

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    const model = genAI.getGenerativeModel({
      model: AI_MODEL,
      systemInstruction: SYSTEM_PROMPT,
      tools: [{ googleSearch: {} }],
    });

    const converted = history.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));
    const firstUserIdx = converted.findIndex((m) => m.role === "user");
    const chatHistory = firstUserIdx > 0 ? converted.slice(firstUserIdx) : converted;

    const chat = model.startChat({ history: chatHistory });
    const result = await chat.sendMessage(message.trim());
    const reply = result.response.text();

    res.json({ reply });
  } catch (err) {
    console.error("Chat error:", err.message);
    const m = err.message || "";
    const msg = m.includes("API_KEY") || m.includes("403") || m.includes("API key")
      ? "Invalid Google API key — check GOOGLE_API_KEY in .env"
      : m.includes("429") || m.includes("quota") || m.includes("Too Many")
      ? "Chat is resting! Go play the quiz and come back to chat later. 🏆"
      : m.includes("not found") || m.includes("404")
      ? `Model '${AI_MODEL}' not found. Update AI_MODEL in .env`
      : m.includes("ECONNREFUSED") || m.includes("ENOTFOUND") || m.includes("network")
      ? "Network error — AI service unreachable."
      : `AI error: ${m.slice(0, 300)}`;
    res.status(500).json({ message: msg });
  }
};
