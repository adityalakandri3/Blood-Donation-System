import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  CardMedia,
  CircularProgress,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { useGetBloodCampById, useCancelRegistration } from '../../hooks/react-query/query-hooks/bloodCamp';

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

const CancelRegistration = () => {
  const { id } = useParams(); 
  const { data, isLoading, isError } = useGetBloodCampById(id);
  const { mutate: cancelRegistration, isLoading: isCancelling } = useCancelRegistration();

  const handleCancel = () => {
    cancelRegistration(id);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (isError || !data?.data) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6" color="error">
          Failed to load camp details.
        </Typography>
      </Box>
    );
  }

  const camp = data.data;

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: 'background.default',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4,
          px: 2,
        }}
      >
        <Card
          sx={{
            maxWidth: 1000,
            width: '100%',
            backgroundColor: 'background.paper',
            borderRadius: 3,
            boxShadow: 4,
          }}
        >
          <CardMedia
            component="img"
            height="250"
            image={`http://localhost:3006/${camp.image.replace(/\\/g, "/")}`}
            alt="Blood Camp"
          />

          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography variant="h4" gutterBottom color="primary">
              Cancel Registration for {camp.name}
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              Organized by: <strong>{camp.organizer?.name || 'Unknown'}</strong>
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Date: {new Date(camp.date).toLocaleDateString()}
              <br />
              Location: {camp.location?.address}, {camp.location?.city}, {camp.location?.state}
              <br />
              Contact: +91-{camp.contactNumber}
              <br />
              Status: {camp.status?.toUpperCase()}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body1" sx={{ mb: 3 }}>
              {camp.description}
            </Typography>

            <Box textAlign="center">
              <Button
                variant="outlined"
                color="error"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  borderRadius: 2,
                  mt: 2,
                }}
                onClick={handleCancel}
                disabled={isCancelling}
              >
                {isCancelling ? 'Cancelling...' : 'Cancel Registration'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default CancelRegistration;
