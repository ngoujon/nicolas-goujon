# Audit de sécurité — correctifs appliqués

Réponse à l'audit externe du 29/08/2026 sur `nicolas-goujon.fr` (7 vulnérabilités).

## Cause racine commune

Le site est servi par le conteneur `nicolas-goujon` (nginx) derrière le nginx de
l'hôte. **La version déployée datait de 9 jours** et ne contenait aucun des
en-têtes de sécurité déjà présents dans le dépôt. Deux causes :

1. Le build Docker était cassé — `.dockerignore` excluait `tools/`, alors que
   `npm run build` déclenche `tools/prerender.js` (script `postbuild`), et
   Chromium n'était pas installé dans l'image de build.
2. Le conteneur API renvoyait une erreur 500 sur chaque `POST /api/contact`.

## Correctifs

| # | Faille | Correctif |
|---|--------|-----------|
| 1 | Absence de CSP | `Content-Security-Policy` stricte (`script-src 'self'`, `object-src 'none'`, `base-uri`, `form-action`) — `nginx-security-headers.conf`. Le script d'init du thème est passé inline → `public/theme-init.js`, et `INLINE_RUNTIME_CHUNK=false` empêche CRA de réintroduire un script inline. |
| 2 | Clickjacking | `X-Frame-Options: DENY` + `frame-ancestors 'none'`. |
| 3 | Version serveur exposée | `server_tokens off` sur le nginx du conteneur **et** sur le vhost de l'hôte (portée limitée à ce site). |
| 4 | Repli SPA (200 partout) | `try_files … @not_found` + `error_page 404 /404.html` (page 404 pré-rendue). Les routes réelles existent sur disque via le pré-rendu ; toute autre URL renvoie un vrai 404 et `robots: noindex`. |
| 5 | `/api/contact` en erreur 500 | Laravel utilisait le store de cache `database` par défaut, sur une base SQLite absente : le middleware `throttle` plantait avant d'atteindre le contrôleur. `CACHE_STORE=file` (+ `SESSION_DRIVER=file`, `QUEUE_CONNECTION=sync`) dans `docker-compose.yml`. |
| 6 | Absence de HSTS | `Strict-Transport-Security: max-age=31536000; includeSubDomains`, posé par le conteneur et transmis tel quel par le proxy TLS de l'hôte. |
| 7 | Absence de nosniff | `X-Content-Type-Options: nosniff`. |

Ajouts au-delà de l'audit :

- **Bug d'héritage nginx** : `add_header` n'est hérité que si le bloc courant
  n'en déclare aucun. Le bloc de cache des assets en déclarait un, donc **tous
  les JS/CSS/images partaient sans aucun en-tête de sécurité**. Les en-têtes
  sont désormais inclus dans chaque bloc concerné.
- **Rate limiting réellement par IP** : sans `trustProxies`, Laravel voyait
  l'IP de la passerelle Docker pour tous les visiteurs — le quota de
  5 requêtes/minute était global et donc trivial à saturer
  (`api/bootstrap/app.php`).
- **CORS** : `CORS_ALLOWED_ORIGINS` est désormais transmise au conteneur ; sans
  elle l'API répondait `Access-Control-Allow-Origin: *`.
- `Permissions-Policy` et `Cross-Origin-Opener-Policy`.

## Exploits cités par l'audit

- **XSS stored via le formulaire** : déjà couvert (`strip_tags` dans
  `ContactController` + échappement Blade dans les templates d'email), et la CSP
  bloque désormais tout script inline côté site.
- **Spam / réputation du domaine** : le rate limiting est fonctionnel (5 req/min
  par IP réelle, `429` au-delà), en plus du honeypot et du délai minimum de
  soumission.
- **Clickjacking** : bloqué par `X-Frame-Options` + `frame-ancestors`.

## Vérification après déploiement

```bash
curl -sSI https://nicolas-goujon.fr/ | grep -iE 'content-security|frame-options|nosniff|strict-transport|^server'
curl -sS -o /dev/null -w '%{http_code}\n' https://nicolas-goujon.fr/url-inexistante   # 404
curl -sS -X POST https://nicolas-goujon.fr/api/contact \
  -H 'Content-Type: application/json' -H 'Accept: application/json' \
  -d '{"name":"Test","email":"test@example.com","message":"test","website":"x"}'      # {"success":true}
```
