import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Result() {
  const navigate = useNavigate();
  const score = parseInt(localStorage.getItem("score") || "0");
  const total = parseInt(localStorage.getItem("total") || "20");
  const username = localStorage.getItem("username");

  let rank, rankColor, medal;
  if (score >= 18)      { rank = "FIFA Legend";   rankColor = "#e8b84b"; medal = "🥇"; }
  else if (score >= 14) { rank = "World Class";   rankColor = "#90caf9"; medal = "🥈"; }
  else if (score >= 8)  { rank = "Rising Star";   rankColor = "#a5d6a7"; medal = "⭐"; }
  else                  { rank = "Rookie";         rankColor = "var(--muted)"; medal = "⚽"; }

  const pct = Math.round((score / total) * 100);

  useEffect(() => {
    api.post("/api/leaderboard", { username, score, totalQuestions: total });
  }, []);

  return (
    <div className="page-bg">
      <div style={{ width: "100%", maxWidth: 480, textAlign: "center" }}>

        <div style={{ fontSize: 64, marginBottom: 8 }}>{medal}</div>
        <h1 className="shimmer-title" style={{ marginBottom: 6 }}>Quiz Complete!</h1>
        <p style={{ color: "var(--muted)", fontSize: 13, marginBottom: 28, letterSpacing: "0.06em" }}>
          Well played, <span style={{ color: "var(--text)", fontWeight: 600 }}>{username}</span>
        </p>

        <div className="card" style={{ marginBottom: 16 }}>
          {/* Score ring */}
          <div style={{ fontSize: 56, fontWeight: 900, color: rankColor, lineHeight: 1, marginBottom: 4 }}>
            {score}<span style={{ fontSize: 24, color: "var(--muted)", fontWeight: 400 }}>/{total}</span>
          </div>
          <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 20 }}>{pct}% correct</div>

          {/* Progress bar */}
          <div style={{ height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 4, marginBottom: 20, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`,
              background: `linear-gradient(90deg, var(--accent), ${rankColor})`,
              borderRadius: 4, transition: "width 0.8s ease" }} />
          </div>

          {/* Rank badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8,
            background: `${rankColor}18`, border: `1px solid ${rankColor}55`,
            borderRadius: 8, padding: "8px 16px", marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.12em",
              textTransform: "uppercase", color: rankColor }}>{rank}</span>
          </div>
        </div>

        <button onClick={() => navigate("/leaderboard")}>🏆 &nbsp;View Leaderboard</button>
        <button onClick={() => navigate("/quiz")} className="btn-ghost">⚽ &nbsp;Play Again</button>
        <button onClick={() => navigate("/")} className="btn-ghost">← &nbsp;Logout</button>

      </div>
    </div>
  );
}
