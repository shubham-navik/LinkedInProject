import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const userName = storedUser.name || "User";
  const userLevel = storedUser.level || "Beginner";
  const userId = storedUser._id || null;

  useEffect(() => {
    if (!userId) return;

    const fetchSessions = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/v1/session/getsessions/${userId}`);
        const data = await res.json();
        console.log("Fetched sessions:", data); 
        setSessions(data.sessions || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [userId]);

  if (!userId) {
    return <Typography variant="h6">User not found. Please login.</Typography>;
  }

  return (
    <Box p={4}>
      <Box mb={3}>
        <Typography variant="h4">Welcome, {userName}!</Typography>
        <Chip label={userLevel} color="primary" sx={{ mt: 1 }} />
      </Box>

      {loading ? (
        <Typography>Loading sessions...</Typography>
      ) : sessions.length === 0 ? (
        <Typography>No session data available.</Typography>
      ) : (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" mb={2}>
            Quiz Details
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Quiz #</TableCell>
                  <TableCell>Score</TableCell>
                  <TableCell>Right / Wrong</TableCell>
                  <TableCell>Difficulty</TableCell>
                  <TableCell>Weak Areas</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sessions.map((s, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{s.score} / {s.total}</TableCell>
                    <TableCell>
                      Correct: {s.score}, Wrong: {s.total - s.score}
                    </TableCell>
                    <TableCell>{s.difficulty || "N/A"}</TableCell>
                    <TableCell>{s.weakAreas?.join(", ") || "N/A"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
};

export default Dashboard;
