import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Admin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ year: "", difficulty: "easy", question: "", options: "", answer: "", explanation: "" });

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const submit = async () => {
    const token = localStorage.getItem("token");
    try {
      await api.post(
        "/api/questions",
        { ...form, options: form.options.split(",").map((o) => o.trim()) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Question Added!");
      setForm({ year: "", difficulty: "easy", question: "", options: "", answer: "", explanation: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add question");
    }
  };

  return (
    <div className="page-bg--top">
      <div style={{ maxWidth: 600, margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 10 }}>
            <span className="eyebrow-pip" />
            Question Management
            <span className="eyebrow-pip" />
          </div>
          <h1 className="shimmer-title">Admin Panel</h1>
        </div>

        <div className="card">
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: "var(--text)" }}>
            Add New Question
          </h2>

          <label className="field-label">Year</label>
          <input placeholder="e.g. 2022" value={form.year} onChange={update("year")} />

          <label className="field-label">Difficulty</label>
          <select value={form.difficulty} onChange={update("difficulty")}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <label className="field-label">Question</label>
          <input placeholder="Enter the question" value={form.question} onChange={update("question")} />

          <label className="field-label">Options (comma separated)</label>
          <input placeholder="France, Brazil, Germany, Italy" value={form.options} onChange={update("options")} />

          <label className="field-label">Correct Answer</label>
          <input placeholder="Must match one option exactly" value={form.answer} onChange={update("answer")} />

          <label className="field-label">Explanation</label>
          <textarea placeholder="Brief explanation of the correct answer"
            value={form.explanation} onChange={update("explanation")}
            style={{ minHeight: 90, resize: "vertical" }} />

          <button onClick={submit} style={{ marginTop: 4 }}>➕ &nbsp;Add Question</button>
          <button onClick={() => navigate("/quiz")} className="btn-ghost">← &nbsp;Back to Quiz</button>
        </div>

      </div>
    </div>
  );
}
