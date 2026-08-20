import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, Box, Grid, Button, TextField, useTheme, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { BsAward, BsBookmarkCheck, BsMortarboard, BsPatchCheck } from "react-icons/bs";
import "bootstrap-icons/font/bootstrap-icons.css";
import { logger } from '../utils/logger';

const CONTACT_API_URL = process.env.REACT_APP_CONTACT_API_URL || '/api/contact';

// Composants stylisés
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
  }
}));

const ProjectCard = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const ContactInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const ContactIcon = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const ContactLabel = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
}));

// Hero Section améliorée
const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100vh',
  minHeight: '600px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: 'url(/images/background/background.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    height: '100vh',
    minHeight: '500px',
    backgroundAttachment: 'scroll',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    height: '100vh',
    minHeight: '600px',
  },
  [theme.breakpoints.up('lg')]: {
    height: '100vh',
    minHeight: '700px',
  }
}));

const HeroOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(to bottom, rgba(23, 40, 69, 0.7), rgba(23, 40, 69, 0.4))',
  zIndex: 1,
}));

const HeroContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  textAlign: 'center',
  textShadow: '0 2px 8px rgba(0,0,0,0.45)',
  padding: theme.spacing(4),
  width: '100%',
  height: '100%',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const HeroName = styled(Typography)(({ theme }) => ({
  fontSize: '2.8rem',
  fontWeight: 700,
  marginBottom: theme.spacing(1),
  letterSpacing: '1px',
  textShadow: '0 2px 8px rgba(0,0,0,0.45)',
  fontFamily: 'Comforta',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    fontSize: '2.4rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '3.2rem',
  }
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.3rem',
  fontWeight: 400,
  marginBottom: theme.spacing(4),
  textShadow: '0 2px 8px rgba(0,0,0,0.45)',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
    marginBottom: theme.spacing(2),
  },
  [theme.breakpoints.between('sm', 'md')]: {
    fontSize: '1.2rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '1.5rem',
  }
}));

const ChipTag = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  background: 'rgba(23,40,69,0.08)',
  color: '#172845',
  fontSize: '0.85rem',
  fontWeight: 500,
  borderRadius: '16px',
  padding: '2px 14px',
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
  letterSpacing: '0.5px',
}));

const CitationBox = styled(Box)(({ theme }) => ({
  background: 'white',
  borderRadius: '24px',
  boxShadow: '0 4px 24px 0 rgba(23,40,69,0.10)',
  display: 'flex',
  alignItems: 'flex-start',
  padding: theme.spacing(4),
  marginTop: theme.spacing(7),
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
    boxShadow: '-3px 3px 5px rgba(23,40,69,0.05)',
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    '&::before': {
      left: '50%',
      top: '-10px',
      transform: 'translateX(-50%) rotate(45deg)',
    }
  },
}));

const CitationImg = styled('div')(() => ({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  border: '3px solid white',
  boxShadow: '0 4px 24px rgba(23,40,69,0.15)',
  marginRight: '24px',
  flexShrink: 0,
  position: 'relative',
  top: '-20px',
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
  }
}));

const CitationContent = styled(Box)(({ theme }) => ({
  flex: 1,
}));

const CitationHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const CitationName = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  fontWeight: 600,
  color: '#172845',
}));

const CitationDate = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  color: 'rgba(23,40,69,0.6)',
}));

const CitationText = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  color: '#172845',
  lineHeight: 1.6,
  position: 'relative',
  textAlign: 'justify',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
    textAlign: 'justify',
  },
}));

/**
 * Composant principal de la page d'accueil
 * Gère l'affichage des différentes sections et le formulaire de contact
 */
