# Site professionnel de Nicolas Goujon

Site professionnel (React) avec formulaire de contact géré par une API Laravel (envoi d’emails SMTP : réception du message + confirmation à l’expéditeur).

## Fonctionnalités

- Présentation personnelle, projets, compétences, expérience
- Formulaire de contact (email vers contact@nicolas-goujon.fr + confirmation à l’expéditeur)
- Footer avec lien « Site réalisé par Qwebty »

## Stack

- **Frontend** : React + TypeScript (Create React App), Material UI
- **API contact** : Laravel (PHP), envoi d’emails via SMTP
- **Docker** : front (nginx + build React) + API Laravel ; nginx proxy `/api` vers Laravel

## Installation

### Prérequis

- Node.js et npm
- PHP 8.3+ et Composer (pour l’API en dev local)

### 1. Frontend (React)

```bash
npm install
cp .env.example .env   # ou env.example → adapter les variables
npm start
```

Le site est disponible sur [http://localhost:3000](http://localhost:3000).

### 2. API contact (Laravel) – dev local

```bash
cd api
cp .env.example .env
# Renseigner MAIL_* et CONTACT_EMAIL_TO dans api/.env
composer install
php artisan key:generate
php artisan serve
```

L’API écoute sur [http://localhost:8000](http://localhost:8000). Le front doit pointer vers elle via `REACT_APP_CONTACT_API_URL=http://localhost:8000/api/contact` dans le `.env` à la racine.

### 3. Avec Docker (front + API sur un seul port)

À la racine, créer un `.env` (ou copier depuis `env.example`) avec au minimum :

- `APP_KEY` : clé Laravel (générer avec `cd api && php artisan key:generate --show`)
- `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`, `MAIL_FROM_ADDRESS`, `MAIL_FROM_NAME`, `CONTACT_EMAIL_TO`

Puis :

```bash
PORT=3000 docker compose up --build -d
```

- Le site est servi sur **http://localhost:3000** (ou le port défini par `PORT`).
- Les requêtes `/api/contact` sont proxyfiées vers le conteneur Laravel ; pas besoin de `REACT_APP_CONTACT_API_URL` (URL relative `/api/contact`).

Arrêt :

```bash
docker compose down
```

## Structure du projet

```
nicolas-goujon/
├── api/                    # API Laravel (formulaire de contact)
│   ├── app/Http/Controllers/
│   ├── app/Mail/
│   ├── config/
│   ├── routes/api.php
│   └── .env.example
├── public/
├── src/                    # React (TypeScript)
├── Dockerfile              # Build React + nginx (proxy /api vers api)
├── docker-compose.yml      # services: web, api
├── nginx.conf
├── env.example             # Récap des variables (front + api + Docker)
└── README.md
```

## Configuration (env)

Voir **env.example** pour la liste des variables.

- **Frontend** (`.env` à la racine) : `PORT`, `REACT_APP_CONTACT_API_URL` (optionnel en Docker).
- **API Laravel** (`api/.env`) : `APP_KEY`, `MAIL_*`, `CONTACT_EMAIL_TO`.
- **Docker** : même `.env` à la racine que pour le front, avec en plus `APP_KEY` et les variables `MAIL_*` / `CONTACT_EMAIL_TO` utilisées par le service `api`.

## Scripts

- `npm start` : dev React (port 3000 par défaut)
- `npm run build` : build de production
- `npm test` : tests

## Déploiement VPS

Le script `tools/deploy.sh` déploie le site (port 3001 par défaut). Exposer les variables d’environnement nécessaires à Laravel (SMTP, `CONTACT_EMAIL_TO`, `APP_KEY`) sur le serveur (fichier `.env` ou config du conteneur).

Pour exposer via un domaine, utiliser le template `tools/nginx-site.conf.example` (proxy vers le port du conteneur).

## Sauvegardes

Sauvegarde automatisée (cron) de la base de données et des fichiers, avec envoi vers un stockage externe et procédure de restauration : voir `tools/BACKUP_PROCEDURE.md`.

## Contact

Formulaire sur le site ou contact@nicolas-goujon.fr.
