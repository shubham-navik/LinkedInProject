import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL; // ✅ Use .env variable

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState({ open: false, type: "", message: "" });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/api/v1/user/createuser`, { // ✅ Use BASE_URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (res.ok) {
        setToast({ open: true, type: "success", message: "User registered successfully!" });
        setName("");
        setEmail("");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setToast({ open: true, type: "error", message: data.message || "Registration failed" });
      }
    } catch (err) {
      setToast({ open: true, type: "error", message: "Server error, try again later." });
    }
  };

  const handleClose = () => setToast({ ...toast, open: false });

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" gutterBottom align="center">Register</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
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
            Register
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

export default Register;
