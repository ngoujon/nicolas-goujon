# Audit — Formats d'images & lazy loading

Vérification de la checklist : images servies en formats modernes (WebP/AVIF)
ou au minimum compressées, avec `loading="lazy"` sur les images hors écran
initial.

## Constat

### 1. Formats d'images

Toutes les images du projet sont en **JPG/PNG**, aucune en WebP/AVIF :

| Fichier | Poids | Utilisée dans le code |
|---|---|---|
| `public/images/background/background.jpg` | 211 Ko | Oui — hero `Home.js` (au-dessus de la ligne de flottaison) |
| `public/images/profil.jpg` | 49 Ko | Oui — section BIO `Home.js` |
| `public/images/qwebty/logo-v2-hd-blanc.png` | 105 Ko | Oui — bandeau `Home.js` |
| `public/images/logo/logo_light.png` | — | Oui — `Header.js` (background-image) |
| `public/images/professionnel/engine.jpg` | 850 Ko | **Non référencée** dans `src/` |
| `public/images/professionnel/site.jpg` | 772 Ko | **Non référencée** dans `src/` |
| `public/images/background/workspace.jpg` | 264 Ko | **Non référencée** dans `src/` |
| `public/images/background/background_nb.jpg` | 214 Ko | **Non référencée** dans `src/` |
| `public/images/projets/logo_gabions.png` | 109 Ko | **Non référencée** dans `src/` |
| `public/images/logo/logo_dark.png` | — | **Non référencée** dans `src/` |

Les 6 fichiers marqués "non référencée" semblent être des images orphelines
(probablement d'anciennes sections du site) : elles alourdissent le dépôt et
le build sans être servies, mais n'impactent pas les visiteurs tant qu'elles
ne sont pas chargées.

### 2. `loading="lazy"`

- Une seule balise `<img>` réelle existe dans le code (`Home.js:1167`, logo
  Qwebty) : elle **n'a pas** d'attribut `loading="lazy"`. Cette image est
  cependant en bas de page, donc hors écran initial — candidate au lazy
  loading.
- Les deux autres images (`background.jpg` en hero, `profil.jpg` en section
  BIO) sont appliquées via CSS `background-image`, pas via `<img>`.
  L'attribut `loading` ne s'applique pas à ce mécanisme ; le lazy loading
  natif est donc **impossible** sur ces deux images sans les convertir en
  balises `<img>` (ou utiliser `Intersection Observer` côté JS).
  - `background.jpg` est le hero de la page d'accueil : elle est visible dès
    le chargement, donc ne doit **pas** être lazy-loadée (elle est même
    candidate LCP, cf. `CORE_WEB_VITALS_AUDIT.md`).
  - `profil.jpg` est plus bas dans la page (section BIO) : elle serait une
    bonne candidate au lazy loading si elle passait par une balise `<img>`.

## Conclusion

- **Formats modernes (WebP/AVIF)** : non respecté. Aucune image n'est
  actuellement servie en WebP/AVIF.
- **Compression a minima** : partiellement respecté. Les images utilisées
  (211 Ko, 105 Ko, 49 Ko) sont d'un poids raisonnable, mais pas optimales.
  Les images orphelines (jusqu'à 850 Ko) ne sont pas servies aux visiteurs.
- **`loading="lazy"`** : non respecté. Aucune image du projet ne porte cet
  attribut, y compris la seule actuellement hors écran initial (`profil.jpg`,
  logo Qwebty en bas de page).

## Recommandations (non appliquées dans cet audit)

1. Convertir `background.jpg`, `profil.jpg` et `logo-v2-hd-blanc.png` en
   WebP (avec fallback JPG/PNG via `<picture>` si compatibilité navigateur
   ancienne requise).
2. Ajouter `loading="lazy"` sur le logo Qwebty (`Home.js:1167`) et sur toute
   future balise `<img>` hors écran initial.
3. Remplacer les `background-image` CSS de `profil.jpg` par une vraie balise
   `<img loading="lazy">` pour bénéficier du lazy loading natif.
4. Supprimer ou archiver les 6 images orphelines non référencées dans le
   code pour alléger le dépôt.

Cet audit ne modifie aucun fichier applicatif ; il documente l'état actuel
pour préparer les corrections à venir.
