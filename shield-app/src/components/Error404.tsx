import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import { AlertTriangle, Home, RefreshCcw } from 'lucide-react';
import Button from './Button';

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-4 text-center">
      <div className="w-20 h-20 bg-status-error/10 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle size={40} className="text-status-error" />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold font-display text-text-primary mb-4">
        Oops! Access Denied
      </h1>

      <p className="text-lg text-text-secondary max-w-md mb-8">
        {error?.statusText || error?.message || "Something went wrong while processing your request."}
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/">
          <Button variant="primary" size="lg">
            <Home size={20} />
            Return to Dashboard
          </Button>
        </Link>
        <Button variant="secondary" size="lg" onClick={() => window.location.reload()}>
          <RefreshCcw size={20} />
          Retry Connection
        </Button>
      </div>
    </div>
  );
}
