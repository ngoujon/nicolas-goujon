/**
 * Classe utilitaire pour la gestion des logs d'erreur
 */
class Logger {
  /**
   * Log une erreur dans la console et potentiellement vers un service de monitoring
   * @param {Error} error - L'erreur à logger
   * @param {string} context - Contexte de l'erreur
   */
  logError(error, context) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${context}] ${error.message}`;
    
    // Log dans la console
    console.error(logMessage);
    if (error.stack) {
      console.error('Stack:', error.stack);
    }

    // Ici vous pouvez ajouter l'envoi des erreurs à un service de monitoring
    // comme Sentry, LogRocket, etc.
    // this.sendToMonitoring(error, context);
  }

  /**
   * Log un message d'information
   * @param {string} message - Le message à logger
   * @param {string} context - Contexte du message
   */
  logInfo(message, context) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${context}] ${message}`;
    console.info(logMessage);
  }

  /**
   * Log un message de warning
   * @param {string} message - Le message à logger
   * @param {string} context - Contexte du message
   */
  logWarning(message, context) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${context}] ${message}`;
    console.warn(logMessage);
  }
}

// Export une instance unique du logger
export const logger = new Logger(); 