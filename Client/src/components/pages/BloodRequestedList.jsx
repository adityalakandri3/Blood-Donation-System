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
import { useDeleteBloodRequestMutation, useGetAllBloodRequestsQuery } from '../../hooks/react-query/query-hooks/bloodRequest';
import bloodRequestImage from '../../assets/blood-request-01.jpg';
import { useNavigate } from 'react-router-dom';

const BloodRequestedList = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetAllBloodRequestsQuery();

  const {mutate}= useDeleteBloodRequestMutation();

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blood request?");
    if (confirmDelete) {
      mutate(id);
    }
  }

  return (
    <>
      {/* Header Image Banner */}
      <Box
        sx={{
          background: `url(${bloodRequestImage}) center/cover no-repeat`,
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          px: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Montserrat',
            letterSpacing: 2,
            color: '#D32F2F',
            fontWeight: 'bold',
          }}
        >
          NEED BLOOD?
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            mt: 2,
            fontFamily: 'Montserrat',
            color: '#D32F2F',
          }}
        >
          Your Blood Needs Are Our Priority.
        </Typography>
      </Box>

      {/* Blood Request List Table */}
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
            Blood Requested List
          </Typography>

          {isLoading ? (
            <Box textAlign="center" mt={4}>
              <CircularProgress sx={{ color: '#D32F2F' }} />
            </Box>
          ) : isError ? (
            <Typography align="center" sx={{ color: 'red', mt: 2 }}>
              Error: {error?.response?.data?.message || error.message}
            </Typography>
          ) : !data?.data?.length ? (
            <Typography align="center" sx={{ color: '#555', mt: 2 }}>
              No blood requests found.
            </Typography>
          ) : (
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
              <Table sx={{ minWidth: 650 }} aria-label="blood request table">
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableRow>
                    {['#', 'Blood Type', 'Location', 'Recipient', 'Donor', 'Status', 'Update Request'].map(
                      (label) => (
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
                      )
                    )}
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
                      <TableCell sx={{ color: '#333' }}>{index + 1}</TableCell>
                      <TableCell sx={{ color: '#333' }}>{req.bloodRequested}</TableCell>
                      <TableCell sx={{ color: '#333' }}>
                        {req.location?.city}, {req.location?.state}
                      </TableCell>
                      <TableCell sx={{ color: '#333' }}>
                        {req.recipient?.name}
                        <br />
                        <Typography variant="body2" sx={{ color: '#777' }}>
                          {req.recipient?.email}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ color: '#333' }}>
                        {req.donor ? (
                          <>
                            {req.donor?.name}
                            <br />
                            <Typography variant="body2" sx={{ color: '#777' }}>
                              {req.donor?.email}
                            </Typography>
                          </>
                        ) : (
                          <Typography sx={{ fontStyle: 'italic', color: '#999' }}>
                            Not assigned
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={req.donor ? 'Donor Assigned' : 'Pending'}
                          color={req.donor ? 'success' : 'default'}
                          size="small"
                          sx={{
                            fontWeight: 'bold',
                            fontFamily: 'Montserrat',
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          sx={{
                            fontWeight: 'bold',
                            fontFamily: 'Montserrat',
                            borderColor: '#D32F2F',
                            color: '#D32F2F',
                            '&:hover': {
                              backgroundColor: '#D32F2F',
                              color: '#fff',
                              borderColor: '#D32F2F',
                            },
                          }}
                          onClick={() => navigate(`/update-bloodrequest/${req._id}`)}
                        >
                          Update
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          color="error"
                          sx={{
                            mx:2,
                            fontWeight: 'bold',
                            fontFamily: 'Montserrat',
                            border: '1px solid #D32F2F',
                            color: '#fff',
                            '&:hover': {
                              backgroundColor: '#fff',
                              color: '#D32F2F',
                              border:  ' 1px solid #D32F2F',
                            },
                          }}
                          onClick={() => handleDelete(req._id)}
                        >
                          Delete
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
    </>
  );
};

export default BloodRequestedList;
