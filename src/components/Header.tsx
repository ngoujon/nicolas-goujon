import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Container, IconButton, Box, Collapse } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeMode } from '../utils/ThemeModeContext';
import { NAV_ITEMS, SOCIAL_LINKS } from '../data/content';

const SOCIAL_ICONS = { linkedin: LinkedInIcon, github: GitHubIcon };

// Soulignement animé au survol des liens de navigation (desktop).
const navButtonSx = {
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
    '&::after': { width: '100%' },
  },
} as const;

/** Barre de navigation fixe : logo, liens vers les sections, réseaux sociaux et bascule clair/sombre. */
const Header = () => {
  const [open, setOpen] = useState(false);
  const { mode, toggleMode } = useThemeMode();
  const navigate = useNavigate();

  /**
   * Défile jusqu'à la section et met à jour l'URL sans recharger la page.
   * Depuis une autre page (mentions légales...), navigue vers la route de la section :
   * la page d'accueil se charge alors et défile d'elle-même (cf. Home.tsx).
   */
  const scrollToSection = (sectionId: string, path: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState({}, '', `/${path}`);
    } else {
      navigate(`/${path}`);
    }
    setOpen(false);
  };

  const themeToggle = (
    <IconButton
      onClick={toggleMode}
      aria-label={mode === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
      sx={{ color: 'white' }}
    >
      {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'rgba(23, 40, 69, 0.8)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': { backgroundColor: 'rgba(23, 40, 69, 0.9)' },
      }}
    >
      <Container>
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            padding: { xs: '5px 0', sm: '10px 0' },
            minHeight: { xs: '56px', sm: '70px', md: '80px' },
          }}
        >
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <RouterLink to="/" aria-label="Retour à l'accueil">
              <Box
                sx={{
                  backgroundImage: 'url(/images/logo/logo_light.png)',
                  height: { xs: '45px', sm: '60px', md: '75px' },
                  width: { xs: '45px', sm: '60px', md: '75px' },
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  margin: { xs: '5px 0px', sm: '10px 0px 15px 0px' },
                }}
                role="img"
                aria-label="Logo de Nicolas GOUJON"
              />
            </RouterLink>
          </Box>

          {/* Navigation desktop */}
          <Box component="nav" sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {NAV_ITEMS.map((item) => (
              <Button key={item.id} color="inherit" onClick={() => scrollToSection(item.id, item.path)} sx={navButtonSx}>
                {item.label}
              </Button>
            ))}
            <Box
              sx={{
                display: 'flex',
                marginLeft: '25px',
                '& .MuiIconButton-root': {
                  transition: 'all 0.3s ease',
                  '&:hover': { transform: 'translateY(-3px)', color: 'white' },
                },
              }}
            >
              {SOCIAL_LINKS.map((link) => {
                const SocialIcon = SOCIAL_ICONS[link.id];
                return (
                  <IconButton
                    key={link.id}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visiter mon profil ${link.label}`}
                    sx={{ color: 'white' }}
                  >
                    <SocialIcon fontSize="large" />
                  </IconButton>
                );
              })}
              {themeToggle}
            </Box>
          </Box>

          {/* Boutons mobile : thème + menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            {themeToggle}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              aria-expanded={open}
              onClick={() => setOpen((prev) => !prev)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>

        {/* Menu mobile déroulant */}
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box
            component="nav"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              py: 2,
              backgroundColor: 'rgba(23, 40, 69, 0.95)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.id}
                color="inherit"
                onClick={() => scrollToSection(item.id, item.path)}
                sx={{ color: 'white', my: 1, width: '100%', transition: 'all 0.3s ease', '&:hover': { color: 'white' } }}
              >
                {item.label}
              </Button>
            ))}
            <Box sx={{ display: 'flex', mt: 2 }}>
              {SOCIAL_LINKS.map((link) => (
                <Button
                  key={link.id}
                  color="inherit"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'white',
                    mx: 1,
                    transition: 'all 0.3s ease',
                    '&:hover': { color: 'white', transform: 'translateY(-3px)' },
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
