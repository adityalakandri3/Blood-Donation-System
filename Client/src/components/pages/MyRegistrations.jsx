import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Chip,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMyRegistrations } from "../../hooks/react-query/query-hooks/bloodCamp";
import { useNavigate } from "react-router-dom";

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
    h6: {
      fontWeight: 700,
      color: "#D32F2F",
    },
  },
});

const MyRegistrations = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useMyRegistrations();
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "background.default",
          py: 4,
          px: { xs: 2, md: 6 },
        }}
      >
        <Typography variant="h4" align="center" gutterBottom color="primary">
          My Blood Camp Registrations
        </Typography>

        {isLoading ? (
          <Box textAlign="center" mt={4}>
            <CircularProgress color="primary" />
          </Box>
        ) : isError ? (
            <Box display="flex" justifyContent="center" mt={4}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                maxWidth: 500,
                textAlign: 'center',
                backgroundColor: 'background.paper',
                borderRadius: 3,
              }}
            >
              <Typography variant="h5" color="primary" gutterBottom>
                No Registrations Found
              </Typography>
              <Typography variant="body1" color="text.secondary">
                You haven’t registered for any blood camps yet. Check the available camps and register to contribute!
              </Typography>
            </Paper>
          </Box>
        ) : !data?.data?.length ? (
            <Box display="flex" justifyContent="center" mt={4}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                maxWidth: 500,
                textAlign: 'center',
                backgroundColor: 'background.paper',
                borderRadius: 3,
              }}
            >
              <Typography variant="h5" color="primary" gutterBottom>
                No Registrations Found
              </Typography>
              <Typography variant="body1" color="text.secondary">
                You havent registered for any blood camps yet. Check the available camps and register to contribute!
              </Typography>
            </Paper>
          </Box>
        ) : (
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Camp Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Date</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Location</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Status</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Registered At</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Action</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.data.map((registration) => {
                  const camp = registration.camp;
                  return (
                    <TableRow key={registration._id}>
                      <TableCell>{camp?.name}</TableCell>
                      <TableCell>
                        {new Date(camp?.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {camp?.location?.city}, {camp?.location?.state}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={registration.status}
                          color={
                            registration.status === "registered"
                              ? "primary"
                              : registration.status === "cancelled"
                              ? "error"
                              : "default"
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(registration.registeredAt).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {registration.status === "registered" && (
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() =>
                              navigate(
                                `/my-registrations/cancel-registration/${camp._id}`
                              )
                            }
                          >
                            Cancel
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default MyRegistrations;
