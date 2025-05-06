import React from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useUserSignInMutation } from "../hooks/react-query/query-hooks/authQuery";
import { Link as RouterLink } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#D32F2F", // Deep red
      contrastText: "#fff",
    },
    background: {
      default: "#f5f5f5", // Light background
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    h5: {
      fontWeight: 700,
      color: "#D32F2F",
    },
  },
});

const UserSignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate } = useUserSignInMutation();

  const onSubmit = (data) => {
    console.log("Signing in with data:", data);
    mutate(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "background.default",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 4,
        }}
      >
        <Container
          maxWidth="xs"
          sx={{
            p: 4,
            backgroundColor: "background.paper",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                "& .MuiInputBase-root": {
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                  },
                },
              }}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              {...register("password", {
                required: "Password is required",
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{
                "& .MuiInputBase-root": {
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                  },
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 3,
                py: 1.5,
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#B71C1C",
                },
              }}
            >
              Sign In
            </Button>

            <Typography align="center" sx={{ mt: 2 }}>
              Don't have an account?{" "}
              <Button
                component={RouterLink}
                to="/signup"
                size="small"
                sx={{
                  color: "primary.main",
                  textTransform: "none",
                  fontWeight: "bold",
                  p: 0,
                  minWidth: 0,
                }}
              >
                Register
              </Button>
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default UserSignIn;
