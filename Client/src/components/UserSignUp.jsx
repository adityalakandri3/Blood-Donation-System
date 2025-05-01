import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  TextField,
  MenuItem,
  Button,
  Select,
  FormControl,
  InputLabel,
  Container,
  Box,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Replace with the actual path if needed
export const baseURL = "http://localhost:3006";

export const endPoints = {
  user: {
    signup: "/create-user",
    login: "/login-user",
    verifyOTP: "/verify-otp",
    sendResetLink: "/reset-password-link",
    resetPassword: (id, token) => `/reset-password/${id}/${token}`,
    dashboard: "/user-dashboard",
    updatePassword: "/update-password",
    editUser: (id) => `/edit-user/${id}`,
    updateUser: (id) => `/update-user/${id}`,
  },
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#D32F2F",
    },
    secondary: {
      main: "#1976D2",
    },
    background: {
      default: "#FFF",
      paper: "#f7f7f7",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

const UserSignUp = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      bloodType: data.bloodType,
      location: {
        state: data.locationState,
        city: data.locationCity
      }
    };

    try {
      const response = await axios.post(`${baseURL}${endPoints.user.signup}`, payload);

      if (response.status === 201 || response.status === 200) {
        alert("User registered successfully!");
        reset(); // Reset form
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ mt: 4, p: 3, backgroundColor: "white", borderRadius: 2 }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            {...register("name", { required: true })}
            error={!!errors.name}
            helperText={errors.name && "Name is required"}
          />

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register("email", { required: true })}
            error={!!errors.email}
            helperText={errors.email && "Email is required"}
          />

          <TextField
            type="password"
            label="Password"
            fullWidth
            margin="normal"
            {...register("password", { required: true })}
            error={!!errors.password}
            helperText={errors.password && "Password is required"}
          />

          <FormControl fullWidth margin="normal" error={!!errors.role}>
            <InputLabel>Role</InputLabel>
            <Select
              defaultValue=""
              {...register("role", { required: true })}
              label="Role"
            >
              <MenuItem value="recipient">Recipient</MenuItem>
              <MenuItem value="donor">Donor</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
            {errors.role && <p style={{ color: "red", fontSize: 12 }}>Role is required</p>}
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.bloodType}>
            <InputLabel>Blood Type</InputLabel>
            <Select
              defaultValue=""
              {...register("bloodType", { required: true })}
              label="Blood Type"
            >
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bt) => (
                <MenuItem key={bt} value={bt}>{bt}</MenuItem>
              ))}
            </Select>
            {errors.bloodType && <p style={{ color: 'red', fontSize: 12 }}>Blood type is required</p>}
          </FormControl>

          <TextField
            label="State"
            fullWidth
            margin="normal"
            {...register("locationState", { required: true })}
            error={!!errors.locationState}
            helperText={errors.locationState && "State is required"}
          />

          <TextField
            label="City"
            fullWidth
            margin="normal"
            {...register("locationCity", { required: true })}
            error={!!errors.locationCity}
            helperText={errors.locationCity && "City is required"}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, py: 1.5, '&:hover': { backgroundColor: "#B71C1C" } }}
          >
            Submit
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UserSignUp;
