import React from "react";
import {
  useDashboard,
  useLogout,
} from "../../../hooks/react-query/query-hooks/authQuery";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Divider,
  Grid,
  Button,
} from "@mui/material";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { data } = useDashboard();
  const navigate = useNavigate();
  const user = data?.data;

  const logout = useLogout();

  return (
    <Box sx={{ mt: 15, mb: 5, px: 3 }}>
      <Card
        sx={{
          maxWidth: 600,
          mx: "auto",
          borderRadius: 3,
          boxShadow: 3,
          p: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Avatar
            sx={{ width: 64, height: 64, mr: 2, bgcolor: "red" }}
            src="/assets/profile.webp"
          />
          <Box>
            <Typography variant="h5">{user?.name}</Typography>
            <Typography color="text.secondary">{user?.role}</Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <EmailIcon sx={{ mr: 1 }} />
              <Typography>{user?.email}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <BloodtypeIcon sx={{ mr: 1 }} />
              <Typography>Blood Type: {user?.bloodType}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LocationOnIcon sx={{ mr: 1 }} />
              <Typography>
                {user?.location?.city}, {user?.location?.state}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 1 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/bloodrequestlist")}
          >
            My Requests
          </Button>

          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate(`/update-password`)}
          >
            Update Password
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate(`/edit-user/${user?.id}`)}
          >
            Update Profile
          </Button>

          <Button variant="outlined" color="error" onClick={logout}>
            Logout
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default Profile;
