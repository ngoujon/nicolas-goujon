# Audit : Compression et Cache HTTP

## Date de vérification
20 août 2026

## Configuration de la compression

### Status : ✅ ACTIVÉE (gzip)

**gzip**
- État : **ACTIVÉ**
- Configuration : `gzip on;` (nginx.conf:18)
- Types gzip configurés (nginx.conf:19) :
  - text/plain
  - text/css
  - application/json
  - application/javascript
  - text/xml
  - application/xml
  - application/xml+rss
  - text/javascript

**Brotli**
- État : **NON DISPONIBLE**
- Raison : Image nginx:alpine (officielle) ne compile pas Brotli par défaut
- Impact : Gzip suffit pour la majorité des clients modernes

### Tests réels

**Test 1 : Asset CSS (static/css/main.0d8119e6.css)**
```
curl -I -H "Accept-Encoding: gzip, deflate" http://localhost:4100/static/css/main.0d8119e6.css

Headers reçus :
- Content-Encoding: gzip ✅
- Server: nginx/1.31.2
- Content-Type: text/css
```

**Constat** : Compression gzip confirmée et fonctionnelle

---

## Configuration du cache HTTP

### Status : ✅ PARTIELLEMENT CONFIGURÉE

**Pour les assets statiques (JS, CSS, images, fonts)**
- Configuration (nginx.conf:22-25)
  ```nginx
  location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
      expires 1y;
      add_header Cache-Control "public, immutable";
  }
  ```

- En-têtes retournés (test CSS) :
  - ✅ **Cache-Control: max-age=31536000** (1 an, généré par `expires 1y`)
  - ✅ **Cache-Control: public, immutable** (explicite)
  - ✅ **Expires: Fri, 20 Aug 2027** (1 an)
  - ✅ **ETag: W/"6a859b86-15adc"** (validateur de cache)

**Pour les documents HTML (index.html)**
- Configuration : Aucune directive de cache explicite
- En-têtes retournés (test index.html) :
  - ✅ **ETag: "6a859b86-b33"** (validateur fort)
  - ❌ **Pas de Cache-Control** (pas de directive de cache)
  - ❌ **Pas d'Expires** (cache par défaut du navigateur)

**Constat** : Assets immuables cachés 1 an ✅ | HTML non-cacheable (par défaut) ⚠️

---

## Résumé des en-têtes HTTP

| En-tête | Assets (JS/CSS) | HTML (index) | Recommandé |
|---------|-----------------|------|-----------|
| **Content-Encoding** | gzip ✅ | (pas applicable) | Oui |
| **Cache-Control** | public, immutable + max-age=31536000 ✅ | (absent) ⚠️ | Oui |
| **ETag** | Oui ✅ | Oui ✅ | Oui |
| **Expires** | Oui ✅ | (absent) ⚠️ | Optionnel |
| **Brotli** | Non disponible ⚠️ | N/A | Optionnel (moderne) |

---

## Recommandations

### Priorité 1 : Ajouter Cache-Control au HTML (Sécurité + Performance)

**Raison** : Permettre la mise en cache du HTML pour les SPA (Single Page Applications), tout en forçant la revalidation auprès du serveur. Cela réduit la bande passante et améliore les performances de reload.

**Action** : Ajouter dans nginx.conf avant le fallback SPA :
```nginx
# Cache du HTML avec revalidation
location ~* /index\.html$ {
    add_header Cache-Control "public, max-age=3600, must-revalidate";
}
```

Ou pour toute réponse HTML :
```nginx
location ~* \.html$ {
    add_header Cache-Control "public, max-age=3600, must-revalidate";
}
```

**Effet** : Le HTML sera mis en cache 1h, avec revalidation ETag à chaque rechargement.

### Priorité 2 : Ajouter Vary header pour le Content-Encoding

**Raison** : Certains proxies/caches pourraient servir la version gzip à un client ne supportant pas gzip. Nginx 1.31.2 ajoute normalement `Vary: Accept-Encoding` automatiquement avec gzip, mais c'est bien de le vérifier.

**Action** : Vérifier que Nginx ajoute automatiquement `Vary: Accept-Encoding` (généralement oui depuis nginx 1.3.5+).

### Priorité 3 : Activar Brotli (Optionnel, amélioration future)

**Raison** : Brotli offre une compression 10-15% meilleure que gzip pour les formats texte.

**Action** : Utiliser une image Docker nginx avec Brotli compilé, par exemple :
- `nginxinc/nginx-unprivileged:1.31-alpine` avec build custom
- Ou utiliser l'image `openresty/openresty:alpine` qui inclut Brotli

**Impact** : Réduit les téléchargements de ~10-15% pour les clients modernes (tous les navigateurs modernes supportent Brotli).

---

## Checklist validée

- ✅ **Compression gzip activée** côté serveur
- ✅ **Cache-Control configuré** pour assets immuables (1 an)
- ✅ **Expires configuré** pour assets immuables (1 an)
- ✅ **ETag activé** par défaut (nginx)
- ✅ **Gzip fonctionne** confirmé par tests HTTP réels
- ⚠️ **Brotli non disponible** (limitations de l'image Docker)
- ⚠️ **HTML non-cacheable** par défaut (à améliorer)

**Status global** : 🟡 Bon (compression OK, cache OK pour assets, amélioration possible pour HTML et Brotli)
