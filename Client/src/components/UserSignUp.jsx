import React from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  MenuItem,
  Button,
  Select,
  FormControl,
  InputLabel,
  Container,
  Box,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useUserSignUpMutation } from "../hooks/react-query/query-hooks/authQuery";
import '@fontsource/montserrat'; // Import Montserrat font

const theme = createTheme({
  palette: {
    primary: {
      main: "#D32F2F", // Deep red
      contrastText: "#fff",
    },
    secondary: {
      main: "#1976D2",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    h4: {
      fontWeight: 700,
      color: "#D32F2F",
    },
  },
});

const UserSignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { mutate } = useUserSignUpMutation();

  const onSubmit = (data) => {
    mutate(data);
    console.log("Data registered", data);
    reset();
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
          <Typography variant="h4" align="center" gutterBottom>
            Create Your <span style={{ color: "#D32F2F" }}>Cell</span> Account
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              {...register("name", { required: true })}
              error={!!errors.name}
              helperText={errors.name && "Name is required"}
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
              label="Email"
              fullWidth
              margin="normal"
              {...register("email", { required: true })}
              error={!!errors.email}
              helperText={errors.email && "Email is required"}
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
              type="password"
              label="Password"
              fullWidth
              margin="normal"
              {...register("password", { required: true })}
              error={!!errors.password}
              helperText={errors.password && "Password is required"}
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

            <FormControl fullWidth margin="normal" error={!!errors.role}>
              <InputLabel>Role</InputLabel>
              <Select
                defaultValue=""
                {...register("role", { required: true })}
                label="Role"
                sx={{
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                  },
                }}
              >
                <MenuItem value="recipient">Recipient</MenuItem>
                <MenuItem value="donor">Donor</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
              {errors.role && (
                <Typography variant="caption" color="error">
                  Role is required
                </Typography>
              )}
            </FormControl>

            <FormControl fullWidth margin="normal" error={!!errors.bloodType}>
              <InputLabel>Blood Type</InputLabel>
              <Select
                defaultValue=""
                {...register("bloodType", { required: true })}
                label="Blood Type"
                sx={{
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                  },
                }}
              >
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bt) => (
                  <MenuItem key={bt} value={bt}>
                    {bt}
                  </MenuItem>
                ))}
              </Select>
              {errors.bloodType && (
                <Typography variant="caption" color="error">
                  Blood type is required
                </Typography>
              )}
            </FormControl>

            <TextField
              label="State"
              fullWidth
              margin="normal"
              {...register("location.state", { required: true })}
              error={!!errors.location?.state}
              helperText={errors.location?.state && "State is required"}
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
              label="City"
              fullWidth
              margin="normal"
              {...register("location.city", { required: true })}
              error={!!errors.location?.city}
              helperText={errors.location?.city && "City is required"}
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
                  backgroundColor: "#B71C1C", // Darker red on hover
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default UserSignUp;
