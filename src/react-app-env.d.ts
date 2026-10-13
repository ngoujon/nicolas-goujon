/// <reference types="react-scripts" />

// Mesure d'audience SEO Monitor (chargé dans public/index.html).
interface Window {
  seoMonitor?: {
    track: (name: string, props?: Record<string, string | number | boolean>) => void;
    optOut: () => void;
  };
}
