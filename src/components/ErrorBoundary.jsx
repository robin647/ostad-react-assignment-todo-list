import { Component } from "react";


class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.handleRetry = this.handleRetry.bind(this);
  }

  // Called when a descendant throws during render -> switch to fallback UI
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // Good place to log the error
  componentDidCatch(error, info) {
    console.error("MHRobin Student Task Manager error:", error, info);
  }

  // Retry: reset the boundary so the children try to render again
  handleRetry() {
    this.setState({ hasError: false });
    if (this.props.onReset) this.props.onReset();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback" role="alert">
          <div className="error-icon" aria-hidden="true">
            ⚠️
          </div>
          <h2>Something went wrong</h2>
          <p>
            {this.props.message ||
              "We couldn't display this section. Please try again."}
          </p>
          <div className="error-actions">
            <button type="button" className="btn btn-primary" onClick={this.handleRetry}>
              Try again
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => window.location.reload()}
            >
              Refresh page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
