import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { 
      hasError: true,
      errorId: Date.now().toString(36) + Math.random().toString(36).substr(2)
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console and could send to error reporting service
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // You could send error to service like Sentry, LogRocket, etc.
    // logErrorToService(error, errorInfo, this.state.errorId);
  }

  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Custom error UI
      return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6">
                <div className="card border-0 shadow-lg">
                  <div className="card-body p-5 text-center">
                    <div className="mb-4">
                      <div className="display-4 text-danger">⚠️</div>
                      <h3 className="card-title mt-3">Oops! Something went wrong</h3>
                    </div>
                    
                    <p className="text-muted mb-4">
                      We encountered an unexpected error. This has been logged and our team will look into it.
                    </p>

                    {process.env.NODE_ENV === 'development' && this.state.error && (
                      <details className="text-start mb-4">
                        <summary className="btn btn-outline-secondary btn-sm mb-2">
                          Error Details (Development Only)
                        </summary>
                        <div className="alert alert-danger mt-2">
                          <strong>Error:</strong> {this.state.error.toString()}
                          <br />
                          <strong>Component Stack:</strong>
                          <pre className="mt-2 p-2 bg-light rounded small">
                            {this.state.errorInfo.componentStack}
                          </pre>
                        </div>
                      </details>
                    )}

                    <div className="d-flex gap-3 justify-content-center">
                      <button 
                        className="btn btn-primary"
                        onClick={this.handleReset}
                      >
                        Try Again
                      </button>
                      <button 
                        className="btn btn-outline-primary"
                        onClick={this.handleReload}
                      >
                        Reload Page
                      </button>
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={() => window.location.href = '/dashboard'}
                      >
                        Go to Dashboard
                      </button>
                    </div>

                    {this.state.errorId && (
                      <small className="text-muted d-block mt-3">
                        Error ID: {this.state.errorId}
                      </small>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
