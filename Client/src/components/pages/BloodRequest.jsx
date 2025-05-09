import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  MenuItem
} from '@mui/material';
import { useCreateBloodRequestMutation } from '../../hooks/react-query/query-hooks/bloodRequest';
import bannerImage from '../../assets/requested.jpg'; 

const BloodRequest = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { mutate } = useCreateBloodRequestMutation();

  const onSubmit = async (data) => {
    console.log("Submitted Data:", data);
    mutate(data);
    reset();
  };

  return (
    <>
      {/* Banner Section */}
      <Box
        sx={{
          background: `url(${bannerImage}) center/cover no-repeat`,
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
          px: 2,
        }}
      >
        <Typography variant="h6" sx={{ letterSpacing: 2 }}>
          NEED BLOOD?
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mt: 2 }}>
          Your Blood Needs Are Our Priority.
        </Typography>
      </Box>

      {/* Form Section */}
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#1a1a1a', // slightly lighter than black
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            backgroundColor: 'rgba(58, 61, 71, 0.95)', // lighter form bg
            padding: 4,
            borderRadius: 3,
            maxWidth: 700,
            width: '100%',
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{ color: 'white', fontWeight: 'bold', mb: 4, letterSpacing: 2 }}
          >
            REQUEST FOR EMERGENCY BLOOD
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {/* Blood Type Dropdown */}
              <Grid item xs={12}>
                <TextField
                  label="Blood Type"
                  select
                  variant="filled"
                  fullWidth
                  InputProps={{ sx: { backgroundColor: '#5A5F6A', color: 'white' } }}
                  InputLabelProps={{ sx: { color: 'white' } }}
                  {...register('bloodRequested', { required: 'Blood type is required' })}
                  error={!!errors.bloodRequested}
                  helperText={errors.bloodRequested?.message}
                >
                  {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Location - State */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="State"
                  variant="filled"
                  fullWidth
                  InputProps={{ sx: { backgroundColor: '#5A5F6A', color: 'white' } }}
                  InputLabelProps={{ sx: { color: 'white' } }}
                  {...register('location.state', { required: 'State is required' })}
                  error={!!errors?.location?.state}
                  helperText={errors?.location?.state?.message}
                />
              </Grid>

              {/* Location - City */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="City"
                  variant="filled"
                  fullWidth
                  InputProps={{ sx: { backgroundColor: '#5A5F6A', color: 'white' } }}
                  InputLabelProps={{ sx: { color: 'white' } }}
                  {...register('location.city', { required: 'City is required' })}
                  error={!!errors?.location?.city}
                  helperText={errors?.location?.city?.message}
                />
              </Grid>
            </Grid>

            <Box textAlign="center" mt={4}>
              <Button
                variant="contained"
                color="error"
                type="submit"
                sx={{
                  paddingX: 4,
                  paddingY: 1,
                  borderRadius: 2,
                  fontWeight: 'bold',
                }}
              >
                Request Blood
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default BloodRequest;
