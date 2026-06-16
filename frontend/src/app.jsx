import { useEffect, useState } from "react";

function App() {
  const [questions, setQuestions] =
    useState([]);

  useEffect(() => {
    fetch(
      "https://your-backend.onrender.com/api/questions"
    )
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, []);

  return (
    <div>
      <h1>FIFA Quiz</h1>

      {questions.map((q, i) => (
        <div key={i}>
          <h3>{q.question}</h3>
        </div>
      ))}
    </div>
  );
}

export default App;
