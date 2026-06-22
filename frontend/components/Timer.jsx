import { useEffect, useState } from "react";

export default function Timer({ onTimeUp }) {
  const [time, setTime] = useState(60);

  useEffect(() => {
    if (time === 0) {
      onTimeUp();
      return;
    }
    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  const color = time <= 10 ? "#e53935" : time <= 20 ? "#fb8c00" : "var(--accent)";

  return (
    <div style={{ fontSize: 22, fontWeight: 800, color, letterSpacing: "0.04em", lineHeight: 1 }}>
      {time}<span style={{ fontSize: 13, fontWeight: 600, marginLeft: 2 }}>s</span>
    </div>
  );
}