import { useState } from "react";

function Quiz({ questions }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (questionIndex, optionIndex) => {
    if (submitted) return;

    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const score = questions.reduce((total, question, index) => {
    return answers[index] === question.correctAnswer ? total + 1 : total;
  }, 0);

  return (
    <div>
      {questions.map((question, index) => (
        <div key={index} className="quiz-card">
          <h4>
            {index + 1}. {question.question}
          </h4>

          {question.options.map((option, optionIndex) => {
            const isSelected = answers[index] === optionIndex;
            const isCorrect = optionIndex === question.correctAnswer;

            let background = "transparent";

            if (submitted) {
              if (isCorrect) {
                background = "#d4edda"; // green
              } else if (isSelected && !isCorrect) {
                background = "#f8d7da"; // red
              }
            }

            return (
              <label
                key={optionIndex}
                className="option"
                style={{
                  display: "block",
                  padding: "8px",
                  marginBottom: "8px",
                  borderRadius: "6px",
                  background,
                  cursor: submitted ? "default" : "pointer",
                }}
              >
                <input
                  type="radio"
                  name={`question-${index}`}
                  checked={isSelected}
                  disabled={submitted}
                  onChange={() => handleSelect(index, optionIndex)}
                />

                {" "}
                {option}
              </label>
            );
          })}
        </div>
      ))}

      {!submitted ? (
        <button onClick={handleSubmit}>
          Submit Quiz
        </button>
      ) : (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            background: "#fff",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h2>
            🎯 Score: {score} / {questions.length}
          </h2>

          <button
            onClick={handleRetry}
            style={{ marginTop: "15px" }}
          >
            Retry Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;