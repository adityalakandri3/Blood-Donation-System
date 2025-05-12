import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  MenuItem,
  Grid,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useProfileFetchDetails } from "../../../hooks/react-query/query-hooks/authQuery";
import { useUpdateProfile } from "../../../hooks/react-query/query-hooks/authQuery";
import { useParams } from "react-router-dom"; // For fetching the id from URL
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
    h5: {
      fontWeight: 700,
      color: "#D32F2F",
    },
  },
});

const bloodTypes = [
  "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
];

const ProfileUpdate = () => {
  const { id } = useParams(); // Get id from URL params
  const { data, isLoading, isError } = useProfileFetchDetails(id);
  const { register, handleSubmit, formState: { errors },watch, setValue } = useForm();

  const { mutate } = useUpdateProfile();
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
            }
          }
        }, [selectedStateCode, states]);

  // Fetching and setting the form values once data is fetched
  useEffect(()=>{
    if(data){
      setValue('name',data?.data?.name)
      setValue('email',data?.data?.email)
      setValue('bloodType',data?.data?.bloodType)
      setValue('location.state',data?.data?.location.state)
      setValue('location.city',data?.data?.location.city)
    }
  },[data,setValue]);

  // Handling form submission
  const onSubmit = (data) => {
    console.log("Updated profile data:", data);
    mutate({ id, data }); 
  };

  // Loading or Error States Handling
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching profile details</div>;

  // Rendering the form once data is loaded
  return (
   <>
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
            Update Profile
          </Typography>
          {/* Only show the form after the data is successfully fetched */}
          {data?.data && (
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                {...register("name", { required: "Name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />

              <TextField
                label="Email"
                fullWidth
                margin="normal"
                disabled
                {...register("email")}
              />

              <TextField
                select
                label="Blood Type"
                fullWidth
                margin="normal"
                value={watch("bloodType") || ""} 
                {...register("bloodType", { required: "Blood type is required" })}
                error={!!errors.bloodType}
                helperText={errors.bloodType?.message}
              >
                {bloodTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>

              <Grid item xs={12} sm={6}sx ={{mb:1}}>
                <FormControl fullWidth error={!!errors.location?.state}>
                  <InputLabel>State</InputLabel>
                  <Select
                    label="State"
                    value={watch("location.state") || ""} 
                    {...register("location.state", { required: true })}
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
                    value={watch("location.city") || ""} 
                    {...register("location.city", { required: true })}
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
                Save Changes
              </Button>
            </Box>
          )}
        </Container>
      </Box>
    </ThemeProvider>
   </>
  );
};

export default ProfileUpdate;
