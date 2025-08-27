import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Nav() {
    return (
    //   <h1>hii</h1>
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Logo / App Name */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          EcoQuizApp
        </Typography>

        {/* Navigation Links */}
<Box sx={{ display: "flex", gap: 2 }}>
  <Button color="inherit" component={Link} to="/dashboard">
    Dashboard
  </Button>
  <Button color="inherit" component={Link} to="/quiz">
    Practice Quiz
  </Button>
  <Button color="inherit" component={Link} to="/register">
    Register
  </Button>
  <Button color="inherit" component={Link} to="/login">
    Login
  </Button>
</Box>

      </Toolbar>
    </AppBar>
  );
}
