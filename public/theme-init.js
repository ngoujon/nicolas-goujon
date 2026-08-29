// Applique le thème (clair/sombre) avant le premier rendu pour éviter un flash.
// Ce script est volontairement dans un fichier externe et non inline : la CSP du
// site interdit les scripts inline (`script-src 'self'`), cf. nginx-security-headers.conf.
(function () {
  try {
    var stored = window.localStorage.getItem('theme-mode');
    var mode = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', mode);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
