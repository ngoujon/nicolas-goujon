import React from 'react';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Section from '../components/Section';
import { BIO, OWNER } from '../data/content';
import { BRAND, getModeColors } from '../utils/theme';

const { navy, navyAlpha } = BRAND;

// Bulle de citation blanche, avec une pointe (::before) orientée vers la photo de profil.
const CitationBox = styled(Box)(({ theme }) => ({
  background: 'white',
  borderRadius: '24px',
  boxShadow: `0 4px 24px 0 ${navyAlpha(0.1)}`,
  display: 'flex',
  alignItems: 'flex-start',
  padding: theme.spacing(4),
  position: 'relative',
  maxWidth: '900px',
  margin: '0 auto',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '-10px',
    top: '48px',
    width: '20px',
    height: '20px',
    background: 'white',
    transform: 'rotate(45deg)',
    boxShadow: `-3px 3px 5px ${navyAlpha(0.05)}`,
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    '&::before': {
      left: '50%',
      top: '-10px',
      transform: 'translateX(-50%) rotate(45deg)',
    },
  },
}));

// Photo de profil ronde avec pastille verte « disponible » (::after).
const AvatarWrapper = styled('div')({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  flexShrink: 0,
  position: 'relative',
  top: '-20px',
  marginRight: '24px',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-3px',
    right: '-3px',
    width: '20px',
    height: '20px',
    background: '#44b700',
    border: '3px solid white',
    borderRadius: '50%',
  },
});

const Avatar = styled('img')({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  objectFit: 'cover',
  display: 'block',
  border: '3px solid white',
  boxShadow: `0 4px 24px ${navyAlpha(0.15)}`,
});

const ChipTag = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  background: navyAlpha(0.08),
  color: navy,
  fontSize: '0.85rem',
  fontWeight: 500,
  borderRadius: '16px',
  padding: '2px 14px',
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
  letterSpacing: '0.5px',
}));

/** Section « Bio » : citation, parcours, présentation de l'agence Qwebty et mots-clés. */
const Bio = () => {
  const theme = useTheme();
  const { fg, fgAlpha, accentBg } = getModeColors(theme.palette.mode);
  const { company } = BIO;

  return (
    <Section id="bio" title="BIO" background={accentBg} color={fg}>
      <Grid container justifyContent="center" sx={{ mb: 7, px: 2 }}>
        <Grid item xs={12}>
          <CitationBox>
            <AvatarWrapper>
              <picture>
                <source srcSet="/images/profil.webp" type="image/webp" />
                <Avatar src="/images/profil.jpg" alt={`Photo de profil de ${OWNER.name}`} loading="lazy" />
              </picture>
            </AvatarWrapper>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ fontSize: '1.1rem', fontWeight: 600, color: navy }}>{OWNER.name}</Typography>
                <Typography sx={{ fontSize: '0.9rem', color: navyAlpha(0.6) }}>{OWNER.title}</Typography>
              </Box>
              <Typography sx={{ fontSize: '1rem', color: navy, lineHeight: 1.6, position: 'relative', textAlign: 'justify' }}>
                {BIO.quote}
              </Typography>
            </Box>
          </CitationBox>
        </Grid>
      </Grid>

      <Grid container spacing={{ xs: 2, sm: 4, md: 6 }} alignItems="center">
        <Grid item xs={12}>
          {/* Parcours : paragraphes séparés par une ligne vide */}
          <Typography variant="body1" paragraph sx={{ color: fg, fontSize: '1rem', mb: 2, textAlign: 'justify', lineHeight: 1.6 }}>
            {BIO.paragraphs.map((paragraph, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <>
                    <br />
                    <br />
                  </>
                )}
                {paragraph}
              </React.Fragment>
            ))}
          </Typography>
          <Typography variant="body1" sx={{ color: fg, fontSize: '1rem', mt: 4, mb: 2, textAlign: 'justify', lineHeight: 1.6 }}>
            Aujourd'hui, je poursuis cette aventure à travers ma micro-entreprise :
          </Typography>

          {/* Encart Qwebty : logo sur fond accent à gauche, description et lien à droite */}
          <Box
            sx={{
              borderRadius: 2,
              overflow: 'hidden',
              backgroundColor: fgAlpha(0.06),
              border: `1px solid ${fgAlpha(0.1)}`,
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
              '&:hover': {
                borderColor: fgAlpha(0.18),
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            <Box
              sx={{
                backgroundColor: accentBg,
                py: { xs: 2.5, md: 3 },
                px: { xs: 2.5, md: 3 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'center', md: 'flex-start' },
                gap: 2,
                minWidth: { md: 220 },
                flexShrink: 0,
              }}
            >
              <Box component="picture" sx={{ display: 'block' }}>
                <source srcSet="/images/qwebty/logo-v2-hd-blanc.webp" type="image/webp" />
                <Box
                  component="img"
                  src="/images/qwebty/logo-v2-hd-blanc.png"
                  alt={`Logo ${company.name} - ${company.tagline}`}
                  loading="lazy"
                  sx={{ height: { xs: 40, sm: 46 }, width: 'auto', objectFit: 'contain', display: 'block' }}
                />
              </Box>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography sx={{ color: fg, fontSize: '1.05rem', fontWeight: 600, letterSpacing: '0.02em' }}>
                  {company.name}
                </Typography>
                <Typography sx={{ color: fgAlpha(0.8), fontSize: '0.85rem', mt: 0.25 }}>{company.tagline}</Typography>
              </Box>
            </Box>
            <Box sx={{ p: { xs: 2.5, md: 3 }, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
              <Typography sx={{ color: fgAlpha(0.92), textAlign: 'justify', lineHeight: 1.75, fontSize: '0.98rem' }}>
                {company.description}
              </Typography>
              <Button
                component="a"
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                size="small"
                endIcon={<OpenInNewIcon sx={{ fontSize: '1rem' }} />}
                sx={{
                  color: fgAlpha(0.95),
                  borderColor: fgAlpha(0.4),
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  '&:hover': { borderColor: fg, backgroundColor: fgAlpha(0.08) },
                }}
              >
                En savoir plus
              </Button>
            </Box>
          </Box>

          <Box sx={{ mt: 1 }}>
            {BIO.tags.map((tag) => (
              <ChipTag key={tag}># {tag}</ChipTag>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Section>
  );
};

export default Bio;
