import React from 'react';
import { Box, Container, Typography, Divider, Link, useTheme } from '@mui/material';
import { getModeColors } from '../utils/colorMode';

const LegalNotice = () => {
  const theme = useTheme();
  const { bg, fg, fgSecondary, fgAlpha, fgSecondaryAlpha } = getModeColors(theme.palette.mode);

  return (
    <Box
      sx={{
        background: bg,
        color: fgSecondary,
        minHeight: '100vh',
        py: 5,
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h1"
          sx={{
            color: fg,
            mb: 4,
            fontSize: '2.5rem',
            fontWeight: 'bold',
            fontFamily: '"Comforta", "Roboto", "Helvetica", "Arial", sans-serif',
          }}
        >
          Mentions Légales
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: fgSecondaryAlpha(0.7),
            mb: 4,
            fontSize: '0.95rem',
          }}
        >
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
        </Typography>

        <Divider sx={{ my: 4, borderColor: fgAlpha(0.1) }} />

        <Box sx={{ '& > * + *': { mt: 4 } }}>
          <Box>
            <Typography
              variant="h2"
              sx={{
                color: fg,
                fontSize: '1.8rem',
                fontWeight: 'bold',
                mb: 2,
                fontFamily: '"Garet", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              Éditeur du site
            </Typography>
            <Typography sx={{ color: fgSecondary, lineHeight: 1.8 }}>
              <strong>Nom :</strong> Nicolas GOUJON<br />
              <strong>Statut :</strong> Développeur indépendant<br />
              <strong>Adresse :</strong> France<br />
              <strong>Email :</strong>{' '}
              <Link
                href="mailto:contact@nicolas-goujon.fr"
                sx={{
                  color: fgSecondaryAlpha(0.92),
                  textDecoration: 'underline',
                  '&:hover': { color: fgSecondary },
                }}
              >
                contact@nicolas-goujon.fr
              </Link>
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="h2"
              sx={{
                color: fg,
                fontSize: '1.8rem',
                fontWeight: 'bold',
                mb: 2,
                fontFamily: '"Garet", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              Hébergeur
            </Typography>
            <Typography sx={{ color: fgSecondary, lineHeight: 1.8 }}>
              Le site est hébergé sur une infrastructure moderne utilisant Docker et Nginx.
              L'infrastructure technique est basée sur :<br />
              <strong>Frontend :</strong> React (Create React App)<br />
              <strong>Backend :</strong> API Laravel<br />
              <strong>Serveur web :</strong> Nginx<br />
              Pour toute question concernant l'hébergement, veuillez contacter l'éditeur du site.
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="h2"
              sx={{
                color: fg,
                fontSize: '1.8rem',
                fontWeight: 'bold',
                mb: 2,
                fontFamily: '"Garet", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              Responsable de publication
            </Typography>
            <Typography sx={{ color: fgSecondary, lineHeight: 1.8 }}>
              <strong>Nom :</strong> Nicolas GOUJON<br />
              Le responsable de publication est le même que l'éditeur du site. Pour toute question ou réclamation, veuillez nous contacter à l'adresse email ci-dessus.
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="h2"
              sx={{
                color: fg,
                fontSize: '1.8rem',
                fontWeight: 'bold',
                mb: 2,
                fontFamily: '"Garet", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              Contact
            </Typography>
            <Typography sx={{ color: fgSecondary, lineHeight: 1.8 }}>
              Pour toute demande d'information, correction, ou réclamation, vous pouvez nous contacter via :<br />
              <strong>Email :</strong>{' '}
              <Link
                href="mailto:contact@nicolas-goujon.fr"
                sx={{
                  color: fgSecondaryAlpha(0.92),
                  textDecoration: 'underline',
                  '&:hover': { color: fgSecondary },
                }}
              >
                contact@nicolas-goujon.fr
              </Link>
              <br />
              <strong>Formulaire de contact :</strong> Disponible via la section <Link href="/#contact" sx={{ color: fgSecondaryAlpha(0.92), textDecoration: 'underline', '&:hover': { color: fgSecondary } }}>Contact</Link> du site
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="h2"
              sx={{
                color: fg,
                fontSize: '1.8rem',
                fontWeight: 'bold',
                mb: 2,
                fontFamily: '"Garet", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              Propriété intellectuelle
            </Typography>
            <Typography sx={{ color: fgSecondary, lineHeight: 1.8 }}>
              L'ensemble des contenus présents sur ce site (textes, images, logos, etc.) sont la propriété de Nicolas GOUJON ou de tiers ayant autorisé leur utilisation.<br />
              <br />
              La reproduction, modification, distribution, transmission ou utilisation de ces contenus, en totalité ou en partie, sans autorisation préalable est interdite.
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="h2"
              sx={{
                color: fg,
                fontSize: '1.8rem',
                fontWeight: 'bold',
                mb: 2,
                fontFamily: '"Garet", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              Liens externes
            </Typography>
            <Typography sx={{ color: fgSecondary, lineHeight: 1.8 }}>
              Ce site peut contenir des liens vers d'autres sites externes. Nicolas GOUJON n'est pas responsable du contenu de ces sites externes et décline toute responsabilité quant à leur disponibilité et leur contenu.
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="h2"
              sx={{
                color: fg,
                fontSize: '1.8rem',
                fontWeight: 'bold',
                mb: 2,
                fontFamily: '"Garet", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              Limitation de responsabilité
            </Typography>
            <Typography sx={{ color: fgSecondary, lineHeight: 1.8 }}>
              Ce site est fourni "tel quel" sans garantie d'aucune sorte. Nicolas GOUJON décline toute responsabilité en cas de dysfonctionnement, d'indisponibilité du site ou de dommages résultant de son utilisation.
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="h2"
              sx={{
                color: fg,
                fontSize: '1.8rem',
                fontWeight: 'bold',
                mb: 2,
                fontFamily: '"Garet", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              Données personnelles
            </Typography>
            <Typography sx={{ color: fgSecondary, lineHeight: 1.8 }}>
              Pour toute information concernant le traitement de vos données personnelles, veuillez consulter notre <Link href="/politique-confidentialite" sx={{ color: fgSecondaryAlpha(0.92), textDecoration: 'underline', '&:hover': { color: fgSecondary } }}>Politique de Confidentialité</Link>.
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="h2"
              sx={{
                color: fg,
                fontSize: '1.8rem',
                fontWeight: 'bold',
                mb: 2,
                fontFamily: '"Garet", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              Réseaux sociaux
            </Typography>
            <Typography sx={{ color: fgSecondary, lineHeight: 1.8 }}>
              Ce site dispose de liens vers les profils LinkedIn et GitHub de Nicolas GOUJON. Ces plateformes externes sont régies par leurs propres conditions d'utilisation.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LegalNotice;
