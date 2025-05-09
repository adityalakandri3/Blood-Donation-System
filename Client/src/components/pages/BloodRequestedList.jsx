import React from 'react';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import { useGetAllBloodRequestsQuery } from '../../hooks/react-query/query-hooks/bloodRequest';

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
          maxWidth: 1200,
          mx: 'auto',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            color: 'white',
            fontWeight: 'bold',
            mt:6,
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
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="blood request table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>#</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Blood Type</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Location</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Recipient</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Donor</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.data.map((req, index) => (
                  <TableRow
                    key={index}
                    sx={{ backgroundColor: '#2f313a', '&:hover': { backgroundColor: '#3a3c45' } }}
                  >
                    <TableCell sx={{ color: 'white' }}>{index + 1}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{req.bloodRequested}</TableCell>
                    <TableCell sx={{ color: 'white' }}>
                      {req.location?.city}, {req.location?.state}
                    </TableCell>
                    <TableCell sx={{ color: 'white' }}>
                      {req.recipient?.name} <br />
                      <Typography variant="body2" sx={{ color: '#aaa' }}>
                        {req.recipient?.email}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ color: 'white' }}>
                      {req.donor ? (
                        <>
                          {req.donor?.name}
                          <br />
                          <Typography variant="body2" sx={{ color: '#aaa' }}>
                            {req.donor?.email}
                          </Typography>
                        </>
                      ) : (
                        <Typography sx={{ fontStyle: 'italic', color: '#aaa' }}>
                          Not assigned
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={req.donor ? 'Donor Assigned' : 'Pending'}
                        color={req.donor ? 'success' : 'default'}
                        size="small"
                        sx={{ fontWeight: 'bold' }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
};

export default BloodRequestedList;
