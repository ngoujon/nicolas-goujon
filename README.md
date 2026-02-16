# Site professionnel de Nicolas Goujon

Ce projet est le site professionnel de Nicolas Goujon, développé avec React. Il présente mes compétences, mes projets et mon parcours professionnel.

## 🚀 Fonctionnalités

- Présentation personnelle
- Projets réalisés
- Compétences techniques
- Expérience professionnelle
- Formulaire de contact

## 🛠️ Technologies utilisées

- React
- JavaScript/TypeScript
- HTML5/CSS3
- Node.js
- npm

## 📦 Installation

1. Clonez le repository :
```bash
git clone https://github.com/votre-username/nicolas-goujon.git
```

2. Installez les dépendances :
```bash
cd nicolas-goujon
npm install
```

3. Lancez l'application en mode développement :
```bash
npm start
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000)

## 🏗️ Structure du projet

```
nicolas-goujon/
├── public/          # Fichiers statiques
├── src/             # Code source
│   ├── components/  # Composants React
│   ├── pages/       # Pages de l'application
│   ├── assets/      # Images, styles, etc.
│   └── App.js       # Point d'entrée de l'application
├── package.json     # Dépendances et scripts
└── README.md        # Documentation
```

## 📝 Scripts disponibles

- `npm start` : Lance l'application en mode développement
- `npm run build` : Crée une version de production optimisée
- `npm test` : Lance les tests
- `npm run eject` : Éjecte la configuration (opération irréversible)

## 🐳 Docker

Par défaut le site écoute sur le **port 3001** (pour éviter les conflits avec d'autres services).

### Local (port 3000)
```bash
PORT=3000 docker compose up -d
```

### Production / VPS (port 3001)
```bash
docker compose up -d
```

## 🚀 Déploiement VPS

Le script `tools/deploy.sh` déploie sur un VPS sans écraser les configurations existantes (port 3001).

```bash
# Déploiement
./tools/deploy.sh -h votre-vps.com

# Avec options
./tools/deploy.sh -h vps.example.com -u deploy -p /opt/nicolas-goujon

# Build uniquement (sans déployer)
./tools/deploy.sh --build-only
```

Pour exposer via un domaine, utilisez le template `tools/nginx-site.conf.example`.

## 🔧 Configuration avancée

Pour plus d'informations sur la configuration, consultez la [documentation de Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📧 Contact

Pour toute question ou suggestion, n'hésitez pas à me contacter via le formulaire de contact sur le site.
