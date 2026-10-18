// Journalisation centralisée côté client. Point d'entrée unique pour brancher plus tard
// un service de monitoring (Sentry, LogRocket...) sans modifier les appelants.

const format = (context: string, message: string) => `[${new Date().toISOString()}] [${context}] ${message}`;

export const logger = {
  /** Journalise une erreur (message + pile d'appels). */
  logError(error: Error, context: string) {
    console.error(format(context, error.message));
    if (error.stack) {
      console.error('Stack:', error.stack);
    }
  },

  /** Journalise un message d'information. */
  logInfo(message: string, context: string) {
    console.info(format(context, message));
  },
};
