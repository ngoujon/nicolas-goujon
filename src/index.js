import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Le HTML servi au premier chargement est pré-rendu au build (voir
// tools/prerender.js) afin que le contenu soit visible sans JavaScript.
// React reprend ensuite la main normalement une fois le bundle chargé.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Mesure des Core Web Vitals (LCP, CLS, FID, FCP, TTFB) en développement.
reportWebVitals(process.env.NODE_ENV === 'development' ? console.log : undefined);
