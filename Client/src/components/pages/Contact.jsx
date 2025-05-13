import React from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useContact } from "../../hooks/react-query/query-hooks/contact";

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

const Contact = () => {
  const { mutate, isLoading } = useContact();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    mutate(data,{
      onSuccess:()=>{
        reset();
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: "background.default", minHeight: "100vh", p: 10, mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 5 }}>
          Contact Us
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {/* Contact Form */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, height: "100%" }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  label="Name"
                  fullWidth
                  margin="normal"
                  {...register("name", { required: "Name is required" })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  margin="normal"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Enter a valid email",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <TextField
                  label="Subject"
                  fullWidth
                  margin="normal"
                  {...register("subject", { required: "Subject is required" })}
                  error={!!errors.subject}
                  helperText={errors.subject?.message}
                />
                <TextField
                  label="Message"
                  multiline
                  rows={4}
                  fullWidth
                  margin="normal"
                  {...register("message", { required: "Message is required" })}
                  error={!!errors.message}
                  helperText={errors.message?.message}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ mt: 2 }}
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Paper>
          </Grid>

          {/* Contact Info + Map */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Contact Information
                </Typography>
                <Typography sx={{ mb: 2 }}>📞 (+92)-304-050-9060</Typography>
                <Typography sx={{ mb: 2 }}>✉️ help@hemocell.com</Typography>
                <Typography sx={{ mb: 2 }}>📍 Kolkata, India</Typography>
                <Typography>🕒 Open 24/7</Typography>
              </Box>
              <Box sx={{ borderRadius: 2, overflow: "hidden" }}>
                <iframe
                  title="Kolkata Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.0722994326234!2d88.36389517454253!3d22.604368332942333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027713e54137a3%3A0x34ce750ea6d320ec!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1715583340994!5m2!1sen!2sin"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Contact;
