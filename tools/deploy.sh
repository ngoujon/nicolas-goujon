#!/bin/bash
set -e

# =============================================================================
# Script de déploiement - Site Nicolas Goujon
# Déploie sur un VPS avec site existant - utilise le port 3001
# Ne modifie PAS les configurations nginx/sites existants
# =============================================================================

# Configuration - À adapter selon votre VPS
VPS_USER="${VPS_USER:-root}"
VPS_HOST="${VPS_HOST}"
VPS_DEPLOY_PATH="${VPS_DEPLOY_PATH:-/opt/nicolas-goujon}"
CONTAINER_NAME="nicolas-goujon"
PORT=3001

# Couleurs pour les messages
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
    echo "Déploie le site Nicolas Goujon sur un VPS (port 3001)"
    echo ""
    echo "Options:"
    echo "  -h, --host HOST       Adresse du VPS (ou VPS_HOST)"
    echo "  -u, --user USER       Utilisateur SSH (défaut: root)"
    echo "  -p, --path PATH       Chemin de déploiement (défaut: /opt/nicolas-goujon)"
    echo "  --build-only          Construire l'image localement sans déployer"
    echo "  --help                Afficher cette aide"
    echo ""
    echo "Variables d'environnement: VPS_HOST, VPS_USER, VPS_DEPLOY_PATH"
    exit 0
}

# Parse arguments
BUILD_ONLY=false
while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--host) VPS_HOST="$2"; shift 2 ;;
        -u|--user) VPS_USER="$2"; shift 2 ;;
        -p|--path) VPS_DEPLOY_PATH="$2"; shift 2 ;;
        --build-only) BUILD_ONLY=true; shift ;;
        --help) usage ;;
        *) log_error "Option inconnue: $1"; usage ;;
    esac
done

# Vérifications
if [[ -z "$VPS_HOST" && "$BUILD_ONLY" != "true" ]]; then
    log_error "VPS_HOST requis. Utilisez -h HOST ou export VPS_HOST=..."
    exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_ROOT"

log_info "Build de l'image Docker..."
docker build -t nicolas-goujon:latest .

if [[ "$BUILD_ONLY" == "true" ]]; then
    log_info "Build terminé. Utilisez sans --build-only pour déployer."
    exit 0
fi

log_info "Sauvegarde de l'image en tar..."
docker save nicolas-goujon:latest | gzip > /tmp/nicolas-goujon.tar.gz

log_info "Création du répertoire sur le VPS..."
ssh "${VPS_USER}@${VPS_HOST}" "mkdir -p ${VPS_DEPLOY_PATH}"

log_info "Transfert de l'image..."
scp /tmp/nicolas-goujon.tar.gz "${VPS_USER}@${VPS_HOST}:${VPS_DEPLOY_PATH}/"

log_info "Déploiement sur le VPS..."
ssh "${VPS_USER}@${VPS_HOST}" << REMOTE_SCRIPT
set -e
cd ${VPS_DEPLOY_PATH}

# Charger la nouvelle image
docker load < nicolas-goujon.tar.gz

# Arrêter et supprimer l'ancien conteneur s'il existe
docker stop ${CONTAINER_NAME} 2>/dev/null || true
docker rm ${CONTAINER_NAME} 2>/dev/null || true

# Démarrer le nouveau conteneur sur le port 3001
# IMPORTANT: Ne touche pas aux configs nginx existantes - le site écoute uniquement sur 3001
docker run -d \\
  --name ${CONTAINER_NAME} \\
  --restart unless-stopped \\
  -p ${PORT}:80 \\
  nicolas-goujon:latest

# Nettoyer l'image tar
rm -f nicolas-goujon.tar.gz

echo "Site déployé avec succès sur le port ${PORT}"
echo "Accès: http://\$(hostname -I | awk '{print \$1}'):${PORT}"
REMOTE_SCRIPT

# Nettoyage local
rm -f /tmp/nicolas-goujon.tar.gz

log_info "Déploiement terminé !"
log_info "Le site est accessible sur http://${VPS_HOST}:${PORT}"
log_warn "Pour exposer via un domaine, ajoutez un virtual host nginx qui proxy vers localhost:${PORT}"
log_warn "Exemple: proxy_pass http://127.0.0.1:${PORT}; (dans un nouveau fichier de config)"
