import React from 'react';
import { Box, Divider, Typography, useTheme } from '@mui/material';
import Section from '../components/Section';
import Icon from '../components/Icon';
import { STACK_ROWS } from '../data/content';
import { getModeColors } from '../utils/theme';

/** Section « Stack » : compétences techniques en grilles de 4 colonnes (2 sur mobile). */
const Stack = () => {
  const theme = useTheme();
  const { fg, fgAlpha, accentBg } = getModeColors(theme.palette.mode);

  return (
    <Section
      id="stack"
      title="STACK"
      background={accentBg}
      color={fg}
      sx={{
        pt: { xs: 6, sm: 8, md: 8 },
        pb: { xs: 6, sm: 10, md: 12 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      containerProps={{ maxWidth: 'lg', sx: { px: { xs: 2, sm: 3 } } }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '1200px' }}>
        {STACK_ROWS.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {/* Séparateur horizontal entre deux lignes de compétences */}
            {rowIndex > 0 && (
              <Divider sx={{ my: { xs: 2, sm: 3, md: 6, lg: 8 }, borderColor: fgAlpha(0.1), width: '100%' }} />
            )}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                gap: { xs: 2, sm: 3, md: 6, lg: 8 },
                width: '100%',
              }}
            >
              {row.map(({ icon, title, skills }) => (
                <Box key={title} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: { xs: 1.5, sm: 0 } }}>
                  <Box
                    sx={{
                      color: fg,
                      mb: { xs: 1.5, sm: 3, md: 4 },
                      height: { xs: 44, sm: 52, md: 60 },
                      width: { xs: 44, sm: 52, md: 60 },
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: { xs: '32px', sm: '40px', md: '48px' },
                    }}
                  >
                    <Icon icon={icon} />
                  </Box>
                  <Typography
                    component="h3"
                    sx={{
                      color: fg,
                      mb: { xs: 1, sm: 2 },
                      fontSize: { xs: '1.15rem', sm: '1.5rem', md: '1.8rem' },
                      fontFamily: 'Stop',
                      fontWeight: '500',
                      textAlign: 'center',
                      width: '100%',
                      whiteSpace: { xs: 'normal', md: 'nowrap' },
                    }}
                  >
                    {title}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 0.5, sm: 1 }, alignItems: 'center' }}>
                    {skills.map((skill) => (
                      <Typography
                        key={skill}
                        sx={{ color: fg, opacity: 0.7, fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1rem' }, fontFamily: 'Garet' }}
                      >
                        {skill}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </React.Fragment>
        ))}
      </Box>
    </Section>
  );
};

export default Stack;
