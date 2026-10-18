// Contenu éditorial du site, centralisé ici pour séparer les données de la présentation :
// modifier un texte, une compétence ou un lien ne nécessite pas de toucher aux composants.
import type { IconType } from 'react-icons';
import {
  BsAward, BsBack, BsBarChartSteps, BsBookmarkCheck, BsCart, BsChatDots, BsCodeSquare, BsCpu,
  BsDatabase, BsFileEarmarkText, BsFront, BsGear, BsHddNetwork, BsImage, BsLayoutWtf, BsListOl,
  BsMic, BsMortarboard, BsPalette, BsPatchCheck, BsPhone, BsTerminal,
} from 'react-icons/bs';

export const OWNER = {
  name: 'Nicolas GOUJON',
  title: 'Développeur Web & Product Owner',
  email: 'contact@nicolas-goujon.fr',
  phone: '+33 (0) 6 95 35 28 12',
};

/**
 * Sections de la page d'accueil accessibles depuis la navigation.
 * `id` : ancre HTML de la section ; `path` : route dédiée (pour le partage de lien et le SEO).
 */
export const NAV_ITEMS = [
  { id: 'experience', path: 'projets', label: 'Expérience' },
  { id: 'stack', path: 'stack', label: 'Stack' },
  { id: 'formation', path: 'formation', label: 'Formation' },
  { id: 'bio', path: 'bio', label: 'Bio' },
  { id: 'contact', path: 'contact', label: 'Contact' },
];

export const SOCIAL_LINKS = [
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/ngoujon/' },
  { id: 'github', label: 'GitHub', href: 'https://github.com/ngoujon' },
] as const;

export interface ExperienceCard {
  icon: IconType;
  title: string;
  intro: string;
  items: { icon: IconType; text: string }[];
  outro: string;
}

export const EXPERIENCES: ExperienceCard[] = [
  {
    icon: BsCodeSquare,
    title: 'Applications web',
    intro: "Fort d'une solide expérience, je maîtrise la création de sites internet variés :",
    items: [
      { icon: BsLayoutWtf, text: 'Sites vitrines modernes et responsives avec React, Next.js' },
      { icon: BsDatabase, text: 'Applications web complexes avec gestion de base de données et API REST' },
      { icon: BsCart, text: 'Solutions e-commerce avec intégration de paiement sécurisé' },
      { icon: BsFileEarmarkText, text: 'Sites institutionnels avec gestion de contenu (CMS)' },
      { icon: BsPhone, text: 'Applications web progressives (PWA) pour une expérience mobile optimale' },
    ],
    outro: "Je m'efforce de suivre les meilleures pratiques en matière de développement, en accordant une attention particulière à la sécurité, l'accessibilité et les performances.",
  },
  {
    icon: BsCpu,
    title: 'Solutions IA',
    intro: "Je maîtrise différentes technologies d'intelligence artificielle :",
    items: [
      { icon: BsMic, text: "Intégration d'OpenAI pour des solutions de Text-to-Speech (TTS) avancées" },
      { icon: BsChatDots, text: "Développement de chatbots intelligents utilisant l'API ChatGPT" },
      { icon: BsImage, text: "Création d'applications avec DALL-E pour la génération d'images" },
      { icon: BsPalette, text: "Utilisation de Stable Diffusion pour la génération et la manipulation d'images" },
      { icon: BsHddNetwork, text: 'Déploiement local de modèles Mistral 8x7B pour des applications IA autonomes' },
    ],
    outro: "Ces expériences m'ont permis d'acquérir une bonne compréhension des possibilités offertes par l'IA et de son intégration dans le développement web.",
  },
];

