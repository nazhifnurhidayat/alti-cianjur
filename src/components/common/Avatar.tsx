import React, { useState } from 'react';
import { User } from 'lucide-react';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  rounded?: 'full' | 'xl' | '2xl';
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  className = '',
  rounded = 'full',
}) => {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-24 h-24 text-xl',
  };

  const roundedClasses = {
    full: 'rounded-full',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
  };

  const getInitials = (str: string) => {
    if (!str) return 'AL';
    const parts = str.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  if (!src || hasError) {
    return (
      <div
        className={`bg-[#FFF1F2] text-[#D90429] font-bold flex items-center justify-center shrink-0 border border-[#D90429]/20 select-none ${sizeClasses[size]} ${roundedClasses[rounded]} ${className}`}
        title={name}
      >
        {name ? getInitials(name) : <User className="w-1/2 h-1/2 text-[#D90429]" />}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      onError={() => setHasError(true)}
      referrerPolicy="no-referrer"
      className={`object-cover shrink-0 bg-gray-100 ${sizeClasses[size]} ${roundedClasses[rounded]} ${className}`}
    />
  );
};
