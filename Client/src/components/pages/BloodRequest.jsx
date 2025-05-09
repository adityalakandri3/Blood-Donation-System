import React from "react";
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
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useCreateBloodRequestMutation } from "../../hooks/react-query/query-hooks/bloodRequest";
import bannerImage from "../../assets/requested.jpg";

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
  } = useForm();

  const { mutate, isError, error } = useCreateBloodRequestMutation();

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

                {/* State */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="State"
                    variant="outlined"
                    fullWidth
                    {...register("location.state", {
                      required: "State is required",
                    })}
                    error={!!errors?.location?.state}
                    helperText={errors?.location?.state?.message}
                  />
                </Grid>

                {/* City */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="City"
                    variant="outlined"
                    fullWidth
                    {...register("location.city", {
                      required: "City is required",
                    })}
                    error={!!errors?.location?.city}
                    helperText={errors?.location?.city?.message}
                  />
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



