import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  Snackbar,
  Alert,
} from "@mui/material";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "", type: "success" });
  const [userLevel, setUserLevel] = useState("Beginner");

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?._id;

  // Fetch questions
  useEffect(() => {
    if (!userId) return;
    setUserLevel(storedUser?.level || "Beginner");

    const fetchQuestions = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/v1/question/getquestions?userId=${userId}`);
        const data = await res.json();
        setQuestions(data.questions || []);
      } catch (err) {
        console.error(err);
        setToast({ open: true, message: "Error fetching questions", type: "error" });
      }
    };

    fetchQuestions();
  }, [userId]);

  const handleOptionChange = (qId, value) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const handleClose = () => setToast({ ...toast, open: false });

  const handleSubmit = async () => {
    if (!questions.length) return;

    let calculatedScore = 0;
    const weakAreas = [];

    questions.forEach((q) => {
      const selected = answers[q._id];
      if (selected === q.correctAnswer) calculatedScore++;
      else weakAreas.push(q.topic);
    });

    setScore(calculatedScore);

    // ✅ Correct session payload: use numeric `q.id`
    const sessionPayload = {
      userId,
      questions: questions.map((q) => ({
        questionId: q.id, // use numeric ID from Question model
        selectedOption: answers[q._id] ?? null,
        isCorrect: answers[q._id] === q.correctAnswer,
      })),
      score: calculatedScore,
      total: questions.length,
      weakAreas,
      difficulty: "mixed",
    };

    try {
      // Create session
      const sessionRes = await fetch(`${BASE_URL}/api/v1/session/createsession`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sessionPayload),
      });

      if (!sessionRes.ok) {
        const errText = await sessionRes.text();
        throw new Error(`Session creation failed: ${errText}`);
      }

      const sessionData = await sessionRes.json();
      console.log("Session created:", sessionData);

      // Update user level
      const levelRes = await fetch(`${BASE_URL}/api/v1/user/submittest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, score: calculatedScore, total: questions.length }),
      });

      if (!levelRes.ok) {
        const errText = await levelRes.text();
        throw new Error(`Level update failed: ${errText}`);
      }

      const levelData = await levelRes.json();
      console.log("Level updated:", levelData);

      setUserLevel(levelData.level);
      localStorage.setItem("user", JSON.stringify({ ...storedUser, level: levelData.level }));

      setSubmitted(true);
      setToast({ open: true, message: "Quiz submitted successfully!", type: "success" });
    } catch (err) {
      console.error(err);
      setToast({ open: true, message: err.message || "Error submitting quiz", type: "error" });
    }
  };

  if (!questions.length) return <Typography>Loading questions...</Typography>;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      {questions.map((q) => (
        <Paper key={q._id} elevation={3} sx={{ p: 3, mb: 2, width: 600 }}>
          <Typography variant="h6">
            {q.id}. {q.question}
          </Typography>
          <Typography
            sx={{
              color: q.difficulty === "easy" ? "green" : q.difficulty === "medium" ? "orange" : "red",
              fontWeight: "bold",
            }}
          >
            {q.difficulty}
          </Typography>
          <RadioGroup
            value={answers[q._id] ?? ""}
            onChange={(e) => handleOptionChange(q._id, parseInt(e.target.value))}
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
          Your Score: {score} / {questions.length}
        </Typography>
      )}

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={toast.type} sx={{ width: "100%" }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Quiz;
