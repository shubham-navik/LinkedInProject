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

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);

  // Get user info from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userName = storedUser?.name || "User";
  const userLevel = storedUser?.level || "Beginner"; 
  const userId = storedUser?._id;

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:4000/api/v1/session/getsessions/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setSessions(Array.isArray(data) ? data : data.sessions || []);
      })
      .catch((err) => console.error(err));
  }, [userId]);

  return (
    <Box p={4}>
      {/* User info */}
      <Box mb={3}>
        <Typography variant="h4">Welcome, {userName}!</Typography>
        <Chip label={userLevel} color="primary" sx={{ mt: 1 }} />
      </Box>

      {/* Quiz Details Table */}
      {sessions.length === 0 ? (
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
                    <TableCell>
                      {s.score} / {s.total}
                    </TableCell>
                    <TableCell>
                      {s.score} / {s.total - s.score}
                    </TableCell>
                    <TableCell>{s.difficulty}</TableCell>
                    <TableCell>{s.weakAreas.join(", ") || "N/A"}</TableCell>
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
