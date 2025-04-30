import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Paper, Button, TextField, TextareaAutosize, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import EngineeringIcon from '@mui/icons-material/Engineering';
import WebIcon from '@mui/icons-material/Web';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ChatIcon from '@mui/icons-material/Chat';
import EmailIcon from '@mui/icons-material/Email';
import AwardIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import GraduationCapIcon from '@mui/icons-material/School';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import VerifiedIcon from '@mui/icons-material/Verified';
import SvgIcon from '@mui/material/SvgIcon';
import { BsAward, BsBookmarkCheck, BsMortarboard, BsPatchCheck, BsWindow, BsServer, BsGrid, BsList, BsPhone, BsKanban, BsTerminal, BsCpu } from "react-icons/bs";
import "bootstrap-icons/font/bootstrap-icons.css";
import emailjs from '@emailjs/browser';

// Composants stylisés
const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  padding: theme.spacing(3),
  borderRadius: '10px',
  marginBottom: theme.spacing(3),
}));

const ProfileSection = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(5, 0),
}));

const Name = styled(Typography)(({ theme }) => ({
  fontSize: '50px',
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '30px',
  marginBottom: theme.spacing(3),
}));

const CvButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: 'white',
  border: '2px solid white',
  padding: theme.spacing(1, 3),
  borderRadius: '5px',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'white',
    color: '#172845',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: theme.spacing(3),
  textAlign: 'center',
}));

const SkillCard = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

const SkillIcon = styled(Box)(({ theme }) => ({
  fontSize: '2.5rem',
  marginBottom: theme.spacing(1),
}));

const SkillName = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
}));

const SkillItem = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(0.5),
}));

const EducationCard = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

const EducationIcon = styled(Box)(({ theme }) => ({
  fontSize: '2.5rem',
  marginBottom: theme.spacing(1),
}));

const EducationName = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  fontWeight: 'bold',
  marginBottom: theme.spacing(0.5),
}));

const EducationSub = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  marginBottom: theme.spacing(0.5),
}));

const ProjectCard = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
}));

const ProjectLogo = styled(Box)(({ theme }) => ({
  height: '100px',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  marginBottom: theme.spacing(2),
}));

const ProjectName = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
}));

const ProjectLink = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(1),
  '& svg': {
    marginLeft: theme.spacing(0.5),
  },
}));

const ProjectText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
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
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(23, 40, 69, 0.4)',
    zIndex: 1,
  },
  [theme.breakpoints.down('sm')]: {
    height: '80vh',
    minHeight: '400px',
  },
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
  transform: 'translateY(0)',
  transition: 'transform 0.3s ease-out',
  '&:hover': {
    transform: 'translateY(-10px)',
  },
}));

const HeroName = styled(Typography)(({ theme }) => ({
  fontSize: '2.8rem',
  fontWeight: 700,
  marginBottom: theme.spacing(1),
  letterSpacing: '1px',
  textShadow: '0 2px 8px rgba(0,0,0,0.45)',
  [theme.breakpoints.up('md')]: {
    fontSize: '3.5rem',
  },
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.3rem',
  fontWeight: 400,
  marginBottom: theme.spacing(4),
  textShadow: '0 2px 8px rgba(0,0,0,0.45)',
  [theme.breakpoints.up('md')]: {
    fontSize: '1.7rem',
  },
}));

const HeroCvButton = styled(Button)(({ theme }) => ({
  background: 'white',
  color: '#172845',
  borderRadius: '30px',
  fontWeight: 700,
  fontSize: '1.1rem',
  padding: '12px 36px',
  boxShadow: '0 4px 24px 0 rgba(23,40,69,0.18)',
  transition: 'all 0.2s',
  textTransform: 'none',
  '&:hover': {
    background: '#172845',
    color: 'white',
    boxShadow: '0 6px 32px 0 rgba(23,40,69,0.25)',
  },
}));

// Carte image bio
const BioCard = styled(Box)(({ theme }) => ({
  background: 'white',
  borderRadius: '18px',
  boxShadow: '0 4px 24px 0 rgba(23,40,69,0.10)',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '220px',
  [theme.breakpoints.down('sm')]: {
    height: '160px',
  },
}));

