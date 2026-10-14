import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'Data gagal dimuat, silakan coba lagi beberapa saat.',
  onRetry,
  className = '',
}) => {
  return (
    <div
      className={`rounded-2xl border border-red-100 bg-red-50/50 p-6 text-center max-w-md mx-auto my-6 ${className}`}
    >
      <div className="w-12 h-12 bg-red-100 text-[#D90429] rounded-xl flex items-center justify-center mx-auto mb-3">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-bold text-gray-900 mb-1">Terjadi Kendala</h3>
      <p className="text-xs text-gray-600 mb-4 leading-relaxed">{message}</p>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          icon={<RefreshCw className="w-4 h-4" />}
        >
          Coba Lagi
        </Button>
      )}
    </div>
  );
};
