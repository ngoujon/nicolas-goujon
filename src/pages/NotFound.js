import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFound = () => {
  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#172845',
        color: 'white',
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            py: 8,
          }}
        >
          <ErrorOutlineIcon
            sx={{
              fontSize: 80,
              color: 'rgba(255, 255, 255, 0.9)',
              mb: 2,
            }}
          />
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '4rem', sm: '5rem', md: '6rem' },
              fontWeight: 700,
              fontFamily: 'Comforta',
              lineHeight: 1,
              mb: 2,
            }}
          >
            404
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontFamily: 'Garet',
              fontWeight: 500,
              mb: 2,
              opacity: 0.95,
            }}
          >
            Page introuvable
          </Typography>
          <Typography
            variant="body1"
            sx={{
              opacity: 0.85,
              mb: 4,
              maxWidth: 360,
            }}
          >
            La page que vous recherchez n'existe pas ou a été déplacée.
          </Typography>
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            startIcon={<HomeIcon />}
            sx={{
              backgroundColor: 'white',
              color: '#172845',
              fontWeight: 600,
              px: 3,
              py: 1.5,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              },
            }}
          >
            Retour à l'accueil
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound;
