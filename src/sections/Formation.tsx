import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Section from '../components/Section';
import { FORMATIONS } from '../data/content';
import { BRAND } from '../utils/theme';

const { navy, navyAlpha } = BRAND;

/** Section « Formation » : diplômes et certifications en cartes (grille 2 × 2). */
const Formation = () => (
  <Section id="formation" title="FORMATION" background="white" color={navy}>
    <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
      {FORMATIONS.map(({ icon: FormationIcon, title, subtitle }) => (
        <Grid item xs={12} sm={6} key={title}>
          <Box
            sx={{
              background: 'white',
              borderRadius: 3,
              boxShadow: `0 4px 24px 0 ${navyAlpha(0.1)}`,
              p: { xs: 2, sm: 2.5, md: 3 },
              textAlign: 'center',
              transition: '0.2s',
              height: '100%',
              '&:hover': {
                boxShadow: `0 8px 32px 0 ${navyAlpha(0.18)}`,
                transform: { xs: 'scale(1.02)', sm: 'scale(1.04)' },
              },
            }}
          >
            <FormationIcon size={40} color={navy} style={{ marginBottom: 12 }} aria-hidden="true" />
            <Typography variant="h6" component="h3" sx={{ color: navy, fontWeight: 700 }}>
              {title}
            </Typography>
            <Typography sx={{ color: navy }}>{subtitle}</Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  </Section>
);

export default Formation;
