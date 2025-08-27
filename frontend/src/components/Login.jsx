import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState({ open: false, message: "", type: "success" });
  const navigate = useNavigate(); // ✅ React Router navigation

  const handleClose = () => {
    setToast({ ...toast, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://linkedinproject.onrender.com/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        // Save user
        localStorage.setItem("user", JSON.stringify(data.user));

        // Show success toast
        setToast({ open: true, message: "Login successful!", type: "success" });

        // Redirect to dashboard after short delay (so toast shows)
        setTimeout(() => {
          navigate("/dashboard"); // ✅ route to dashboard
        }, 1000);
      } else {
        setToast({ open: true, message: data.msg || "Login failed", type: "error" });
      }
    } catch (err) {
      console.error(err);
      setToast({ open: true, message: "Server error", type: "error" });
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" gutterBottom align="center">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
      </Paper>

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

export default Login;
