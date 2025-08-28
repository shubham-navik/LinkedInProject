import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL; // ✅ from .env

const Login = () => {
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState({ open: false, message: "", type: "success" });
  const navigate = useNavigate();

  const handleClose = () => setToast({ ...toast, open: false });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, { email }, {
        headers: { "Content-Type": "application/json" },
      });

      // Assuming backend returns { user, token }
      localStorage.setItem("user", JSON.stringify(res.data.user));
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      setToast({ open: true, message: "Login successful!", type: "success" });
      setTimeout(() => navigate("/dashboard"), 1000);

    } catch (err) {
      console.error(err);
      setToast({
        open: true,
        message: err.response?.data?.msg || "Login failed",
        type: "error",
      });
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" gutterBottom align="center">Login</Typography>
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
