import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Get logged-in user from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?._id;

  // Fetch questions
  useEffect(() => {
    fetch("http://localhost:4000/api/v1/question/getquestions") // adjust URL if needed
      .then((res) => res.json())
      .then((data) => setQuestions(data.questions || []))
      .catch((err) => console.error(err));
  }, []);

  const handleOptionChange = (qId, value) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = async () => {
    let calculatedScore = 0;
    const weakAreas = [];

    // Calculate score and collect weak areas
    questions.forEach((q) => {
      const selected = answers[q.id];
      if (selected === q.correctAnswer) {
        calculatedScore++;
      } else {
        weakAreas.push(q.topic);
      }
    });

    setScore(calculatedScore);

    // Prepare session payload
    const sessionPayload = {
      userId: userId || null, // take from localStorage
      questions: questions.map((q) => ({
        questionId: q.id,
        selectedOption: answers[q.id] ?? null,
        isCorrect: answers[q.id] === q.correctAnswer,
      })),
      score: calculatedScore,
      total: questions.length,
      weakAreas,
      difficulty: "easy", // you can calculate overall difficulty if needed
    };

    try {
      const res = await fetch("http://localhost:4000/api/v1/session/createsession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sessionPayload),
      });

      const data = await res.json();
      console.log("Session saved:", data);
      setSubmitted(true);
    } catch (err) {
      console.error("Error saving session:", err);
    }
  };

  if (questions.length === 0) return <Typography>Loading questions...</Typography>;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      {questions.map((q) => (
        <Paper key={q.id} elevation={3} sx={{ p: 3, mb: 2, width: 600 }}>
          <Typography variant="h6">
            Q{q.id}: {q.question}
          </Typography>
          <Typography
            sx={{
              color:
                q.difficulty === "easy"
                  ? "green"
                  : q.difficulty === "medium"
                  ? "orange"
                  : "red",
              fontWeight: "bold",
            }}
          >
            {q.difficulty}
          </Typography>
          <RadioGroup
            value={answers[q.id] ?? ""}
            onChange={(e) => handleOptionChange(q.id, parseInt(e.target.value))}
          >
            {q.options.map((opt, idx) => (
              <FormControlLabel key={idx} value={idx} control={<Radio />} label={opt} />
            ))}
          </RadioGroup>
        </Paper>
      ))}

      {!submitted ? (
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
          Submit Quiz
        </Button>
      ) : (
        <Typography variant="h5" mt={2}>
          Your Score: {score} / {questions.length} ✅ Session saved!
        </Typography>
      )}
    </Box>
  );
};

export default Quiz;
