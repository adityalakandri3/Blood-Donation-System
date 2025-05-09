import React from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useUpdatePassword } from "../../../hooks/react-query/query-hooks/authQuery";

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
    h5: {
      fontWeight: 700,
      color: "#D32F2F",
    },
  },
});

const PasswordUpdate = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { mutate } = useUpdatePassword();

  const onSubmit = (data) => {
    mutate(data)
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
          maxWidth="sm"
          sx={{
            p: 4,
            backgroundColor: "background.paper",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Update Password
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              label="New Password"
              type="password"
              fullWidth
              margin="normal"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
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
              Update Password
            </Button>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default PasswordUpdate;
