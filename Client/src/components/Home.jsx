import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";
import poster from "../assets/poster.png.jpg"; // Ensure this path is correct

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        backgroundImage: `url(${poster})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      {/* Overlay for blur and opacity */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent overlay
          backdropFilter: "blur(8px)", // Blur effect
          WebkitBackdropFilter: "blur(8px)", // Safari support
          zIndex: 1,
        }}
      />
      {/* Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "white",
          px: 2,
        }}
      >
        <Typography variant="h3" sx={{ mb: 3 }}>
          Welcome to Our Hemo
          <Box component="span" sx={{ color: "red" }}>
            Cell
          </Box>
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="error" // Applies red background
            size="large"
            sx={{ mr: 2 }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
          <Button
            variant="contained"
            color="error" // Applies red background
            size="large"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
