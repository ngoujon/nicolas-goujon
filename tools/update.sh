#!/bin/bash
set -e

# =============================================================================
# Script de mise à jour - Site Nicolas Goujon
# Met à jour le code, rebuild et relance le conteneur Docker
# =============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_ROOT"

echo "[INFO] Mise à jour du site..."

# 1. Pull des dernières modifications
echo "[INFO] Récupération des modifications (git pull)..."
git pull

# 2. Arrêter et supprimer l'ancien conteneur (évite le conflit de nom)
echo "[INFO] Arrêt de l'ancien conteneur..."
docker compose down 2>/dev/null || true
docker stop nicolas-goujon 2>/dev/null || true
docker rm nicolas-goujon 2>/dev/null || true

# 3. Rebuild et relance
echo "[INFO] Rebuild et relance du conteneur Docker..."
docker compose up --build -d

echo "[INFO] Mise à jour terminée. Site accessible sur le port 3001."
