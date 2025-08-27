import React from "react";
import { Box, Button, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      textAlign="center"
      px={3}
    >
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        📘 A-Level Economics (AQA) Learning Platform
      </Typography>

      <Typography variant="h6" color="text.secondary" mb={4} maxWidth="700px">
        Master Economics with adaptive quizzes, real-time feedback, and a personal
        dashboard. Our platform helps you practice multiple-choice questions,
        track your progress, and focus on weak areas — all tailored for{" "}
        <b>AQA A-level Economics</b>.
      </Typography>

      <Stack direction="row" spacing={3} mb={6}>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/login"
          sx={{ borderRadius: "12px", px: 4 }}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          size="large"
          component={Link}
          to="/register"
          sx={{ borderRadius: "12px", px: 4 }}
        >
          Register
        </Button>
      </Stack>

      <Box maxWidth="800px" textAlign="left">
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          🚀 What you can do here:
        </Typography>
        <Typography variant="body1" gutterBottom>
          ✅ Practice <b>multiple-choice questions</b> from A-level Economics topics
        </Typography>
        <Typography variant="body1" gutterBottom>
          ✅ Get <b>automated scoring</b> at the end of each session
        </Typography>
        <Typography variant="body1" gutterBottom>
          ✅ Learn with an <b>adaptive engine</b> — harder questions as you improve
        </Typography>
        <Typography variant="body1" gutterBottom>
          ✅ Track your progress in your <b>student dashboard</b> (scores, trends, weak areas)
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
