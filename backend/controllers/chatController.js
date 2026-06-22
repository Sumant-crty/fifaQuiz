const { GoogleGenerativeAI } = require("@google/generative-ai");

const AI_MODEL = process.env.AI_MODEL || "gemini-2.5-flash";

const SYSTEM_PROMPT = `You are a FIFA World Cup expert assistant embedded in a quiz app.
The current date is June 2026. The 2026 FIFA World Cup is currently underway.

=== 2026 FIFA WORLD CUP CONTEXT ===
- Edition: 23rd FIFA World Cup
- Hosts: United States, Canada, Mexico (first ever 3-nation host)
- Dates: June 11 – July 19, 2026
- Teams: 48 teams (expanded from 32 for the first time)
- Matches: 104 total (up from 64)
- Format: 12 groups of 4 teams; top 2 from each group + 8 best third-placed teams advance to Round of 32
- Final venue: MetLife Stadium, East Rutherford, New Jersey, USA

US Venues (11): MetLife Stadium (NY/NJ), SoFi Stadium (LA), AT&T Stadium (Dallas), Levi's Stadium (San Francisco), Hard Rock Stadium (Miami), Lumen Field (Seattle), Gillette Stadium (Boston), Arrowhead Stadium (Kansas City), Lincoln Financial Field (Philadelphia), NRG Stadium (Houston), Rose Bowl (Los Angeles)
Canada Venues (2): BC Place (Vancouver), BMO Field (Toronto)
Mexico Venues (3): Estadio Azteca (Mexico City), Estadio Akron (Guadalajara), Estadio BBVA (Monterrey)

Confederation slots: UEFA 16, CAF 9, AFC 8, CONCACAF 6 (inc. 3 hosts), CONMEBOL 6, OFC 1, playoffs 2.

Notable 2026 facts:
- First WC with 48 teams and 104 matches
- First hosted across 3 countries
- USA previously hosted 1994 (Brazil won), Mexico hosted 1970 & 1986, Canada hosting for the first time

Answer all World Cup questions from 1930 to the ongoing 2026 tournament.
Use your training knowledge for any 2026 match results, goals, and player performances.
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
    const msg = err.message?.includes("API_KEY") || err.message?.includes("403")
      ? "Invalid Google API key — check GOOGLE_API_KEY in .env"
      : err.message?.includes("429") || err.message?.includes("quota")
      ? "AI quota limit reached. Please wait a few minutes and try again."
      : err.message?.includes("not found") || err.message?.includes("404")
      ? `Model '${AI_MODEL}' not found. Update AI_MODEL in .env`
      : "AI assistant error. Please try again.";
    res.status(500).json({ message: msg });
  }
};
