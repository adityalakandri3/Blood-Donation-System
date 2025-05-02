import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography, Paper, Grid } from '@mui/material';
import { createBloodRequest } from '../Api/functions/bloodRequestApi';

const BloodRequest = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    console.log("Submitted Data:", data);

  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#121212',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          backgroundColor: '#2d2f38',
          padding: 4,
          borderRadius: 3,
          maxWidth: 800,
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
            {/* Blood Type */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Blood Type"
                variant="filled"
                fullWidth
                InputProps={{ sx: { backgroundColor: '#3a3b44', color: 'white' } }}
                InputLabelProps={{ sx: { color: 'white' } }}
                {...register('bloodRequested', { required: 'Blood type is required' })}
                error={!!errors.bloodRequested}
                helperText={errors.bloodRequested?.message}
              />
            </Grid>

            {/* State */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="State"
                variant="filled"
                fullWidth
                InputProps={{ sx: { backgroundColor: '#3a3b44', color: 'white' } }}
                InputLabelProps={{ sx: { color: 'white' } }}
                {...register('location.state', { required: 'State is required' })}
                error={!!errors.location?.state}
                helperText={errors.location?.state?.message}
              />
            </Grid>

            {/* City */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                variant="filled"
                fullWidth
                InputProps={{ sx: { backgroundColor: '#3a3b44', color: 'white' } }}
                InputLabelProps={{ sx: { color: 'white' } }}
                {...register('location.city', { required: 'City is required' })}
                error={!!errors.location?.city}
                helperText={errors.location?.city?.message}
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
              Request blood
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default BloodRequest;
