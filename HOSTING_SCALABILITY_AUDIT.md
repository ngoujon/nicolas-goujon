# Audit — Hébergement/CDN vs charge attendue

## Constat

Architecture actuelle (`docker-compose.yml`, `Dockerfile`, `nginx.conf`, `tools/deploy.sh`) :

- **Un seul VPS**, déploiement Docker mono-instance (services `web` = nginx + build React statique, `api` = Laravel).
- Pas de load balancer, pas de réplicas (`docker-compose.yml` ne définit aucun `deploy.replicas` ni orchestrateur type Swarm/Kubernetes).
- Pas de CDN devant les assets statiques : nginx sert directement `/usr/share/nginx/html` avec du cache navigateur (`expires 1y`) mais aucune distribution géographique (pas de Cloudflare/CloudFront/Fastly identifié dans la config ou le DNS du dépôt).
- Le contact se fait via un point d'entrée `/api/` proxyfié vers un conteneur Laravel unique — un pic de trafic sur le formulaire de contact ferait goulot d'étranglement sur cette seule instance PHP.

## Évaluation

Pour un **site vitrine personnel/professionnel** (présentation, portfolio, formulaire de contact) à trafic modéré et prévisible, ce dimensionnement est **cohérent et suffisant** :

- Le contenu est majoritairement statique (React build), servi efficacement par nginx avec cache long (1 an) et gzip activés — cf. `COMPRESSION_CACHE_AUDIT.md`.
- Un VPS mono-instance encaisse sans problème un trafic de site vitrine (quelques milliers de visites/mois, pics ponctuels modérés).

## Points de vigilance (pas des anomalies bloquantes)

1. **Pas de CDN** : sur un site majoritairement statique, un CDN (Cloudflare gratuit par ex.) réduirait la latence pour les visiteurs éloignés du VPS et absorberait les pics de trafic sans coût de scalabilité — amélioration facultative, pas un prérequis pour ce profil de site.
2. **Point unique de défaillance (SPOF)** : un seul VPS, pas de réplicas ni de failover. Acceptable pour un site vitrine (indisponibilité limitée en cas de panne), mais à garder en tête si le site devait héberger une activité critique (e-commerce, SaaS).
3. **API Laravel mono-instance** : en cas de campagne marketing ou pic soudain (ex. passage média), le formulaire de contact pourrait saturer avant le reste du site statique.

## Conclusion

Aucun sous-dimensionnement manifeste au regard de l'audience visée (site professionnel/vitrine). Aucune action corrective urgente. Un CDN reste une amélioration facultative pour la performance internationale et l'absorption de pics, à envisager seulement si le trafic augmente significativement.
