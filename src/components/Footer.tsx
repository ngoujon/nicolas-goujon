import React from 'react';
import { Box, Container, Typography, Link, Grid, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { NAV_ITEMS, SOCIAL_LINKS } from '../data/content';
import { BRAND } from '../utils/theme';

const TEXT_COLOR = '#e3e8ee';
const SOCIAL_ICONS = { linkedin: LinkedInIcon, github: GitHubIcon };

// Soulignement animé au survol, appliqué à tous les liens texte d'un bloc.
const underlineOnHoverSx = {
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
      '&::after': { width: '100%' },
    },
  },
} as const;

// Style des liens vers les pages légales.
const linkSx = { color: TEXT_COLOR, fontWeight: 500, letterSpacing: '0.5px' };

/** Pied de page : liens vers les sections (hors contact), réseaux sociaux, pages légales et crédits. */
const Footer = () => (
  <Box
    component="footer"
    sx={{
      py: 5,
      px: 2,
      mt: 'auto',
      background: BRAND.navy,
      color: TEXT_COLOR,
      fontFamily: 'Garet, Comforta, Arial, sans-serif',
      position: 'relative',
      // Fin liseré dégradé en haut du footer
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
      },
    }}
  >
    <Container>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, mb: 2, ...underlineOnHoverSx }}>
            {NAV_ITEMS.filter((item) => item.id !== 'contact').map((item) => (
              <Link key={item.id} href={`#${item.id}`} color="inherit" underline="none" sx={{ color: TEXT_COLOR, fontWeight: 500, fontSize: '1rem', mx: 1.5 }}>
                {item.label}
              </Link>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              '& a': {
                transition: 'all 0.3s ease',
                '&:hover': { transform: 'translateY(-3px)', color: 'white' },
              },
            }}
          >
            {SOCIAL_LINKS.map((link) => {
              const SocialIcon = SOCIAL_ICONS[link.id];
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="inherit"
                  aria-label={link.label}
                  sx={{ color: TEXT_COLOR, fontSize: '2rem', mx: 1 }}
                >
                  <SocialIcon fontSize="inherit" />
                </Link>
              );
            })}
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.08)' }} />
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 2, flexWrap: 'wrap', ...underlineOnHoverSx }}>
        <Link component={RouterLink} to="/politique-confidentialite" color="inherit" underline="none" sx={{ ...linkSx, fontSize: '0.95rem' }}>
          Politique de Confidentialité
        </Link>
        <Link component={RouterLink} to="/mentions-legales" color="inherit" underline="none" sx={{ ...linkSx, fontSize: '0.95rem' }}>
          Mentions Légales
        </Link>
      </Box>
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
        {' - Site internet réalisé par '}
        <Link
          href="https://qwebty.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: 'rgba(227,232,238,0.92)', textDecoration: 'underline', '&:hover': { color: TEXT_COLOR } }}
        >
          Qwebty
        </Link>
      </Typography>
    </Container>
  </Box>
);

export default Footer;
