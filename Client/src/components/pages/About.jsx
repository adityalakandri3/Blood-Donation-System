import React from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  ThemeProvider,
  createTheme,
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#D32F2F",
      contrastText: "#fff",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    h6: {
      fontWeight: 700,
      color: "#D32F2F",
    },
  },
});

const About = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100vh",
          px: { xs: 3, md: 10 },
          pt: { xs: 10, md: 14 },
          pb: 10,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 5 }}>
          About the Blood Donation Management System
        </Typography>

        <Typography
          variant="body1"
          align="center"
          sx={{ mb: 6, maxWidth: "800px", mx: "auto" }}
        >
          HemoCell is a full-stack MERN application developed to manage and
          optimize the blood donation process, ensuring quick access to blood
          for recipients and efficient camp management for admins.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {/* General Flow */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>
                General User Flow
              </Typography>
              <ul>
                <li>Register and verify OTP for secure onboarding</li>
                <li>Login to access user-specific features</li>
              </ul>
            </Paper>
          </Grid>

          {/* Admin */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>
                Admin Capabilities
              </Typography>
              <ul>
                <li>Manage donation camps (Create, Update, Delete)</li>
                <li>View all camps and registrations</li>
                <li>Change registration status</li>
                <li>Monitor users and blood requests</li>
              </ul>
            </Paper>
          </Grid>

          {/* Donor */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>
                Donor Features
              </Typography>
              <ul>
                <li>Profile updates with medical info</li>
                <li>Register and manage camp participation</li>
                <li>View and accept matching blood requests</li>
              </ul>
            </Paper>
          </Grid>

          {/* Recipient */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>
                Recipient Actions
              </Typography>
              <ul>
                <li>Keep health profile updated</li>
                <li>Submit and update blood requests</li>
              </ul>
            </Paper>
          </Grid>

          {/* Key Highlights */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>
                Key Functional Highlights
              </Typography>
              <ul>
                <li>
                  <strong>Camp Management:</strong> Admins handle setup and
                  monitoring
                </li>
                <li>
                  <strong>Blood Request Matching:</strong> Donors see real-time
                  compatible requests
                </li>
                <li>
                  <strong>User Role Separation:</strong> Secure access with
                  clear role boundaries
                </li>
              </ul>
            </Paper>
          </Grid>
        </Grid>

        {/* Developer Attribution */}
        <Box sx={{ textAlign: "center", mt: 6, color: "#777" }}>
          <Typography variant="body2">
            Developed by ©️ 2025 <strong>HemoCell</strong> — Website design by <br />
            <strong>Aditya Lakandri</strong>, <strong>Soubhik Mahato</strong>, and{" "}
            <strong>Rahul Kumar Baitha</strong>
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default About;
