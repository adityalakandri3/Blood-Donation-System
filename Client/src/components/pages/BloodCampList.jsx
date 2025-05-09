import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  CircularProgress,
  Chip,
  Button,
} from "@mui/material";
import { useGetAllBloodCampQuery } from "../../hooks/react-query/query-hooks/bloodCamp";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#D32F2F", // Deep red
      contrastText: "#fff",
    },
    secondary: {
      main: "#00a152",
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

const BloodCampList = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetAllBloodCampQuery();

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "background.default",
          px: { xs: 2, md: 4 },
          py: { xs: 4, md: 6 },
        }}
      >
        <Paper
          elevation={4}
          sx={{
            backgroundColor: "background.paper",
            padding: { xs: 2, md: 4 },
            borderRadius: 3,
            maxWidth: 1000,
            mx: "auto",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            mb={3}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "primary.main",
              }}
            >
              Blood Camp List
            </Typography>

            <Button
              variant="outlined"
              color="primary"
              sx={{ mt: { xs: 2, md: 0 }, ml: { xs: 0, md: "auto" } }}
              onClick={() => navigate("/my-registrations")}
            >
              My Registrations
            </Button>
          </Box>

          {isLoading ? (
            <Box textAlign="center" mt={4}>
              <CircularProgress color="primary" />
            </Box>
          ) : isError ? (
            <Typography align="center" sx={{ color: "error.main", mt: 2 }}>
              Error: {error?.response?.data?.message || error.message}
            </Typography>
          ) : !data?.data?.length ? (
            <Typography align="center" sx={{ mt: 2 }}>
              No camps found.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {data.data.map((camp, index) => (
                <Grid item xs={12} key={index}>
                  <Paper
                    sx={{
                      backgroundColor: "#f9f9f9",
                      padding: 3,
                      borderRadius: 2,
                      position: "relative",
                    }}
                  >
                    <Chip
                      label={camp.status}
                      color={
                        camp.status === "completed"
                          ? "secondary"
                          : camp.status === "upcoming"
                          ? "secondary"
                          : camp.status === "cancelled"
                          ? "primary"
                          : "default"
                      }
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                    />

                    <Grid container spacing={2}>
                      {/* Image */}
                      {camp.image && (
                        <Grid item xs={12} md={4}>
                          <Box
                            component="img"
                            src={`http://localhost:3006/${camp.image.replace(
                              /\\/g,
                              "/"
                            )}`}
                            alt="camp"
                            sx={{
                              width: "100%",
                              height: "100%",
                              maxHeight: 200,
                              objectFit: "cover",
                              borderRadius: 2,
                            }}
                          />
                        </Grid>
                      )}

                      {/* Details */}
                      <Grid item xs={12} md={8}>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold", mb: 1 }}
                        >
                          {camp.name}
                        </Typography>

                        <Typography sx={{ mb: 1 }}>
                          <strong>Date:</strong>{" "}
                          {new Date(camp.date).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </Typography>

                        <Typography sx={{ mb: 1 }}>
                          <strong>Location:</strong> {camp.location?.city},{" "}
                          {camp.location?.state}
                        </Typography>

                        <Typography sx={{ mb: 1 }}>
                          <strong>Contact:</strong> {camp.contactNumber}
                        </Typography>

                        <Typography sx={{ mb: 1 }}>
                          <strong>Description:</strong> {camp.description}
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                          <strong>Organizer:</strong>{" "}
                          {camp.organizer?.name || camp.organizer?._id}
                        </Typography>

                        <Typography variant="caption" sx={{ color: "#666" }}>
                          Created at:{" "}
                          {new Date(camp.createdAt).toLocaleString()}
                        </Typography>

                        <Box mt={2}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate(`/blood-camp/${camp._id}`)}
                          >
                            Show Camp
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default BloodCampList;
