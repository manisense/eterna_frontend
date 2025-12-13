import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-950 p-4">
          <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-xl p-8 text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-red-500/10 rounded-full">
                <AlertTriangle size={48} className="text-red-500" />
              </div>
            </div>
            <h2 className="text-xl text-white">Something went wrong</h2>
            <p className="text-sm text-gray-400">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <Button onClick={this.handleReset} variant="primary" className="w-full">
              Try Again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
