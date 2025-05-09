import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useScrollTrigger,
  Slide,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink, Link as RouterLink } from "react-router-dom";
import logo from "../../assets/logo.png.svg";
import profileImage from "../../assets/profile.webp";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Blood Drive Camp", href: "/blood-camp-list" },
  { name: "Help Needed", href: "/contact" },
  { name: "Need Blood", href: "/create-blood-request", secondLast: true },
  { name: "Donate Blood", href: "/get-blood-request-donor", last: true },
];

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = (open) => () => setMobileOpen(open);

  return (
    <>
      <HideOnScroll>
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: "transparent",
            backdropFilter: "blur(10px)",
            boxShadow: "none",
            borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
            color: "#fff",
          }}
        >
          <Toolbar
            sx={{
              maxWidth: 1250,
              mx: "auto",
              width: "100%",
              minHeight: { xs: 72, md: 88 },
              px: { xs: 2, sm: 3 },
            }}
          >
            {/* Logo */}
            <RouterLink
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <img
                src={logo}
                alt="HemoCell Logo"
                style={{ height: 42, marginRight: 12 }}
              />
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "black" }}
              >
                Hemo
                <Box component="span" sx={{ color: "red" }}>
                  Cell
                </Box>
              </Typography>
            </RouterLink>

            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop Menu */}
            <Box
              sx={{
                display: { xs: "none", lg: "flex" },
                gap: 2,
                alignItems: "center",
              }}
            >
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  component={NavLink}
                  to={item.href}
                  sx={{
                    color: item.last ? "white" : "black",
                    textTransform: "none",
                    fontSize: "1rem",
                    px: 2,
                    py: 1.2,
                    borderRadius: "8px",
                    border: item.secondLast
                      ? "1px solid rgba(5, 5, 5, 0.6)"
                      : "none",
                    backgroundColor: item.last ? "#4a0000" : "transparent",
                    "&:hover": {
                      backgroundColor: item.last
                        ? "rgba(28, 27, 27, 0.2)"
                        : "rgba(255,255,255,0.2)",
                      color: item.last ? "black" : "rgba(5, 5, 5, 0.69)",
                      border: item.secondLast
                        ? "1px solid rgba(11, 11, 11, 0.75)"
                        : "none",
                    },
                  }}
                >
                  {item.name}
                </Button>
              ))}

              {/* Static Profile Icon */}
              <IconButton component={RouterLink} to="/profile" sx={{ p: 0 }}>
                <img
                  src={profileImage}
                  alt="Profile"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </IconButton>
            </Box>

            {/* Mobile Menu Icon */}
            <IconButton
              color="inherit"
              edge="end"
              onClick={toggleDrawer(true)}
              sx={{ display: { lg: "none" } }}
            >
              <MenuIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ p: 2, width: "80vw" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <RouterLink
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <img
                src={logo}
                alt="HemoCell Logo"
                style={{ height: 36, marginRight: 8 }}
              />
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "black" }}
              >
                Hemo
                <Box component="span" sx={{ color: "red" }}>
                  Cell
                </Box>
              </Typography>
            </RouterLink>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List sx={{ mt: 4 }}>
            {navigation.map((item) => (
              <ListItem
                button
                key={item.name}
                component={NavLink}
                to={item.href}
                onClick={toggleDrawer(false)}
                sx={{
                  mb: 1,
                  borderRadius: 1,
                  fontSize: "1.1rem",
                  py: 1.4,
                  color: item.last ? "white" : "black",
                  bgcolor: item.last ? "#4a0000" : "transparent",
                  border: item.secondLast
                    ? "1px solid rgba(0,0,0,0.5)"
                    : "none",
                  "&:hover": {
                    backgroundColor: item.last ? "white" : "black",
                    color: item.last ? "black" : "white",
                  },
                }}
              >
                <ListItemText primary={item.name} />
              </ListItem>
            ))}

            {/* Static Profile Redirect in Mobile */}
            <ListItem
              button
              component={RouterLink}
              to="/signin"
              onClick={toggleDrawer(false)}
              sx={{
                mt: 2,
                borderRadius: 1,
                fontSize: "1.1rem",
                py: 1.4,
                bgcolor: "#f5f5f5",
                color: "#000",
              }}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <img
                  src={profileImage}
                  alt="Profile"
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <ListItemText primary="Sign In" />
              </Box>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
