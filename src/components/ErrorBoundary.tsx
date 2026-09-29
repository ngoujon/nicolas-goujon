import React from 'react';
import { logger } from '../utils/logger';

interface ErrorBoundaryProps {
  children?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
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
