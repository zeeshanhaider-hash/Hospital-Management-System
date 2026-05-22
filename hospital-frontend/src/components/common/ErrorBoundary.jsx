import React from 'react';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  // This catches the error and updates state
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // This logs the error to the console for developers
  componentDidCatch(error, info) {
    console.error("React Error Boundary caught an error:", error, info);
  }

  render() {
    // If there's an error, show the beautiful fallback UI
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-8">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center border border-red-100">
            <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-6">
              <AlertTriangle className="text-red-500 text-4xl" />
            </div>
            
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Oops! Something went wrong</h2>
            <p className="text-slate-500 mb-6">
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            
            {/* Shows the actual error message to help you debug */}
            <div className="bg-red-50 rounded-xl p-4 mb-6 text-left border border-red-100">
              <p className="text-sm font-mono text-red-600 break-words">
                {this.state.error?.message || "An unknown error occurred"}
              </p>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    // If no error, render the children normally
    return this.props.children;
  }
}

export default ErrorBoundary;

