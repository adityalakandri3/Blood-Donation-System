import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetBloodRequestByIdForDonor, useUpdateBloodRequestforDonor } from '../../hooks/react-query/query-hooks/donor';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Paper,
  Button,
} from '@mui/material';

const UpdateRequestDonor = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetBloodRequestByIdForDonor(id);
  const { mutate: acceptRequest, isLoading: isAccepting } = useUpdateBloodRequestforDonor();

  const request = data?.data;

  const handleAccept = () => {
    const confirm = window.confirm('Are you sure you want to accept this request?');
    if (confirm) {
      acceptRequest(id);
    }
  };

  if (isLoading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress sx={{ color: '#D32F2F' }} />
      </Box>
    );
  }

  if (isError || !request) {
    return (
      <Box textAlign="center" mt={4} color="error.main">
        <Typography variant="h6">Failed to load blood request.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#fafafa',
        px: { xs: 2, md: 4 },
        py: { xs: 4, md: 6 },
        fontFamily: 'Montserrat',
      }}
    >
      <Paper
        elevation={4}
        sx={{
          maxWidth: 700,
          mx: 'auto',
          borderRadius: 4,
          p: 4,
          backgroundColor: 'white',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: '#D32F2F', fontWeight: 'bold', fontFamily: 'Montserrat' }}
        >
          Blood Request Details
        </Typography>

        <Card elevation={2} sx={{ borderRadius: 3, p: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Blood Type: <strong>{request.bloodRequested}</strong>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Location: {request.location?.city}, {request.location?.state}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Recipient Name: {request.recipient?.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Recipient Email: {request.recipient?.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Status: <strong>{request.status}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Created At: {new Date(request.createdAt).toLocaleString()}
            </Typography>

            <Box mt={4} textAlign="center">
              <Button
                variant="contained"
                color="success"
                size="large"
                onClick={()=>handleAccept(request._id)}
                disabled={isAccepting || request.status !== 'pending'}
                sx={{
                  fontWeight: 'bold',
                  fontFamily: 'Montserrat',
                  textTransform: 'uppercase',
                }}
              >
                {isAccepting ? 'Accepting...' : 'Accept Request'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Paper>
    </Box>
  );
};

export default UpdateRequestDonor;
