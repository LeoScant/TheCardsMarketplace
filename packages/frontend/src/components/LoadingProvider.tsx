'use client';

import { useEffect, useState } from 'react';
import { checkHealth } from '../services/api';

interface LoadingProviderProps {
  children: React.ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        await checkHealth();
        setIsLoading(false);
        setError(null);
      } catch (err) {
        setError('Unable to connect to the backend service');
        setRetryCount(count => count + 1);
        setTimeout(checkBackend, 10000);
      }
    };

    checkBackend();
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl max-w-md mx-4">
          <div className="relative">
            {error ? (
              // Error icon
              <div className="h-16 w-16 mx-auto rounded-full bg-red-100 flex items-center justify-center">
                <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            ) : (
              <>
                {/* Outer spinning ring */}
                <div className="absolute inset-0 rounded-full border-4 border-indigo-200 opacity-25 animate-ping"></div>
                {/* Inner spinning loader */}
                <div className="relative h-16 w-16 mx-auto animate-spin">
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-600"></div>
                  <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-indigo-400"></div>
                  <div className="absolute inset-4 rounded-full border-4 border-transparent border-t-indigo-200"></div>
                </div>
              </>
            )}
          </div>
          <h2 className="mt-8 text-2xl font-semibold text-gray-800">
            {error ? 'Connection Error' : 'Starting up'}
          </h2>
          <p className="mt-4 text-gray-600">
            {error ? 'Unable to connect to the backend service' : 'Initializing the backend service...'}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            {error 
              ? `Retry attempt ${retryCount}... Next retry in 10 seconds` 
              : 'This might take a few seconds'
            }
          </p>
          <div className="mt-6 space-x-1">
            <span className="inline-block w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></span>
            <span className="inline-block w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
            <span className="inline-block w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
