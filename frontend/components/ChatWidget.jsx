import { useState, useRef, useEffect } from "react";
import api from "../services/api";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "👋 Hi! I'm your FIFA World Cup expert — covering all tournaments from 1930 to the ongoing 2026 World Cup in USA/Canada/Mexico! Ask me about history, players, records, live 2026 results, or any trivia." }
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const history = next
        .slice(1)
        .filter((m) => m.role !== "assistant" || next.indexOf(m) > 0)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await api.post("/api/chat", { message: text, history: history.slice(-10) });
      setMessages([...next, { role: "assistant", content: res.data.reply }]);
    } catch (err) {
      const errMsg = err.response?.data?.message || "⚠️ Couldn't reach the AI assistant. Please try again.";
      setMessages([...next, { role: "assistant", content: `⚠️ ${errMsg}` }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 1000,
          width: 56, height: 56, borderRadius: "50%",
          background: open ? "#333" : "linear-gradient(135deg, #e8b84b, #c9971e)",
          border: "none", cursor: "pointer", fontSize: 26,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(201,151,30,0.5)",
          transition: "background 0.2s, transform 0.2s",
          transform: open ? "rotate(45deg)" : "none",
          margin: 0, padding: 0,
        }}
        title="FIFA AI Assistant"
      >
        {open ? "✕" : "⚽"}
      </button>

      {/* Chat window */}
      {open && (
        <div style={{
          position: "fixed", bottom: 92, right: 24, zIndex: 999,
          width: 340, maxHeight: 520,
          background: "rgba(8,12,24,0.97)",
          border: "1px solid rgba(201,151,30,0.25)",
          borderRadius: 16,
          boxShadow: "0 8px 40px rgba(0,0,0,0.7)",
          display: "flex", flexDirection: "column",
          overflow: "hidden",
          backdropFilter: "blur(16px)",
        }}>

          {/* Header */}
          <div style={{
            padding: "14px 16px",
            background: "linear-gradient(135deg, rgba(201,151,30,0.15), rgba(201,151,30,0.05))",
            borderBottom: "1px solid rgba(201,151,30,0.2)",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <span style={{ fontSize: 22 }}>🏆</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#e8b84b", letterSpacing: "0.05em" }}>
                FIFA Assistant
              </div>
              <div style={{ fontSize: 10, color: "rgba(107,122,154,0.8)", letterSpacing: "0.08em" }}>
                1930–2026 World Cup Expert
              </div>
            </div>
            <div style={{ marginLeft: "auto", width: 8, height: 8, borderRadius: "50%",
              background: "#43a047", boxShadow: "0 0 6px #43a047" }} title="Online" />
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: "auto", padding: "14px 12px",
            display: "flex", flexDirection: "column", gap: 10,
            scrollbarWidth: "thin", scrollbarColor: "rgba(201,151,30,0.2) transparent",
          }}>
            {messages.map((msg, i) => {
              const isUser = msg.role === "user";
              return (
                <div key={i} style={{
                  display: "flex",
                  justifyContent: isUser ? "flex-end" : "flex-start",
                }}>
                  <div style={{
                    maxWidth: "82%",
                    padding: "10px 13px",
                    borderRadius: isUser ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                    background: isUser
                      ? "linear-gradient(135deg, #e8b84b, #c9971e)"
                      : "rgba(255,255,255,0.06)",
                    border: isUser ? "none" : "1px solid rgba(255,255,255,0.08)",
                    color: isUser ? "#0a0c14" : "#eef2ff",
                    fontSize: 13.5,
                    lineHeight: 1.5,
                    fontWeight: isUser ? 600 : 400,
                    whiteSpace: "pre-wrap",
                  }}>
                    {msg.content}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{
                  padding: "10px 16px", borderRadius: "14px 14px 14px 4px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex", gap: 5, alignItems: "center",
                }}>
                  {[0, 1, 2].map((n) => (
                    <span key={n} style={{
                      width: 7, height: 7, borderRadius: "50%",
                      background: "#c9971e",
                      display: "inline-block",
                      animation: `dot-bounce 1.2s ease-in-out ${n * 0.2}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: "10px 12px",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            display: "flex", gap: 8, alignItems: "flex-end",
            background: "rgba(0,0,0,0.3)",
          }}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about FIFA World Cup…"
              rows={1}
              style={{
                flex: 1, resize: "none", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10, padding: "9px 12px",
                background: "rgba(255,255,255,0.05)",
                color: "#eef2ff", fontSize: 13.5, outline: "none",
                fontFamily: "inherit", lineHeight: 1.4,
                maxHeight: 80, overflowY: "auto",
                margin: 0, marginBottom: 0,
                scrollbarWidth: "none",
              }}
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              style={{
                width: 38, height: 38, borderRadius: 10, padding: 0,
                background: input.trim() && !loading
                  ? "linear-gradient(135deg, #e8b84b, #c9971e)"
                  : "rgba(255,255,255,0.08)",
                border: "none", cursor: input.trim() && !loading ? "pointer" : "default",
                color: input.trim() && !loading ? "#0a0c14" : "#555",
                fontSize: 16, display: "flex", alignItems: "center",
                justifyContent: "center", flexShrink: 0, margin: 0,
                boxShadow: "none",
                transition: "background 0.2s",
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
