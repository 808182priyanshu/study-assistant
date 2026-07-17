import { useState } from "react";

function Flashcard({ question, answer }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div
      className="flashcard"
      onClick={() => setShowAnswer(!showAnswer)}
    >
      {showAnswer ? (
        <>
          <h4>Answer</h4>
          <p>{answer}</p>
        </>
      ) : (
        <>
          <h4>Question</h4>
          <p>{question}</p>
          <small>Click to reveal answer</small>
        </>
      )}
    </div>
  );
}

export default Flashcard;