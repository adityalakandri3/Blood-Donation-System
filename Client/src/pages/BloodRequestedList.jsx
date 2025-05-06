import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  CircularProgress,
} from '@mui/material';
import { useGetAllBloodRequestsQuery } from '../hooks/react-query/query-hooks/bloodRequest';

const BloodRequestedList = () => {
  const { data, isLoading, isError, error } = useGetAllBloodRequestsQuery();

  console.log("Fetched blood requests:", data); // Debug log

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
          maxWidth: 900,
          width: '100%',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ color: 'white', fontWeight: 'bold', mb: 4, letterSpacing: 2 }}
        >
          BLOOD REQUESTED LIST
        </Typography>

        {isLoading ? (
          <Box textAlign="center" mt={4}>
            <CircularProgress sx={{ color: 'white' }} />
          </Box>
        ) : isError ? (
          <Typography align="center" sx={{ color: 'red', mt: 2 }}>
            Error: {error?.response?.data?.message || error.message}
          </Typography>
        ) : !data?.data?.length ? (
          <Typography align="center" sx={{ color: 'white', mt: 2 }}>
            No blood requests found.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {data.data.map((req, index) => (
              <Grid item xs={12} key={index}>
                <Paper
                  sx={{
                    backgroundColor: '#3a3b44',
                    padding: 2,
                    borderRadius: 2,
                    color: 'white',
                  }}
                >
                  <Typography variant="h6">
                    Blood Type: <strong>{req.bloodRequested}</strong>
                  </Typography>

                  <Typography sx={{ mt: 1 }}>
                    Location: {req.location?.city}, {req.location?.state}
                  </Typography>

                  <Divider sx={{ my: 1, backgroundColor: 'rgba(255,255,255,0.1)' }} />

                  <Typography variant="body2">
                    <strong>Recipient:</strong> {req.recipient?.name} ({req.recipient?.email})
                  </Typography>

                  {req.donor ? (
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      <strong>Donor:</strong> {req.donor?.name} ({req.donor?.email})
                    </Typography>
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{ mt: 0.5, fontStyle: 'italic', color: '#aaa' }}
                    >
                      No donor assigned yet.
                    </Typography>
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Box>
  );
};

export default BloodRequestedList;
