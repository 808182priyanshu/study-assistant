import { useRef, useState } from "react";
import Quiz from "./components/Quiz";
import Flashcard from "./components/Flashcard";
import "./App.css";
import { generateStudyMaterial } from "./services/api";

function App() {
  const [notes, setNotes] = useState("");
  const [studyData, setStudyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const latestRequest = useRef(0);

const handleGenerate = async () => {
  if (!notes.trim()) {
    alert("Please enter your notes.");
    return;
  }

  try {
    setLoading(true);
    setStudyData(null);
    setError("");
    const requestId = ++latestRequest.current;
    const response = await generateStudyMaterial(notes);
    if (requestId !== latestRequest.current) {
  return;
}
    if (
      response.success &&
      response.data &&
      response.data.title &&
      response.data.summary &&
      Array.isArray(response.data.flashcards) &&
      Array.isArray(response.data.quiz)
    ) {
      setStudyData(response.data);
    } else {
      setError("AI returned an unexpected response. Please try again.");
    }
  } catch (err) {
    console.error(err);
    setError("Failed to generate study material. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="container">
      <h1 className="title">📚 AI Study Assistant</h1>

      <p className="subtitle">
        Generate summaries, flashcards and quizzes from your notes using AI.
      </p>

      <textarea
        placeholder="Paste your notes here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Study Material"}
      </button>

      {loading && (
        <p style={{ marginTop: "15px", color: "#2563eb" }}>
          ⏳ Generating study material...
        </p>
      )}

      {error && (
        <div className="error-box">
          {error}
        </div>
      )}

{!loading && !studyData && !error && (
  <div className="empty-state">
    <h2>📖 Ready to Study?</h2>

    <p>
      Paste your notes above and click
      <strong> Generate Study Material</strong>.
    </p>

    <ul>
      <li>✅ AI-generated Summary</li>
      <li>✅ Interactive Flashcards</li>
      <li>✅ Quiz with Score</li>
    </ul>
  </div>
)}
      {studyData && (
        <div className="result">
          <div className="section">
            <h2>📖 {studyData.title}</h2>
            <p>{studyData.summary}</p>
          </div>

          <div className="section">
            <h2>🃏 Flashcards</h2>

            {studyData.flashcards?.map((card, index) => (
              <Flashcard
                key={index}
                question={card.question}
                answer={card.answer}
              />
            ))}
          </div>

          <div className="section">
            <h2>📝 Quiz</h2>

           {studyData.quiz?.length > 0 && (
    <Quiz questions={studyData.quiz} />
)} 
          </div>
        </div>
      )}

      <footer
        style={{
          textAlign: "center",
          marginTop: "50px",
          color: "#777",
          paddingBottom: "20px",
        }}
      >
        Built using React, Express and Groq AI
      </footer>
    </div>
  );
}

export default App;