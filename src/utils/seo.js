// Métadonnées SEO (title + description) uniques par route.
// Utilisées par useSeo pour mettre à jour <title>, la meta description,
// le lien canonical et les balises Open Graph / Twitter à chaque navigation.

const SITE_URL = 'https://nicolas-goujon.com';

export const SEO_DATA = {
  '/': {
    title: 'Nicolas GOUJON - Développeur Web & Product Owner',
    description: "Nicolas GOUJON, développeur web et Product Owner : création de sites internet, applications web sur-mesure et solutions IA. Expertise front-end, back-end et référencement.",
  },
  '/bio': {
    title: 'Bio - Nicolas GOUJON, Développeur Web & Product Owner',
    description: "Découvrez le parcours de Nicolas GOUJON : développeur web indépendant et Product Owner, fondateur de l'agence Qwebty, spécialisé en conception de solutions SaaS sur-mesure.",
  },
  '/stack': {
    title: 'Stack technique - Nicolas GOUJON, Développeur Web',
    description: "Les technologies maîtrisées par Nicolas GOUJON : React, Next.js, PHP, API REST, intelligence artificielle, DevOps (Docker, Git) et méthodes agiles.",
  },
  '/formation': {
    title: 'Formation & certifications - Nicolas GOUJON',
    description: "Parcours de formation de Nicolas GOUJON : certification PSPO 1 (Scrum.org), Titre Professionnel Développeur web et web mobile, BTS Systèmes Numériques.",
  },
  '/projets': {
    title: 'Expérience & projets - Nicolas GOUJON, Développeur Web',
    description: "Applications web sur-mesure, sites vitrines, e-commerce et solutions IA : découvrez les projets et l'expérience de Nicolas GOUJON, développeur web et Product Owner.",
  },
  '/contact': {
    title: 'Contact - Nicolas GOUJON, Développeur Web & Product Owner',
    description: "Contactez Nicolas GOUJON pour un projet de site internet, d'application web sur-mesure ou de solution IA. Réponse rapide par email ou téléphone.",
  },
  '/politique-confidentialite': {
    title: 'Politique de confidentialité - Nicolas GOUJON',
    description: "Politique de confidentialité du site de Nicolas GOUJON : données collectées, finalités du traitement et droits des utilisateurs.",
  },
  '/mentions-legales': {
    title: 'Mentions légales - Nicolas GOUJON',
    description: "Mentions légales du site de Nicolas GOUJON, développeur web et Product Owner : éditeur, hébergeur et informations légales.",
  },
};

export function getSeoForPath(pathname) {
  return SEO_DATA[pathname] || SEO_DATA['/'];
}

export function applySeo(pathname) {
  const { title, description } = getSeoForPath(pathname);
  const canonicalUrl = `${SITE_URL}${pathname === '/' ? '/' : pathname}`;

  document.title = title;

  const setMeta = (selector, attribute, value) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attribute, value);
  };

  setMeta('meta[name="description"]', 'content', description);
  setMeta('link[rel="canonical"]', 'href', canonicalUrl);
  setMeta('meta[property="og:url"]', 'content', canonicalUrl);
  setMeta('meta[property="og:title"]', 'content', title);
  setMeta('meta[property="og:description"]', 'content', description);
  setMeta('meta[property="twitter:url"]', 'content', canonicalUrl);
  setMeta('meta[property="twitter:title"]', 'content', title);
  setMeta('meta[property="twitter:description"]', 'content', description);
}
