import React from 'react';
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
  Paper
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useCreateBloodRequestMutation } from '../hooks/react-query/query-hooks/bloodRequest';

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const BloodRequest = () => {
  const { handleSubmit, control } = useForm();
  const { mutate } = useCreateBloodRequestMutation();
  

  const onSubmit = (data) => {
    console.log('Blood request data:', data);

    

  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#111',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: '#fff',
          letterSpacing: 2,
          textAlign: 'center',
          mb: 4
        }}
      >
        REQUEST FOR EMERGENCY BLOOD
      </Typography>

      <Paper
        elevation={5}
        sx={{
          backgroundColor: '#2d2f35',
          p: 4,
          width: '100%',
          maxWidth: 600,
          borderRadius: 2
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="bloodRequested"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    select
                    label="Blood Group"
                    fullWidth
                    required
                    {...field}
                    InputLabelProps={{ style: { color: '#ccc' } }}
                    InputProps={{ style: { color: '#fff' } }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#555' },
                        '&:hover fieldset': { borderColor: '#888' }
                      }
                    }}
                  >
                    {bloodGroups.map((group) => (
                      <MenuItem key={group} value={group}>
                        {group}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="state"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    label="State"
                    fullWidth
                    required
                    {...field}
                    InputLabelProps={{ style: { color: '#ccc' } }}
                    InputProps={{ style: { color: '#fff' } }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="city"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    label="City"
                    fullWidth
                    required
                    {...field}
                    InputLabelProps={{ style: { color: '#ccc' } }}
                    InputProps={{ style: { color: '#fff' } }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: '#fff',
                  color: '#000',
                  fontWeight: 'bold',
                  '&:hover': { backgroundColor: '#ddd' }
                }}
              >
                SUBMIT BLOOD REQUEST
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default BloodRequest;
