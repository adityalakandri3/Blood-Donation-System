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
import { useGetAllBloodCampQuery } from '../../hooks/react-query/query-hooks/bloodCamp';

const BloodCampList = () => {
  const { data, isLoading, isError, error } = useGetAllBloodCampQuery();

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
          Blood Camp List
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
            No camps found.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {data.data.map((camp, index) => (
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
                  {/* Status */}
                  <Chip
                    label={camp.status}
                    color={
                      camp.status === 'completed'
                        ? 'success'
                        : camp.status === 'ongoing'
                        ? 'primary'
                        : camp.status === 'cancelled'
                        ? 'error'
                        : 'default'
                    }
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      fontWeight: 'bold',
                      color: 'white',
                    }}
                  />

                  {/* Title */}
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {camp.name}
                  </Typography>

                  {/* Date */}
                  <Typography sx={{ mb: 1 }}>
                    Date:{' '}
                    {new Date(camp.date).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </Typography>

                  {/* Location */}
                  <Typography sx={{ mb: 1 }}>
                    Location: {camp.location?.city}, {camp.location?.state}
                  </Typography>

                  {/* Contact */}
                  <Typography sx={{ mb: 1 }}>
                    Contact: {camp.contactNumber}
                  </Typography>

                  {/* Description */}
                  <Typography sx={{ mb: 1 }}>
                    Description: {camp.description}
                  </Typography>

                  {/* Image Preview */}
                  {camp.image && (
                    <Box
                      component="img"
                      src={`http://localhost:3006/${camp.image.replace(/\\/g, '/')}`}
                      alt="camp"
                      sx={{
                        width: '100%',
                        maxHeight: 200,
                        objectFit: 'cover',
                        borderRadius: 2,
                        mt: 2,
                      }}
                    />
                  )}

                  <Divider
                    sx={{ my: 2, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  />

                  {/* Organizer */}
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    <strong>Organizer:</strong>{' '}
                    {camp.organizer?.name || camp.organizer?._id}
                  </Typography>

                  {/* Created At */}
                  <Typography variant="caption" sx={{ color: '#aaa' }}>
                    Created at:{' '}
                    {new Date(camp.createdAt).toLocaleString()}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Box>
  );
};

export default BloodCampList;
