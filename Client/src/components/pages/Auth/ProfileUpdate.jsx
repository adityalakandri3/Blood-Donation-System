import React, { useEffect } from "react";
import { set, useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  MenuItem,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useProfileFetchDetails } from "../../../hooks/react-query/query-hooks/authQuery";
import { useUpdateProfile } from "../../../hooks/react-query/query-hooks/authQuery";
import { useParams } from "react-router-dom"; // For fetching the id from URL

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
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const { mutate } = useUpdateProfile();

  // Fetching and setting the form values once data is fetched
  useEffect(()=>{
    if(data){
      setValue('name',data?.data?.name)
      setValue('email',data?.data?.email)
      setValue('bloodType','')
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

              <TextField
                label="State"
                fullWidth
                margin="normal"
                {...register("location.state", { required: "State is required" })}
                error={!!errors?.location?.state}
                helperText={errors?.location?.state?.message}
              />

              <TextField
                label="City"
                fullWidth
                margin="normal"
                {...register("location.city", { required: "City is required" })}
                error={!!errors?.location?.city}
                helperText={errors?.location?.city?.message}
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
