# Sauvegardes automatisées - Site Nicolas Goujon

Sauvegarde régulière de la base de données (SQLite) et des fichiers stockés
par l'API Laravel (`api/storage/app`), avec envoi optionnel vers un stockage
externe (S3) et rétention locale.

## Pré-requis

- Les données sont persistées via des volumes Docker (`./api/database` et
  `./api/storage/app` sur l'hôte, montés dans le conteneur `api`). Sans ça,
  rien ne survit à un redéploiement — c'est déjà en place dans
  `docker-compose.yml`.
- `sqlite3` installé sur le VPS (recommandé, pour une sauvegarde cohérente
  même si la base est en cours d'écriture) : `apt install sqlite3` ou
  équivalent. Sans `sqlite3`, le script fait une simple copie du fichier.
- `awscli` installé sur le VPS si vous voulez un envoi vers un stockage
  externe (S3 ou compatible S3, ex. Scaleway, OVH, Backblaze B2) :
  `apt install awscli` ou `pip install awscli`.

## Mise en place sur le VPS

1. Configurer le stockage externe dans `api/.env` (déjà utilisé par le
   conteneur Laravel, réutilisé ici) :
   ```bash
   AWS_ACCESS_KEY_ID=...
   AWS_SECRET_ACCESS_KEY=...
   AWS_DEFAULT_REGION=...
   AWS_BUCKET=mon-bucket-sauvegardes
   ```
   Variables optionnelles supplémentaires (mêmes fichier ou exportées avant
   d'appeler le script) :
   - `BACKUP_S3_BUCKET` : bucket dédié aux sauvegardes si différent de
     `AWS_BUCKET`.
   - `BACKUP_S3_PREFIX` : préfixe des objets S3 (défaut `backups/nicolas-goujon`).
   - `BACKUP_DIR` : dossier local des archives (défaut `./backups`).
   - `BACKUP_RETENTION_DAYS` : durée de conservation locale en jours (défaut 14).

   Si aucun bucket n'est configuré, le script fonctionne quand même : les
   archives restent uniquement en local (pas de stockage externe réel).

2. Tester une sauvegarde manuelle :
   ```bash
   cd ~/nicolas-goujon   # ou le chemin de déploiement (APP_DIR)
   ./tools/backup.sh
   ```
   Une archive `backups/nicolas-goujon-backup-<date>.tar.gz` doit apparaître,
   et être envoyée vers S3 si configuré.

3. Installer la tâche cron (idempotent, peut être relancé sans doublon) :
   ```bash
   ./tools/install-backup-cron.sh
   ```
   Par défaut : tous les jours à 3h du matin. Pour changer l'horaire :
   ```bash
   CRON_SCHEDULE="0 4 * * *" ./tools/install-backup-cron.sh
   ```
   Vérifier : `crontab -l`. Logs : `tools/backup.log`.

## Contenu d'une archive de sauvegarde

- `database.sqlite` : copie cohérente de la base (via `sqlite3 .backup`).
- `storage-app.tar.gz` : contenu de `api/storage/app` (fichiers uploadés,
  privés et publics).

## Procédure de restauration

1. **Récupérer l'archive** à restaurer :
   - Depuis le stockage externe : `aws s3 cp s3://<bucket>/<prefix>/<archive>.tar.gz .`
   - Ou depuis le dossier local `backups/` du VPS.

2. **Arrêter les conteneurs** (évite les écritures concurrentes pendant la
   restauration) :
   ```bash
   cd ~/nicolas-goujon
   docker compose down
   ```

3. **Extraire l'archive** dans un dossier temporaire :
   ```bash
   mkdir -p /tmp/restore && tar -xzf <archive>.tar.gz -C /tmp/restore
   ```

4. **Restaurer la base de données** :
   ```bash
   cp /tmp/restore/database.sqlite api/database/database.sqlite
   ```

5. **Restaurer les fichiers de stockage** :
   ```bash
   rm -rf api/storage/app
   tar -xzf /tmp/restore/storage-app.tar.gz -C api/storage
   ```

6. **Relancer les conteneurs** :
   ```bash
   docker compose up -d
   ```

7. **Vérifier** que le site répond (port 3001 par défaut) et que l'API
   fonctionne (formulaire de contact).

8. Nettoyer le dossier temporaire : `rm -rf /tmp/restore`.
