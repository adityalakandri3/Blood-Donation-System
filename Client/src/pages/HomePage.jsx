import React from 'react';
import { Box, Typography } from '@mui/material';
import poster from "../assets/homeimage.jpg";

const HomePage = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage: `url(${poster})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        color: '#fff',
        px: 2,
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1,
        }}
      />
      
      {/* Content */}
      <Box sx={{ zIndex: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            letterSpacing: '3px',
            textTransform: 'uppercase',
          }}
        >
          Give the Gift of Life
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            mt: 2,
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
            lineHeight: 1.2,
          }}
        >
          Your Blood Can Make
          <br />
          A Difference
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
