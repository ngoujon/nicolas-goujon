// Configuration centrale du consentement aux cookies non essentiels (RGPD, opt-in).
//
// Le site n'utilise actuellement aucun outil de suivi (voir PrivacyPolicy.tsx).
// Ce module prépare le mécanisme de consentement pour le jour où un outil de
// suivi (Google Analytics, publicité, pixel...) sera réellement intégré.
//
// Pour activer un tracker :
// 1. Ajoutez une entrée dans TRACKERS ci-dessous (id, nom affiché, fonction load).
// 2. Le bandeau <CookieConsent /> (déjà monté dans App.tsx) s'affichera alors
//    automatiquement et ne chargera le script qu'après acceptation explicite.
//
// Exemple pour Google Analytics 4 :
// {
//   id: 'ga4',
//   name: 'Google Analytics',
//   load: () => loadScript('https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX', () => {
//     window.dataLayer = window.dataLayer || [];
//     function gtag() { window.dataLayer.push(arguments); }
//     gtag('js', new Date());
//     gtag('config', 'G-XXXXXXX');
//   }),
// }

export interface Tracker {
  id: string;
  name: string;
  load: () => void;
}

interface StoredConsent {
  accepted: boolean;
  date: string;
}

export const TRACKERS: Tracker[] = [];

const STORAGE_KEY = 'cookie-consent';

export function loadScript(src: string, onLoad?: () => void): HTMLScriptElement {
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  if (onLoad) script.onload = onLoad;
  document.head.appendChild(script);
  return script;
}

export function getConsent(): StoredConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setConsent(accepted: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ accepted, date: new Date().toISOString() }));
  } catch {
    // stockage indisponible (navigation privée stricte, quota...) : le bandeau
    // se réaffichera à la visite suivante, ce qui reste sans danger.
  }
}

export function applyConsentIfAccepted() {
  const consent = getConsent();
  if (consent && consent.accepted) {
    TRACKERS.forEach((tracker) => tracker.load());
  }
}
