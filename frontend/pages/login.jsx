import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    try {
      const res = await api.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      navigate("/quiz");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your credentials.");
    }
  };

  const handleKey = (e) => { if (e.key === "Enter") login(); };

  return (
    <div className="page-bg">
      <div style={{ width: "100%", maxWidth: 440 }}>

        <div className="eyebrow">
          <span className="eyebrow-pip" />
          Official FIFA World Cup Trivia
          <span className="eyebrow-pip" />
        </div>

        <div style={{ textAlign: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 60, display: "inline-block", animation: "trophy-pulse 3s ease-in-out infinite" }}>🏆</span>
        </div>

        <h1 className="shimmer-title">World Cup Quiz</h1>
        <p style={{ textAlign: "center", fontSize: 12, color: "var(--muted)", letterSpacing: "0.12em", marginBottom: 28 }}>
          1998 &nbsp;·&nbsp; 2002 &nbsp;·&nbsp; 2006 &nbsp;·&nbsp; 2010 &nbsp;·&nbsp; 2014 &nbsp;·&nbsp; 2018 &nbsp;·&nbsp; 2022
        </p>

        <div className="card">
          <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 20 }}>Sign in to play</h2>

          {error && <p className="error-banner">{error}</p>}

          <label className="field-label">Email</label>
          <input type="email" placeholder="you@example.com" autoComplete="off"
            value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={handleKey} />

          <label className="field-label">Password</label>
          <input type="password" placeholder="••••••••" autoComplete="new-password"
            value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKey} />

          <button onClick={login} style={{ marginTop: 4 }}>⚽ &nbsp;Kick Off</button>

          <div style={{ display:"flex", alignItems:"center", gap:12, margin:"16px 0", fontSize:11,
            color:"rgba(255,255,255,0.2)", letterSpacing:"0.1em" }}>
            <span style={{ flex:1, height:1, background:"rgba(255,255,255,0.08)" }} />
            or
            <span style={{ flex:1, height:1, background:"rgba(255,255,255,0.08)" }} />
          </div>

          <p style={{ textAlign:"center", fontSize:14, color:"var(--muted)", margin:0 }}>
            New here? <Link to="/register" style={{ color:"var(--accent)", fontWeight:600, textDecoration:"none" }}>Create an account →</Link>
          </p>
        </div>

        <div className="stats-strip">
          <div className="stat-cell"><span className="stat-num">8</span><span className="stat-lbl">Tournaments</span></div>
          <div className="stat-cell"><span className="stat-num">120</span><span className="stat-lbl">Questions</span></div>
          <div className="stat-cell"><span className="stat-num">60<span style={{fontSize:14}}>s</span></span><span className="stat-lbl">Timer</span></div>
        </div>

        <p style={{
          textAlign: "center",
          fontSize: 11,
          color: "rgba(107,122,154,0.5)",
          letterSpacing: "0.08em",
          marginTop: 20,
        }}>
          © 2026 sumant. All rights reserved.
        </p>

      </div>
    </div>
  );
}
