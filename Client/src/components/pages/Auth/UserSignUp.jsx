import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { State, City } from "country-state-city";
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
  Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useUserSignUpMutation } from "../../../hooks/react-query/query-hooks/authQuery";
import "@fontsource/montserrat"; // Import Montserrat font
import { Link as RouterLink } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#D32F2F",
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
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
      bloodType: "",
      location: {
        state: "",
        city: "",
      },
    },
  });

  const { mutate } = useUserSignUpMutation();

  const [states, setState] = useState([]);
  const [cities, setCity] = useState([]);

  const selectedStateCode = watch("location.state");

  useEffect(() => {
    const indianStates = State.getStatesOfCountry("IN");
    setState(indianStates);
  }, []);

  useEffect(() => {
    if (selectedStateCode) {
      const stateData = states.find((s) => s.name === selectedStateCode);
      if (stateData) {
        const stateCities = City.getCitiesOfState("IN", stateData.isoCode);
        setCity(stateCities);
        setValue("location.city", "");
      }
    }
  }, [selectedStateCode, setValue, states]);

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
          alignItems: "flex-start",
          py: 4,
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            mt: 10,
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  fullWidth
                  {...register("name", { required: true })}
                  error={!!errors.name}
                  helperText={errors.name && "Name is required"}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  fullWidth
                  {...register("email", { required: true })}
                  error={!!errors.email}
                  helperText={errors.email && "Email is required"}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  type="password"
                  label="Password"
                  fullWidth
                  {...register("password", { required: true })}
                  error={!!errors.password}
                  helperText={errors.password && "Password is required"}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.role}>
                  <InputLabel>Role</InputLabel>
                  <Select
                    defaultValue=""
                    {...register("role", { required: true })}
                    label="Role"
                  >
                    <MenuItem value="recipient">Recipient</MenuItem>
                    <MenuItem value="donor">Donor</MenuItem>
                  </Select>
                  {errors.role && (
                    <Typography variant="caption" color="error">
                      Role is required
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.bloodType}>
                  <InputLabel>Blood Type</InputLabel>
                  <Select
                    defaultValue=""
                    {...register("bloodType", { required: true })}
                    label="Blood Type"
                  >
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                      (bt) => (
                        <MenuItem key={bt} value={bt}>
                          {bt}
                        </MenuItem>
                      )
                    )}
                  </Select>
                  {errors.bloodType && (
                    <Typography variant="caption" color="error">
                      Blood type is required
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.location?.state}>
                  <InputLabel>State</InputLabel>
                  <Select
                    label="State"
                    {...register("location.state", { required: true })}
                    defaultValue=""
                  >
                    {states.map((state) => (
                      <MenuItem key={state.isoCode} value={state.name}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.location?.state && (
                    <Typography variant="caption" color="error">
                      State is required
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.location?.city}>
                  <InputLabel>City</InputLabel>
                  <Select
                    label="City"
                    {...register("location.city", { required: true })}
                    defaultValue="" 
                    disabled={!selectedStateCode}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city.name} value={city.name}>
                        {city.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.location?.city && (
                    <Typography variant="caption" color="error">
                      City is required
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              
            </Grid>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 4,
                py: 1.5,
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#B71C1C",
                },
              }}
            >
              Submit
            </Button>

            <Typography align="center" sx={{ mt: 2 }}>
              Already have an account?{" "}
              <Button
                component={RouterLink}
                to="/signin"
                size="small"
                sx={{
                  color: "primary.main",
                  textTransform: "none",
                  fontWeight: "bold",
                  p: 0,
                  minWidth: 0,
                }}
              >
                Login Here
              </Button>
            </Typography>

            <Typography align="center">
              Forgot password?{" "}
              <Button
                component={RouterLink}
                to="/reset-password-link"
                size="small"
                sx={{
                  color: "primary.main",
                  textTransform: "none",
                  fontWeight: "bold",
                  p: 0,
                  minWidth: 0,
                }}
              >
                Click Here
              </Button>
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default UserSignUp;
