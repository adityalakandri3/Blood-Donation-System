import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, MenuItem, Button, Select, FormControl, InputLabel, Container, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Customize the theme based on blood donation camp colors (reds and whites)
const theme = createTheme({
  palette: {
    primary: {
      main: "#D32F2F", // Red for primary actions (Blood-related)
    },
    secondary: {
      main: "#1976D2", // Blue for secondary actions or accents
    },
    background: {
      default: "#FFF",
      paper: "#f7f7f7", // Light grey background for a subtle look
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif", // Clean font for the form
  },
});

export const UserSignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isPending, setIsPending] = useState(false);

  const onSubmit = async (data) => {
    setIsPending(true);
    console.log("Form Data:", data);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("role", data.role);
    formData.append("bloodType", data.bloodType);
    formData.append("location[state]", data.locationState);
    formData.append("location[city]", data.locationCity);

    setTimeout(() => {
      setIsPending(false);
      alert("Form submitted!");
    }, 1000);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ marginTop: 4, padding: 3, backgroundColor: "white", borderRadius: 2 }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("name", { required: true })}
            error={!!errors.name}
            helperText={errors.name ? "Name is required" : ""}
          />
          
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("email", { required: true })}
            error={!!errors.email}
            helperText={errors.email ? "Email is required" : ""}
          />
          
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("password", { required: true })}
            error={!!errors.password}
            helperText={errors.password ? "Password is required" : ""}
          />

          <FormControl fullWidth margin="normal" variant="outlined" error={!!errors.role}>
            <InputLabel>Role</InputLabel>
            <Select {...register("role")} label="Role">
              <MenuItem value="recipient">Recipient</MenuItem>
              <MenuItem value="donor">Donor</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal" variant="outlined" error={!!errors.bloodType}>
            <InputLabel>Blood Type</InputLabel>
            <Select {...register("bloodType", { required: true })} label="Blood Type">
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bt) => (
                <MenuItem key={bt} value={bt}>
                  {bt}
                </MenuItem>
              ))}
            </Select>
            {errors.bloodType && <p className="error">Blood type is required</p>}
          </FormControl>

          <TextField
            label="State"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("locationState", { required: true })}
            error={!!errors.locationState}
            helperText={errors.locationState ? "State is required" : ""}
          />
          
          <TextField
            label="City"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("locationCity", { required: true })}
            error={!!errors.locationCity}
            helperText={errors.locationCity ? "City is required" : ""}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              marginTop: 2,
              padding: "12px",
              '&:hover': { backgroundColor: "#B71C1C" }, // Darker red on hover
            }}
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UserSignUp;
