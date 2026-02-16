# Procédure de déploiement - Site Nicolas Goujon

## Prérequis

### Sur ta machine locale
- Docker installé
- Accès SSH au VPS (clé configurée)
- Git (pour récupérer les dernières modifications)

### Sur le VPS
- Docker installé
- Port 3001 disponible (non utilisé par un autre service)

---

## Étape 1 : Préparer le déploiement

1. **Récupérer les dernières modifications**
   ```bash
   git pull origin main
   ```

2. **Vérifier que le build fonctionne localement** (optionnel)
   ```bash
   PORT=3000 docker compose up --build -d
   # Tester sur http://localhost:3000
   docker compose down
   ```

---

## Étape 2 : Déployer sur le VPS

### Option A : Déploiement manuel (docker compose sur le VPS)

Si le code est déjà sur le VPS (git clone) :

```bash
cd ~/nicolas-goujon
docker compose up --build -d
```

Le port **3001** est utilisé par défaut (3000 évité car souvent occupé).

### Option B : Script de déploiement (depuis ta machine locale)

1. **Exécuter le script de déploiement**
   ```bash
   ./tools/deploy.sh -h ADRESSE_DE_TON_VPS
   ```

   Exemples :
   ```bash
   ./tools/deploy.sh -h 192.168.1.100
   ./tools/deploy.sh -h vps.example.com
   ./tools/deploy.sh -h mon-serveur.com -u deploy -p /opt/nicolas-goujon
   ```

2. **Variables d'environnement** (alternative)
   ```bash
   export VPS_HOST=ton-vps.com
   export VPS_USER=root          # optionnel, défaut: root
   export VPS_DEPLOY_PATH=/opt/nicolas-goujon   # optionnel
   ./tools/deploy.sh
   ```

---

## Étape 3 : Vérifier le déploiement

1. **Accéder au site**
   ```
   http://ADRESSE_VPS:3001
   ```

2. **Vérifier que le conteneur tourne** (en SSH sur le VPS)
   ```bash
   ssh user@vps docker ps | grep nicolas-goujon
   ```

---

## Étape 4 (optionnel) : Exposer via un domaine

Si tu veux que le site soit accessible via `https://nicolas-goujon.com` (ou un sous-domaine) :

1. **Copier le template de configuration nginx**
   ```bash
   scp tools/nginx-site.conf.example user@vps:/tmp/
   ```

2. **Sur le VPS, éditer et installer la config**
   ```bash
   ssh user@vps
   sudo nano /tmp/nginx-site.conf.example
   # Remplacer VOTRE_DOMAINE par ton domaine (ex: nicolas-goujon.com)
   # Renommer si besoin
   sudo mv /tmp/nginx-site.conf.example /etc/nginx/sites-available/nicolas-goujon.conf
   sudo ln -s /etc/nginx/sites-available/nicolas-goujon.conf /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

3. **Configurer le DNS** : pointer ton domaine vers l’IP du VPS

4. **HTTPS** : utiliser Certbot si besoin
   ```bash
   sudo certbot --nginx -d nicolas-goujon.com
   ```

---

## En cas de problème

| Problème | Solution |
|----------|----------|
| `Permission denied` sur deploy.sh | `chmod +x tools/deploy.sh` |
| `Docker not found` sur le VPS | Installer Docker : `curl -fsSL https://get.docker.com \| sh` |
| Port 3001 déjà utilisé | Changer le port dans le script ou libérer le port |
| Erreur SSH | Vérifier la clé : `ssh -v user@vps` |
| Site ne répond pas | Vérifier le firewall : `sudo ufw allow 3001` |

---

## Mise à jour du site

Pour redéployer après des modifications :

```bash
git pull origin main
./tools/deploy.sh -h ADRESSE_VPS
```

Le script arrête l’ancien conteneur, charge la nouvelle image et relance le service.
