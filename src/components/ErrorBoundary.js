import React from 'react';
import { logger } from '../utils/logger';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logger.logError(error, `ErrorBoundary: ${errorInfo?.componentStack || 'unknown'}`);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Une erreur est survenue</h1>
          <p>Veuillez recharger la page ou réessayer plus tard.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
