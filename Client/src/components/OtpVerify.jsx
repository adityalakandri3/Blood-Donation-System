import React from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useOtpVerifyMutation } from "../hooks/react-query/query-hooks/authQuery";

const theme = createTheme({
  palette: {
    primary: {
      main: "#D32F2F", // Deep red
      contrastText: "#fff",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif", // Montserrat font applied here
    h5: {
      fontWeight: 700,
      color: "#D32F2F", // Deep red for headings
    },
  },
});

const OtpVerify = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate } = useOtpVerifyMutation();

  const onSubmit = (data) => {
    console.log("Verifying OTP with data:", data);
    mutate(data); // data now includes both email and otp
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
            Verify Your Email
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormControl fullWidth margin="normal" error={!!errors.email}>
              <TextField
                label="Email"
                fullWidth
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
            </FormControl>

            <FormControl fullWidth margin="normal" error={!!errors.otp}>
              <TextField
                label="Enter OTP"
                fullWidth
                {...register("otp", {
                  required: "OTP is required",
                  pattern: {
                    value: /^\d{4}$/,
                    message: "OTP must be a 4-digit number",
                  },
                })}
                error={!!errors.otp}
                helperText={errors.otp?.message}
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
            </FormControl>

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
                  backgroundColor: "#B71C1C", // Darker red on hover
                },
              }}
            >
              Verify
            </Button>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default OtpVerify;
