#!/bin/bash
set -e

# =============================================================================
# Script de mise à jour du projet - Site Nicolas Goujon
# À exécuter SUR LE SERVEUR (dans le répertoire du projet).
# Fait : git pull, reconstruction des images Docker, relance des conteneurs.
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

log_info "Mise à jour du projet..."

# 1. Récupérer les dernières modifications
log_info "Récupération des modifications (git pull)..."
git pull

# 2. Arrêter les conteneurs existants
log_info "Arrêt des conteneurs..."
docker compose down 2>/dev/null || true
docker stop nicolas-goujon nicolas-goujon-api 2>/dev/null || true
docker rm nicolas-goujon nicolas-goujon-api 2>/dev/null || true

# 3. Rebuild et relance (web + api)
log_info "Reconstruction des images et démarrage (docker compose up --build -d)..."
docker compose up --build -d

log_info "Mise à jour terminée."
log_info "Site (web + API) accessible sur le port défini par PORT (défaut: 3001)."
log_warn "Vérifiez que le fichier .env à la racine contient APP_KEY et les variables MAIL_* / CONTACT_EMAIL_TO."
