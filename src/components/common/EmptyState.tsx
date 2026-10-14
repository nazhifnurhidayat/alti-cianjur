import React from 'react';
import { SearchX, Inbox } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: 'search' | 'inbox';
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Tidak Ada Data',
  description = 'Belum ada data yang cocok dengan kriteria filter atau pencarian Anda.',
  icon = 'inbox',
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div className={`text-center py-12 px-4 max-w-md mx-auto ${className}`}>
      <div className="w-14 h-14 bg-gray-100 text-gray-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
        {icon === 'search' ? (
          <SearchX className="w-7 h-7" />
        ) : (
          <Inbox className="w-7 h-7" />
        )}
      </div>
      <h3 className="text-base font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
