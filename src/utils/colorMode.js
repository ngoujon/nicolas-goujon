// Couleurs de la charte du site, déclinées pour les modes clair et sombre.
// Le mode sombre reprend exactement les couleurs historiques du site (bleu marine + blanc)
// pour ne rien changer visuellement par défaut ; le mode clair les inverse.
export const getModeColors = (mode) => {
  const isDark = mode === 'dark';
  return {
    bg: isDark ? '#172845' : '#ffffff',
    fg: isDark ? '#ffffff' : '#172845',
    // Fond des sections "accent" (STACK, BIO, formulaire de contact) : identique au bleu marine
    // historique en mode sombre, bascule vers un gris-bleu clair en mode clair pour garder
    // la rythmique visuelle en alternance avec les sections blanches du site.
    accentBg: isDark ? '#172845' : '#eef1f6',
    fgSecondary: isDark ? '#e3e8ee' : '#445068',
    fgAlpha: (alpha) => (isDark ? `rgba(255, 255, 255, ${alpha})` : `rgba(23, 40, 69, ${alpha})`),
    bgAlpha: (alpha) => (isDark ? `rgba(23, 40, 69, ${alpha})` : `rgba(255, 255, 255, ${alpha})`),
    fgSecondaryAlpha: (alpha) => (isDark ? `rgba(227, 232, 238, ${alpha})` : `rgba(68, 80, 104, ${alpha})`),
  };
};
