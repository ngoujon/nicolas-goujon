import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Grid, TextField, TextFieldProps, Typography, useTheme } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import Section from '../components/Section';
import { CONTACT_SUBJECTS, OWNER } from '../data/content';
import { logger } from '../utils/logger';
import { BRAND, getModeColors } from '../utils/theme';

const CONTACT_API_URL = process.env.REACT_APP_CONTACT_API_URL || '/api/contact';
/** Durée d'affichage du message de succès / d'erreur après l'envoi. */
const STATUS_DURATION_MS = 5000;

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const EMPTY_FORM = {
  name: '',
  email: '',
  message: '',
  website: '', // honeypot : champ invisible pour les humains, souvent auto-rempli par les bots
};

const { navy } = BRAND;

/**
 * État et envoi du formulaire de contact vers l'API Laravel (api/routes/api.php).
 * Deux protections anti-spam sont transmises au serveur : le honeypot `website`
 * et le délai écoulé depuis l'affichage du formulaire (`elapsed_ms`).
 */
function useContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [form, setForm] = useState(EMPTY_FORM);
  const [subjects, setSubjects] = useState<string[]>([]);
  const renderedAtRef = useRef(Date.now());
  const resetTimerRef = useRef<ReturnType<typeof setTimeout>>();

  // Annule le minuteur de réinitialisation si le composant est démonté entre-temps.
  useEffect(() => () => clearTimeout(resetTimerRef.current), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleSubject = (subject: string) => {
    setSubjects((prev) => (prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]));
  };

  const showStatus = (next: FormStatus) => {
    setStatus(next);
    clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => setStatus('idle'), STATUS_DURATION_MS);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          subjects: subjects.length > 0 ? subjects : undefined,
          website: form.website,
          elapsed_ms: Date.now() - renderedAtRef.current,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || `Erreur ${res.status}`);
      }

      // Conversion de mesure d'audience : aucune donnée personnelle transmise.
      window.seoMonitor?.track('Contact envoyé', { sujets: subjects.length });
      setForm(EMPTY_FORM);
      setSubjects([]);
      renderedAtRef.current = Date.now();
      showStatus('success');
    } catch (error) {
      logger.logError(error instanceof Error ? error : new Error(String(error)), 'Contact Form Submission');
      showStatus('error');
    }
  };

  return { status, form, subjects, handleChange, toggleSubject, handleSubmit };
}

/** Section « Contact » : coordonnées à gauche, formulaire à droite (empilés sur mobile). */
const Contact = () => {
  const theme = useTheme();
  const { fg, fgAlpha, accentBg } = getModeColors(theme.palette.mode);
  const { status, form, subjects, handleChange, toggleSubject, handleSubmit } = useContactForm();

  // Style commun aux trois champs de saisie (fond inversé par rapport au formulaire).
  const fieldProps: TextFieldProps = {
    fullWidth: true,
    variant: 'outlined',
    required: true,
    onChange: handleChange,
    sx: { mb: { xs: 1.5, sm: 2 } },
    InputProps: {
      sx: {
        borderRadius: 2,
        backgroundColor: fg,
        color: accentBg,
        '& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline, &.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: fg,
        },
        fontSize: { xs: '0.9rem', sm: '1rem', lg: '1.1rem' },
      },
    },
  };

  const contactLines = [
    { icon: EmailIcon, content: <a href={`mailto:${OWNER.email}`} style={{ color: navy, textDecoration: 'none' }}>{OWNER.email}</a> },
    { icon: PhoneIcon, content: OWNER.phone },
  ];

  return (
    <Section id="contact" title="CONTACT" background="white" color={navy}>
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
        {/* Colonne de gauche : coordonnées */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: { xs: 2, sm: 3, md: 4 },
              p: { xs: 2, sm: 3, md: 4 },
            }}
          >
            <Typography variant="h4" component="h3" sx={{ color: navy, fontWeight: 500, mb: 4 }}>
              Contactez-moi
            </Typography>
            {contactLines.map(({ icon: LineIcon, content }, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ mr: 2 }}>
                  <LineIcon sx={{ fontSize: 28, color: navy }} />
                </Box>
                <Typography sx={{ fontSize: '1.1rem', color: navy }}>{content}</Typography>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Colonne de droite : formulaire */}
        <Grid item xs={12} md={7}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ background: accentBg, borderRadius: '18px', p: 4, boxShadow: `0 4px 24px 0 ${BRAND.navyAlpha(0.1)}` }}
          >
            <Typography variant="h6" component="h4" sx={{ color: fg, mb: 3 }}>
              Comment puis-je vous aider ?
            </Typography>

            {/* Sujets (sélection multiple, facultative) */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 1, md: 1.5, lg: 2 }, mb: { xs: 2, sm: 2.5, md: 3 } }}>
              {CONTACT_SUBJECTS.map((subject) => {
                const selected = subjects.includes(subject);
                return (
                  <Button
                    key={subject}
                    variant="outlined"
                    aria-pressed={selected}
                    onClick={() => toggleSubject(subject)}
                    sx={{
                      borderRadius: '20px',
                      borderColor: fg,
                      color: selected ? accentBg : fg,
                      backgroundColor: selected ? fg : accentBg,
                      '&:hover': { borderColor: fg, backgroundColor: fg, color: accentBg },
                    }}
                  >
                    {subject}
                  </Button>
                );
              })}
            </Box>

            <TextField {...fieldProps} label="Votre nom" name="name" value={form.name} />
            <TextField {...fieldProps} label="Votre email" name="email" type="email" value={form.email} />
            <TextField {...fieldProps} label="Votre message" name="message" multiline rows={4} value={form.message} />

            {/* Honeypot anti-spam : champ invisible pour un humain, souvent auto-rempli par les bots.
                Positionné hors-écran plutôt qu'en display:none, que certains bots savent détecter. */}
            <Box sx={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
              <input type="text" name="website" value={form.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
            </Box>

            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon sx={{ fontSize: '1.2rem', transform: 'translateX(2px)', transition: 'transform 0.2s ease' }} />}
              disabled={status === 'sending'}
              sx={{
                backgroundColor: fgAlpha(0.9),
                color: accentBg,
                borderRadius: '30px',
                py: 1.5,
                px: 4,
                fontSize: '0.95rem',
                fontWeight: 500,
                letterSpacing: '0.3px',
                textTransform: 'none',
                boxShadow: 'none',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: fg,
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  '& .MuiSvgIcon-root': { transform: 'translateX(4px)' },
                },
                '&:active': { transform: 'translateY(0)' },
                '&:disabled': { backgroundColor: fgAlpha(0.5), color: fgAlpha(0.6) },
                width: '100%',
                maxWidth: '300px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {status === 'sending' ? 'Envoi en cours...' : 'Envoyer le message'}
            </Button>

            {status === 'success' && (
              <Box role="status" aria-live="polite" sx={{ mt: 3, textAlign: 'center' }}>
                <Typography sx={{ color: '#4caf50', fontWeight: 600 }}>✓ Merci ! Votre message a bien été envoyé.</Typography>
              </Box>
            )}
            {status === 'error' && (
              <Box
                role="alert"
                aria-live="assertive"
                sx={{ mt: 2, textAlign: 'center', backgroundColor: 'rgba(244, 67, 54, 0.1)', borderRadius: '8px', p: 1.5 }}
              >
                <Typography sx={{ color: '#f44336', fontWeight: 500, fontSize: '0.9rem' }}>
                  ⚠ Une erreur s'est produite. Réessayez plus tard.
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Section>
  );
};

export default Contact;
