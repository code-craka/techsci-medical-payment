import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/Button';

interface ErrorProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function Error({
  title = 'Something went wrong',
  message = 'An error occurred while processing your request.',
  onRetry,
}: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <ExclamationTriangleIcon className="h-12 w-12 text-red-500" />
      <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-500">{message}</p>
      {onRetry && (
        <Button
          variant="secondary"
          className="mt-4"
          onClick={onRetry}
        >
          Try again
        </Button>
      )}
    </div>
  );
}

interface ErrorBoundaryFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorBoundaryFallback({
  error,
  resetErrorBoundary,
}: ErrorBoundaryFallbackProps) {
  return (
    <Error
      title="Application Error"
      message={error.message}
      onRetry={resetErrorBoundary}
    />
  );
}
