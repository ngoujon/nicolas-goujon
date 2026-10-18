// Charte graphique du site : thème MUI et couleurs déclinées pour les modes clair et sombre.
import { createTheme, PaletteMode } from '@mui/material';

/** Couleurs de marque, indépendantes du mode (bleu marine historique + blanc). */
export const BRAND = {
  navy: '#172845',
  white: '#ffffff',
  navyAlpha: (alpha: number) => `rgba(23, 40, 69, ${alpha})`,
};

/**
 * Couleurs adaptées au mode courant. Le mode sombre reprend exactement les couleurs
 * historiques du site (bleu marine + blanc) ; le mode clair les inverse.
 */
export const getModeColors = (mode: PaletteMode) => {
  const isDark = mode === 'dark';
  return {
    bg: isDark ? BRAND.navy : BRAND.white,
    fg: isDark ? BRAND.white : BRAND.navy,
    // Fond des sections "accent" (STACK, BIO, formulaire de contact) : bleu marine en mode
    // sombre, gris-bleu clair en mode clair, pour garder l'alternance avec les sections blanches.
    accentBg: isDark ? BRAND.navy : '#eef1f6',
    fgSecondary: isDark ? '#e3e8ee' : '#445068',
    fgAlpha: (alpha: number) => (isDark ? `rgba(255, 255, 255, ${alpha})` : BRAND.navyAlpha(alpha)),
    fgSecondaryAlpha: (alpha: number) => (isDark ? `rgba(227, 232, 238, ${alpha})` : `rgba(68, 80, 104, ${alpha})`),
  };
};

const FONT_STACK = '"Roboto", "Helvetica", "Arial", sans-serif';
export const FONTS = {
  comforta: `"Comforta", ${FONT_STACK}`,
  garet: `"Garet", ${FONT_STACK}`,
};

/** Thème MUI de l'application pour le mode donné. */
export const createAppTheme = (mode: PaletteMode) => {
  const { bg, fg } = getModeColors(mode);
  return createTheme({
    palette: {
      mode,
      primary: { main: BRAND.navy },
      secondary: { main: '#FFFFFF' },
      background: { default: bg, paper: bg },
      text: { primary: fg, secondary: fg },
    },
    typography: {
      fontFamily: FONTS.comforta,
      h1: { fontFamily: FONTS.comforta, fontWeight: 'bold' },
      h2: { fontFamily: FONTS.garet },
    },
  });
};
