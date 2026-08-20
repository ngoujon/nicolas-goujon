import React from 'react';
import { Box, Container, Typography, Divider } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Box
      sx={{
        background: '#172845',
        color: '#e3e8ee',
        minHeight: '100vh',
        py: 5,
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h1"
          sx={{
            color: '#ffffff',
            mb: 4,
            fontSize: '2.5rem',
            fontWeight: 'bold',
            fontFamily: '"Comforta", "Roboto", "Helvetica", "Arial", sans-serif',
          }}
        >
          Politique de Confidentialité
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: 'rgba(227, 232, 238, 0.7)',
            mb: 4,
            fontSize: '0.95rem',
          }}
        >
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
        </Typography>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

        <Box sx={{ '& > * + *': { mt: 4 } }}>
          <Box>
            <Typography
              variant="h2"
              sx={{
                color: '#ffffff',
                fontSize: '1.8rem',
                fontWeight: 'bold',
                mb: 2,
                fontFamily: '"Garet", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              1. Introduction
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#e3e8ee',
                fontSize: '1rem',
                lineHeight: '1.6',
              }}
            >
              Cette Politique de Confidentialité explique comment le site nicolas-goujon.fr collecte, utilise, stocke et protège les données personnelles de ses visiteurs. Nous nous engageons à respecter votre vie privée et à être transparent quant à l'utilisation de vos données.
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="h2"
              sx={{
                color: '#ffffff',
                fontSize: '1.8rem',
                fontWeight: 'bold',
                mb: 2,
                fontFamily: '"Garet", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              2. Données Collectées
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#e3e8ee',
                fontSize: '1rem',
                lineHeight: '1.6',
                mb: 2,
              }}
            >
              Nous collectons les types de données suivants :
            </Typography>
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" sx={{ color: '#e3e8ee', mb: 1 }}>
                <strong>Données de formulaire de contact :</strong> Nom, adresse e-mail, sujet et message fournis volontairement via le formulaire de contact. Ces données sont utilisées uniquement pour vous répondre.
              </Typography>
              <Typography component="li" sx={{ color: '#e3e8ee', mb: 1 }}>
                <strong>Données techniques :</strong> Adresse IP et informations de journalisation technique, traitées par notre hébergeur pour assurer le fonctionnement et la sécurité du site.
              </Typography>
              <Typography component="li" sx={{ color: '#e3e8ee' }}>
                <strong>Ressource externe :</strong> Les icônes du site sont chargées depuis le CDN Cloudflare (cdnjs.cloudflare.com), qui peut recevoir votre adresse IP lors du chargement de cette ressource. Le site n'utilise aucun outil d'analyse d'audience (type Google Analytics) ni cookie de suivi publicitaire.
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography
              variant="h2"
              sx={{
                color: '#ffffff',
                fontSize: '1.8rem',
                fontWeight: 'bold',
                mb: 2,
                fontFamily: '"Garet", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              3. Utilisation des Données
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#e3e8ee',
                fontSize: '1rem',
                lineHeight: '1.6',
                mb: 2,
              }}
            >
              Les données collectées sont utilisées pour :
            </Typography>
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" sx={{ color: '#e3e8ee', mb: 1 }}>
                Répondre à vos demandes via le formulaire de contact
              </Typography>
              <Typography component="li" sx={{ color: '#e3e8ee' }}>
                Assurer le fonctionnement technique, la sécurité et la conformité légale du site
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography
              variant="h2"
              sx={{
                color: '#ffffff',
                fontSize: '1.8rem',
                fontWeight: 'bold',
                mb: 2,
                fontFamily: '"Garet", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              4. Partage des Données
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#e3e8ee',
                fontSize: '1rem',
                lineHeight: '1.6',
              }}
            >
              Nous ne partageons pas vos données personnelles avec des tiers, sauf :
            </Typography>
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" sx={{ color: '#e3e8ee', mb: 1 }}>
                <strong>Hébergeur du site :</strong> Traite les données techniques (adresse IP) nécessaires au fonctionnement du serveur
              </Typography>
              <Typography component="li" sx={{ color: '#e3e8ee', mb: 1 }}>
                <strong>Service d'envoi d'e-mails :</strong> Adresse e-mail utilisée pour vous répondre si vous contactez le site
              </Typography>
              <Typography component="li" sx={{ color: '#e3e8ee', mb: 1 }}>
                <strong>CDN Cloudflare (cdnjs.cloudflare.com) :</strong> Livraison des icônes du site, susceptible de recevoir votre adresse IP
              </Typography>
              <Typography component="li" sx={{ color: '#e3e8ee' }}>
                <strong>Obligations légales :</strong> Si légalement requises par les autorités compétentes
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography
              variant="h2"
              sx={{
                color: '#ffffff',
                fontSize: '1.8rem',
                fontWeight: 'bold',
                mb: 2,
                fontFamily: '"Garet", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              5. Sécurité des Données
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#e3e8ee',
                fontSize: '1rem',
                lineHeight: '1.6',
              }}
            >
              Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données personnelles contre l'accès non autorisé, la modification, la divulgation ou la destruction. Cependant, aucune méthode de transmission sur Internet n'est 100% sécurisée.
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="h2"
              sx={{
                color: '#ffffff',
                fontSize: '1.8rem',
                fontWeight: 'bold',
                mb: 2,
                fontFamily: '"Garet", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              6. Vos Droits
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#e3e8ee',
                fontSize: '1rem',
                lineHeight: '1.6',
                mb: 2,
              }}
            >
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
            </Typography>
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" sx={{ color: '#e3e8ee', mb: 1 }}>
                <strong>Droit d'accès :</strong> Demander l'accès aux données personnelles que nous détenons à votre sujet
              </Typography>
              <Typography component="li" sx={{ color: '#e3e8ee', mb: 1 }}>
                <strong>Droit de rectification :</strong> Corriger les données inexactes ou incomplètes
              </Typography>
              <Typography component="li" sx={{ color: '#e3e8ee', mb: 1 }}>
                <strong>Droit à l'oubli :</strong> Demander la suppression de vos données personnelles
              </Typography>
              <Typography component="li" sx={{ color: '#e3e8ee', mb: 1 }}>
                <strong>Droit à la limitation du traitement :</strong> Limiter le traitement de vos données
              </Typography>
              <Typography component="li" sx={{ color: '#e3e8ee', mb: 1 }}>
                <strong>Droit à la portabilité :</strong> Recevoir vos données dans un format structuré et transférable
              </Typography>
              <Typography component="li" sx={{ color: '#e3e8ee' }}>
                <strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: '#e3e8ee',
                fontSize: '1rem',
                lineHeight: '1.6',
                mt: 2,
              }}
            >
              Pour exercer ces droits, veuillez contacter nicolas.goujon18@gmail.com.
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="h2"
              sx={{
                color: '#ffffff',
                fontSize: '1.8rem',
                fontWeight: 'bold',
                mb: 2,
                fontFamily: '"Garet", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              7. Cookies
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#e3e8ee',
                fontSize: '1rem',
                lineHeight: '1.6',
              }}
            >
              Ce site n'utilise aucun cookie d'analyse d'audience ni de suivi publicitaire (pas de Google Analytics ni d'outil similaire). Seuls des cookies strictement nécessaires au fonctionnement technique du site peuvent être déposés.
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="h2"
              sx={{
                color: '#ffffff',
                fontSize: '1.8rem',
                fontWeight: 'bold',
                mb: 2,
                fontFamily: '"Garet", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              8. Liens Externes
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#e3e8ee',
                fontSize: '1rem',
                lineHeight: '1.6',
              }}
            >
              Ce site peut contenir des liens vers des sites externes. Nous ne sommes pas responsables des pratiques de confidentialité de ces sites. Nous vous recommandons de consulter leur politique de confidentialité avant de partager vos données personnelles.
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="h2"
              sx={{
                color: '#ffffff',
                fontSize: '1.8rem',
                fontWeight: 'bold',
                mb: 2,
                fontFamily: '"Garet", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              9. Modifications de cette Politique
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#e3e8ee',
                fontSize: '1rem',
                lineHeight: '1.6',
              }}
            >
              Nous nous réservons le droit de modifier cette Politique de Confidentialité à tout moment. Les modifications seront publiées sur cette page avec la date de mise à jour. Votre utilisation continue du site après les modifications constitue votre acceptation de la politique mise à jour.
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="h2"
              sx={{
                color: '#ffffff',
                fontSize: '1.8rem',
                fontWeight: 'bold',
                mb: 2,
                fontFamily: '"Garet", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              10. Contact
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#e3e8ee',
                fontSize: '1rem',
                lineHeight: '1.6',
              }}
            >
              Pour toute question concernant cette Politique de Confidentialité ou pour exercer vos droits liés aux données personnelles, veuillez nous contacter à : <strong>nicolas.goujon18@gmail.com</strong>
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

        <Typography
          variant="body2"
          sx={{
            color: 'rgba(227, 232, 238, 0.7)',
            textAlign: 'center',
            mt: 4,
          }}
        >
          © {new Date().getFullYear()} Nicolas GOUJON - Tous droits réservés.
        </Typography>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
