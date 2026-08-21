#!/bin/bash
set -e

# =============================================================================
# Script de mise à jour du projet - Site Nicolas Goujon
# À exécuter SUR LE SERVEUR (dans le répertoire du projet).
# Fait : reconstruction des images Docker, relance des conteneurs.
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

# Détection de l'environnement (staging si DEPLOY_ENV=staging dans le .env
# du répertoire courant). Le staging tourne dans un répertoire dédié, distinct
# de la production (voir .env.staging.example et docker-compose.staging.yml).
if [ -f .env ]; then
    set -a
    # shellcheck disable=SC1091
    source .env
    set +a
fi

COMPOSE_ARGS=(-f docker-compose.yml)
CONTAINER_WEB="nicolas-goujon"
CONTAINER_API="nicolas-goujon-api"
if [ "${DEPLOY_ENV:-production}" = "staging" ]; then
    COMPOSE_ARGS+=(-f docker-compose.staging.yml)
    CONTAINER_WEB="nicolas-goujon-staging"
    CONTAINER_API="nicolas-goujon-staging-api"
    log_warn "Environnement STAGING détecté (DEPLOY_ENV=staging) — conteneurs et port dédiés."
fi

log_info "Mise à jour du projet..."

# 1. Arrêter les conteneurs existants
log_info "Arrêt des conteneurs..."
docker compose "${COMPOSE_ARGS[@]}" down 2>/dev/null || true
docker stop "$CONTAINER_WEB" "$CONTAINER_API" 2>/dev/null || true
docker rm "$CONTAINER_WEB" "$CONTAINER_API" 2>/dev/null || true

# 2. Rebuild et relance (web + api)
log_info "Reconstruction des images et démarrage (docker compose up --build -d)..."
docker compose "${COMPOSE_ARGS[@]}" up --build -d

log_info "Mise à jour terminée."
log_info "Site (web + API) accessible sur le port défini par PORT (défaut: 3001, 3002 en staging)."
log_warn "Vérifiez que le fichier .env à la racine contient APP_KEY et les variables MAIL_* / CONTACT_EMAIL_TO."

if [ "${DEPLOY_ENV:-production}" = "staging" ]; then
    log_info "Staging : pas de configuration Nginx/SSL automatique (domaine de prod non concerné)."
    exit 0
fi

# 3. Activer www.nicolas-goujon.fr si pas encore configuré (idempotent, prod uniquement)
NGINX_CONF=""
for candidate in /etc/nginx/sites-available/nicolas-goujon.conf /etc/nginx/conf.d/nicolas-goujon.conf; do
    [ -f "$candidate" ] && NGINX_CONF="$candidate" && break
done

if [ -n "$NGINX_CONF" ]; then
    if grep -q "www\.nicolas-goujon\.fr" "$NGINX_CONF"; then
        log_info "www.nicolas-goujon.fr déjà configuré dans Nginx."
    else
        # Étape A : ajouter www au server_name AVANT d'appeler Certbot,
        # sinon Certbot ne trouve pas de bloc Nginx pour www et échoue.
        log_info "Ajout de www.nicolas-goujon.fr dans la config Nginx..."
        sudo sed -i 's/server_name nicolas-goujon\.fr;/server_name nicolas-goujon.fr www.nicolas-goujon.fr;/g' "$NGINX_CONF"
        sudo nginx -t && sudo systemctl reload nginx \
            && log_info "Nginx rechargé." \
            || { log_error "Erreur Nginx — config annulée : nginx -t"; exit 1; }

        # Étape B : installer/étendre le certificat SSL pour les deux domaines
        if command -v certbot &>/dev/null; then
            log_info "Configuration SSL pour www.nicolas-goujon.fr..."
            sudo certbot --nginx --expand \
                -d nicolas-goujon.fr -d www.nicolas-goujon.fr \
                --non-interactive --agree-tos \
                -m nicolas.goujon18@gmail.com \
            && log_info "www.nicolas-goujon.fr activé avec succès." \
            || log_warn "Certbot a échoué. Vérifiez les logs : journalctl -u certbot"
        else
            log_warn "certbot introuvable — SSL non configuré pour www."
        fi
    fi
else
    log_warn "Config Nginx nicolas-goujon introuvable — www non configuré automatiquement."
    log_warn "Pour l'activer manuellement : certbot --nginx --expand -d nicolas-goujon.fr -d www.nicolas-goujon.fr"
fi
