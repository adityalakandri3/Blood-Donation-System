import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  CardMedia,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grow,
} from '@mui/material';
import poster from '../../assets/homeimage.jpg';
import donateImg from '../../assets/Card1.jpg';
import requestImg from '../../assets/Cards2.jpg';
import ribbonImage from '../../assets/requested.jpg';
import banImage from '../../assets/ban.jpg';
import ban2Image from '../../assets/ban2.jpg';
import lastImage from '../../assets/lastimg.jpg';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const HomePage = () => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true); // Trigger animation on mount
  }, []);

  return (
    <Grow in={checked} timeout={600}>
      <Box sx={{ fontFamily: "'Montserrat', sans-serif" }}>
        {/* Hero Section */}
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

        {/* Cards Section */}
        <Box sx={{ maxWidth: 1200, mx: 'auto', my: 8, px: 2 }}>
          <Grid container spacing={4}>
            {[
              {
                img: donateImg,
                subtitle: 'SAVE A LIFE TODAY',
                title: 'Donate Blood At HemoCell',
                btnText: 'Donate blood',
                btnHref: '/bloodrequestlist',
              },
              {
                img: requestImg,
                subtitle: 'URGENT NEED FOR BLOOD',
                title: 'Request For Blood Donation',
                btnText: 'Request blood',
                btnHref: '/bloodrequest',
              },
            ].map((card, idx) => (
              <Grid item xs={12} md={6} key={idx}>
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: 3,
                    overflow: 'hidden',
                    height: { xs: 300, md: 350 },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={card.img}
                    alt={card.title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'brightness(60%)',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      color: '#fff',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      p: 4,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        mb: 1,
                        fontSize: '0.9rem',
                      }}
                    >
                      {card.subtitle}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 'bold',
                        mb: 3,
                        fontSize: '1.8rem',
                      }}
                    >
                      {card.title}
                    </Typography>
                    <Button
                      href={card.btnHref}
                      variant="contained"
                      sx={{
                        backgroundColor: '#fff',
                        color: '#000',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        '&:hover': {
                          backgroundColor: '#e0e0e0',
                        },
                      }}
                    >
                      {card.btnText}
                    </Button>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Step-By-Step Guide To Donating Blood */}
        <Box sx={{ maxWidth: 1200, mx: 'auto', my: 10, px: 2 }}>
          <Typography
            variant="h4"
            align="center"
            sx={{ fontWeight: 'bold', mb: 4 }}
          >
            Step-By-Step Guide To Donating Blood
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                title: '1. Registration',
                description:
                  'Sign in and provide basic information such as ID and health history.',
              },
              {
                title: '2. Health Check',
                description:
                  'Our medical team checks your temperature, blood pressure, and hemoglobin.',
              },
              {
                title: '3. Donation',
                description: 'The blood donation itself takes about 8-10 minutes.',
              },
              {
                title: '4. Relax & Refresh',
                description:
                  'After donating, relax and enjoy refreshments before leaving.',
              },
            ].map((step, index) => (
              <Grid item xs={12} md={3} key={index}>
                <Box
                  sx={{
                    p: 2,
                    border: '1px solid #ddd',
                    borderRadius: 2,
                    height: '100%',
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {step.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Donate Blood With HemoCell Section */}
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2, pb: 10 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={ribbonImage}
                alt="Blood Donation Ribbon"
                sx={{ width: '100%', borderRadius: 2 }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle2"
                sx={{
                  textTransform: 'uppercase',
                  color: '#8b0000',
                  fontWeight: 600,
                  letterSpacing: 1,
                  mb: 1,
                }}
              >
                Save Lives Today
              </Typography>

              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                Donate Blood With HemoCell
              </Typography>

              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                Our mission is to create a community of donors who make a
                difference in the lives of others. We prioritize the safety
                and comfort of our donors and patients, and provide the
                highest quality of care to ensure an easy and convenient
                donation process. Join us in our life-saving mission.
              </Typography>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#3c0000',
                  color: '#fff',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: '#5c0000',
                  },
                }}
                href="/bloodrequest"
              >
                Donate Now
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            maxWidth: 1200,
            mx: 'auto',
            px: 2,
            mb: 10,
          }}
        >
          <Box
            sx={{
              backgroundImage: `url(${banImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: 2,
              position: 'relative',
              color: '#fff',
              p: { xs: 4, sm: 6 },
              minHeight: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: 2,
                zIndex: 1,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontStyle: 'italic',
                fontWeight: 400,
                lineHeight: 1.6,
                maxWidth: 800,
                zIndex: 2,
              }}
            >
              “The blood you donate gives someone another chance at life.
              <br />
              One day that someone may be a close relative, a friend, a loved
              one—or even you.”
            </Typography>
          </Box>
        </Box>

        {/* Why Should You Donate Blood Section */}
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2, mb: 10 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={ban2Image}
                alt="Why Donate Blood"
                sx={{ width: '100%', borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle2"
                sx={{
                  textTransform: 'uppercase',
                  color: '#6b0000',
                  fontWeight: 600,
                  letterSpacing: 1,
                  mb: 1,
                }}
              >
                Donate Blood Today
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                Why Should You Donate Blood?
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: 'text.secondary', mb: 3, fontSize: '1rem' }}
              >
                Donating blood is a simple, safe way to save lives. Your
                donation can help trauma victims, surgical patients, people
                with cancer, and those with chronic illnesses. It also
                benefits your own health by stimulating blood cell
                production and improving cardiovascular health.
              </Typography>
              <List dense>
                {[
                  'Help save lives in emergencies and disasters.',
                  'Support patients undergoing surgery and treatments.',
                  'Contribute to a healthier community.',
                ].map((text, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <RadioButtonUncheckedIcon
                        sx={{ color: '#a00000', fontSize: 16 }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Box>

        {/* Final Section */}
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2, mb: 8 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={lastImage}
                alt="Last Section"
                sx={{ width: '100%', borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                sx={{ fontWeight: 'bold', mb: 2, color: '#8b0000' }}
              >
                Join Us Today
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Become part of our life-saving community. Register now and help
                make a difference by donating blood or requesting it when
                needed.
              </Typography>
              <Button
                href="/register"
                variant="contained"
                sx={{
                  backgroundColor: '#8b0000',
                  color: '#fff',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: '#a00000',
                  },
                }}
              >
                Get Started
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grow>
  );
};

export default HomePage;
