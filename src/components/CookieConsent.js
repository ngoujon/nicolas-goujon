import React from 'react';
import { Box, Typography, Button, Stack, Paper } from '@mui/material';
import { TRACKERS, getConsent, setConsent, applyConsentIfAccepted } from '../utils/cookieConsent';

// Bandeau de consentement RGPD (opt-in) : ne s'affiche que si au moins un
// tracker non essentiel est configuré dans src/utils/cookieConsent.js, et
// ne charge ce tracker qu'après acceptation explicite de l'utilisateur.
function CookieConsent() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (TRACKERS.length === 0) return;

    const consent = getConsent();
    if (consent) {
      applyConsentIfAccepted();
    } else {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const handleChoice = (accepted) => {
    setConsent(accepted);
    if (accepted) applyConsentIfAccepted();
    setVisible(false);
  };

  return (
    <Paper
      elevation={4}
      role="dialog"
      aria-label="Consentement aux cookies"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2000,
        p: { xs: 2, sm: 3 },
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems={{ xs: 'stretch', sm: 'center' }}
        justifyContent="space-between"
        maxWidth="lg"
        sx={{ mx: 'auto' }}
      >
        <Box>
          <Typography variant="body2">
            Ce site utilise des cookies de mesure d'audience / publicité pour améliorer votre expérience.
            Ils ne seront déposés qu'avec votre accord. Consultez la{' '}
            <a href="/politique-confidentialite">politique de confidentialité</a> pour en savoir plus.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} justifyContent={{ xs: 'flex-end', sm: 'flex-start' }}>
          <Button variant="outlined" onClick={() => handleChoice(false)}>
            Refuser
          </Button>
          <Button variant="contained" onClick={() => handleChoice(true)}>
            Accepter
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default CookieConsent;
