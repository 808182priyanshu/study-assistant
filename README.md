# 📚 AI Study Assistant

An AI-powered Study Assistant built with React and Express that generates summaries, flashcards, and quizzes from user-provided notes.

The application uses a Large Language Model (LLM) to convert free-form text into structured JSON and displays it as interactive study material.

---

## Features

- Paste notes or any study topic
- AI-generated summary
- Interactive flashcards (click to reveal answers)
- Interactive quiz
- Quiz score calculation
- Retry quiz
- Loading state while generating content
- Error handling for failed AI requests
- Empty state before generating content
- Basic validation of AI response structure
- Responsive design for desktop and mobile

---

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- CSS

### Backend

- Node.js
- Express.js

### AI

- Groq API (LLM)

---

## Project Structure

```
study-assistant
│
├── client
│   ├── src
│   │   ├── components
│   │   │   ├── Flashcard.jsx
│   │   │   └── Quiz.jsx
│   │   ├── services
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
│
├── server
│   ├── routes
│   │   └── ai.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone the repository

```bash
git clone <repository-url>
```

### Install frontend dependencies

```bash
cd client
npm install
```

### Install backend dependencies

```bash
cd ../server
npm install
```

---

## Environment Variables

Create a `.env` file inside the `server` folder.

Example:

```env
GROQ_API_KEY=your_api_key
PORT=5000
```

---

## Running the Project

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm run dev
```

Frontend:

```
http://localhost:5173
```

Backend:

```
http://localhost:5000
```

---

## AI Usage

AI was used to:

- Generate study summaries
- Generate flashcards
- Generate quiz questions
- Return structured JSON output

AI assistants (ChatGPT) were also used during development for guidance, debugging, and code review. All implementation, testing, and integration were completed and understood before submission.

---

## Error Handling

The application handles:

- Failed API requests
- Invalid AI response format
- Empty state
- Loading state
- Missing AI response fields

---

## Known Limitations

- Quiz retries the complete quiz instead of only incorrect questions.
- AI responses may vary depending on the model output.
- Internet connection is required for AI generation.

---

## Future Improvements

- Retry only incorrect questions
- Save previous study sessions
- Dark mode
- Export flashcards
- Progress tracking
- User authentication

---

## Time Spent

Approximately **7–8 hours**.

---

## Author

**Priyanshu Yadav**

B.Tech Computer Science Engineering
