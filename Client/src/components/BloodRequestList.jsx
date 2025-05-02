import React, { useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getBloodRequests } from '../hooks/react-query/query-hooks/bloodRequest'; // Create this hook

const BloodRequestList = () => {
  const { data, isLoading, error } = useQuery('bloodRequests', getBloodRequests);

  if (isLoading) return <CircularProgress sx={{ color: '#fff' }} />;
  if (error) return <Typography sx={{ color: '#fff' }}>Error fetching data</Typography>;

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
        EMERGENCY BLOOD REQUESTS
      </Typography>

      <Paper
        elevation={5}
        sx={{
          backgroundColor: '#2d2f35',
          p: 4,
          width: '100%',
          maxWidth: 800,
          borderRadius: 2
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#fff' }}>Blood Group</TableCell>
              <TableCell sx={{ color: '#fff' }}>State</TableCell>
              <TableCell sx={{ color: '#fff' }}>City</TableCell>
              <TableCell sx={{ color: '#fff' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((request) => (
              <TableRow key={request.id}>
                <TableCell sx={{ color: '#fff' }}>{request.bloodRequested}</TableCell>
                <TableCell sx={{ color: '#fff' }}>{request.state}</TableCell>
                <TableCell sx={{ color: '#fff' }}>{request.city}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#fff',
                      color: '#000',
                      fontWeight: 'bold',
                      '&:hover': { backgroundColor: '#ddd' }
                    }}
                    onClick={() => alert(`Request ID: ${request.id}`)} // You can customize actions here
                  >
                    VIEW DETAILS
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default BloodRequestList;
