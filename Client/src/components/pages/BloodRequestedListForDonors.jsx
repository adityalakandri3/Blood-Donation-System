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
  Button,
} from '@mui/material';
import { useGetAllBloodRequestsForDonor } from '../../hooks/react-query/query-hooks/donor';
import { useNavigate } from 'react-router-dom';

const BloodRequestedListForDonors = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetAllBloodRequestsForDonor();


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
          backgroundColor: 'white',
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
            color: '#D32F2F',
            fontWeight: 'bold',
            mb: 4,
            letterSpacing: 2,
            textTransform: 'uppercase',
            fontFamily: 'Montserrat',
          }}
        >
          Available Blood Requests
        </Typography>

        {isLoading ? (
          <Box textAlign="center" mt={4}>
            <CircularProgress sx={{ color: '#D32F2F' }} />
          </Box>
        ) : isError ? (
          <Box
            sx={{
              p: 4,
              backgroundColor: '#ffebee',
              border: '2px solid #d32f2f',
              borderRadius: 3,
              textAlign: 'center',
              maxWidth: 500,
              mx: 'auto',
              color: '#d32f2f',
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {error?.response?.data?.message || 'An unexpected error occurred.'}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
              You need to be a donor to access this page.
            </Typography>
          </Box>
        ) : !data?.data?.length ? (
          <Typography align="center" sx={{ color: '#555', mt: 2 }}>
            No available blood requests at the moment.
          </Typography>
        ) : (
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="donor blood request table">
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  {['#', 'Blood Type', 'Location', 'Recipient', 'Status', 'Action'].map((label) => (
                    <TableCell
                      key={label}
                      sx={{
                        color: '#D32F2F',
                        fontWeight: 'bold',
                        fontFamily: 'Montserrat',
                      }}
                    >
                      {label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.data.map((req, index) => (
                  <TableRow
                    key={req._id}
                    sx={{
                      backgroundColor: '#ffffff',
                      '&:hover': { backgroundColor: '#f0f0f0' },
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{req.bloodRequested}</TableCell>
                    <TableCell>{req.location?.city}, {req.location?.state}</TableCell>
                    <TableCell>
                      {req.recipient?.name}
                      <br />
                      <Typography variant="body2" sx={{ color: '#777' }}>
                        {req.recipient?.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={req.status || 'Pending'}
                        color={req.status === 'donated' ? 'success' : 'default'}
                        size="small"
                        sx={{ fontWeight: 'bold' }}
                      />
                    </TableCell>
                    <TableCell>
                      
                        <Button
                          variant="outlined"
                          size="small"
                          color="success"
                          sx={{
                            fontWeight: 'bold',
                            fontFamily: 'Montserrat',
                            borderColor: '#2e7d32',
                            color: '#2e7d32',
                            '&:hover': {
                              backgroundColor: '#2e7d32',
                              color: '#fff',
                            },
                          }}
                          onClick={()=>navigate(`/update-request-donor/${req._id}`)}
                          
                        >
                          Update Status
                        </Button>
                      
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

export default BloodRequestedListForDonors;