const BioImg = styled('div')(() => ({
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
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
    left: '48px',
    top: '-12px',
    width: '20px',
    height: '20px',
    background: 'white',
    transform: 'rotate(45deg)',
    boxShadow: '-3px -3px 5px rgba(23,40,69,0.05)',
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    '&::before': {
      left: '50%',
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

const ContactCard = styled(Box)(({ theme }) => ({
  background: 'white',
  borderRadius: '18px',
  boxShadow: '0 4px 24px 0 rgba(23,40,69,0.10)',
  padding: theme.spacing(4, 4),
  maxWidth: 500,
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2, 1),
  },
}));

const ContactButton = styled(Button)(({ theme }) => ({
  background: '#172845',
  color: 'white',
  borderRadius: '30px',
  fontWeight: 700,
  fontSize: '1.1rem',
  padding: '12px 0',
  width: '100%',
  marginTop: theme.spacing(2),
  boxShadow: '0 2px 8px 0 rgba(23,40,69,0.10)',
  textTransform: 'none',
  transition: 'all 0.2s',
  '&:hover': {
    background: '#172845',
    color: 'white',
    boxShadow: '0 4px 16px 0 rgba(23,40,69,0.18)',
  },
}));

// Icône Skype personnalisée
function SkypeIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="16" fill="#00AFF0" />
      <path d="M23.5 18.7c-.3-.2-.7-.3-1-.2-.3.1-.6.3-.7.6-.5 1.1-1.7 1.8-3.2 1.8-1.7 0-2.8-.7-2.8-1.7 0-.5.2-.8 1.2-1.1l2.1-.5c2.1-.5 3.1-1.5 3.1-3.1 0-2-2-3.3-4.5-3.3-2.1 0-3.8.8-4.5 2.2-.2.3-.2.7-.1 1 .2.3.5.5.9.5.3 0 .6-.2.8-.5.5-1 1.7-1.6 3.1-1.6 1.6 0 2.6.6 2.6 1.6 0 .6-.3 1-1.5 1.3l-2.1.5c-2.1.5-3.1 1.5-3.1 3.1 0 2 2 3.3 4.7 3.3 2.2 0 4-1 4.7-2.5.2-.3.1-.7-.2-1z" fill="#fff"/>
    </SvgIcon>
  );
}

