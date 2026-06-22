import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

// Strict email: lowercase letters/numbers/dots/+/- before @, valid domain, 2+ char TLD
const EMAIL_REGEX = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;

function getEmailError(raw) {
  if (!raw.trim()) return "Email is required";
  if (raw !== raw.toLowerCase()) return "Email must be in lowercase";
  if (!raw.includes("@")) return 'Email must contain "@"';
  const [local, domain] = raw.split("@");
  if (!local) return "Enter the part before @";
  if (!domain) return "Enter the domain after @";
  if (!domain.includes(".")) return 'Domain must contain a "." (e.g. gmail.com)';
  if (!EMAIL_REGEX.test(raw)) return "Invalid email — use format: name@example.com";
  return "";
}

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const updateField = (field) => (e) => {
    const val = field === "email" ? e.target.value.toLowerCase() : e.target.value;
    setForm({ ...form, [field]: val });
    setErrors({ ...errors, [field]: "" });
  };

  const validate = () => {
    const e = {};
    if (!form.username.trim() || form.username.trim().length < 3)
      e.username = "Username must be at least 3 characters";
    const emailErr = getEmailError(form.email);
    if (emailErr) e.email = emailErr;
    if (!form.password || form.password.length < 6)
      e.password = "Password must be at least 6 characters";
    return e;
  };

  const submit = async () => {
    setServerError("");
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    try {
      await api.post("/api/auth/register", { ...form, email: form.email.trim() });
      alert("Registered! Please login.");
      navigate("/");
    } catch (err) {
      setServerError(err.response?.data?.message || "Registration failed");
    }
  };

  const handleKey = (e) => { if (e.key === "Enter") submit(); };

  const inputStyle = (key) => ({
    borderColor: errors[key] ? "#e53935" : form[key] && !errors[key] ? "#43a047" : undefined,
  });

  const errMsg = (key) => errors[key]
    ? <p style={{ color:"#e53935", fontSize:12, marginTop:-10, marginBottom:10 }}>⚠ {errors[key]}</p>
    : null;

  return (
    <div className="page-bg">
      <div style={{ width: "100%", maxWidth: 440 }}>

        <div className="eyebrow">
          <span className="eyebrow-pip" />
          FIFA World Cup Trivia
          <span className="eyebrow-pip" />
        </div>

        <div style={{ textAlign: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 48, display: "inline-block", animation: "trophy-pulse 3s ease-in-out infinite" }}>🏆</span>
        </div>
        <h1 className="shimmer-title" style={{ marginBottom: 28 }}>Create Account</h1>

        <div className="card">
          <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 20 }}>Join the quiz</h2>

          {serverError && <p className="error-banner">{serverError}</p>}

          {/* Username */}
          <label className="field-label">Username</label>
          <input
            placeholder="At least 3 characters"
            value={form.username}
            style={inputStyle("username")}
            onChange={updateField("username")}
            onKeyDown={handleKey}
          />
          {errMsg("username")}

          {/* Email */}
          <label className="field-label">
            Email
            <span style={{ color:"var(--muted)", fontWeight:400, marginLeft:8, fontSize:10, letterSpacing:"0.05em" }}>
              — must be lowercase (e.g. name@gmail.com)
            </span>
          </label>
          <input
            type="text"
            placeholder="name@example.com"
            autoComplete="off"
            autoCapitalize="none"
            value={form.email}
            style={inputStyle("email")}
            onChange={updateField("email")}
            onKeyDown={handleKey}
          />
          {errMsg("email")}

          {/* Password */}
          <label className="field-label">Password</label>
          <input
            type="password"
            placeholder="At least 6 characters"
            autoComplete="new-password"
            value={form.password}
            style={inputStyle("password")}
            onChange={updateField("password")}
            onKeyDown={handleKey}
          />
          {errMsg("password")}

          <button onClick={submit} style={{ marginTop: 4 }}>Create Account</button>

          <p style={{ textAlign:"center", fontSize:14, color:"var(--muted)", margin:"14px 0 0" }}>
            Already have an account?{" "}
            <Link to="/" style={{ color:"var(--accent)", fontWeight:600, textDecoration:"none" }}>Login here</Link>
          </p>
        </div>

      </div>
    </div>
  );
}
