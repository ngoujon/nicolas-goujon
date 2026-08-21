#!/bin/bash
set -euo pipefail

# =============================================================================
# Sauvegarde de la base de données SQLite et des fichiers de stockage Laravel.
# À exécuter SUR LE SERVEUR (VPS), dans le répertoire racine du projet.
# Automatisation : voir tools/install-backup-cron.sh et tools/BACKUP_PROCEDURE.md
# =============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_ROOT"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'
log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Charger les identifiants de stockage externe (AWS_*) et les options BACKUP_*
# depuis api/.env si présent, sans écraser des variables déjà exportées.
if [ -f "$PROJECT_ROOT/api/.env" ]; then
    set -a
    # shellcheck disable=SC1091
    source "$PROJECT_ROOT/api/.env"
    set +a
fi

BACKUP_DIR="${BACKUP_DIR:-$PROJECT_ROOT/backups}"
BACKUP_RETENTION_DAYS="${BACKUP_RETENTION_DAYS:-14}"
BACKUP_S3_BUCKET="${BACKUP_S3_BUCKET:-${AWS_BUCKET:-}}"
BACKUP_S3_PREFIX="${BACKUP_S3_PREFIX:-backups/nicolas-goujon}"

TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
ARCHIVE_NAME="nicolas-goujon-backup-${TIMESTAMP}.tar.gz"
WORKDIR="$(mktemp -d)"
trap 'rm -rf "$WORKDIR"' EXIT

mkdir -p "$BACKUP_DIR"

log_info "Sauvegarde de la base de données SQLite…"
DB_FILE="$PROJECT_ROOT/api/database/database.sqlite"
if [ -f "$DB_FILE" ]; then
    if command -v sqlite3 &>/dev/null; then
        sqlite3 "$DB_FILE" ".backup '$WORKDIR/database.sqlite'"
    else
        log_warn "sqlite3 introuvable — copie brute du fichier (risque de corruption en cas d'écriture concurrente)."
        cp "$DB_FILE" "$WORKDIR/database.sqlite"
    fi
else
    log_warn "Fichier de base de données introuvable : $DB_FILE (ignoré)."
fi

log_info "Sauvegarde des fichiers de stockage (api/storage/app)…"
if [ -d "$PROJECT_ROOT/api/storage/app" ]; then
    tar -czf "$WORKDIR/storage-app.tar.gz" -C "$PROJECT_ROOT/api/storage" app
else
    log_warn "Dossier api/storage/app introuvable (ignoré)."
fi

if [ -z "$(ls -A "$WORKDIR")" ]; then
    log_error "Rien à sauvegarder (ni base, ni fichiers). Abandon."
    exit 1
fi

log_info "Création de l'archive finale…"
tar -czf "$BACKUP_DIR/$ARCHIVE_NAME" -C "$WORKDIR" .
log_info "Archive créée : $BACKUP_DIR/$ARCHIVE_NAME ($(du -h "$BACKUP_DIR/$ARCHIVE_NAME" | cut -f1))"

# --- Envoi vers un stockage externe (S3) ---
if [ -n "$BACKUP_S3_BUCKET" ]; then
    if command -v aws &>/dev/null; then
        log_info "Envoi vers s3://${BACKUP_S3_BUCKET}/${BACKUP_S3_PREFIX}/${ARCHIVE_NAME}…"
        if aws s3 cp "$BACKUP_DIR/$ARCHIVE_NAME" "s3://${BACKUP_S3_BUCKET}/${BACKUP_S3_PREFIX}/${ARCHIVE_NAME}"; then
            log_info "Envoi vers le stockage externe réussi."
        else
            log_error "Échec de l'envoi vers S3 — l'archive reste disponible localement dans $BACKUP_DIR."
        fi
    else
        log_warn "AWS CLI introuvable — sauvegarde conservée uniquement en local. Installer awscli pour activer le stockage externe (voir tools/BACKUP_PROCEDURE.md)."
    fi
else
    log_warn "Aucun BACKUP_S3_BUCKET / AWS_BUCKET configuré — sauvegarde conservée uniquement en local (pas de stockage externe)."
fi

# --- Rétention locale ---
log_info "Nettoyage des sauvegardes locales de plus de ${BACKUP_RETENTION_DAYS} jours…"
find "$BACKUP_DIR" -name 'nicolas-goujon-backup-*.tar.gz' -mtime "+${BACKUP_RETENTION_DAYS}" -delete

log_info "Sauvegarde terminée."
