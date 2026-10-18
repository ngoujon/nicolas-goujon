import React from 'react';
import { Box, Container, ContainerProps, Typography } from '@mui/material';
import { styled, SxProps, Theme } from '@mui/material/styles';

// Titre de section (h2) commun à toutes les sections de la page d'accueil.
const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  fontWeight: '500',
  marginBottom: theme.spacing(8),
  textAlign: 'center',
  letterSpacing: '2px',
  fontFamily: 'Garet',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
    marginBottom: theme.spacing(4),
  },
  [theme.breakpoints.between('sm', 'md')]: {
    fontSize: '2.5rem',
    marginBottom: theme.spacing(6),
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '3.5rem',
    marginBottom: theme.spacing(10),
  },
})) as typeof Typography;

interface SectionProps {
  /** Ancre HTML, cible de la navigation (cf. NAV_ITEMS). */
  id: string;
  title: string;
  background: string;
  color: string;
  children: React.ReactNode;
  /** Surcharges de style de la section (espacements, mise en page). */
  sx?: SxProps<Theme>;
  containerProps?: ContainerProps;
}

/**
 * Section pleine largeur de la page d'accueil : fond, espacements verticaux et titre.
 * `scrollMarginTop` compense la barre de navigation fixe lors du défilement vers l'ancre.
 */
const Section = ({ id, title, background, color, children, sx, containerProps }: SectionProps) => (
  <Box
    component="section"
    id={id}
    sx={[
      {
        pt: { xs: 8, sm: 8, md: 8 },
        pb: { xs: 8, sm: 10, md: 12 },
        backgroundColor: background,
        scrollMarginTop: '100px',
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    <Container {...containerProps}>
      <SectionTitle component="h2" sx={{ color }}>
        {title}
      </SectionTitle>
      {children}
    </Container>
  </Box>
);

export default Section;
