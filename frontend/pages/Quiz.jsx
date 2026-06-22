import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Timer from "../components/Timer";

const LABELS = ["A", "B", "C", "D"];

export default function Quiz() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const scoreRef = useRef(0);

  useEffect(() => { loadQuestions(); }, []);

  const loadQuestions = async () => {
    const res = await api.get("/api/questions?random=true&limit=20");
    setQuestions(res.data);
  };

  const finish = (finalScore) => {
    localStorage.setItem("score", finalScore);
    localStorage.setItem("total", questions.length || 20);
    navigate("/result");
  };

  if (!questions.length) return (
    <div className="page-bg" style={{ flexDirection: "column", gap: 16 }}>
      <span style={{ fontSize: 52, animation: "trophy-pulse 1.5s ease-in-out infinite" }}>⚽</span>
      <h2 style={{ color: "var(--accent)", letterSpacing: "0.1em" }}>Loading Quiz…</h2>
      <p style={{ color: "var(--muted)", fontSize: 13 }}>Fetching your 20 questions</p>
    </div>
  );

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  const answer = (option) => {
    if (selected) return;
    setSelected(option);
    let newScore = score;
    if (option === q.answer) { newScore++; setScore(newScore); scoreRef.current = newScore; }
    setTimeout(() => {
      setSelected(null);
      if (current === questions.length - 1) finish(newScore);
      else setCurrent(current + 1);
    }, 600);
  };

  return (
    <div className="page-bg--top">
      <div style={{ maxWidth: 640, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
          marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em",
              textTransform: "uppercase", color: "var(--accent)", marginBottom: 2 }}>
              ⚽ World Cup Quiz
            </div>
            <div style={{ fontSize: 13, color: "var(--muted)" }}>
              Question {current + 1} <span style={{ color: "var(--muted)", opacity: 0.5 }}>/ {questions.length}</span>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <Timer onTimeUp={() => finish(scoreRef.current)} />
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
              Score: <span style={{ color: "var(--accent)", fontWeight: 700 }}>{score}</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2, marginBottom: 24, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, var(--accent), var(--accent-light))",
            borderRadius: 2, transition: "width 0.3s ease" }} />
        </div>

        {/* Question card */}
        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
            color: "var(--muted)", marginBottom: 12 }}>
            {q.year} &nbsp;·&nbsp; {q.difficulty}
          </div>
          <h2 style={{ fontSize: "clamp(16px, 3vw, 20px)", fontWeight: 700, lineHeight: 1.45, color: "var(--text)" }}>
            {q.question}
          </h2>
        </div>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q.options.map((option, i) => {
            const isSelected = selected === option;
            const isCorrect = selected && option === q.answer;
            const isWrong = isSelected && option !== q.answer;
            let bg = "rgba(255,255,255,0.04)";
            let border = "rgba(255,255,255,0.1)";
            let color = "var(--text)";
            if (isCorrect) { bg = "rgba(67,160,71,0.2)"; border = "#43a047"; color = "#81c784"; }
            if (isWrong)   { bg = "rgba(229,57,53,0.15)"; border = "#e53935"; color = "#ef9a9a"; }

            return (
              <button key={option} onClick={() => answer(option)}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  background: bg, border: `1px solid ${border}`, borderRadius: 10,
                  padding: "14px 18px", cursor: selected ? "default" : "pointer",
                  textAlign: "left", textTransform: "none", letterSpacing: 0,
                  fontWeight: 500, fontSize: 15, color,
                  transition: "background 0.2s, border-color 0.2s",
                  boxShadow: "none", margin: 0,
                }}>
                <span style={{ minWidth: 28, height: 28, borderRadius: 6,
                  background: isCorrect ? "#43a047" : isWrong ? "#e53935" : "rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 800, color: isCorrect || isWrong ? "#fff" : "var(--muted)" }}>
                  {LABELS[i]}
                </span>
                {option}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
