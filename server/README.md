# API Contact (SMTP)

Serveur d’envoi d’emails pour le formulaire de contact :
- envoi du message à ton adresse (copie pour toi) ;
- envoi d’un email de confirmation à l’expéditeur.

## Configuration

1. Copie `server/.env.example` vers `server/.env`.
2. Renseigne les variables ci-dessous dans `server/.env`.

### Constantes à mettre dans `server/.env`

| Variable | Description | Exemple |
|----------|-------------|--------|
| `SERVER_PORT` | Port du serveur API (optionnel, défaut 3030) | `3030` |
| `SMTP_HOST` | Serveur SMTP | `smtp.brevo.com`, `smtp.gmail.com`, `ssl0.ovh.net`, etc. |
| `SMTP_PORT` | Port SMTP (souvent 587 ou 465) | `587` |
| `SMTP_SECURE` | `true` pour le port 465 (TLS) | `false` |
| `SMTP_USER` | Identifiant SMTP | ton adresse ou utilisateur fourni par le prestataire |
| `SMTP_PASS` | Mot de passe SMTP (ou mot de passe d’application) | *** |
| `MAIL_FROM` | Adresse affichée comme expéditeur | `"Site Nicolas Goujon <noreply@mondomaine.com>"` |
| `CONTACT_EMAIL_TO` | Adresse qui reçoit les messages du formulaire | `contact@nicolas-goujon.fr` |

### Constantes à mettre dans le `.env` à la racine du projet (frontend)

| Variable | Description | Exemple |
|----------|-------------|--------|
| `REACT_APP_CONTACT_API_URL` | URL de l’API contact | En local : `http://localhost:3030/api/contact` |

En production, mets l’URL réelle de ton API (ex. `https://api.monsite.com/api/contact`).

## Lancer le serveur

```bash
cd server
npm install
npm run dev
```

En production : `npm start`.

## Exemples de fournisseurs SMTP

- **Brevo (ex Sendinblue)** : `SMTP_HOST=smtp-relay.brevo.com`, port 587, utilisateur = ton email Brevo, mot de passe = clé SMTP.
- **Gmail** : `SMTP_HOST=smtp.gmail.com`, port 587, mot de passe d’application (pas le mot de passe du compte).
- **OVH** : `SMTP_HOST=ssl0.ovh.net`, port 465, `SMTP_SECURE=true`, identifiants de ta boîte mail.
