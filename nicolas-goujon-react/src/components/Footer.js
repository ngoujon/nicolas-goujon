import React from 'react';
import { Box, Container, Typography, Link, Grid, Divider } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 5,
        px: 2,
        mt: 'auto',
        background: 'linear-gradient(180deg, #1e2a3a 0%, #172845 100%)',
        color: '#e3e8ee',
        fontFamily: 'Garet, Comforta, Arial, sans-serif',
      }}
    >
      <Container>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, mb: 2 }}>
              <Link
                href="#bio"
                color="inherit"
                underline="hover"
                sx={{
                  color: '#e3e8ee',
                  fontWeight: 500,
                  fontSize: '1rem',
                  letterSpacing: '0.5px',
                  mx: 1.5,
                  transition: 'color 0.2s',
                  '&:hover': { color: '#1976d2' },
                }}
              >
                Bio
              </Link>
              <Link href="#stack" color="inherit" underline="hover" sx={{ color: '#e3e8ee', fontWeight: 500, fontSize: '1rem', mx: 1.5, '&:hover': { color: '#1976d2' } }}>Stack</Link>
              <Link href="#formation" color="inherit" underline="hover" sx={{ color: '#e3e8ee', fontWeight: 500, fontSize: '1rem', mx: 1.5, '&:hover': { color: '#1976d2' } }}>Formation</Link>
              <Link href="#projets" color="inherit" underline="hover" sx={{ color: '#e3e8ee', fontWeight: 500, fontSize: '1rem', mx: 1.5, '&:hover': { color: '#1976d2' } }}>Projets</Link>
              <Link href="#contact" color="inherit" underline="hover" sx={{ color: '#e3e8ee', fontWeight: 500, fontSize: '1rem', mx: 1.5, '&:hover': { color: '#1976d2' } }}>Contact</Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Link
                href="https://www.linkedin.com/in/ngoujon/"
                target="_blank"
                color="inherit"
                aria-label="LinkedIn"
                sx={{ color: '#e3e8ee', fontSize: '2rem', mx: 1, '&:hover': { color: '#1976d2' } }}
              >
                <LinkedInIcon fontSize="inherit" />
              </Link>
              <Link
                href="https://github.com/ngoujon"
                target="_blank"
                color="inherit"
                aria-label="GitHub"
                sx={{ color: '#e3e8ee', fontSize: '2rem', mx: 1, '&:hover': { color: '#1976d2' } }}
              >
                <GitHubIcon fontSize="inherit" />
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.08)' }} />
        <Typography
          variant="body2"
          align="center"
          sx={{
            color: 'rgba(227,232,238,0.7)',
            fontSize: '0.95rem',
            fontFamily: 'Garet, Comforta, Arial, sans-serif',
            fontWeight: 400,
            letterSpacing: '0.5px',
          }}
        >
          © {new Date().getFullYear()} Nicolas GOUJON
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 