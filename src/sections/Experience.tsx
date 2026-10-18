import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Section from '../components/Section';
import Icon from '../components/Icon';
import { EXPERIENCES, ExperienceCard } from '../data/content';
import { BRAND } from '../utils/theme';

const { navy, navyAlpha } = BRAND;

/** Carte d'un domaine d'expertise : icône, titre, introduction, liste à puces et conclusion. */
const Card = ({ icon, title, intro, items, outro }: ExperienceCard) => (
  <Box
    sx={{
      textAlign: 'center',
      p: { xs: 2, sm: 3 },
      mb: { xs: 2, sm: 4 },
      height: '100%',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'translateY(-10px)',
        boxShadow: `0 8px 32px ${navyAlpha(0.2)}`,
      },
    }}
  >
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, height: '100%' }}>
      <Box
        sx={{
          width: '80px',
          height: '80px',
          backgroundColor: navyAlpha(0.1),
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
        }}
      >
        <Icon icon={icon} size="40px" color={navy} />
      </Box>
      <Typography
        variant="h3"
        sx={{ color: navy, mb: 3, fontWeight: 'bold', textAlign: 'center', fontSize: { xs: '1.8rem', md: '2rem' } }}
      >
        {title}
      </Typography>
      <Typography sx={{ color: navy, textAlign: 'justify', lineHeight: 1.8, fontSize: '1.1rem', mb: 3 }}>
        {intro}
      </Typography>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map((item) => (
          <Box
            key={item.text}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 1,
              borderRadius: '8px',
              transition: 'background-color 0.3s ease',
              '&:hover': { backgroundColor: navyAlpha(0.05) },
            }}
          >
            <Icon icon={item.icon} size="24px" color={navy} />
            <Typography sx={{ color: navy, fontSize: '1rem', textAlign: 'justify' }}>{item.text}</Typography>
          </Box>
        ))}
      </Box>
      <Typography sx={{ color: navy, textAlign: 'justify', mt: 4, fontStyle: 'italic', fontSize: '1rem' }}>
        {outro}
      </Typography>
    </Box>
  </Box>
);

/** Section « Expérience » : domaines d'expertise présentés en deux colonnes sur desktop. */
const Experience = () => (
  <Section id="experience" title="EXPÉRIENCE" background="#fff" color={navy}>
    <Grid container spacing={{ xs: 2, sm: 4, md: 6 }} justifyContent="center">
      {EXPERIENCES.map((card) => (
        <Grid item xs={12} md={6} key={card.title}>
          <Card {...card} />
        </Grid>
      ))}
    </Grid>
  </Section>
);

export default Experience;
