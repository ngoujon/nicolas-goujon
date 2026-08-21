// Données structurées (JSON-LD) dynamiques par route.
// Complète les schémas statiques Person/Organization de public/index.html
// avec un fil d'Ariane, les services proposés et les formations, injectés
// dans un unique <script> mis à jour à chaque navigation (comme applySeo).

const SITE_URL = 'https://nicolas-goujon.com';

const BREADCRUMB_LABELS = {
  '/': 'Accueil',
  '/bio': 'Bio',
  '/stack': 'Stack',
  '/formation': 'Formation',
  '/projets': 'Projets',
  '/contact': 'Contact',
  '/politique-confidentialite': 'Politique de confidentialité',
  '/mentions-legales': 'Mentions légales',
};

const SERVICES = [
  {
    '@type': 'Service',
    name: 'Applications web sur-mesure',
    description: "Sites vitrines, applications web complexes, e-commerce et sites institutionnels développés avec React, Next.js et API REST.",
    provider: { '@type': 'Person', name: 'Nicolas GOUJON' },
    areaServed: 'FR',
  },
  {
    '@type': 'Service',
    name: 'Solutions IA',
    description: "Intégration d'API OpenAI, chatbots intelligents, génération d'images (DALL-E, Stable Diffusion) et déploiement local de modèles IA.",
    provider: { '@type': 'Person', name: 'Nicolas GOUJON' },
    areaServed: 'FR',
  },
];

const CREDENTIALS = [
  { name: 'Certification PSPO 1', issuingOrganization: 'Scrum.org' },
  { name: 'Titre Professionnel Développeur web et web mobile' },
  { name: 'Brevet de Technicien Supérieur - Système Numérique Électronique & Communication' },
  { name: 'Baccalauréat STI2D - SIN' },
];

function buildBreadcrumbList(pathname) {
  const itemListElement = [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
  ];

  if (pathname !== '/') {
    itemListElement.push({
      '@type': 'ListItem',
      position: 2,
      name: BREADCRUMB_LABELS[pathname] || pathname,
      item: `${SITE_URL}${pathname}`,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
}

function buildSchemasForPath(pathname) {
  const schemas = [buildBreadcrumbList(pathname)];

  if (pathname === '/projets') {
    schemas.push(
      ...SERVICES.map((service) => ({ '@context': 'https://schema.org', ...service }))
    );
  }

  if (pathname === '/formation') {
    schemas.push(
      ...CREDENTIALS.map((credential) => ({
        '@context': 'https://schema.org',
        '@type': 'EducationalOccupationalCredential',
        name: credential.name,
        about: { '@type': 'Person', name: 'Nicolas GOUJON' },
        ...(credential.issuingOrganization
          ? { recognizedBy: { '@type': 'Organization', name: credential.issuingOrganization } }
          : {}),
      }))
    );
  }

  return schemas;
}

export function applyStructuredData(pathname) {
  const schemas = buildSchemasForPath(pathname);

  let script = document.getElementById('dynamic-jsonld');
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'dynamic-jsonld';
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
}
