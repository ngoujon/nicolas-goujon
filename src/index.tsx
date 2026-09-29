import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { logger } from './utils/logger';

// Capture les erreurs et rejets de promesse non gérés au niveau global,
// en complément de l'Error Boundary React (qui ne couvre que le rendu des composants).
window.addEventListener('error', (event) => {
  logger.logError(event.error || new Error(event.message), 'window.onerror');
});
window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason instanceof Error ? event.reason : new Error(String(event.reason));
  logger.logError(reason, 'unhandledrejection');
});

// Le HTML servi au premier chargement est pré-rendu au build (voir
// tools/prerender.js) afin que le contenu soit visible sans JavaScript.
// React reprend ensuite la main normalement une fois le bundle chargé.
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Mesure des Core Web Vitals (LCP, CLS, FID, FCP, TTFB) : logs en dev,
// transmission au logger (donc au service de monitoring si configuré) en production.
reportWebVitals((metric) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  } else {
    logger.logInfo(`${metric.name}: ${metric.value}`, 'web-vitals');
  }
});
