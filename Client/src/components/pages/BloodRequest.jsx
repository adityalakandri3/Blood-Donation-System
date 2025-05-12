import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  MenuItem,
  Grid,
  Paper,
  Alert,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useCreateBloodRequestMutation } from "../../hooks/react-query/query-hooks/bloodRequest";
import bannerImage from "../../assets/requested.jpg";
import { City, State } from "country-state-city";

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
    h4: {
      fontWeight: 700,
      color: "#D32F2F",
    },
  },
});

const BloodRequest = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm();

  const { mutate, isError, error } = useCreateBloodRequestMutation();
  
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
    }, [selectedStateCode, setValue,states]);

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
    mutate(data);
    reset();
  };
  

  return (
    <ThemeProvider theme={theme}>
      {/* Banner */}
      <Box
        sx={{
          background: `url(${bannerImage}) center/cover no-repeat`,
          minHeight: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
          px: 2,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ letterSpacing: 2 }}>
            NEED BLOOD?
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: "bold", mt: 2 }}>
            Your Blood Needs Are Our Priority.
          </Typography>
        </Box>
      </Box>

      {/* Form Section */}
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "background.default",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 3,
              backgroundColor: "background.paper",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ mb: 4 }}
            >
              Request Emergency Blood
            </Typography>

            {isError && (
              <Alert severity="error" sx={{ mb: 3, fontSize: '1rem' }}>
                {error?.response?.data?.message ||
                  "You need to be a recipient to request the blood."}
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Grid container spacing={2}>
                {/* Blood Type */}
                <Grid item xs={12}>
                  <TextField
                    label="Blood Type"
                    select
                    fullWidth
                    variant="outlined"
                    {...register("bloodRequested", {
                      required: "Blood type is required",
                    })}
                    error={!!errors.bloodRequested}
                    helperText={errors.bloodRequested?.message}
                  >
                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                      (type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      )
                    )}
                  </TextField>
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
                Request Blood
              </Button>
            </form>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default BloodRequest;



