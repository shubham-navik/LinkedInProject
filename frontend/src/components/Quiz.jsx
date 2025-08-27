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

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "", type: "success" });

  // Get logged-in user
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?._id;
  const userLevel = storedUser?.level || "Beginner";

  // Fetch questions adaptively based on level
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        let difficulty = "easy";
        if (userLevel === "Intermediate") difficulty = ["medium", "hard"];
        else if (userLevel === "Advanced") difficulty = "hard";

        const query = Array.isArray(difficulty)
          ? difficulty.map(d => `difficulty=${d}`).join("&")
          : `difficulty=${difficulty}`;

        const res = await fetch(`https://linkedinproject.onrender.com/api/v1/question/getquestions?${query}`);
        const data = await res.json();
        setQuestions(data.questions || []);
      } catch (err) {
        console.error(err);
        setToast({ open: true, message: "Error fetching questions", type: "error" });
      }
    };

    fetchQuestions();
  }, [userLevel]);

  const handleOptionChange = (qId, value) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const handleClose = () => {
    setToast({ ...toast, open: false });
  };

  const handleSubmit = async () => {
    let calculatedScore = 0;
    const weakAreas = [];

    questions.forEach((q) => {
      const selected = answers[q.id];
      if (selected === q.correctAnswer) calculatedScore++;
      else weakAreas.push(q.topic);
    });

    setScore(calculatedScore);

    const sessionPayload = {
      userId: userId || null,
      questions: questions.map((q) => ({
        questionId: q.id,
        selectedOption: answers[q.id] ?? null,
        isCorrect: answers[q.id] === q.correctAnswer,
      })),
      score: calculatedScore,
      total: questions.length,
      weakAreas,
      difficulty: "mixed",
    };

    try {
      // Save session
      await fetch("https://linkedinproject.onrender.com/api/v1/session/createsession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sessionPayload),
      });

      // Update user level
      if (userId) {
        const levelRes = await fetch("https://linkedinproject.onrender.com/api/v1/user/submittest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, score: calculatedScore }),
        });
        const levelData = await levelRes.json();
        const updatedUser = { ...storedUser, level: levelData.level };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      setSubmitted(true);
      setToast({ open: true, message: "Quiz submitted successfully!", type: "success" });
    } catch (err) {
      console.error(err);
      setToast({ open: true, message: "Error submitting quiz", type: "error" });
    }
  };

  if (questions.length === 0) return <Typography>Loading questions...</Typography>;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      {questions.map((q) => (
        <Paper key={q.id} elevation={3} sx={{ p: 3, mb: 2, width: 600 }}>
          <Typography variant="h6">Q{q.id}: {q.question}</Typography>
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
          Your Score: {score} / {questions.length} 
        </Typography>
      )}

      {/* Toast */}
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
