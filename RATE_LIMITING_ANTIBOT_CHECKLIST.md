# Vérification — Limitation de débit / protection anti-bot

Date : 2026-08-21

## Périmètre

Le site n'expose qu'un seul formulaire public et une seule route API sensible : le formulaire de contact (`POST /api/contact`). Aucune fonctionnalité de connexion ou d'inscription n'est exposée publiquement (aucune route `login`/`register` n'existe dans `api/routes/api.php` ou `api/routes/web.php`).

## Constat

Le endpoint `POST /api/contact` (`api/routes/api.php`) est déjà protégé par plusieurs mécanismes combinés :

- **Limitation de débit** : middleware `throttle:5,1` (5 requêtes par minute et par IP), défini directement sur la route.
- **Honeypot** : champ `website` invisible côté formulaire, qui ne doit jamais être rempli par un humain (`api/app/Http/Controllers/ContactController.php`). Si rempli, la requête est traitée comme un bot.
- **Détection de soumission trop rapide** : champ `elapsed_ms` qui mesure le temps entre l'affichage du formulaire et sa soumission ; en dessous de 3000 ms, la requête est considérée comme un bot.
- Dans les deux cas de détection de bot, l'API répond un succès factice (`{"success": true}`) sans envoyer d'email, afin de ne pas donner d'indice à un bot automatisé.

## Conclusion

Aucune action requise : le formulaire de contact, seul point d'entrée public sensible du site, dispose déjà d'une protection anti-bot combinée (rate limiting + honeypot + délai minimum). Il n'y a pas d'autre formulaire ou endpoint API sensible (pas de connexion/inscription) à ce jour.