/** Compétences techniques, affichées en lignes de 4 colonnes séparées par un trait. */
export const STACK_ROWS: { icon: IconType; title: string; skills: string[] }[][] = [
  [
    { icon: BsFront, title: 'Front-End', skills: ['React JS', 'Next.js', 'HTML & CSS'] },
    { icon: BsBack, title: 'Back-End', skills: ['PHP & SQL', 'API REST'] },
    { icon: BsLayoutWtf, title: 'Design', skills: ['Security by Design', 'Adobe XD', 'UI & UX', 'Responsive', 'Figma'] },
    { icon: BsListOl, title: 'Référencement', skills: ['Google Analytics', 'SEO - SEA - SMO'] },
  ],
  [
    { icon: BsCpu, title: 'I.A', skills: ['Stable Diffusion', 'Open AI', 'Mistral'] },
    { icon: BsBarChartSteps, title: 'Agile', skills: ['Jira', 'Trello', 'MindView', 'Gantt'] },
    { icon: BsTerminal, title: 'DevOps', skills: ['Docker', 'Git', 'GitHub', 'GitLab', 'Vultr', 'OVH'] },
    { icon: BsGear, title: 'Engineering', skills: ['Application Web / SaaS', 'UML Diagram', 'Conception logigramme', 'Rédaction MU'] },
  ],
];

/**
 * Diplômes et certifications. `credential` est le libellé complet publié dans les
 * données structurées (JSON-LD), `subtitle` la version courte affichée sur la carte.
 */
export const FORMATIONS: {
  icon: IconType;
  title: string;
  subtitle: string;
  credential: string;
  issuer?: string;
}[] = [
  { icon: BsPatchCheck, title: 'Certification PSPO 1', subtitle: 'Scrum.org', credential: 'Certification PSPO 1', issuer: 'Scrum.org' },
  { icon: BsAward, title: 'Titre Professionnel', subtitle: 'Développeur web et web mobile', credential: 'Titre Professionnel Développeur web et web mobile' },
  { icon: BsBookmarkCheck, title: 'Brevet de Technicien Supérieur', subtitle: 'Système Numérique Élec. & Com.', credential: 'Brevet de Technicien Supérieur - Système Numérique Électronique & Communication' },
  { icon: BsMortarboard, title: 'Baccalauréat', subtitle: 'STI2D - SIN', credential: 'Baccalauréat STI2D - SIN' },
];

export const BIO = {
  quote: "Passionné d'informatique depuis toujours, je me suis naturellement orienté vers la programmation web. Ce domaine représente pour moi l'innovation et les dernières avancées technologiques. J'ai donc décidé de faire de mon hobby un métier et je me suis lancé dans la création de sites internet professionnels.",
  paragraphs: [
    "Mon expérience dans la conception de logiciels SaaS m'a permis de développer une expertise technique et relationnelle. À travers plusieurs projets, notamment sur les phases de conception et de développement, j'ai pu mettre en place des outils et processus de qualité.",
    "J'ai également assuré le suivi et l'accompagnement des projets dans le temps, en restant à l'écoute des besoins clients pour faire évoluer les solutions. Cette collaboration directe avec les utilisateurs m'a appris à bien comprendre leurs attentes et à adapter les logiciels aux contraintes propres à chaque projet.",
    "Mon parcours en conception de sites web m'a permis de prendre en charge l'ensemble des étapes d'un projet, de la définition des besoins jusqu'à la maintenance. En tant qu'indépendant, j'ai également géré tous les aspects liés à la micro-entreprise : finance, administratif, organisation.",
    "Au fil des missions, j'ai accompagné des clients très variés : associations, entreprises et particuliers, avec des contextes, des équipes et des contraintes toujours différentes. Cette diversité m'a appris à m'adapter rapidement et à faire face aux imprévus avec efficacité",
  ],
  company: {
    name: 'Qwebty',
    tagline: 'Agence Web & Digital',
    url: 'https://www.qwebty.com',
    description: "Qwebty accompagne les entreprises et indépendants dans la création de solutions web sur mesure. Du site vitrine aux projets plus complexes, j'allie design, performance et expérience utilisateur pour développer des outils efficaces, adaptés aux objectifs de chaque client.",
  },
  tags: ['Engineering', 'SaaS', 'ERP', 'CRM', 'Relation client'],
};

/** Sujets proposés en boutons (sélection multiple) dans le formulaire de contact. */
export const CONTACT_SUBJECTS = [
  'Développer une application web',
  'Créer un site vitrine',
  'Améliorer un projet existant',
  "Discuter d'une opportunité",
  'Optimiser le référencement',
  'Déployer une solution SaaS',
  'Autres',
];
