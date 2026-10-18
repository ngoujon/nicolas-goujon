import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { OWNER } from '../data/content';

const TEXT_SHADOW = '0 2px 8px rgba(0,0,0,0.45)';

// Bannière plein écran ; l'image WebP est servie en priorité, avec repli JPEG.
const HeroSection = styled('section')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100vh',
  minHeight: '600px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: 'image-set(url(/images/background/background.webp) 1x type("image/webp"), url(/images/background/background.jpg) 1x type("image/jpeg"))',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    minHeight: '500px',
    backgroundAttachment: 'scroll',
  },
  [theme.breakpoints.up('lg')]: {
    minHeight: '700px',
  },
}));

// Dégradé bleu marine par-dessus l'image, pour garantir la lisibilité du texte blanc.
const HeroOverlay = styled('div')({
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(to bottom, rgba(23, 40, 69, 0.7), rgba(23, 40, 69, 0.4))',
  zIndex: 1,
});

const HeroContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  textAlign: 'center',
  textShadow: TEXT_SHADOW,
  padding: theme.spacing(4),
  width: '100%',
  height: '100%',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const HeroName = styled(Typography)(({ theme }) => ({
  fontSize: '2.8rem',
  fontWeight: 700,
  marginBottom: theme.spacing(1),
  letterSpacing: '1px',
  textShadow: TEXT_SHADOW,
  fontFamily: 'Comforta',
  [theme.breakpoints.down('sm')]: { fontSize: '2rem' },
  [theme.breakpoints.between('sm', 'md')]: { fontSize: '2.4rem' },
  [theme.breakpoints.up('lg')]: { fontSize: '3.2rem' },
})) as typeof Typography;

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.3rem',
  fontWeight: 400,
  marginBottom: theme.spacing(4),
  textShadow: TEXT_SHADOW,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
    marginBottom: theme.spacing(2),
  },
  [theme.breakpoints.between('sm', 'md')]: { fontSize: '1.2rem' },
  [theme.breakpoints.up('lg')]: { fontSize: '1.5rem' },
}));

/** Bannière d'accueil : nom, titre et flèche animée invitant à défiler (masquée après 100 px). */
const Hero = () => {
  const [showScrollArrow, setShowScrollArrow] = useState(true);

  useEffect(() => {
    const handleScroll = () => setShowScrollArrow(window.scrollY <= 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HeroSection aria-label="Section d'accueil avec image de fond représentant un espace de travail moderne">
      <HeroOverlay />
      <HeroContent>
        <HeroName component="h1">{OWNER.name}</HeroName>
        <HeroTitle>{OWNER.title}</HeroTitle>
      </HeroContent>
      {showScrollArrow && (
        <Box className="scroll-arrow" aria-hidden="true">
          <KeyboardArrowDownIcon />
        </Box>
      )}
    </HeroSection>
  );
};

export default Hero;