const Home = () => {
  const [formStatus, setFormStatus] = React.useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    message: ''
  });
  const theme = useTheme();

  useEffect(() => {
    const path = window.location.pathname.substring(1); // Retire le slash initial
    if (path && path !== '') {
      const element = document.getElementById(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option === selectedOption ? '' : option);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      const templateParams = {
        from_name: formData.nom,
        from_email: formData.email,
        message: formData.message,
        subject: selectedOption || 'Contact depuis le site web',
        to_email: 'contact@nicolas-goujon.fr'
      };

      await emailjs.send(
        'YOUR_SERVICE_ID', // Remplacez par votre Service ID
        'YOUR_TEMPLATE_ID', // Remplacez par votre Template ID
        templateParams,
        'YOUR_PUBLIC_KEY' // Remplacez par votre Public Key
      );

      setFormStatus('success');
      setFormData({ nom: '', email: '', message: '' });
      setSelectedOption('');
      
      setTimeout(() => {
        setFormStatus(null);
      }, 5000);
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setFormStatus('error');
      
      setTimeout(() => {
        setFormStatus(null);
      }, 5000);
    }
  };

  return (
    <Box>
      {/* Hero Section améliorée */}
      <HeroSection>
        <HeroOverlay />
        <HeroContent>
          <HeroName>Nicolas GOUJON</HeroName>
          <HeroTitle>Développeur Web et web mobile</HeroTitle>
          <HeroCvButton
            variant="contained"
            href="/docs/CV_Nicolas-GOUJON.pdf"
            target="_blank"
          >
            Consulter mon CV
          </HeroCvButton>
        </HeroContent>
      </HeroSection>

      {/* Section Bio améliorée */}
      <Box id="bio" sx={{ py: 8, backgroundColor: '#172845' }}>
        <Container>
          {/* Bloc 1 : Image gauche, texte droite */}
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={5}>
              <BioCard>
                <BioImg style={{ backgroundImage: 'url(/images/background/workspace.jpg)' }} />
              </BioCard>
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography variant="body1" paragraph sx={{ color: 'white', fontSize: '1.1rem', mb: 2 }}>
                Mon expérience au sein d'une entreprise conception de logiciels SaaS a fait développer mes compétences sur ce type de logiciel, sur la qualité logicielle, et sur les échanges avec le client en phase de conception et de maintenance.<br/>
                J'ai également acquis une bonne connaissance de la gestion de projet et de l'organisation d'une équipe de développement. En effet, j'ai eu l'occasion de gérer plusieurs projets de développement de logiciels SaaS, en particulier sur la phase de conception et de développement. J'ai ainsi pu mettre en place plusieurs processus et outils de qualité logicielle.<br/>
                En outre, j'ai également travaillé en étroite collaboration avec les clients, afin de comprendre leurs besoins et de leur fournir un logiciel SaaS adapté à leurs attentes. J'ai ainsi pu développer une bonne compréhension des enjeux et des contraintes liés à ce type de projet.
              </Typography>
              <Box sx={{ mt: 1 }}>
                <ChipTag># Engineering</ChipTag>
                <ChipTag># SaaS</ChipTag>
                <ChipTag># ERP</ChipTag>
                <ChipTag># CRM</ChipTag>
                <ChipTag># Relation client</ChipTag>
              </Box>
            </Grid>
          </Grid>

          {/* Bloc 2 : Texte gauche, image droite */}
          <Grid container spacing={6} alignItems="center" sx={{ mt: 4 }}>
            <Grid item xs={12} md={7}>
              <Typography variant="body1" paragraph sx={{ color: 'white', fontSize: '1.1rem', mb: 2 }}>
                Fort de plus de 5 années d'expérience dans la conception de site-web, j'ai participé à toutes les étapes de conception : de la définition du besoin jusqu'à la maintenance du site. Etant à mon compte, j'ai également eu à porter tous les aspects de la gestion d'une micro-entreprise, d'un point de vue financier, administratif et gestion des ressources.<br/>
                Mes clients ont été variés : des institutionnels, des associations, des collectivités locales, des entreprises et des particuliers. J'ai ainsi pu mettre en œuvre des projets de toute nature, avec des équipes et des contraintes différentes. Cela m'a permis de développer une grande adaptabilité et une bonne capacité à gérer les imprévus.<br/>
                Aujourd'hui, je souhaite mettre mes compétences au service d'une entreprise dynamique, en quête de nouvelles technologies pour améliorer ses processus. J'ai envie de m'investir dans un projet à long terme et de pouvoir apporter ma contribution à la croissance d'une entreprise.
              </Typography>
              <Box sx={{ mt: 1 }}>
                <ChipTag># Gestion de projet</ChipTag>
                <ChipTag># Definition des besoins</ChipTag>
                <ChipTag># Web Design</ChipTag>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <BioCard>
                <BioImg style={{ backgroundImage: 'url(/images/background/_workspace.jpg)' }} />
              </BioCard>
            </Grid>
          </Grid>

          {/* Citation améliorée */}
          <Grid container justifyContent="center" sx={{ mt: 7, px: 2 }}>
            <Grid item xs={12}>
              <CitationBox>
                <CitationImg style={{ backgroundImage: 'url(/images/profil.jpg)' }} />
                <CitationContent>
                  <CitationHeader>
                    <CitationName>Nicolas GOUJON</CitationName>
                    <CitationDate>Développeur Web et web mobile - Product Owner</CitationDate>
                  </CitationHeader>
                  <CitationText>
                    Passionné d'informatique depuis toujours, je me suis très vite orienté vers la programmation web dès le plus jeune âge étant donné que c'est là que se trouve toute l'innovation et les dernières avancées technologiques. J'ai donc décidé de faire de mon hobby un métier et je me suis lancé dans la création de sites internet professionnels.
                  </CitationText>
                </CitationContent>
              </CitationBox>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Section Stack */}
      <Box id="stack" sx={{ 
        py: 12, 
        backgroundColor: '#172845',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Container maxWidth="lg" sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          px: { xs: 2, sm: 4, md: 8 }
        }}>
          <Typography variant="h2" sx={{ 
            color: 'white', 
            mb: 12, 
            textAlign: 'center', 
            fontSize: '3rem',
            fontWeight: '500',
            letterSpacing: '2px'
          }}>STACK</Typography>
          
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: { xs: 4, md: 8 },
            width: '100%',
            maxWidth: '1200px',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              left: '0',
              right: '0',
              top: '50%',
              height: '1px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }}>
            {/* Première ligne */}
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <Box sx={{ 
                color: 'white', 
                mb: 4,
                height: '60px',
                width: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <i className="bi bi-front" style={{ fontSize: '48px' }}></i>
              </Box>
              <Typography sx={{ 
                color: 'white', 
                mb: 2, 
                fontSize: '1.8rem',
                fontFamily: 'Stop',
                fontWeight: '500'
              }}>Front-End</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: '1rem', fontFamily: 'Garet' }}>HTML</Typography>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: '1rem', fontFamily: 'Garet' }}>CSS</Typography>
              </Box>
            </Box>

            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <Box sx={{ 
                color: 'white', 
                mb: 4,
                height: '60px',
                width: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <i className="bi bi-back" style={{ fontSize: '48px' }}></i>
              </Box>
              <Typography sx={{ 
                color: 'white', 
                mb: 2, 
                fontSize: '1.8rem',
                fontFamily: 'Stop',
                fontWeight: '500'
              }}>Back-End</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: '1rem', fontFamily: 'Garet' }}>PHP</Typography>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: '1rem', fontFamily: 'Garet' }}>MySQL</Typography>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: '1rem', fontFamily: 'Garet' }}>SQL</Typography>
              </Box>
            </Box>

            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <Box sx={{ 
                color: 'white', 
                mb: 4,
                height: '60px',
                width: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <i className="bi bi-layout-wtf" style={{ fontSize: '48px' }}></i>
              </Box>
              <Typography sx={{ 
                color: 'white', 
                mb: 2, 
                fontSize: '1.8rem',
                fontFamily: 'Stop',
                fontWeight: '500'
              }}>Design</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: '1rem', fontFamily: 'Garet' }}>Security by Design</Typography>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: '1rem', fontFamily: 'Garet' }}>Adobe XD</Typography>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: '1rem', fontFamily: 'Garet' }}>UI / UX</Typography>
              </Box>
            </Box>

            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <Box sx={{ 
                color: 'white', 
                mb: 4,
                height: '60px',
                width: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <i className="bi bi-list-ol" style={{ fontSize: '48px' }}></i>
              </Box>
              <Typography sx={{ 
                color: 'white', 
                mb: 2, 
                fontSize: '1.8rem',
                fontFamily: 'Stop',
                fontWeight: '500'
              }}>Referencement</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: '1rem', fontFamily: 'Garet' }}>Google Analytics</Typography>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: '1rem', fontFamily: 'Garet' }}>SEO - SEA - SMO</Typography>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: '1rem', fontFamily: 'Garet' }}>Rank tracker</Typography>
              </Box>
            </Box>

            {/* Deuxième ligne */}
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <Box sx={{ 
                color: 'white', 
                mb: 4,
                height: '60px',
                width: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <i className="bi bi-phone" style={{ fontSize: '48px' }}></i>
              </Box>
              <Typography sx={{ 
                color: 'white', 
                mb: 2, 
                fontSize: '1.8rem',
                fontFamily: 'Stop',
                fontWeight: '500'
              }}>Responsive</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: '1rem', fontFamily: 'Garet' }}>Bootstrap</Typography>
              </Box>
            </Box>

            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <Box sx={{ 
                color: 'white', 
                mb: 4,
                height: '60px',
                width: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <i className="bi bi-bar-chart-steps" style={{ fontSize: '48px' }}></i>
              </Box>
              <Typography sx={{ 
                color: 'white', 
                mb: 2, 
                fontSize: '1.8rem',
                fontFamily: 'Stop',
                fontWeight: '500'
              }}>Agile</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: '1rem', fontFamily: 'Garet' }}>GitHub</Typography>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: '1rem', fontFamily: 'Garet' }}>MindView</Typography>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: '1rem', fontFamily: 'Garet' }}>Kanban</Typography>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: '1rem', fontFamily: 'Garet' }}>Gantt</Typography>
              </Box>
            </Box>

            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <Box sx={{ 
                color: 'white', 
                mb: 4,
                height: '60px',
                width: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <i className="bi bi-terminal" style={{ fontSize: '48px' }}></i>
              </Box>
              <Typography sx={{ 
                color: 'white', 
                mb: 2, 
                fontSize: '1.8rem',
                fontFamily: 'Stop',
                fontWeight: '500'
              }}>Terminal</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: '1rem', fontFamily: 'Garet' }}>MS DOS</Typography>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: '1rem', fontFamily: 'Garet' }}>UNIX</Typography>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: '1rem', fontFamily: 'Garet' }}>SSH</Typography>
              </Box>
            </Box>

            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <Box sx={{ 
                color: 'white', 
                mb: 4,
                height: '60px',
                width: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <i className="bi bi-cpu" style={{ fontSize: '48px' }}></i>
              </Box>
              <Typography sx={{ 
                color: 'white', 
                mb: 2, 
                fontSize: '1.8rem',
                fontFamily: 'Stop',
                fontWeight: '500'
              }}>Engineering</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: '1rem', fontFamily: 'Garet' }}>Application Web / SaaS</Typography>
                <Typography sx={{ color: 'white', opacity: 0.7, fontSize: '1rem', fontFamily: 'Garet' }}>UML Diagram</Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Section Formation */}
      <Box id="formation" sx={{ py: 8, background: 'white' }}>
        <Container>
          <SectionTitle sx={{ color: '#172845', mb: 6 }}>FORMATION</SectionTitle>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <Box sx={{
                background: 'white',
                borderRadius: 3,
                boxShadow: '0 4px 24px 0 rgba(23,40,69,0.10)',
                p: 3,
                textAlign: 'center',
                transition: '0.2s',
                height: '100%',
                '&:hover': { boxShadow: '0 8px 32px 0 rgba(23,40,69,0.18)', transform: 'scale(1.04)' }
              }}>
                <BsAward size={40} color="#172845" style={{ marginBottom: 12 }} />
                <Typography variant="h6" sx={{ color: '#172845', fontWeight: 700 }}>Titre Professionnel</Typography>
                <Typography sx={{ color: '#172845' }}>Développeur web et web mobile</Typography>
                <Typography sx={{ color: '#172845' }}>Graduate Développeur web full stack Promo ELLENBY</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{
                background: 'white',
                borderRadius: 3,
                boxShadow: '0 4px 24px 0 rgba(23,40,69,0.10)',
                p: 3,
                textAlign: 'center',
                transition: '0.2s',
                height: '100%',
                '&:hover': { boxShadow: '0 8px 32px 0 rgba(23,40,69,0.18)', transform: 'scale(1.04)' }
              }}>
                <BsBookmarkCheck size={40} color="#172845" style={{ marginBottom: 12 }} />
                <Typography variant="h6" sx={{ color: '#172845', fontWeight: 700 }}>Brevet de Technicien Supérieur</Typography>
                <Typography sx={{ color: '#172845' }}>Système Numérique</Typography>
                <Typography sx={{ color: '#172845' }}>Option (B) Électronique et Communication</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{
                background: 'white',
                borderRadius: 3,
                boxShadow: '0 4px 24px 0 rgba(23,40,69,0.10)',
                p: 3,
                textAlign: 'center',
                transition: '0.2s',
                height: '100%',
                '&:hover': { boxShadow: '0 8px 32px 0 rgba(23,40,69,0.18)', transform: 'scale(1.04)' }
              }}>
                <BsMortarboard size={40} color="#172845" style={{ marginBottom: 12 }} />
                <Typography variant="h6" sx={{ color: '#172845', fontWeight: 700 }}>Baccalauréat</Typography>
                <Typography sx={{ color: '#172845' }}>Sciences et Technologies de l'Industrie et du Développement Durable</Typography>
                <Typography sx={{ color: '#172845' }}>Option Système d'Information et du Numérique</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{
                background: 'white',
                borderRadius: 3,
                boxShadow: '0 4px 24px 0 rgba(23,40,69,0.10)',
                p: 3,
                textAlign: 'center',
                transition: '0.2s',
                height: '100%',
                '&:hover': { boxShadow: '0 8px 32px 0 rgba(23,40,69,0.18)', transform: 'scale(1.04)' }
              }}>
                <BsPatchCheck size={40} color="#172845" style={{ marginBottom: 12 }} />
                <Typography variant="h6" sx={{ color: '#172845', fontWeight: 700 }}>Certification PSPO 1</Typography>
                <Typography sx={{ color: '#172845' }}>Scrum.org</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Section Projets */}
      <Box id="projets" sx={{ py: 8, backgroundColor: '#fff' }}>
        <Container>
          <SectionTitle sx={{ color: '#172845', mb: 6 }}>Projets</SectionTitle>
          <Grid container spacing={6} justifyContent="center">
            <Grid item xs={12} md={4}>
              <ProjectCard>
                <ProjectLogo sx={{ backgroundImage: 'url(/images/projets/logo_hydroseed.png)', height: '90px', mb: 2 }} />
                <ProjectName sx={{ color: '#172845' }}>HYDROSEED</ProjectName>
                <ProjectLink>
                  <a href="http://www.hydroseed.nc" target="_blank" rel="noopener noreferrer" style={{ color: '#172845', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    www.hydroseed.nc <OpenInNewIcon fontSize="small" sx={{ ml: 1 }} />
                  </a>
                </ProjectLink>
                <ProjectText sx={{ color: '#172845' }}>
                  La société HYDROSEED s'intéresse au génie végétal dans le secteur du génie civil.<br/>
                  Nous étudions toutes les solutions techniques pour la protection de l'environnement, notamment pour le confortement des talus et la stabilisation de la surface des pentes.
                </ProjectText>
              </ProjectCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <ProjectCard>
                <ProjectLogo sx={{ backgroundImage: 'url(/images/projets/logo_gabions.png)', height: '90px', mb: 2 }} />
                <ProjectName sx={{ color: '#172845' }}>GABIONS</ProjectName>
                <ProjectLink>
                  <a href="http://www.gabions.nc" target="_blank" rel="noopener noreferrer" style={{ color: '#172845', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    www.gabions.nc <OpenInNewIcon fontSize="small" sx={{ ml: 1 }} />
                  </a>
                </ProjectLink>
                <ProjectText sx={{ color: '#172845' }}>
                  Nous réalisons des murs de soutènement en gabions. Ce mur « poids » permet généralement de gagner de la surface utilisable autour de votre maison d'habitation. Ces travaux réalisés dans les règles de l'art sont déductibles des impôts comme une amélioration durable du patrimoine immobilier.
                </ProjectText>
              </ProjectCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <ProjectCard>
                <ProjectLogo sx={{ backgroundImage: 'url(/images/projets/logo_skeye.png)', height: '90px', mb: 2 }} />
                <ProjectName sx={{ color: '#172845' }}>SKEYE</ProjectName>
                <ProjectLink>
                  <a href="http://www.skeye.nc" target="_blank" rel="noopener noreferrer" style={{ color: '#172845', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    www.skeye.nc <OpenInNewIcon fontSize="small" sx={{ ml: 1 }} />
                  </a>
                </ProjectLink>
                <ProjectText sx={{ color: '#172845' }}>
                  Plus pratique, plus économique et plus écologique que l'hélicoptère, l'avion ou l'ULM, le drone permet de réaliser des photos ou des vidéos aériennes dans des endroits inaccessibles à toute autre machine, avec une mise en œuvre extrêmement simple et rapide, tout en limitant les risques aux personnes et les nuisances sonores.<br/>
                  Durant sa période de vol, la caméra embarquée autorise la capture d'images ou de vidéos aériennes en temps réel, dans des zones sensibles ou difficiles d'accès.
                </ProjectText>
              </ProjectCard>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Section Contact ergonomique */}
      <Box id="contact" sx={{ py: 8, backgroundColor: '#172845' }}>
        <Container>
          <Grid container spacing={4} justifyContent="center">
            {/* Colonne de gauche - Informations de contact */}
            <Grid item xs={12} md={5}>
              <Box sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 4,
                p: 4
              }}>
                <Typography variant="h4" sx={{ 
                  color: 'white',
                  fontWeight: 500,
                  mb: 4
                }}>
                  Contactez-moi
                </Typography>
                
                <ContactInfo>
                  <ContactIcon>
                    <EmailIcon sx={{ fontSize: 28, color: 'white' }} />
                  </ContactIcon>
                  <ContactLabel>
                    <a href="mailto:contact@nicolas-goujon.fr" style={{ color: 'white', textDecoration: 'none' }}>
                      contact@nicolas-goujon.fr
                    </a>
                  </ContactLabel>
                </ContactInfo>

                <ContactInfo>
                  <ContactIcon>
                    <PhoneIcon sx={{ fontSize: 28, color: 'white' }} />
                  </ContactIcon>
                  <ContactLabel sx={{ color: 'white' }}>
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
                  background: 'white',
                  borderRadius: '18px',
                  p: 4,
                  boxShadow: '0 4px 24px 0 rgba(23,40,69,0.10)',
                }}
              >
                <Typography variant="h6" sx={{ color: '#172845', mb: 3 }}>Je souhaite...</Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  {[
                    'Développer une application web',
                    'Créer un site vitrine',
                    'Améliorer un projet existant',
                    'Discuter d\'une opportunité',
                    'Optimiser le référencement SEO',
                    'Mettre en place une solution SaaS',
                    'Autres'
                  ].map((option) => (
                    <Button
                      key={option}
                      variant="outlined"
                      onClick={() => handleOptionClick(option)}
                      sx={{
                        borderRadius: '20px',
                        borderColor: '#172845',
                        color: selectedOption === option ? 'white' : '#172845',
                        backgroundColor: selectedOption === option ? '#172845' : 'transparent',
                        '&:hover': {
                          borderColor: '#172845',
                          backgroundColor: '#172845',
                          color: 'white',
                        }
                      }}
                    >
                      {option}
                    </Button>
                  ))}
                </Box>

                <TextField
                  fullWidth
                  placeholder="Votre nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  variant="outlined"
                  required
                  sx={{ mb: 2 }}
                  InputProps={{
                    sx: {
                      borderRadius: 2,
                      color: '#172845',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#172845',
                      },
                    }
                  }}
                  inputProps={{
                    sx: {
                      color: '#172845',
                      '&::placeholder': {
                        color: '#172845',
                        opacity: 0.7,
                      },
                    }
                  }}
                />

                <TextField
                  fullWidth
                  placeholder="Votre email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email"
                  variant="outlined"
                  required
                  sx={{ mb: 2 }}
                  InputProps={{
                    sx: {
                      borderRadius: 2,
                      color: '#172845',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#172845',
                      },
                    }
                  }}
                  inputProps={{
                    sx: {
                      color: '#172845',
                      '&::placeholder': {
                        color: '#172845',
                        opacity: 0.7,
                      },
                    }
                  }}
                />

                <TextField
                  fullWidth
                  placeholder="Votre message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                  variant="outlined"
                  required
                  sx={{ mb: 3 }}
                  InputProps={{
                    sx: {
                      borderRadius: 2,
                      color: '#172845',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#172845',
                      },
                    }
                  }}
                  inputProps={{
                    sx: {
                      color: '#172845',
                      '&::placeholder': {
                        color: '#172845',
                        opacity: 0.7,
                      },
                    }
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<SendIcon />}
                  disabled={formStatus === 'sending'}
                  sx={{
                    backgroundColor: '#172845',
                    color: 'white',
                    borderRadius: 2,
                    py: 1.5,
                    px: 4,
                    '&:hover': {
                      backgroundColor: '#0e1a2d',
                    },
                    '&:disabled': {
                      backgroundColor: '#172845',
                      opacity: 0.7,
                    }
                  }}
                >
                  {formStatus === 'sending' ? 'Envoi en cours...' : 'Envoyer le message'}
                </Button>

                {formStatus === 'success' && (
                  <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Typography sx={{ color: '#4caf50', fontWeight: 600 }}>
                      Merci ! Votre message a bien été envoyé.
                    </Typography>
                  </Box>
                )}
                {formStatus === 'error' && (
                  <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Typography sx={{ color: '#f44336', fontWeight: 600 }}>
                      Une erreur est survenue. Veuillez réessayer ou me contacter directement par email.
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