const Home = () => {
  const [formStatus, setFormStatus] = useState('idle');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showScrollArrow, setShowScrollArrow] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website: '', // honeypot : champ invisible pour les humains, souvent auto-rempli par les bots
  });
  const theme = useTheme();

  // Horodatage d'affichage du formulaire, utilisé pour détecter une soumission trop rapide (bot).
  const formRenderedAtRef = useRef(Date.now());

  useEffect(() => {
    const path = window.location.pathname.substring(1);
    if (path && path !== '') {
      const element = document.getElementById(path);
      if (element) {
        const offset = 100; // Hauteur de la navbar + marge de sécurité
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollArrow(false);
      } else {
        setShowScrollArrow(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Gère les changements dans les champs du formulaire
   * @param {Event} e - Événement de changement
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleOptionClick = (option) => {
    setSelectedOptions(prevOptions => {
      if (prevOptions.includes(option)) {
        return prevOptions.filter(opt => opt !== option);
      } else {
        return [...prevOptions, option];
      }
    });
  };

  /**
   * Gère la soumission du formulaire de contact
   * @param {Event} e - Événement de soumission du formulaire
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormStatus('sending');

    try {
      const res = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subjects: selectedOptions.length > 0 ? selectedOptions : undefined,
          website: formData.website,
          elapsed_ms: Date.now() - formRenderedAtRef.current,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || `Erreur ${res.status}`);
      }

      setFormStatus('success');
      setFormData({ name: '', email: '', message: '', website: '' });
      setSelectedOptions([]);
      formRenderedAtRef.current = Date.now();

      setTimeout(() => {
        setFormStatus(null);
      }, 5000);
    } catch (error) {
      logger.logError(error, 'Contact Form Submission');
      setFormStatus('error');

      setTimeout(() => {
        setFormStatus(null);
      }, 5000);
    }
  };

  return (
    <Box>
      {/* Hero Section améliorée */}
      <HeroSection aria-label="Section d'accueil avec image de fond représentant un espace de travail moderne">
        <HeroOverlay />
        <HeroContent>
          <HeroName component="h1">Nicolas GOUJON</HeroName>
          <HeroTitle>Développeur Web & Product Owner</HeroTitle>
          {/*<HeroCvButton
            variant="contained"
            href="/docs/CV_Nicolas-GOUJON.pdf"
            target="_blank"
          >
            Consulter mon CV
          </HeroCvButton>
          */}
        </HeroContent>
        {showScrollArrow && (
          <Box className="scroll-arrow">
            <KeyboardArrowDownIcon />
          </Box>
        )}
      </HeroSection>

      {/* Section Expérience */}
      <Box id="experience" sx={{ 
        pt: { xs: 8, sm: 8, md: 8 },
        pb: { xs: 8, sm: 10, md: 12 },
        backgroundColor: '#fff',
        scrollMarginTop: '100px'
      }}>
        <Container>
          <SectionTitle component="h2" sx={{ color: '#172845' }}>EXPÉRIENCE</SectionTitle>
          <Grid container spacing={{ xs: 2, sm: 4, md: 6 }} justifyContent="center">
            {/* Bloc Création de sites internet */}
            <Grid item xs={12} md={6}>
              <ProjectCard sx={{
                height: '100%',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0 8px 32px rgba(23, 40, 69, 0.2)',
                }
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  p: 4,
                  height: '100%'
                }}>
                  <Box sx={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: 'rgba(23, 40, 69, 0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3
                  }}>
                    <i className="bi bi-code-square" style={{ fontSize: '40px', color: '#172845' }}></i>
                  </Box>
                  <Typography variant="h3" sx={{
                    color: '#172845',
                    mb: 3,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: { xs: '1.8rem', md: '2rem' }
                  }}>
                    Applications web
                  </Typography>
                  <Typography sx={{ 
                    color: '#172845',
                    textAlign: 'justify',
                    lineHeight: 1.8,
                    fontSize: '1.1rem',
                    mb: 3
                  }}>
                    Fort d'une solide expérience, je maîtrise la création de sites internet variés :
                  </Typography>
                  <Box sx={{ 
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                  }}>
                    {[
                      { icon: 'bi-layout-wtf', text: 'Sites vitrines modernes et responsives avec React, Next.js' },
                      { icon: 'bi-database', text: 'Applications web complexes avec gestion de base de données et API REST' },
                      { icon: 'bi-cart', text: 'Solutions e-commerce avec intégration de paiement sécurisé' },
                      { icon: 'bi-file-earmark-text', text: 'Sites institutionnels avec gestion de contenu (CMS)' },
                      { icon: 'bi-phone', text: 'Applications web progressives (PWA) pour une expérience mobile optimale' }
                    ].map((item, index) => (
                      <Box key={index} sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 1,
                        borderRadius: '8px',
                        transition: 'background-color 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(23, 40, 69, 0.05)'
                        }
                      }}>
                        <i className={`bi ${item.icon}`} style={{ fontSize: '24px', color: '#172845' }}></i>
                        <Typography sx={{ 
                          color: '#172845',
                          fontSize: '1rem',
                          textAlign: 'justify'
                        }}>
                          {item.text}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  <Typography sx={{ 
                    color: '#172845',
                    textAlign: 'justify',
                    mt: 4,
                    fontStyle: 'italic',
                    fontSize: '1rem'
                  }}>
                    Je m'efforce de suivre les meilleures pratiques en matière de développement, en accordant une attention particulière à la sécurité, l'accessibilité et les performances.
                  </Typography>
                </Box>
              </ProjectCard>
            </Grid>

            {/* Bloc Programme IA */}
            <Grid item xs={12} md={6}>
              <ProjectCard sx={{
                height: '100%',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0 8px 32px rgba(23, 40, 69, 0.2)',
                }
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  p: 4,
                  height: '100%'
                }}>
                  <Box sx={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: 'rgba(23, 40, 69, 0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3
                  }}>
                    <i className="bi bi-cpu" style={{ fontSize: '40px', color: '#172845' }}></i>
                  </Box>
                  <Typography variant="h3" sx={{
                    color: '#172845',
                    mb: 3,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: { xs: '1.8rem', md: '2rem' }
                  }}>
                  Solutions IA
                  </Typography>
                  <Typography sx={{ 
                    color: '#172845',
                    textAlign: 'justify',
                    lineHeight: 1.8,
                    fontSize: '1.1rem',
                    mb: 3
                  }}>
                    Je maîtrise différentes technologies d'intelligence artificielle :
                  </Typography>
                  <Box sx={{ 
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                  }}>
                    {[
                      { icon: 'bi-mic', text: 'Intégration d\'OpenAI pour des solutions de Text-to-Speech (TTS) avancées' },
                      { icon: 'bi-chat-dots', text: 'Développement de chatbots intelligents utilisant l\'API ChatGPT' },
                      { icon: 'bi-image', text: 'Création d\'applications avec DALL-E pour la génération d\'images' },
                      { icon: 'bi-palette', text: 'Utilisation de Stable Diffusion pour la génération et la manipulation d\'images' },
                      { icon: 'bi-hdd-network', text: 'Déploiement local de modèles Mistral 8x7B pour des applications IA autonomes' }
                    ].map((item, index) => (
                      <Box key={index} sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 1,
                        borderRadius: '8px',
                        transition: 'background-color 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(23, 40, 69, 0.05)'
                        }
                      }}>
                        <i className={`bi ${item.icon}`} style={{ fontSize: '24px', color: '#172845' }}></i>
                        <Typography sx={{ 
                          color: '#172845',
                          fontSize: '1rem',
                          textAlign: 'justify'
                        }}>
                          {item.text}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  <Typography sx={{ 
                    color: '#172845',
                    textAlign: 'justify',
                    mt: 4,
                    fontStyle: 'italic',
                    fontSize: '1rem'
                  }}>
                    Ces expériences m'ont permis d'acquérir une bonne compréhension des possibilités offertes par l'IA et de son intégration dans le développement web.
                  </Typography>
                </Box>
              </ProjectCard>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Section Stack */}
      <Box id="stack" sx={{ 
        pt: { xs: 6, sm: 8, md: 8 },
        pb: { xs: 6, sm: 10, md: 12 },
        backgroundColor: '#172845',
        scrollMarginTop: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <SectionTitle component="h2" sx={{ color: 'white' }}>STACK</SectionTitle>
          
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '1200px'
          }}>
            {/* Première ligne */}
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
                lg: 'repeat(4, 1fr)'
              },
              gap: { 
                xs: 2,
                sm: 3,
                md: 6,
                lg: 8
              },
              width: '100%'
            }}>
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              py: { xs: 1.5, sm: 0 }
            }}>
              <Box sx={{ 
                color: 'white', 
                mb: { xs: 1.5, sm: 3, md: 4 },
                height: { xs: 44, sm: 52, md: 60 },
                width: { xs: 44, sm: 52, md: 60 },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: { xs: '32px', sm: '40px', md: '48px' }
              }}>
                <i className="bi bi-front" style={{ fontSize: '1em' }}></i>
              </Box>
              <Typography sx={{ 
                color: 'white', 
                mb: { xs: 1, sm: 2 }, 
                fontSize: { xs: '1.15rem', sm: '1.5rem', md: '1.8rem' },
                fontFamily: 'Stop',
                fontWeight: '500',
                textAlign: 'center',
                width: '100%',
                whiteSpace: { xs: 'normal', md: 'nowrap' }
              }} component="h3">Front-End</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 0.5, sm: 1 }, alignItems: 'center' }}>
              <Typography sx={{ color: 'white', opacity: 0.7, fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1rem' }, fontFamily: 'Garet' }}>React JS</Typography>
              <Typography sx={{ color: 'white', opacity: 0.7, fontSize: '1rem', fontFamily: 'Garet' }}>Next.js</Typography>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1rem' }, fontFamily: 'Garet' }}>HTML & CSS</Typography>
              </Box>
            </Box>

            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              py: { xs: 1.5, sm: 0 }
            }}>
              <Box sx={{ 
                color: 'white', 
                mb: { xs: 1.5, sm: 3, md: 4 },
                height: { xs: 44, sm: 52, md: 60 },
                width: { xs: 44, sm: 52, md: 60 },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: { xs: '32px', sm: '40px', md: '48px' }
              }}>
                <i className="bi bi-back" style={{ fontSize: '1em' }}></i>
              </Box>
              <Typography sx={{ 
                color: 'white', 
                mb: { xs: 1, sm: 2 }, 
                fontSize: { xs: '1.15rem', sm: '1.5rem', md: '1.8rem' },
                fontFamily: 'Stop',
                fontWeight: '500',
                textAlign: 'center',
                width: '100%',
                whiteSpace: { xs: 'normal', md: 'nowrap' }
              }} component="h3">Back-End</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 0.5, sm: 1 }, alignItems: 'center' }}>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1rem' }, fontFamily: 'Garet' }}>PHP & SQL</Typography>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1rem' }, fontFamily: 'Garet' }}>API REST</Typography>
              </Box>
            </Box>

            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              py: { xs: 1.5, sm: 0 }
            }}>
              <Box sx={{ 
                color: 'white', 
                mb: { xs: 1.5, sm: 3, md: 4 },
                height: { xs: 44, sm: 52, md: 60 },
                width: { xs: 44, sm: 52, md: 60 },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: { xs: '32px', sm: '40px', md: '48px' }
              }}>
                <i className="bi bi-layout-wtf" style={{ fontSize: '1em' }}></i>
              </Box>
              <Typography sx={{ 
                color: 'white', 
                mb: { xs: 1, sm: 2 }, 
                fontSize: { xs: '1.15rem', sm: '1.5rem', md: '1.8rem' },
                fontFamily: 'Stop',
                fontWeight: '500',
                textAlign: 'center',
                width: '100%',
                whiteSpace: { xs: 'normal', md: 'nowrap' }
              }} component="h3">Design</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 0.5, sm: 1 }, alignItems: 'center' }}>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1rem' }, fontFamily: 'Garet' }}>Security by Design</Typography>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1rem' }, fontFamily: 'Garet' }}>Adobe XD</Typography>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1rem' }, fontFamily: 'Garet' }}>UI & UX</Typography>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1rem' }, fontFamily: 'Garet' }}>Responsive</Typography>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1rem' }, fontFamily: 'Garet' }}>Figma</Typography>
              </Box>
            </Box>

            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              py: { xs: 1.5, sm: 0 }
            }}>
              <Box sx={{ 
                color: 'white', 
                mb: { xs: 1.5, sm: 3, md: 4 },
                height: { xs: 44, sm: 52, md: 60 },
                width: { xs: 44, sm: 52, md: 60 },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: { xs: '32px', sm: '40px', md: '48px' }
              }}>
                <i className="bi bi-list-ol" style={{ fontSize: '1em' }}></i>
              </Box>
              <Typography sx={{ 
                color: 'white', 
                mb: { xs: 1, sm: 2 }, 
                fontSize: { xs: '1.15rem', sm: '1.5rem', md: '1.8rem' },
                fontFamily: 'Stop',
                fontWeight: '500',
                textAlign: 'center',
                width: '100%',
                whiteSpace: { xs: 'normal', md: 'nowrap' }
              }} component="h3">Référencement</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 0.5, sm: 1 }, alignItems: 'center' }}>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1rem' }, fontFamily: 'Garet' }}>Google Analytics</Typography>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1rem' }, fontFamily: 'Garet' }}>SEO - SEA - SMO</Typography>
              </Box>
            </Box>
            </Box>

            <Divider sx={{ 
              my: { xs: 2, sm: 3, md: 6, lg: 8 },
              borderColor: 'rgba(255, 255, 255, 0.1)',
              width: '100%'
            }} />

            {/* Deuxième ligne */}
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
                lg: 'repeat(4, 1fr)'
              },
              gap: { 
                xs: 2,
                sm: 3,
                md: 6,
                lg: 8
              },
              width: '100%'
            }}>
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              py: { xs: 1.5, sm: 0 }
            }}>
              <Box sx={{ 
                color: 'white', 
                mb: { xs: 1.5, sm: 3, md: 4 },
                height: { xs: 44, sm: 52, md: 60 },
                width: { xs: 44, sm: 52, md: 60 },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: { xs: '32px', sm: '40px', md: '48px' }
              }}>
                <i className="bi bi-cpu" style={{ fontSize: '1em' }}></i>
              </Box>
              <Typography sx={{ 
                color: 'white', 
                mb: { xs: 1, sm: 2 }, 
                fontSize: { xs: '1.15rem', sm: '1.5rem', md: '1.8rem' },
                fontFamily: 'Stop',
                fontWeight: '500',
                textAlign: 'center',
                width: '100%',
                whiteSpace: { xs: 'normal', md: 'nowrap' }
              }} component="h3">I.A</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 0.5, sm: 1 }, alignItems: 'center' }}>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1rem' }, fontFamily: 'Garet' }}>Stable Diffusion</Typography>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1rem' }, fontFamily: 'Garet' }}>Open AI</Typography>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1rem' }, fontFamily: 'Garet' }}>Mistral</Typography>
              </Box>
            </Box>

            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              py: { xs: 1.5, sm: 0 }
            }}>
              <Box sx={{ 
                color: 'white', 
                mb: { xs: 1.5, sm: 3, md: 4 },
                height: { xs: 44, sm: 52, md: 60 },
                width: { xs: 44, sm: 52, md: 60 },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: { xs: '32px', sm: '40px', md: '48px' }
              }}>
                <i className="bi bi-bar-chart-steps" style={{ fontSize: '1em' }}></i>
              </Box>
              <Typography sx={{ 
                color: 'white', 
                mb: { xs: 1, sm: 2 }, 
                fontSize: { xs: '1.15rem', sm: '1.5rem', md: '1.8rem' },
                fontFamily: 'Stop',
                fontWeight: '500',
                textAlign: 'center',
                width: '100%',
                whiteSpace: { xs: 'normal', md: 'nowrap' }
              }} component="h3">Agile</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 0.5, sm: 1 }, alignItems: 'center' }}>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1rem' }, fontFamily: 'Garet' }}>Jira</Typography>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1rem' }, fontFamily: 'Garet' }}>Trello</Typography>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1rem' }, fontFamily: 'Garet' }}>MindView</Typography>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1rem' }, fontFamily: 'Garet' }}>Gantt</Typography>
              </Box>
            </Box>

            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              py: { xs: 1.5, sm: 0 }
            }}>
              <Box sx={{ 
                color: 'white', 
                mb: { xs: 1.5, sm: 3, md: 4 },
                height: { xs: 44, sm: 52, md: 60 },
                width: { xs: 44, sm: 52, md: 60 },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: { xs: '32px', sm: '40px', md: '48px' }
              }}>
                <i className="bi bi-terminal" style={{ fontSize: '1em' }}></i>
              </Box>
              <Typography sx={{ 
                color: 'white', 
                mb: { xs: 1, sm: 2 }, 
                fontSize: { xs: '1.15rem', sm: '1.5rem', md: '1.8rem' },
                fontFamily: 'Stop',
                fontWeight: '500',
                textAlign: 'center',
                width: '100%',
                whiteSpace: { xs: 'normal', md: 'nowrap' }
              }} component="h3">DevOps</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 0.5, sm: 1 }, alignItems: 'center' }}>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1rem' }, fontFamily: 'Garet' }}>Docker</Typography>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1rem' }, fontFamily: 'Garet' }}>Git</Typography>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1rem' }, fontFamily: 'Garet' }}>GitHub</Typography>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1rem' }, fontFamily: 'Garet' }}>GitLab</Typography>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1rem' }, fontFamily: 'Garet' }}>Vultr</Typography>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1rem' }, fontFamily: 'Garet' }}>OVH</Typography>
              </Box>
            </Box>

            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              py: { xs: 1.5, sm: 0 }
            }}>
              <Box sx={{ 
                color: 'white', 
                mb: { xs: 1.5, sm: 3, md: 4 },
                height: { xs: 44, sm: 52, md: 60 },
                width: { xs: 44, sm: 52, md: 60 },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: { xs: '32px', sm: '40px', md: '48px' }
              }}>
                <i className="bi bi-gear" style={{ fontSize: '1em' }}></i>
              </Box>
              <Typography sx={{ 
                color: 'white', 
                mb: { xs: 1, sm: 2 }, 
                fontSize: { xs: '1.15rem', sm: '1.5rem', md: '1.8rem' },
                fontFamily: 'Stop',
                fontWeight: '500',
                textAlign: 'center',
                width: '100%',
                whiteSpace: { xs: 'normal', md: 'nowrap' }
              }} component="h3">Engineering</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 0.5, sm: 1 }, alignItems: 'center' }}>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1rem' }, fontFamily: 'Garet' }}>Application Web / SaaS</Typography>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1rem' }, fontFamily: 'Garet' }}>UML Diagram</Typography>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1rem' }, fontFamily: 'Garet' }}>Conception logigramme</Typography>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1rem' }, fontFamily: 'Garet' }}>Rédaction MU</Typography>
              </Box>
            </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Section Formation */}
      <Box id="formation" sx={{ 
        pt: { xs: 8, sm: 8, md: 8 },
        pb: { xs: 8, sm: 10, md: 12 },
        background: 'white',
        scrollMarginTop: '100px'
      }}>
        <Container>
          <SectionTitle component="h2" sx={{ color: '#172845' }}>FORMATION</SectionTitle>
          <Grid container spacing={{ 
            xs: 2,
            sm: 3,
            md: 4,
            lg: 4
          }} justifyContent="center">
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box sx={{
                background: 'white',
                borderRadius: 3,
                boxShadow: '0 4px 24px 0 rgba(23,40,69,0.10)',
                p: {
                  xs: 2,
                  sm: 2.5,
                  md: 3,
                  lg: 3
                },
                textAlign: 'center',
                transition: '0.2s',
                height: '100%',
                '&:hover': { 
                  boxShadow: '0 8px 32px 0 rgba(23,40,69,0.18)', 
                  transform: 'scale(1.04)',
                  [theme.breakpoints.down('sm')]: {
                    transform: 'scale(1.02)'
                  }
                }
              }}>
                <BsPatchCheck size={40} color="#172845" style={{ marginBottom: 12 }} />
                <Typography variant="h6" component="h3" sx={{ color: '#172845', fontWeight: 700 }}>Certification PSPO 1</Typography>
                <Typography sx={{ color: '#172845' }}>Scrum.org</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box sx={{
                background: 'white',
                borderRadius: 3,
                boxShadow: '0 4px 24px 0 rgba(23,40,69,0.10)',
                p: {
                  xs: 2,
                  sm: 2.5,
                  md: 3,
                  lg: 3
                },
                textAlign: 'center',
                transition: '0.2s',
                height: '100%',
                '&:hover': { 
                  boxShadow: '0 8px 32px 0 rgba(23,40,69,0.18)', 
                  transform: 'scale(1.04)',
                  [theme.breakpoints.down('sm')]: {
                    transform: 'scale(1.02)'
                  }
                }
              }}>
                <BsAward size={40} color="#172845" style={{ marginBottom: 12 }} />
                <Typography variant="h6" component="h3" sx={{ color: '#172845', fontWeight: 700 }}>Titre Professionnel</Typography>
                <Typography sx={{ color: '#172845' }}>Développeur web et web mobile</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box sx={{
                background: 'white',
                borderRadius: 3,
                boxShadow: '0 4px 24px 0 rgba(23,40,69,0.10)',
                p: {
                  xs: 2,
                  sm: 2.5,
                  md: 3,
                  lg: 3
                },
                textAlign: 'center',
                transition: '0.2s',
                height: '100%',
                '&:hover': { 
                  boxShadow: '0 8px 32px 0 rgba(23,40,69,0.18)', 
                  transform: 'scale(1.04)',
                  [theme.breakpoints.down('sm')]: {
                    transform: 'scale(1.02)'
                  }
                }
              }}>
                <BsBookmarkCheck size={40} color="#172845" style={{ marginBottom: 12 }} />
                <Typography variant="h6" component="h3" sx={{ color: '#172845', fontWeight: 700 }}>Brevet de Technicien Supérieur</Typography>
                <Typography sx={{ color: '#172845' }}>Système Numérique Élec. & Com.</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box sx={{
                background: 'white',
                borderRadius: 3,
                boxShadow: '0 4px 24px 0 rgba(23,40,69,0.10)',
                p: {
                  xs: 2,
                  sm: 2.5,
                  md: 3,
                  lg: 3
                },
                textAlign: 'center',
                transition: '0.2s',
                height: '100%',
                '&:hover': { 
                  boxShadow: '0 8px 32px 0 rgba(23,40,69,0.18)', 
                  transform: 'scale(1.04)',
                  [theme.breakpoints.down('sm')]: {
                    transform: 'scale(1.02)'
                  }
                }
              }}>
                <BsMortarboard size={40} color="#172845" style={{ marginBottom: 12 }} />
                <Typography variant="h6" component="h3" sx={{ color: '#172845', fontWeight: 700 }}>Baccalauréat</Typography>
                <Typography sx={{ color: '#172845' }}>STI2D - SIN</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Section Bio */}
      <Box id="bio" sx={{ 
        pt: { xs: 8, sm: 8, md: 8 },
        pb: { xs: 8, sm: 10, md: 12 },
        backgroundColor: '#172845',
        scrollMarginTop: '100px'
      }}>
        <Container>
          <SectionTitle component="h2" sx={{ color: 'white' }}>BIO</SectionTitle>
          
          {/* Citation Box */}
          <Grid container justifyContent="center" sx={{ mb: 7, px: 2 }}>
            <Grid item xs={12}>
              <CitationBox>
                <CitationImg 
                  style={{ backgroundImage: 'url(/images/profil.jpg)' }} 
                  role="img"
                  aria-label="Photo de profil de Nicolas GOUJON"
                />
                <CitationContent>
                  <CitationHeader>
                    <CitationName>Nicolas GOUJON</CitationName>
                    <CitationDate>Développeur Web & Product Owner</CitationDate>
                  </CitationHeader>
                  <CitationText sx={{
                    textAlign: 'justify',
                    fontSize: '1rem',
                    lineHeight: 1.6
                  }}>
                    Passionné d'informatique depuis toujours, je me suis naturellement orienté vers la programmation web. Ce domaine représente pour moi l'innovation et les dernières avancées technologiques. J'ai donc décidé de faire de mon hobby un métier et je me suis lancé dans la création de sites internet professionnels.
                  </CitationText>
                </CitationContent>
              </CitationBox>
            </Grid>
          </Grid>

          {/* Premier bloc de texte */}
          <Grid container spacing={{ xs: 2, sm: 4, md: 6 }} alignItems="center">
            <Grid item xs={12}>
              <Typography variant="body1" paragraph sx={{ 
                color: 'white', 
                fontSize: '1rem',
                mb: 2,
                textAlign: 'justify',
                lineHeight: 1.6
              }}>
                Mon expérience dans la conception de logiciels SaaS m'a permis de développer une expertise technique et relationnelle. À travers plusieurs projets, notamment sur les phases de conception et de développement, j'ai pu mettre en place des outils et processus de qualité. <br/>
                <br/>
                J'ai également assuré le suivi et l'accompagnement des projets dans le temps, en restant à l'écoute des besoins clients pour faire évoluer les solutions. Cette collaboration directe avec les utilisateurs m'a appris à bien comprendre leurs attentes et à adapter les logiciels aux contraintes propres à chaque projet.<br/>
                <br/>
                Mon parcours en conception de sites web m'a permis de prendre en charge l'ensemble des étapes d'un projet, de la définition des besoins jusqu'à la maintenance. En tant qu'indépendant, j'ai également géré tous les aspects liés à la micro-entreprise : finance, administratif, organisation.<br/>
                <br/>
                Au fil des missions, j'ai accompagné des clients très variés : associations, entreprises et particuliers, avec des contextes, des équipes et des contraintes toujours différentes. Cette diversité m'a appris à m'adapter rapidement et à faire face aux imprévus avec efficacité
              </Typography>
              <Typography variant="body1" sx={{ 
                color: 'white', 
                fontSize: '1rem',
                mt: 4,
                mb: 2,
                textAlign: 'justify',
                lineHeight: 1.6
              }}>
                Aujourd'hui, je poursuis cette aventure à travers ma micro-entreprise :
              </Typography>
              <Box sx={{
                borderRadius: 2,
                overflow: 'hidden',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.18)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                }
              }}>
                {/* Zone logo : même bleu que la section (logo blanc visible) */}
                <Box sx={{
                  backgroundColor: '#172845',
                  py: { xs: 2.5, md: 3 },
                  px: { xs: 2.5, md: 3 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  gap: 2,
                  minWidth: { md: 220 },
                  flexShrink: 0
                }}>
                  <Box
                    component="img"
                    src="/images/qwebty/logo-v2-hd-blanc.png"
                    alt="Logo Qwebty - Agence Web & Digital"
                    sx={{
                      height: { xs: 40, sm: 46 },
                      width: 'auto',
                      objectFit: 'contain',
                      display: 'block'
                    }}
                  />
                  <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                    <Typography sx={{ color: 'white', fontSize: '1.05rem', fontWeight: 600, letterSpacing: '0.02em' }}>
                      Qwebty
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', mt: 0.25 }}>
                      Agence Web & Digital
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{
                  p: { xs: 2.5, md: 3 },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 2
                }}>
                  <Typography sx={{
                    color: 'rgba(255, 255, 255, 0.92)',
                    textAlign: 'justify',
                    lineHeight: 1.75,
                    fontSize: '0.98rem'
                  }}>
                    Qwebty accompagne les entreprises et indépendants dans la création de solutions web sur mesure. Du site vitrine aux projets plus complexes, j'allie design, performance et expérience utilisateur pour développer des outils efficaces, adaptés aux objectifs de chaque client.
                  </Typography>
                  <Button
                    component="a"
                    href="https://www.qwebty.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    size="small"
                    endIcon={<OpenInNewIcon sx={{ fontSize: '1rem' }} />}
                    sx={{
                      color: 'rgba(255, 255, 255, 0.95)',
                      borderColor: 'rgba(255, 255, 255, 0.4)',
                      textTransform: 'none',
                      fontWeight: 500,
                      fontSize: '0.9rem',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      }
                    }}
                  >
                    En savoir plus
                  </Button>
                </Box>
              </Box>
              <Box sx={{ mt: 1 }}>
                <ChipTag># Engineering</ChipTag>
                <ChipTag># SaaS</ChipTag>
                <ChipTag># ERP</ChipTag>
                <ChipTag># CRM</ChipTag>
                <ChipTag># Relation client</ChipTag>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Section Contact ergonomique */}
      <Box id="contact" sx={{ 
        pt: { xs: 8, sm: 8, md: 8 },
        pb: { xs: 8, sm: 10, md: 12 },
        backgroundColor: 'white',
        scrollMarginTop: '100px'
      }}>
        <Container>
          <SectionTitle component="h2" sx={{ color: '#172845' }}>CONTACT</SectionTitle>
          <Grid container spacing={{ 
            xs: 2,
            sm: 3,
            md: 4,
            lg: 4
          }} justifyContent="center">
            {/* Colonne de gauche - Informations de contact */}
            <Grid item xs={12} md={5}>
              <Box sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: {
                  xs: 2,
                  sm: 3,
                  md: 4,
                  lg: 4
                },
                p: {
                  xs: 2,
                  sm: 3,
                  md: 4,
                  lg: 4
                }
              }}>
                <Typography variant="h4" component="h3" sx={{
                  color: '#172845',
                  fontWeight: 500,
                  mb: 4
                }}>
                  Contactez-moi
                </Typography>
                
                <ContactInfo>
                  <ContactIcon>
                    <EmailIcon sx={{ fontSize: 28, color: '#172845' }} />
                  </ContactIcon>
                  <ContactLabel>
                    <a href="mailto:contact@nicolas-goujon.fr" style={{ color: '#172845', textDecoration: 'none' }}>
                      contact@nicolas-goujon.fr
                    </a>
                  </ContactLabel>
                </ContactInfo>

                <ContactInfo>
                  <ContactIcon>
                    <PhoneIcon sx={{ fontSize: 28, color: '#172845' }} />
                  </ContactIcon>
                  <ContactLabel sx={{ color: '#172845' }}>
                    +33 (0) 6 95 35 28 12
                  </ContactLabel>
                </ContactInfo>
              </Box>
            </Grid>

            {/* Colonne de droite - Formulaire */}
            <Grid item xs={12} md={7}>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  background: '#172845',
                  borderRadius: '18px',
                  p: 4,
                  boxShadow: '0 4px 24px 0 rgba(23,40,69,0.10)',
                }}
              >
                <Typography variant="h6" component="h4" sx={{ color: 'white', mb: 3 }}>Comment puis-je vous aider ?</Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: {
                    xs: 1,
                    sm: 1,
                    md: 1.5,
                    lg: 2
                  }, 
                  mb: {
                    xs: 2,
                    sm: 2.5,
                    md: 3,
                    lg: 3
                  }
                }}>
                  {[
                    'Développer une application web',
                    'Créer un site vitrine',
                    'Améliorer un projet existant',
                    'Discuter d\'une opportunité',
                    'Optimiser le référencement',
                    'Déployer une solution SaaS',
                    'Autres'
                  ].map((option) => (
                    <Button
                      key={option}
                      variant="outlined"
                      onClick={() => handleOptionClick(option)}
                      sx={{
                        borderRadius: '20px',
                        borderColor: 'white',
                        color: selectedOptions.includes(option) ? '#172845' : 'white',
                        backgroundColor: selectedOptions.includes(option) ? 'white' : '#172845',
                        '&:hover': {
                          borderColor: 'white',
                          backgroundColor: 'white',
                          color: '#172845',
                        }
                      }}
                    >
                      {option}
                    </Button>
                  ))}
                </Box>

                <TextField
                  fullWidth
                  label="Votre nom"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  sx={{ 
                    mb: {
                      xs: 1.5,
                      sm: 2,
                      md: 2,
                      lg: 2
                    }
                  }}
                  InputProps={{
                    sx: {
                      borderRadius: 2,
                      backgroundColor: 'white',
                      color: '#172845',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                      },
                      fontSize: {
                        xs: '0.9rem',
                        sm: '1rem',
                        md: '1rem',
                        lg: '1.1rem'
                      }
                    }
                  }}
                />

                <TextField
                  fullWidth
                  label="Votre email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  variant="outlined"
                  required
                  sx={{ 
                    mb: {
                      xs: 1.5,
                      sm: 2,
                      md: 2,
                      lg: 2
                    }
                  }}
                  InputProps={{
                    sx: {
                      borderRadius: 2,
                      backgroundColor: 'white',
                      color: '#172845',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                      },
                      fontSize: {
                        xs: '0.9rem',
                        sm: '1rem',
                        md: '1rem',
                        lg: '1.1rem'
                      }
                    }
                  }}
                />

                <TextField
                  fullWidth
                  label="Votre message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  variant="outlined"
                  required
                  sx={{ 
                    mb: {
                      xs: 1.5,
                      sm: 2,
                      md: 2,
                      lg: 2
                    }
                  }}
                  InputProps={{
                    sx: {
                      borderRadius: 2,
                      backgroundColor: 'white',
                      color: '#172845',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                      },
                      fontSize: {
                        xs: '0.9rem',
                        sm: '1rem',
                        md: '1rem',
                        lg: '1.1rem'
                      }
                    }
                  }}
                />

                {/* Honeypot anti-spam : champ invisible pour un humain, souvent auto-rempli par les bots.
                    Positionné hors-écran plutôt qu'en display:none, que certains bots savent détecter. */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: '-9999px',
                    width: '1px',
                    height: '1px',
                    overflow: 'hidden',
                  }}
                  aria-hidden="true"
                >
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  endIcon={
                    <SendIcon sx={{ 
                      fontSize: '1.2rem',
                      transform: 'translateX(2px)',
                      transition: 'transform 0.2s ease',
                    }} />
                  }
                  disabled={formStatus === 'sending'}
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    color: '#172845',
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
                      backgroundColor: 'white',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      '& .MuiSvgIcon-root': {
                        transform: 'translateX(4px)',
                      },
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                    },
                    '&:disabled': {
                      backgroundColor: 'rgba(255, 255, 255, 0.5)',
                      color: 'rgba(23, 40, 69, 0.6)',
                    },
                    width: '100%',
                    maxWidth: '300px',
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {formStatus === 'sending' ? 'Envoi en cours...' : 'Envoyer le message'}
                </Button>

                {formStatus === 'success' && (
                  <Box role="status" aria-live="polite" sx={{ mt: 3, textAlign: 'center' }}>
                    <Typography sx={{ color: '#4caf50', fontWeight: 600 }}>
                      ✓ Merci ! Votre message a bien été envoyé.
                    </Typography>
                  </Box>
                )}
                {formStatus === 'error' && (
                  <Box
                    role="alert"
                    aria-live="assertive"
                    sx={{
                    mt: 2,
                    textAlign: 'center',
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    borderRadius: '8px',
                    p: 1.5,
                  }}>
                    <Typography sx={{
                      color: '#f44336',
                      fontWeight: 500,
                      fontSize: '0.9rem',
                    }}>
                      ⚠ Une erreur s'est produite. Réessayez plus tard.
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 