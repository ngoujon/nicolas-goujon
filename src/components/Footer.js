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
        background: '#172845',
        color: '#e3e8ee',
        fontFamily: 'Garet, Comforta, Arial, sans-serif',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
        }
      }}
    >
      <Container>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={8}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              flexWrap: 'wrap', 
              gap: 2, 
              mb: 2,
              '& a': {
                position: 'relative',
                transition: 'all 0.3s ease',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-2px',
                  left: 0,
                  width: '0',
                  height: '2px',
                  background: 'white',
                  transition: 'width 0.3s ease',
                },
                '&:hover': {
                  color: 'white',
                  '&::after': {
                    width: '100%',
                  }
                }
              }
            }}>
              <Link
                href="#experience"
                color="inherit"
                underline="none"
                sx={{
                  color: '#e3e8ee',
                  fontWeight: 500,
                  fontSize: '1rem',
                  letterSpacing: '0.5px',
                  mx: 1.5,
                }}
              >
                Expérience
              </Link>
              <Link 
                href="#stack" 
                color="inherit" 
                underline="none" 
                sx={{ 
                  color: '#e3e8ee', 
                  fontWeight: 500, 
                  fontSize: '1rem', 
                  mx: 1.5,
                }}
              >
                Stack
              </Link>
              <Link 
                href="#formation" 
                color="inherit" 
                underline="none" 
                sx={{ 
                  color: '#e3e8ee', 
                  fontWeight: 500, 
                  fontSize: '1rem', 
                  mx: 1.5,
                }}
              >
                Formation
              </Link>
              <Link 
                href="#bio" 
                color="inherit" 
                underline="none" 
                sx={{ 
                  color: '#e3e8ee', 
                  fontWeight: 500, 
                  fontSize: '1rem', 
                  mx: 1.5,
                }}
              >
                Bio
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 2,
              '& a': {
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  color: 'white'
                }
              }
            }}>
              <Link
                href="https://www.linkedin.com/in/ngoujon/"
                target="_blank"
                color="inherit"
                aria-label="LinkedIn"
                sx={{ color: '#e3e8ee', fontSize: '2rem', mx: 1 }}
              >
                <LinkedInIcon fontSize="inherit" />
              </Link>
              <Link
                href="https://github.com/ngoujon"
                target="_blank"
                color="inherit"
                aria-label="GitHub"
                sx={{ color: '#e3e8ee', fontSize: '2rem', mx: 1 }}
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