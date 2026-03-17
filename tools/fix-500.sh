#!/usr/bin/env bash
# =============================================================================
# fix-500.sh — Vérifie et corrige la config mail (erreur 500 formulaire de contact)
# À exécuter sur le serveur, à la racine du projet : ./tools/fix-500.sh
# =============================================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

log_info()  { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn()  { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }
log_step()  { echo -e "${CYAN}[FIX]${NC} $1"; }

# Aller à la racine du repo (parent du dossier tools)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT_DIR"

ENV_FILE=".env"
REQUIRED_VARS=(
  "APP_KEY"
  "MAIL_MAILER"
  "MAIL_HOST"
  "MAIL_PORT"
  "MAIL_USERNAME"
  "MAIL_PASSWORD"
  "MAIL_ENCRYPTION"
  "MAIL_FROM_ADDRESS"
  "MAIL_FROM_NAME"
  "CONTACT_EMAIL_TO"
)

echo ""
log_info "Réparation config mail (erreur 500) — projet: $ROOT_DIR"
echo ""

# -----------------------------------------------------------------------------
# 1. Vérifier que .env existe
# -----------------------------------------------------------------------------
if [[ ! -f "$ENV_FILE" ]]; then
  log_error "Fichier $ENV_FILE introuvable. Créez-le à partir de .env.example."
  exit 1
fi
log_info "Fichier $ENV_FILE trouvé."

# -----------------------------------------------------------------------------
# 2. Vérifier les variables obligatoires
# -----------------------------------------------------------------------------
MISSING=()
for var in "${REQUIRED_VARS[@]}"; do
  if ! grep -q "^${var}=" "$ENV_FILE" || [[ -z "$(grep "^${var}=" "$ENV_FILE" | cut -d= -f2- | xargs)" ]]; then
    MISSING+=("$var")
  fi
done

if [[ ${#MISSING[@]} -gt 0 ]]; then
  log_error "Variables manquantes ou vides dans .env : ${MISSING[*]}"
  echo "   Ajoutez-les dans .env (sans guillemets autour des valeurs)."
  exit 1
fi
log_info "Variables mail présentes dans .env."

# -----------------------------------------------------------------------------
# 3. Corriger les guillemets dans .env (peuvent casser l'auth SMTP)
# -----------------------------------------------------------------------------
if grep -E '^MAIL_USERNAME="|^MAIL_PASSWORD="|^MAIL_FROM_ADDRESS="|^CONTACT_EMAIL_TO="' "$ENV_FILE" >/dev/null 2>&1; then
  log_step "Suppression des guillemets inutiles dans .env..."
  if [[ "$(uname)" = "Darwin" ]]; then
    sed -i '' -E 's/^(MAIL_USERNAME|MAIL_PASSWORD|MAIL_FROM_ADDRESS|CONTACT_EMAIL_TO)="([^"]*)"$/\1=\2/' "$ENV_FILE" 2>/dev/null || true
  else
    sed -i.bak -E 's/^(MAIL_USERNAME|MAIL_PASSWORD|MAIL_FROM_ADDRESS|CONTACT_EMAIL_TO)="([^"]*)"$/\1=\2/' "$ENV_FILE" 2>/dev/null || true
    log_info "Sauvegarde : .env.bak"
  fi
fi

# -----------------------------------------------------------------------------
# 4. Docker disponible et conteneur api
# -----------------------------------------------------------------------------
if ! command -v docker >/dev/null 2>&1; then
  log_error "Docker introuvable. Lancez ce script sur le serveur où tourne Docker."
  exit 1
fi

if docker compose version >/dev/null 2>&1; then
  COMPOSE_CMD="docker compose"
else
  COMPOSE_CMD="docker-compose"
fi
if ! $COMPOSE_CMD ps -q api 2>/dev/null | head -1 | grep -q .; then
  log_warn "Conteneur 'api' non démarré. Démarrage des conteneurs..."
  $COMPOSE_CMD up -d
  sleep 3
fi

if ! $COMPOSE_CMD ps -q api 2>/dev/null | head -1 | grep -q .; then
  log_error "Impossible de démarrer le conteneur api. Vérifiez : docker compose up -d"
  exit 1
fi
log_info "Conteneur api démarré."

# -----------------------------------------------------------------------------
# 5. Recréer les conteneurs pour prendre en compte le .env
# -----------------------------------------------------------------------------
log_step "Recréation des conteneurs pour recharger les variables d'environnement..."
$COMPOSE_CMD up -d --force-recreate
sleep 2
log_info "Conteneurs recréés."

# -----------------------------------------------------------------------------
# 6. Vider le cache config Laravel dans l'api
# -----------------------------------------------------------------------------
log_step "Vidage du cache config Laravel..."
if $COMPOSE_CMD exec -T api php artisan config:clear 2>/dev/null; then
  $COMPOSE_CMD exec -T api php artisan config:cache 2>/dev/null || true
  log_info "Cache config vidé puis recréé."
else
  log_warn "Impossible d'exécuter config:clear (conteneur peut être en démarrage)."
fi

# -----------------------------------------------------------------------------
# 7. Afficher la config mail (sans mot de passe) pour vérification
# -----------------------------------------------------------------------------
echo ""
log_info "Config mail vue par l'application :"
$COMPOSE_CMD exec -T api php -r "
\$key = getenv('APP_KEY');
echo '  APP_KEY: ' . (strlen(\$key) ? '(défini)' : '(vide)') . PHP_EOL;
echo '  MAIL_MAILER: ' . getenv('MAIL_MAILER') . PHP_EOL;
echo '  MAIL_HOST: ' . getenv('MAIL_HOST') . PHP_EOL;
echo '  MAIL_PORT: ' . getenv('MAIL_PORT') . PHP_EOL;
echo '  MAIL_USERNAME: ' . getenv('MAIL_USERNAME') . PHP_EOL;
echo '  MAIL_PASSWORD: ' . (getenv('MAIL_PASSWORD') ? '(défini)' : '(vide)') . PHP_EOL;
echo '  MAIL_ENCRYPTION: ' . getenv('MAIL_ENCRYPTION') . PHP_EOL;
echo '  MAIL_FROM_ADDRESS: ' . getenv('MAIL_FROM_ADDRESS') . PHP_EOL;
echo '  CONTACT_EMAIL_TO: ' . getenv('CONTACT_EMAIL_TO') . PHP_EOL;
" 2>/dev/null || log_warn "Impossible d'afficher la config (conteneur api)."

# -----------------------------------------------------------------------------
# 8. Envoyer une requête test pour déclencher l'erreur et afficher la réponse (dont "debug")
# -----------------------------------------------------------------------------
PORT="$({ grep -E '^PORT=' "$ENV_FILE" 2>/dev/null || true; } | cut -d= -f2- | xargs)"
PORT="${PORT:-3001}"
log_step "Envoi d’une requête test vers http://127.0.0.1:${PORT}/api/contact ..."
RESPONSE=""
if command -v curl >/dev/null 2>&1; then
  RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "http://127.0.0.1:${PORT}/api/contact" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"name":"Test script","email":"test@test.fr","message":"Message test fix-500"}' 2>/dev/null || true)
  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | sed '$d')
  echo ""
  log_info "Réponse API (HTTP $HTTP_CODE) :"
  echo "----------------------------------------"
  if command -v jq >/dev/null 2>&1; then
    echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
  else
    echo "$BODY"
  fi
  echo "----------------------------------------"
  if echo "$BODY" | grep -q '"debug"'; then
    echo ""
    log_info "Le champ \"debug\" ci-dessus contient l’erreur réelle (ex: SSL, auth SMTP). Corrigez la config en conséquence."
  fi
else
  log_warn "curl introuvable, impossible d’envoyer la requête test."
fi

# -----------------------------------------------------------------------------
# 9. Afficher la dernière erreur mail (mail-error.log ou laravel.log)
# -----------------------------------------------------------------------------
echo ""
log_info "Dernière erreur enregistrée dans les logs :"
echo "----------------------------------------"
if $COMPOSE_CMD exec -T api test -r storage/logs/mail-error.log 2>/dev/null; then
  $COMPOSE_CMD exec -T api tail -50 storage/logs/mail-error.log 2>/dev/null || true
elif $COMPOSE_CMD exec -T api test -r storage/logs/laravel.log 2>/dev/null; then
  $COMPOSE_CMD exec -T api tail -60 storage/logs/laravel.log 2>/dev/null || true
else
  echo "  (aucun log d’erreur mail)"
fi
echo "----------------------------------------"
echo ""

log_info "Terminé. Si l’erreur persiste :"
echo "  1. Regardez la « Réponse API » et le champ \"debug\" ci-dessus (message d’erreur réel)."
echo "  2. Si vous venez de mettre à jour le code, reconstruisez l’image api :"
echo "     docker compose build api && docker compose up -d"
echo "  3. Port 465 = MAIL_ENCRYPTION=ssl ; identifiants = mot de passe d’application Hostinger."
echo ""
