import React, { useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
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
import { applySeo, applyStructuredData, HOME_ANCHOR_PATHS } from './utils/seo';
import { createAppTheme } from './utils/theme';
import { ThemeModeProvider, useThemeMode } from './utils/ThemeModeContext';

/** Passer à `true` pour remplacer la page d'accueil par la page de maintenance. */
const MAINTENANCE_MODE = false;

// Met à jour le title, les balises meta et les données structurées (JSON-LD)
// à chaque changement de route, pour que chaque page ait des métadonnées
// et un balisage sémantique uniques (SEO + pré-rendu).
function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    applySeo(pathname);
    applyStructuredData(pathname);
  }, [pathname]);

  return null;
}

function ThemedApp() {
  const { mode } = useThemeMode();
  const theme = useMemo(() => createAppTheme(mode), [mode]);
  const homeElement = MAINTENANCE_MODE ? <Maintenance /> : <Home />;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <SeoManager />
          <Header />
          <main>
            <Routes>
              {/* L'accueil et ses routes de section (/projets, /stack...) affichent la même page */}
              {['/', ...HOME_ANCHOR_PATHS].map((path) => (
                <Route key={path} path={path} element={homeElement} />
              ))}
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
