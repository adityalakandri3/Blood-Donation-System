import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  CircularProgress,
  Chip,
} from '@mui/material';
import { useGetAllBloodRequestsQuery } from '../hooks/react-query/query-hooks/bloodRequest';

const BloodRequestedList = () => {
  const { data, isLoading, isError, error } = useGetAllBloodRequestsQuery();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#121212',
        px: { xs: 2, md: 4 },
        py: { xs: 4, md: 6 },
      }}
    >
      <Paper
        elevation={4}
        sx={{
          backgroundColor: '#1e1f26',
          padding: { xs: 2, md: 4 },
          borderRadius: 3,
          maxWidth: 1000,
          mx: 'auto',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            color: 'white',
            fontWeight: 'bold',
            mt: { xs: 2, md: 4 },
            mb: 4,
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}
        >
          Blood Requested List
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
          <Grid container spacing={3}>
            {data.data.map((req, index) => (
              <Grid item xs={12} key={index}>
                <Paper
                  sx={{
                    backgroundColor: '#2f313a',
                    padding: 3,
                    borderRadius: 2,
                    color: 'white',
                    position: 'relative',
                  }}
                >
                  {/* Status Chip */}
                  <Chip
                    label={req.donor ? 'Donor Assigned' : 'Pending'}
                    color={req.donor ? 'success' : 'default'}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      fontWeight: 'bold',
                      color: 'white',
                    }}
                  />

                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Blood Type:{' '}
                    <span style={{ fontWeight: 600 }}>{req.bloodRequested}</span>
                  </Typography>

                  <Typography sx={{ mb: 1 }}>
                    Location: {req.location?.city}, {req.location?.state}
                  </Typography>

                  <Divider
                    sx={{ my: 1, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  />

                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    <strong>Recipient:</strong> {req.recipient?.name} (
                    {req.recipient?.email})
                  </Typography>

                  {req.donor ? (
                    <Typography variant="body2">
                      <strong>Donor:</strong> {req.donor?.name} (
                      {req.donor?.email})
                    </Typography>
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{ fontStyle: 'italic', color: '#aaa' }}
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
