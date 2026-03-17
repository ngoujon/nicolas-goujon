# API Contact – Laravel

API minimale pour le formulaire de contact du site : envoi du message à l’adresse configurée et email de confirmation à l’expéditeur.

## Route

- `POST /api/contact`  
  Body JSON : `name`, `email`, `message`, `subjects` (optionnel, tableau)

## Configuration

Copier `api/.env.example` vers `api/.env` et renseigner :

- `APP_KEY` : `php artisan key:generate --show`
- `MAIL_MAILER=smtp`, `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`, `MAIL_FROM_ADDRESS`, `MAIL_FROM_NAME`
- `CONTACT_EMAIL_TO` : adresse qui reçoit les messages (ex. contact@nicolas-goujon.fr)

## Lancer en local

```bash
composer install
php artisan serve
```

Écoute sur http://localhost:8000. En production avec Docker, l’API est utilisée via le proxy nginx (`/api`).
