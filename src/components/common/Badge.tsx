import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'red' | 'gold' | 'silver' | 'bronze' | 'gray' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  const variantClasses = {
    default: 'bg-gray-100 text-gray-700 font-medium',
    red: 'bg-[#FFF1F2] text-[#D90429] font-medium border border-[#D90429]/20',
    gold: 'bg-amber-50 text-amber-900 border border-[#F4B942]/60 font-semibold',
    silver: 'bg-slate-100 text-slate-800 border border-slate-300 font-semibold',
    bronze: 'bg-amber-100/60 text-amber-800 border border-amber-300 font-semibold',
    gray: 'bg-gray-100 text-gray-600',
    outline: 'border border-gray-300 text-gray-700 bg-white',
  };

  return (
    <span
      className={`inline-flex items-center rounded-md whitespace-nowrap shrink-0 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export const MedalBadge: React.FC<{ medali: string; className?: string }> = ({ medali, className = '' }) => {
  const m = medali.toLowerCase();
  let variant: 'gold' | 'silver' | 'bronze' | 'red' = 'red';
  let dotColor = 'bg-[#D90429]';

  if (m.includes('emas') || m.includes('gold') || m.includes('1')) {
    variant = 'gold';
    dotColor = 'bg-[#F4B942]';
  } else if (m.includes('perak') || m.includes('silver') || m.includes('2')) {
    variant = 'silver';
    dotColor = 'bg-slate-400';
  } else if (m.includes('perunggu') || m.includes('bronze') || m.includes('3')) {
    variant = 'bronze';
    dotColor = 'bg-amber-700';
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md ${
        variant === 'gold'
          ? 'bg-amber-50 text-amber-900 border border-[#F4B942]/50'
          : variant === 'silver'
          ? 'bg-slate-100 text-slate-800 border border-slate-300'
          : variant === 'bronze'
          ? 'bg-orange-50 text-amber-900 border border-orange-200'
          : 'bg-red-50 text-[#8D0801] border border-red-200'
      } ${className}`}
    >
      <span className={`w-2 h-2 rounded-full shrink-0 ${dotColor}`} />
      <span>{medali}</span>
    </span>
  );
};
