import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme, PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import CookieConsent from './components/CookieConsent';
import Home from './pages/Home';
import Maintenance from './pages/Maintenance';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';
import LegalNotice from './pages/LegalNotice';
import { applySeo } from './utils/seo';
import { applyStructuredData } from './utils/structuredData';
import { ThemeModeProvider, useThemeMode } from './utils/ThemeModeContext';
import './App.css';

// Met à jour le title, les balises meta et les données structurées (JSON-LD)
// à chaque changement de route, pour que chaque page ait des métadonnées
// et un balisage sémantique uniques (SEO + pré-rendu).
function SeoManager() {
  const location = useLocation();

  React.useEffect(() => {
    applySeo(location.pathname);
    applyStructuredData(location.pathname);
  }, [location.pathname]);

  return null;
}

const createAppTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#172845',
      },
      secondary: {
        main: '#FFFFFF',
      },
      background: {
        default: mode === 'dark' ? '#172845' : '#FFFFFF',
        paper: mode === 'dark' ? '#172845' : '#FFFFFF',
      },
      text: {
        primary: mode === 'dark' ? '#FFFFFF' : '#172845',
        secondary: mode === 'dark' ? '#FFFFFF' : '#172845',
      },
    },
    typography: {
      fontFamily: '"Comforta", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontFamily: '"Comforta", "Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 'bold',
      },
      h2: {
        fontFamily: '"Garet", "Roboto", "Helvetica", "Arial", sans-serif',
      },
    },
  });

function ThemedApp() {
  const [isMaintenance] = React.useState(false);
  const { mode } = useThemeMode();
  const theme = React.useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <SeoManager />
          <Header />
          <main>
            <Routes>
              <Route path="/" element={isMaintenance ? <Maintenance /> : <Home />} />
              <Route path="/bio" element={isMaintenance ? <Maintenance /> : <Home />} />
              <Route path="/stack" element={isMaintenance ? <Maintenance /> : <Home />} />
              <Route path="/formation" element={isMaintenance ? <Maintenance /> : <Home />} />
              <Route path="/projets" element={isMaintenance ? <Maintenance /> : <Home />} />
              <Route path="/contact" element={isMaintenance ? <Maintenance /> : <Home />} />
              <Route path="/politique-confidentialite" element={<PrivacyPolicy />} />
              <Route path="/mentions-legales" element={<LegalNotice />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <CookieConsent />
        </div>
      </Router>
    </ThemeProvider>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeModeProvider>
        <ThemedApp />
      </ThemeModeProvider>
    </ErrorBoundary>
  );
}

export default App;
