#!/bin/bash
set -euo pipefail

# =============================================================================
# Installe (ou met à jour) la tâche cron de sauvegarde automatique.
# À exécuter SUR LE SERVEUR (VPS), une seule fois (idempotent).
# =============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKUP_SCRIPT="$SCRIPT_DIR/backup.sh"
LOG_FILE="${BACKUP_LOG_FILE:-$SCRIPT_DIR/backup.log}"
CRON_SCHEDULE="${CRON_SCHEDULE:-0 3 * * *}"  # tous les jours à 3h du matin
MARKER="# nicolas-goujon-backup"

chmod +x "$BACKUP_SCRIPT"

CRON_LINE="${CRON_SCHEDULE} ${BACKUP_SCRIPT} >> ${LOG_FILE} 2>&1 ${MARKER}"

( crontab -l 2>/dev/null | grep -v "$MARKER" || true; echo "$CRON_LINE" ) | crontab -

echo "Tâche cron installée :"
echo "  $CRON_LINE"
echo "Vérifier avec : crontab -l"
echo "Logs de sauvegarde : $LOG_FILE"
