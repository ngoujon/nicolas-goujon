# Audit Core Web Vitals - Nicolas GOUJON Portfolio

Date: 2026-08-20  
Navigateur: Analyse du code source (permissionsRequirements: Chrome extension permission requise pour évaluation runtime)

## Résumé Exécutif

L'analyse du code source révèle plusieurs problèmes impactant négativement les Core Web Vitals :
- **LCP (Largest Contentful Paint)**: Images volumineuses sans optimisation
- **CLS (Cumulative Layout Shift)**: Images sans dimensions définies
- **INP (Interaction to Next Paint)**: Bundle JavaScript lourd (Material-UI)

---

## 1. LCP - Largest Contentful Paint (Temps de chargement du plus grand élément)

### Problèmes Critiques

#### 1.1 Images non optimisées - TROP VOLUMINEUX
- **engine.jpg**: 830 KB (ligne Home.js - section professionnelle)
- **site.jpg**: 754 KB (ligne Home.js - section professionnelle)
- **background.jpg**: 206 KB (hero section)
- **workspace.jpg**: 258 KB (inutilisé en prod)

**Impact**: Ces fichiers retardent significativement le LCP. Images JPEG sans compression moderne (pas de WebP, pas d'AVIF).

**Recommandations**:
- Compresser à 50-70% de la taille actuelle (cible: <100KB par image)
- Fournir des formats modernes (WebP/AVIF) en fallback JPEG
- Utiliser srcset pour le responsive (desktop/mobile)
- Considérer un image CDN (Cloudinary, Imgix, etc.)

#### 1.2 Images sans attributs width/height - CLS RISK
```javascript
// Home.js ligne 70 - HeroSection
backgroundImage: 'url(/images/background/background.jpg)'
// ❌ Pas de largeur/hauteur pré-allouées

// Home.js ligne 1092 - CitationImg
style={{ backgroundImage: 'url(/images/profil.jpg)' }}
// ❌ Pas de padding-bottom trick ou aspect-ratio

// Home.js ligne 1168 - Qwebty Logo
src="/images/qwebty/logo-v2-hd-blanc.png"
// ✅ Dimensions explicites (OK)
```

**Recommandations**:
- Ajouter `aspect-ratio` CSS ou padding-bottom trick pour les background-images
- Spécifier `width` et `height` sur les balises `<img>`
- Exemple: `sx={{ aspectRatio: '16/9' }}` pour background-images

#### 1.3 Polices bloquantes
- **App.css lignes 2-32**: 4 polices TTF locales (@font-face)
- Font-display: **swap** ✅ (bon - fallback immédiat)
- Chemin relatif **INCORRECT**: `url('../public/fonts/...')` ❌

**Problème**: En production, ce chemin ne fonctionnera pas. Doit être `/fonts/...`

```css
/* AVANT (incorrect) */
@font-face {
  src: url('../public/fonts/garet.ttf');
}

/* APRÈS (correct) */
@font-face {
  src: url('/fonts/garet.ttf');
}
```

#### 1.4 Chargement des icônes CDN
- Font Awesome 6.0.0 depuis cdnjs.cloudflare.com (index.html ligne 33) - sans optimisation
- Bootstrap Icons chargés dynamiquement via CSS (Home.js ligne 10)

**Recommandations**:
- Font Awesome: Remplacer par SVG inline ou React Icons (déjà utilisé)
- Bootstrap Icons: Même stratégie SVG

---

## 2. CLS - Cumulative Layout Shift (Stabilité visuelle)

### Problèmes Identifiés

#### 2.1 Images sans dimensions - PRINCIPAL CULPRIT
Voir section 1.2 ci-dessus. Layout shifts garantis lors du chargement des images.

#### 2.2 Material-UI Overhead
- Container dynamique, spacing responsive
- Bien implémenté avec breakpoints (sx={{ xs, sm, md, lg }})
- ⚠️ Initialisation du thème peut créer un flash (FOUC - Flash Of Unstyled Content)

**Recommandation**: Ajouter un preload du thème ou inline initial CSS.

#### 2.3 Animations - OK
```css
/* OK - transform et opacity n'affectent pas le CLS */
transform: scale(1.1);
transform: translateY(-5px);
```

---

## 3. INP - Interaction to Next Paint (Réactivité)

### Problèmes Identifiés

#### 3.1 Bundle JavaScript lourd
- React + React Router: ~42KB
- Material-UI (@mui/material): ~150KB+ (TRÈS LOURD)
- Material-UI Icons: ~40KB+
- Web Vitals library: ~4KB
- Bootstrap Icons CSS: variable

**Total estimé**: 250+ KB JavaScript non compressé

**Recommandations**:
- Audit du usage Material-UI: Utiliser seulement les composants nécessaires
- Considérer alternative: Tailwind CSS + custom components
- Lazy loading des routes avec React.lazy()
- Code splitting: Charger les polices custom en defer

#### 3.2 Pas de Web Vitals monitoring
- index.js (ligne 17): `reportWebVitals()` sans callback
- ⚠️ Les vitals ne sont pas loggés/envoyés
- Impossible de mesurer les performances en production

**Recommandation**: Ajouter logging/monitoring:
```javascript
reportWebVitals((metric) => {
  console.log(metric);
  // Envoyer à analytics (Sentry, DataDog, etc.)
});
```

#### 3.3 Événements scroll fréquents
- Home.js lignes 294-303: Listener sur scroll
- Bien implémenté avec debounce par le navigateur
- ✅ OK pour INP

---

## Prescriptions d'Optimisation par Priorité

### 🔴 Haute Priorité (Impact LCP/CLS direct)

1. **Compresser images volumineuses**
   - engine.jpg, site.jpg, background.jpg → <100KB chacune
   - Ajouter WebP + AVIF avec fallback JPEG
   - Effort: 2h | Gain: -30% LCP

2. **Ajouter dimensions images**
   - Aspect-ratio CSS pour background-images
   - Width/height pour balises `<img>`
   - Effort: 1h | Gain: -80% CLS

3. **Corriger chemins polices**
   - `url('../public/fonts/...')` → `url('/fonts/...')`
   - Effort: 15min | Gain: Critique (fonctionnement en prod)

### 🟠 Moyenne Priorité (Impact INP)

4. **Implémenter Web Vitals monitoring**
   - Configurer reportWebVitals() avec logging
   - Envoyer à service de monitoring (Analytics, Sentry)
   - Effort: 1h | Gain: Data-driven optimization

5. **Optimiser Material-UI**
   - Audit: Quels composants sont vraiment utilisés?
   - Tree-shaking: Importer uniquement ce qui est nécessaire
   - Considérer Tailwind + custom pour prochaine refonte
   - Effort: 3-4h | Gain: -20% JavaScript

6. **Lazy load images au-dessous du fold**
   - Ajouter loading="lazy" ou intersection observer
   - Différer le chargement des images professionnel (engine.jpg, site.jpg)
   - Effort: 1h | Gain: -50% initial page load

### 🟡 Basse Priorité (Optimisations complémentaires)

7. **Remplacer Font Awesome CDN par SVG**
   - Déjà dans le code via React Icons
   - Effort: 1h | Gain: -20KB + pas de CDN latency

8. **Inline critical CSS**
   - Évaluer le besoin (peut être overkill pour un portfolio)
   - Effort: 2h | Gain: -50ms FCP

---

## Checklist de Vérification - À Faire

- [ ] Compresser engine.jpg → <100KB
- [ ] Compresser site.jpg → <100KB
- [ ] Compresser background.jpg → <100KB
- [ ] Générer WebP/AVIF pour les images
- [ ] Ajouter aspect-ratio ou padding-bottom pour CitationImg
- [ ] Corriger chemins polices dans App.css (../public → /)
- [ ] Implémenter reportWebVitals avec callback
- [ ] Ajouter loading="lazy" aux images off-screen
- [ ] Auditer Material-UI - supprimer composants inutilisés
- [ ] Mesurer Core Web Vitals après optimisations (PageSpeed Insights)

---

## Outils Recommandés pour Mesurer

1. **Google PageSpeed Insights**: https://pagespeed.web.dev
2. **WebPageTest**: https://webpagetest.org
3. **GTmetrix**: https://gtmetrix.com
4. **Chrome DevTools** (Performance tab + Lighthouse)

---

## Notes

- Pas pu évaluer les métriques réelles (runtime) faute de permission Chrome
- Évaluation basée sur analyse du code source React et CSS
- Images spécifiées en `background-image` URL (non-HTML) → plus difficiles à optimiser
- Material-UI apporte valeur (responsive, accessible) mais coût JavaScript élevé
