import React, { useState, useCallback } from 'react';
import { AppBar, Toolbar, Button, Container, IconButton, Box, Collapse } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

/**
 * Header component that includes navigation and social media links
 * @returns {JSX.Element} The header component
 */
const Header = () => {
  // State for mobile menu toggle
  const [open, setOpen] = useState(false);

  // Toggle mobile menu
  const handleToggle = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  /**
   * Scrolls to a specific section and updates URL
   * @param {string} sectionId - The ID of the section to scroll to
   */
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState({}, '', `/${sectionId}`);
    }
    setOpen(false);
  }, []);

  // Navigation items configuration
  const navItems = [
    { id: 'experience', label: 'Expérience' },
    { id: 'stack', label: 'Stack' },
    { id: 'formation', label: 'formation' },
    { id: 'bio', label: 'bio' },
    { id: 'contact', label: 'contact' },
  ];

  // Social media links configuration
  const socialLinks = [
    {
      icon: <LinkedInIcon fontSize="large" />,
      href: 'https://www.linkedin.com/in/ngoujon/',
      label: 'LinkedIn'
    },
    {
      icon: <GitHubIcon fontSize="large" />,
      href: 'https://github.com/ngoujon',
      label: 'github'
    }
  ];

  /**
   * Renders a navigation button with hover effect
   * @param {Object} item - Navigation item configuration
   * @returns {JSX.Element} Navigation button
   */
  const renderNavButton = useCallback((item) => (
    <Button
      key={item.id}
      color="inherit"
      onClick={() => scrollToSection(item.id)}
      sx={{
        color: 'white',
        fontFamily: 'comforta',
        fontSize: '20px',
        marginLeft: '15px',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        position: 'relative',
        transition: 'all 0.3s ease',
        backgroundColor: 'transparent',
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
          backgroundColor: 'transparent',
          color: 'white',
          '&::after': {
            width: '100%',
          }
        }
      }}
    >
      {item.label}
    </Button>
  ), [scrollToSection]);

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: 'rgba(23, 40, 69, 0.8)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          backgroundColor: 'rgba(23, 40, 69, 0.9)',
        }
      }}
    >
      <Container>
        <Toolbar sx={{ 
          justifyContent: 'space-between', 
          padding: '10px 0',
          minHeight: '80px'
        }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <RouterLink to="/" aria-label="Retour à l'accueil">
              <Box
                sx={{
                  backgroundImage: 'url(/images/logo/logo_light.png)',
                  height: '75px',
                  width: '75px',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  margin: '10px 0px 15px 0px',
                }}
                role="img"
                aria-label="Logo de Nicolas GOUJON"
              />
            </RouterLink>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {navItems.map(renderNavButton)}
            <Box sx={{ 
              display: 'flex', 
              marginLeft: '25px',
              '& .MuiIconButton-root': {
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  color: 'white'
                }
              }
            }}>
              {socialLinks.map((link, index) => (
                <IconButton
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visiter mon profil ${link.label}`}
                  sx={{ color: 'white' }}
                >
                  {link.icon}
                </IconButton>
              ))}
            </Box>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleToggle}
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>

        {/* Mobile Menu */}
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            py: 2,
            backgroundColor: 'rgba(23, 40, 69, 0.95)',
            backdropFilter: 'blur(10px)'
          }}>
            {navItems.map((item) => (
              <Button
                key={item.id}
                color="inherit"
                onClick={() => scrollToSection(item.id)}
                sx={{ 
                  color: 'white', 
                  my: 1,
                  width: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: 'white'
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
            <Box sx={{ display: 'flex', mt: 2 }}>
              {socialLinks.map((link, index) => (
                <Button
                  key={index}
                  color="inherit"
                  href={link.href}
                  target="_blank"
                  sx={{ 
                    color: 'white', 
                    mx: 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: 'white',
                      transform: 'translateY(-3px)'
                    }
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          </Box>
        </Collapse>
      </Container>
    </AppBar>
  );
};

export default Header; 