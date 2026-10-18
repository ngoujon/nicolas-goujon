// SEO par route : balises <title>/meta (description, canonical, Open Graph, Twitter)
// et données structurées JSON-LD. Appliqué à chaque navigation par <SeoManager /> (App.tsx),
// puis figé dans le HTML au build par le pré-rendu (tools/prerender.js).
import { FORMATIONS, NAV_ITEMS, OWNER } from '../data/content';

const SITE_URL = 'https://nicolas-goujon.com';

// /projets, /stack, /formation, /bio et /contact ne sont pas des pages distinctes : ce sont
// des ancres de la page d'accueil (App.tsx les fait toutes pointer vers <Home />). Leur HTML
// étant identique à celui de "/", elles se canonicalisent vers "/" (pas de contenu dupliqué)
// et n'ont pas d'entrée propre dans le fil d'Ariane.
export const HOME_ANCHOR_PATHS = NAV_ITEMS.map((item) => `/${item.path}`);

const isHomePath = (pathname: string) => pathname === '/' || HOME_ANCHOR_PATHS.includes(pathname);

interface SeoEntry {
  title: string;
  description: string;
  noindex?: boolean;
  /** Libellé du fil d'Ariane (pages autonomes uniquement). */
  breadcrumb?: string;
}

export const SEO_DATA: Record<string, SeoEntry> = {
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
    breadcrumb: 'Politique de confidentialité',
  },
  '/mentions-legales': {
    title: 'Mentions légales - Nicolas GOUJON',
    description: "Mentions légales du site de Nicolas GOUJON, développeur web et Product Owner : éditeur, hébergeur et informations légales.",
    breadcrumb: 'Mentions légales',
  },
};

// Toute URL hors de SEO_DATA est une page inexistante : nginx la sert avec un vrai statut 404
// (voir nginx.conf), et on évite de la faire indexer sous les métadonnées de l'accueil.
const NOT_FOUND_SEO: SeoEntry = {
  title: 'Page introuvable - Nicolas GOUJON',
  description: "La page demandée n'existe pas ou a été déplacée.",
  noindex: true,
};

/** Met à jour le titre et les balises meta du document pour la route donnée. */
export function applySeo(pathname: string) {
  const { title, description, noindex } = SEO_DATA[pathname] || NOT_FOUND_SEO;
  const canonicalUrl = `${SITE_URL}${isHomePath(pathname) ? '/' : pathname}`;

  document.title = title;

  const setMeta = (selector: string, attribute: string, value: string) => {
    document.querySelector(selector)?.setAttribute(attribute, value);
  };

  setMeta('meta[name="description"]', 'content', description);
  setMeta('meta[name="robots"]', 'content', noindex ? 'noindex, follow' : 'index, follow');
  setMeta('link[rel="canonical"]', 'href', canonicalUrl);
  for (const prefix of ['og', 'twitter']) {
    setMeta(`meta[property="${prefix}:url"]`, 'content', canonicalUrl);
    setMeta(`meta[property="${prefix}:title"]`, 'content', title);
    setMeta(`meta[property="${prefix}:description"]`, 'content', description);
  }
}

// --- Données structurées (JSON-LD) ---------------------------------------------------------
// Complètent les schémas statiques Person/Organization de public/index.html.

type JsonLd = Record<string, unknown>;

const CONTEXT = 'https://schema.org';
const PERSON = { '@type': 'Person', name: OWNER.name };

const SERVICES = [
  {
    name: 'Applications web sur-mesure',
    description: "Sites vitrines, applications web complexes, e-commerce et sites institutionnels développés avec React, Next.js et API REST.",
  },
  {
    name: 'Solutions IA',
    description: "Intégration d'API OpenAI, chatbots intelligents, génération d'images (DALL-E, Stable Diffusion) et déploiement local de modèles IA.",
  },
];

function buildSchemasForPath(pathname: string): JsonLd[] {
  const itemListElement = [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` }];
  if (!isHomePath(pathname)) {
    itemListElement.push({
      '@type': 'ListItem',
      position: 2,
      name: SEO_DATA[pathname]?.breadcrumb || pathname,
      item: `${SITE_URL}${pathname}`,
    });
  }
  const schemas: JsonLd[] = [{ '@context': CONTEXT, '@type': 'BreadcrumbList', itemListElement }];

  // Services proposés et diplômes : uniquement sur la page d'accueil, où ils sont affichés.
  if (isHomePath(pathname)) {
    schemas.push(
      ...SERVICES.map((service) => ({
        '@context': CONTEXT,
        '@type': 'Service',
        ...service,
        provider: PERSON,
        areaServed: 'FR',
      })),
      ...FORMATIONS.map(({ credential, issuer }) => ({
        '@context': CONTEXT,
        '@type': 'EducationalOccupationalCredential',
        name: credential,
        about: PERSON,
        ...(issuer ? { recognizedBy: { '@type': 'Organization', name: issuer } } : {}),
      })),
    );
  }

  return schemas;
}

/** Injecte (ou met à jour) l'unique <script type="application/ld+json"> dynamique. */
export function applyStructuredData(pathname: string) {
  const schemas = buildSchemasForPath(pathname);

  let script = document.getElementById('dynamic-jsonld') as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'dynamic-jsonld';
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
}
