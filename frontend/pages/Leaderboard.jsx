import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const MEDALS = ["🥇", "🥈", "🥉"];
const MEDAL_COLOR = ["#e8b84b", "#c0c0c0", "#cd7f32"];

export default function Leaderboard() {
  const navigate = useNavigate();
  const [scores, setScores] = useState([]);

  useEffect(() => {
    api.get("/api/leaderboard").then((res) => setScores(res.data));
  }, []);

  return (
    <div className="page-bg--top">
      <div style={{ maxWidth: 560, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 12 }}>
            <span className="eyebrow-pip" />
            Hall of Fame
            <span className="eyebrow-pip" />
          </div>
          <h1 className="shimmer-title">Leaderboard</h1>
          <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 6 }}>Top 20 all-time scores</p>
        </div>

        {/* Top 3 podium */}
        {scores.length >= 3 && (
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            {[1, 0, 2].map((rank) => {
              const item = scores[rank];
              if (!item) return null;
              const isFirst = rank === 0;
              return (
                <div key={rank} className="card" style={{
                  flex: 1, textAlign: "center", padding: "20px 12px",
                  border: isFirst ? `1px solid ${MEDAL_COLOR[rank]}55` : undefined,
                  transform: isFirst ? "translateY(-8px)" : undefined,
                }}>
                  <div style={{ fontSize: isFirst ? 40 : 32, marginBottom: 6 }}>{MEDALS[rank]}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: MEDAL_COLOR[rank],
                    letterSpacing: "0.05em", marginBottom: 4 }}>#{rank + 1}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)",
                    wordBreak: "break-word", marginBottom: 6 }}>{item.username}</div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: MEDAL_COLOR[rank] }}>{item.score}</div>
                  <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>pts</div>
                </div>
              );
            })}
          </div>
        )}

        {/* Rest of the list */}
        <div className="card" style={{ padding: "8px 0" }}>
          {scores.length === 0 && (
            <p style={{ textAlign: "center", padding: 24, color: "var(--muted)" }}>No scores yet. Be the first!</p>
          )}
          {scores.map((item, i) => {
            const isMedal = i < 3;
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "13px 20px",
                borderBottom: i < scores.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                background: isMedal ? `${MEDAL_COLOR[i]}08` : "transparent",
              }}>
                <span style={{ minWidth: 32, fontSize: isMedal ? 20 : 13,
                  fontWeight: 700, color: isMedal ? MEDAL_COLOR[i] : "var(--muted)",
                  textAlign: "center" }}>
                  {isMedal ? MEDALS[i] : `#${i + 1}`}
                </span>
                <span style={{ flex: 1, fontSize: 15, fontWeight: 600, color: "var(--text)" }}>
                  {item.username}
                </span>
                <span style={{ fontSize: 18, fontWeight: 800, color: isMedal ? MEDAL_COLOR[i] : "var(--accent)" }}>
                  {item.score}
                </span>
                <span style={{ fontSize: 11, color: "var(--muted)", minWidth: 28 }}>pts</span>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button onClick={() => navigate("/quiz")}>⚽ &nbsp;Play Again</button>
          <button onClick={() => navigate("/")} className="btn-ghost">← &nbsp;Logout</button>
        </div>

      </div>
    </div>
  );
}
