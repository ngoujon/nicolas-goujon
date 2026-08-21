#!/usr/bin/env bash
# Mise à jour distante : git pull sur le VPS puis exécution de tools/deploy.sh.
# Usage (depuis votre machine locale) : ./tools/update.sh
# Pour cibler le staging (répertoire/branche distincts de la prod) :
#   UPDATE_ENV_FILE=.env.staging ./tools/update.sh
#   (après avoir créé tools/.env.staging depuis tools/.env.staging.example)
#
# Prérequis locaux : sshpass (brew install sshpass) si VPS_PASSWORD est utilisé.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="${SCRIPT_DIR}/${UPDATE_ENV_FILE:-.env}"

log() {
  printf '[update] %s\n' "$*"
}

die() {
  printf '[update] ERREUR: %s\n' "$*" >&2
  exit 1
}

load_env() {
  [[ -f "$ENV_FILE" ]] || die "Fichier ${ENV_FILE} introuvable. Copiez tools/.env.example vers tools/.env"
  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a
}

require_var() {
  local name="$1"
  [[ -n "${!name:-}" ]] || die "Variable ${name} manquante dans tools/.env"
}

run_remote() {
  local remote_script="$1"
  local ssh_opts=(
    -o StrictHostKeyChecking=accept-new
    -o PreferredAuthentications=publickey,password,keyboard-interactive
    -p "${VPS_PORT:-22}"
  )
  # Une seule chaîne distante : SSH découperait sinon "bash -s" et su recevrait -s comme option.
  local remote_shell="bash -s"

  if [[ -n "${RUN_AS_USER:-}" ]]; then
    remote_shell=$(printf 'su - %q -c %q' "$RUN_AS_USER" "bash -s")
  fi

  if [[ -n "${VPS_PASSWORD:-}" ]]; then
    command -v sshpass >/dev/null 2>&1 || die "sshpass requis pour VPS_PASSWORD (brew install sshpass)"
    sshpass -p "$VPS_PASSWORD" ssh "${ssh_opts[@]}" "${VPS_USER}@${VPS_HOST}" "$remote_shell" <<< "$remote_script"
  else
    ssh "${ssh_opts[@]}" "${VPS_USER}@${VPS_HOST}" "$remote_shell" <<< "$remote_script"
  fi
}

load_env

require_var VPS_HOST
require_var VPS_USER
require_var APP_DIR

GIT_BRANCH="${GIT_BRANCH:-main}"
GITHUB_SSH_KEY_PATH="${GITHUB_SSH_KEY_PATH:-$HOME/.ssh/id_ed25519}"

log "Connexion à ${VPS_USER}@${VPS_HOST}:${VPS_PORT:-22}"
if [[ -n "${RUN_AS_USER:-}" ]]; then
  log "Exécution distante en tant que ${RUN_AS_USER}"
fi
log "Répertoire distant : ${APP_DIR} (branche ${GIT_BRANCH})"

# Variables injectées dans le script distant (échappement sûr)
REMOTE_APP_DIR=$(printf '%q' "$APP_DIR")
REMOTE_BRANCH=$(printf '%q' "$GIT_BRANCH")
REMOTE_KEY_PATH=$(printf '%q' "$GITHUB_SSH_KEY_PATH")
REMOTE_KEY_PASS=$(printf '%q' "${GITHUB_SSH_KEY_PASSPHRASE:-}")

REMOTE_SCRIPT=$(cat <<EOF
set -euo pipefail

APP_DIR=${REMOTE_APP_DIR}
GIT_BRANCH=${REMOTE_BRANCH}
GITHUB_SSH_KEY_PATH=${REMOTE_KEY_PATH}
GITHUB_SSH_KEY_PASSPHRASE=${REMOTE_KEY_PASS}

log() { printf '[update@remote] %s\n' "\$*"; }
die() { printf '[update@remote] ERREUR: %s\n' "\$*" >&2; exit 1; }

[[ -d "\$APP_DIR" ]] || die "Répertoire absent : \$APP_DIR"
cd "\$APP_DIR"

[[ -d .git ]] || die "Pas un dépôt Git : \$APP_DIR"

setup_git_ssh() {
  if [[ ! -f "\$GITHUB_SSH_KEY_PATH" ]]; then
    die "Clé SSH GitHub introuvable : \$GITHUB_SSH_KEY_PATH"
  fi
  chmod 600 "\$GITHUB_SSH_KEY_PATH" 2>/dev/null || true
  export GIT_SSH_COMMAND="ssh -i \$GITHUB_SSH_KEY_PATH -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new"

  if [[ -n "\$GITHUB_SSH_KEY_PASSPHRASE" ]]; then
    eval "\$(ssh-agent -s)" >/dev/null
    export SSH_ASKPASS_REQUIRE=force
    export DISPLAY=:0
    ASKPASS_SCRIPT="\$(mktemp)"
    chmod 700 "\$ASKPASS_SCRIPT"
    {
      printf '%s\n' '#!/bin/sh'
      printf 'exec echo %s\n' "\$(printf '%q' "\$GITHUB_SSH_KEY_PASSPHRASE")"
    } > "\$ASKPASS_SCRIPT"
    export SSH_ASKPASS="\$ASKPASS_SCRIPT"
    ssh-add "\$GITHUB_SSH_KEY_PATH" </dev/null
    rm -f "\$ASKPASS_SCRIPT"
  fi
}

log "git fetch origin…"
setup_git_ssh
git fetch origin "\$GIT_BRANCH"

log "Synchronisation sur origin/\$GIT_BRANCH…"
git checkout "\$GIT_BRANCH"
git reset --hard "origin/\$GIT_BRANCH"
git clean -fd

[[ -f ./tools/deploy.sh ]] || die "Script ./tools/deploy.sh absent"
log "Lancement de ./tools/deploy.sh…"
exec bash ./tools/deploy.sh
EOF
)

run_remote "$REMOTE_SCRIPT"

log "Mise à jour distante terminée."
