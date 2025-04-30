import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, IconButton, Box, Collapse } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Header = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Container>
        <Toolbar sx={{ justifyContent: 'space-between', padding: '10px 0' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <RouterLink to="/">
              <Box
                sx={{
                  backgroundImage: 'url(/images/logo/logo_light.png)',
                  height: '75px',
                  width: '75px',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  margin: '10px 0px 15px 0px',
                }}
              />
            </RouterLink>
          </Box>

          {/* Navigation pour les écrans larges */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <Button
              color="inherit"
              component={RouterLink}
              to="/#bio"
              sx={{
                color: 'white',
                fontFamily: 'comforta',
                fontSize: '20px',
                marginLeft: '15px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                position: 'relative',
                '&:before': {
                  content: '""',
                  background: '#FFFFFF',
                  display: 'block',
                  position: 'absolute',
                  bottom: '-3px',
                  left: 0,
                  width: 0,
                  height: '1px',
                  transition: 'all 0.3s ease-in-out',
                },
                '&:hover:before': {
                  width: '100%',
                },
              }}
            >
              bio
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/#stack"
              sx={{
                color: 'white',
                fontFamily: 'comforta',
                fontSize: '20px',
                marginLeft: '15px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                position: 'relative',
                '&:before': {
                  content: '""',
                  background: '#FFFFFF',
                  display: 'block',
                  position: 'absolute',
                  bottom: '-3px',
                  left: 0,
                  width: 0,
                  height: '1px',
                  transition: 'all 0.3s ease-in-out',
                },
                '&:hover:before': {
                  width: '100%',
                },
              }}
            >
              Stack
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/#formation"
              sx={{
                color: 'white',
                fontFamily: 'comforta',
                fontSize: '20px',
                marginLeft: '15px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                position: 'relative',
                '&:before': {
                  content: '""',
                  background: '#FFFFFF',
                  display: 'block',
                  position: 'absolute',
                  bottom: '-3px',
                  left: 0,
                  width: 0,
                  height: '1px',
                  transition: 'all 0.3s ease-in-out',
                },
                '&:hover:before': {
                  width: '100%',
                },
              }}
            >
              formation
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/#projets"
              sx={{
                color: 'white',
                fontFamily: 'comforta',
                fontSize: '20px',
                marginLeft: '15px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                position: 'relative',
                '&:before': {
                  content: '""',
                  background: '#FFFFFF',
                  display: 'block',
                  position: 'absolute',
                  bottom: '-3px',
                  left: 0,
                  width: 0,
                  height: '1px',
                  transition: 'all 0.3s ease-in-out',
                },
                '&:hover:before': {
                  width: '100%',
                },
              }}
            >
              projets
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/#contact"
              sx={{
                color: 'white',
                fontFamily: 'comforta',
                fontSize: '20px',
                marginLeft: '15px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                position: 'relative',
                '&:before': {
                  content: '""',
                  background: '#FFFFFF',
                  display: 'block',
                  position: 'absolute',
                  bottom: '-3px',
                  left: 0,
                  width: 0,
                  height: '1px',
                  transition: 'all 0.3s ease-in-out',
                },
                '&:hover:before': {
                  width: '100%',
                },
              }}
            >
              contact
            </Button>
            <Box sx={{ display: 'flex', marginLeft: '25px' }}>
              <IconButton
                color="inherit"
                href="https://www.linkedin.com/in/ngoujon/"
                target="_blank"
                sx={{ color: 'white', fontSize: '32px' }}
              >
                <LinkedInIcon fontSize="large" />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://github.com/ngoujon"
                target="_blank"
                sx={{ color: 'white', fontSize: '32px', marginLeft: '10px' }}
              >
                <GitHubIcon fontSize="large" />
              </IconButton>
            </Box>
          </Box>

          {/* Bouton menu pour les écrans mobiles */}
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleToggle}
              sx={{ color: 'white' }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>

        {/* Menu mobile */}
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}>
            <Button
              color="inherit"
              component={RouterLink}
              to="/#bio"
              onClick={handleToggle}
              sx={{ color: 'white', my: 1 }}
            >
              bio
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/#stack"
              onClick={handleToggle}
              sx={{ color: 'white', my: 1 }}
            >
              Stack
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/#formation"
              onClick={handleToggle}
              sx={{ color: 'white', my: 1 }}
            >
              formation
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/#projets"
              onClick={handleToggle}
              sx={{ color: 'white', my: 1 }}
            >
              projets
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/#contact"
              onClick={handleToggle}
              sx={{ color: 'white', my: 1 }}
            >
              contact
            </Button>
            <Box sx={{ display: 'flex', mt: 2 }}>
              <Button
                color="inherit"
                href="https://www.linkedin.com/in/ngoujon/"
                target="_blank"
                sx={{ color: 'white', mx: 1 }}
              >
                Linkedin
              </Button>
              <Button
                color="inherit"
                href="https://github.com/ngoujon"
                target="_blank"
                sx={{ color: 'white', mx: 1 }}
              >
                github
              </Button>
            </Box>
          </Box>
        </Collapse>
      </Container>
    </AppBar>
  );
};

export default Header; 