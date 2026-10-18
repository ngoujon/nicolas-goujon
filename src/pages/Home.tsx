import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Hero from '../sections/Hero';
import Experience from '../sections/Experience';
import Stack from '../sections/Stack';
import Formation from '../sections/Formation';
import Bio from '../sections/Bio';
import Contact from '../sections/Contact';
import { NAV_ITEMS } from '../data/content';

/**
 * Page d'accueil (one-page). Lorsqu'elle est ouverte via une route de section
 * (/projets, /stack, /bio...), défile jusqu'à la section correspondante.
 */
const Home = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const item = NAV_ITEMS.find((navItem) => `/${navItem.path}` === pathname);
    // scrollIntoView respecte le `scroll-margin-top` des sections (hauteur de la navbar).
    if (item) document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
  }, [pathname]);

  return (
    <Box>
      <Hero />
      <Experience />
      <Stack />
      <Formation />
      <Bio />
      <Contact />
    </Box>
  );
};

export default Home;
