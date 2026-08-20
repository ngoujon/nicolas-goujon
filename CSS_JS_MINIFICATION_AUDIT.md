# Audit : Minification CSS/JS et chargement asynchrone

## Date de vérification
20 août 2026

## Méthode
Build de production généré via `npm run build` (react-scripts / CRA), puis inspection directe des fichiers produits dans `build/`.

## Minification CSS/JS

### Status : ✅ CONFORME

**JavaScript**
- Fichier : `build/static/js/main.33103143.js`
- Taille gzip : 127,88 kB
- Contenu compacté sur 75 lignes (code minifié, noms de variables raccourcis, pas de commentaires ni d'espaces superflus)
- Chunk secondaire : `build/static/js/453.b4fdf70d.chunk.js` (1,79 kB gzip), également minifié
- Fichiers de licences séparés (`*.LICENSE.txt`), n'alourdissent pas le bundle exécuté

**CSS**
- Fichier : `build/static/css/main.0d8119e6.css`
- Taille gzip : 14,86 kB
- Contenu compacté sur 7 lignes (sélecteurs et règles concaténés, pas d'espaces/retours à la ligne superflus)

**Constat** : `react-scripts build` applique automatiquement Terser (JS) et cssnano/postcss (CSS) en production. Aucune configuration supplémentaire nécessaire — c'est déjà en place et fonctionnel.

## Chargement des scripts (async/defer)

### Status : ✅ CONFORME

**Script principal**
```html
<script defer="defer" src="/static/js/main.33103143.js"></script>
```
- Attribut `defer` présent : le script ne bloque pas le parsing HTML et s'exécute après le chargement complet du DOM.

**Feuilles de style**
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"/>
<link href="/static/css/main.0d8119e6.css" rel="stylesheet">
```
- Font Awesome chargé déjà en version minifiée (`all.min.css`) depuis un CDN externe.
- CSS applicatif local également minifié.
- Les feuilles de style CSS bloquent naturellement le rendu (comportement standard du navigateur) ; aucun script custom bloquant identifié dans le `<head>`.

**Script JSON-LD** (données structurées schema.org, cf. `SCHEMA_VERIFICATION.md`)
```html
<script type="application/ld+json">...</script>
```
- Non exécutable, pas de blocage de rendu.

## Conclusion

| Critère | Résultat |
|---|---|
| CSS minifié en production | ✅ |
| JS minifié en production | ✅ |
| Scripts non critiques en async/defer | ✅ (script principal en `defer`) |

Rien à corriger : la chaîne de build CRA gère déjà la minification et l'injection du `defer` sur le bundle principal.
