import React, {Component, ErrorInfo, ReactNode} from 'react';
import {Alert, AlertTitle} from '@mui/material';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return {hasError: true};
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Alert severity="error">
          <AlertTitle>Sorry, there was an application error</AlertTitle>
          Please try to reload the application.
        </Alert>
      );
    }

    return this.props.children;
  }
}
