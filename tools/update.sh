#!/bin/bash
set -e

# =============================================================================
# Script à exécuter EN LOCAL : connexion SSH au serveur puis lancement de deploy.sh
# Usage: ./tools/update.sh -h VPS_HOST [-u USER] [-p PATH]
# =============================================================================

VPS_USER="${VPS_USER:-root}"
VPS_HOST="${VPS_HOST:-VOTRE_IP_VPS}"
VPS_DEPLOY_PATH="${VPS_DEPLOY_PATH:-/opt/nicolas-goujon}"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'
log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Se connecte au VPS en SSH et lance le script de déploiement (deploy.sh)"
    echo "pour mettre à jour le projet et reconstruire les conteneurs Docker."
    echo ""
    echo "Options:"
    echo "  -h, --host HOST       Adresse du VPS (ou variable VPS_HOST)"
    echo "  -u, --user USER       Utilisateur SSH (défaut: root)"
    echo "  -p, --path PATH       Chemin du projet sur le serveur (défaut: /opt/nicolas-goujon)"
    echo "  --help                Afficher cette aide"
    echo ""
    echo "Variables d'environnement: VPS_HOST, VPS_USER, VPS_DEPLOY_PATH"
    echo ""
    echo "Exemple:"
    echo "  $0 -h mon-serveur.com"
    echo "  VPS_HOST=192.168.1.10 $0 -u deploy -p /opt/nicolas-goujon"
    exit 0
}

while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--host) VPS_HOST="$2"; shift 2 ;;
        -u|--user) VPS_USER="$2"; shift 2 ;;
        -p|--path) VPS_DEPLOY_PATH="$2"; shift 2 ;;
        --help) usage ;;
        *) log_error "Option inconnue: $1"; usage ;;
    esac
done

if [[ -z "$VPS_HOST" ]]; then
    log_error "VPS_HOST requis. Utilisez -h HOST ou export VPS_HOST=..."
    exit 1
fi

log_info "Connexion à ${VPS_USER}@${VPS_HOST} et exécution de deploy.sh..."
ssh "${VPS_USER}@${VPS_HOST}" "cd ${VPS_DEPLOY_PATH} && git pull && bash tools/deploy.sh"

log_info "Terminé. Le site a été mis à jour sur le serveur."
