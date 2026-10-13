import React from 'react';
import { Box, Container, Typography, Divider, Link, useTheme } from '@mui/material';
import { getModeColors } from '../utils/colorMode';

const PrivacyPolicy = () => {
  const theme = useTheme();
  const { bg, fg, fgSecondary, fgAlpha, fgSecondaryAlpha } = getModeColors(theme.palette.mode);
  const [optedOut, setOptedOut] = React.useState(false);

  // Opposition à la mesure d'audience. Pas de `onclick` inline : la CSP
  // (`script-src` sans 'unsafe-inline') le bloquerait.
  const handleOptOut = () => {
    window.seoMonitor && window.seoMonitor.optOut();
    setOptedOut(true);
  };

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
          Politique de Confidentialité
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
              1. Introduction
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: fgSecondary,
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
                color: fg,
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
                color: fgSecondary,
                fontSize: '1rem',
                lineHeight: '1.6',
                mb: 2,
              }}
            >
              Nous collectons les types de données suivants :
            </Typography>
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" sx={{ color: fgSecondary, mb: 1 }}>
                <strong>Données de formulaire de contact :</strong> Nom, adresse e-mail, sujet et message fournis volontairement via le formulaire de contact. Ces données sont utilisées uniquement pour vous répondre.
              </Typography>
              <Typography component="li" sx={{ color: fgSecondary, mb: 1 }}>
                <strong>Données techniques :</strong> Adresse IP et informations de journalisation technique, traitées par notre hébergeur pour assurer le fonctionnement et la sécurité du site.
              </Typography>
              <Typography component="li" sx={{ color: fgSecondary, mb: 1 }}>
                <strong>Ressource externe :</strong> Les icônes du site sont chargées depuis le CDN Cloudflare (cdnjs.cloudflare.com), qui peut recevoir votre adresse IP lors du chargement de cette ressource. Le site n'utilise aucun outil d'analyse d'audience tiers (type Google Analytics) ni cookie de suivi publicitaire.
              </Typography>
              <Typography component="li" sx={{ color: fgSecondary }}>
                <strong>Données de mesure d'audience :</strong> Statistiques de fréquentation anonymes collectées par l'outil auto-hébergé SEO Monitor (voir la section « Mesure d'audience » ci-dessous).
              </Typography>
            </Box>
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
              3. Utilisation des Données
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: fgSecondary,
                fontSize: '1rem',
                lineHeight: '1.6',
                mb: 2,
              }}
            >
              Les données collectées sont utilisées pour :
            </Typography>
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" sx={{ color: fgSecondary, mb: 1 }}>
                Répondre à vos demandes via le formulaire de contact
              </Typography>
              <Typography component="li" sx={{ color: fgSecondary, mb: 1 }}>
                Établir des statistiques de fréquentation anonymes (mesure d'audience)
              </Typography>
              <Typography component="li" sx={{ color: fgSecondary }}>
                Assurer le fonctionnement technique, la sécurité et la conformité légale du site
              </Typography>
            </Box>
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
              4. Partage des Données
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: fgSecondary,
                fontSize: '1rem',
                lineHeight: '1.6',
              }}
            >
              Nous ne partageons pas vos données personnelles avec des tiers, sauf :
            </Typography>
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" sx={{ color: fgSecondary, mb: 1 }}>
                <strong>Hébergeur du site :</strong> Traite les données techniques (adresse IP) nécessaires au fonctionnement du serveur
              </Typography>
              <Typography component="li" sx={{ color: fgSecondary, mb: 1 }}>
                <strong>Service d'envoi d'e-mails :</strong> Adresse e-mail utilisée pour vous répondre si vous contactez le site
              </Typography>
              <Typography component="li" sx={{ color: fgSecondary, mb: 1 }}>
                <strong>CDN Cloudflare (cdnjs.cloudflare.com) :</strong> Livraison des icônes du site, susceptible de recevoir votre adresse IP
              </Typography>
              <Typography component="li" sx={{ color: fgSecondary }}>
                <strong>Obligations légales :</strong> Si légalement requises par les autorités compétentes
              </Typography>
            </Box>
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
              5. Sécurité des Données
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: fgSecondary,
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
                color: fg,
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
                color: fgSecondary,
                fontSize: '1rem',
                lineHeight: '1.6',
                mb: 2,
              }}
            >
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
            </Typography>
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" sx={{ color: fgSecondary, mb: 1 }}>
                <strong>Droit d'accès :</strong> Demander l'accès aux données personnelles que nous détenons à votre sujet
              </Typography>
              <Typography component="li" sx={{ color: fgSecondary, mb: 1 }}>
                <strong>Droit de rectification :</strong> Corriger les données inexactes ou incomplètes
              </Typography>
              <Typography component="li" sx={{ color: fgSecondary, mb: 1 }}>
                <strong>Droit à l'oubli :</strong> Demander la suppression de vos données personnelles
              </Typography>
              <Typography component="li" sx={{ color: fgSecondary, mb: 1 }}>
                <strong>Droit à la limitation du traitement :</strong> Limiter le traitement de vos données
              </Typography>
              <Typography component="li" sx={{ color: fgSecondary, mb: 1 }}>
                <strong>Droit à la portabilité :</strong> Recevoir vos données dans un format structuré et transférable
              </Typography>
              <Typography component="li" sx={{ color: fgSecondary }}>
                <strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: fgSecondary,
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
                color: fg,
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
                color: fgSecondary,
                fontSize: '1rem',
                lineHeight: '1.6',
              }}
            >
              Ce site n'utilise aucun cookie de suivi publicitaire ni outil d'analyse tiers (pas de Google Analytics ni d'outil similaire). Seuls des traceurs exemptés de consentement peuvent être déposés : ceux strictement nécessaires au fonctionnement technique du site (par exemple la mémorisation du thème clair / sombre), et l'identifiant <strong>sm_vid</strong> (stockage local du navigateur, first-party ; finalité : mesure d'audience SEO Monitor ; durée : 13 mois maximum ; exempté de consentement, voir la section « Mesure d'audience »). Si un outil soumis à consentement venait à être ajouté, un bandeau vous permettrait de l'accepter ou de le refuser avant tout dépôt.
            </Typography>
          </Box>

          <Box id="mesure-audience">
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
              8. Mesure d'audience
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: fgSecondary,
                fontSize: '1rem',
                lineHeight: '1.6',
                mb: 2,
              }}
            >
              Ce site utilise SEO Monitor, un outil de mesure d'audience auto-hébergé, afin d'établir des statistiques de fréquentation anonymes (pages consultées, provenance des visites, durée de consultation, type d'appareil). Ces données servent uniquement au bon fonctionnement et à l'amélioration du site.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: fgSecondary,
                fontSize: '1rem',
                lineHeight: '1.6',
                mb: 2,
              }}
            >
              Un identifiant aléatoire est conservé dans votre navigateur pendant 13 mois au maximum. Votre adresse IP n'est jamais enregistrée : elle sert uniquement, de manière éphémère, à déduire un pays et une ville approximatifs. Les données ne sont ni recoupées avec d'autres traitements, ni transmises à des tiers, et sont conservées 25 mois au maximum.
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              <Typography component="li" sx={{ color: fgSecondary, mb: 1 }}>
                <strong>Responsable du traitement :</strong> Nicolas GOUJON, éditeur du site (contact@nicolas-goujon.fr).
              </Typography>
              <Typography component="li" sx={{ color: fgSecondary, mb: 1 }}>
                <strong>Finalité :</strong> mesure d'audience du site.
              </Typography>
              <Typography component="li" sx={{ color: fgSecondary, mb: 1 }}>
                <strong>Base légale :</strong> intérêt légitime de l'éditeur ; traitement exempté de consentement au titre de l'article 82 de la loi Informatique et Libertés et des lignes directrices de la CNIL relatives aux traceurs.
              </Typography>
              <Typography component="li" sx={{ color: fgSecondary, mb: 1 }}>
                <strong>Données collectées :</strong> pages vues, provenance des visites, durée de consultation, profondeur de défilement, type d'appareil, navigateur, langue, pays et ville approximatifs. L'adresse IP n'est pas conservée.
              </Typography>
              <Typography component="li" sx={{ color: fgSecondary, mb: 1 }}>
                <strong>Durée de conservation :</strong> 25 mois maximum pour les statistiques ; 13 mois maximum pour l'identifiant navigateur (sm_vid).
              </Typography>
              <Typography component="li" sx={{ color: fgSecondary, mb: 1 }}>
                <strong>Destinataires :</strong> aucun tiers. Les données sont hébergées sur un serveur OVH situé en France.
              </Typography>
              <Typography component="li" sx={{ color: fgSecondary }}>
                <strong>Vos droits :</strong> accès, rectification, effacement, opposition et limitation, à exercer à l'adresse contact@nicolas-goujon.fr. Vous pouvez également introduire une réclamation auprès de la CNIL (<Link href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" sx={{ color: fgSecondaryAlpha(0.92), textDecoration: 'underline' }}>www.cnil.fr</Link>).
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: fgSecondary,
                fontSize: '1rem',
                lineHeight: '1.6',
              }}
            >
              Conformément aux lignes directrices de la CNIL, ce traitement est exempté de consentement. Vous pouvez néanmoins vous y opposer à tout moment :{' '}
              {optedOut ? (
                <strong role="status">Vos visites ne sont plus mesurées.</strong>
              ) : (
                <Link
                  component="button"
                  type="button"
                  onClick={handleOptOut}
                  sx={{
                    color: fgSecondaryAlpha(0.92),
                    textDecoration: 'underline',
                    fontSize: 'inherit',
                    verticalAlign: 'baseline',
                    '&:hover': { color: fgSecondary },
                  }}
                >
                  ne plus être mesuré
                </Link>
              )}
              .
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
              9. Liens Externes
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: fgSecondary,
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
                color: fg,
                fontSize: '1.8rem',
                fontWeight: 'bold',
                mb: 2,
                fontFamily: '"Garet", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              10. Modifications de cette Politique
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: fgSecondary,
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
                color: fg,
                fontSize: '1.8rem',
                fontWeight: 'bold',
                mb: 2,
                fontFamily: '"Garet", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              11. Contact
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: fgSecondary,
                fontSize: '1rem',
                lineHeight: '1.6',
              }}
            >
              Pour toute question concernant cette Politique de Confidentialité ou pour exercer vos droits liés aux données personnelles, veuillez nous contacter à : <strong>nicolas.goujon18@gmail.com</strong>
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 4, borderColor: fgAlpha(0.1) }} />

        <Typography
          variant="body2"
          sx={{
            color: fgSecondaryAlpha(0.7),
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
