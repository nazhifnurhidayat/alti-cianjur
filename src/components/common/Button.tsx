import React from 'react';
import { Link } from 'react-router-dom';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'white' | 'dark' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  icon,
  iconPosition = 'left',
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 whitespace-nowrap shrink-0 active:scale-[0.98] select-none min-h-[44px]';

  const variantClasses = {
    primary:
      'bg-[#D90429] text-white hover:bg-[#8D0801] shadow-sm shadow-[#D90429]/20 focus-visible:ring-[#D90429]',
    outline:
      'border-2 border-[#D90429] text-[#D90429] bg-transparent hover:bg-[#FFF1F2] focus-visible:ring-[#D90429]',
    white:
      'bg-white text-[#D90429] hover:bg-gray-50 shadow-sm focus-visible:ring-white',
    dark:
      'bg-[#1F2937] text-white hover:bg-gray-900 focus-visible:ring-gray-700',
    ghost:
      'text-gray-700 hover:text-[#D90429] hover:bg-gray-100 focus-visible:ring-gray-400',
  };

  const sizeClasses = {
    sm: 'text-xs px-3.5 py-2 gap-1.5 min-h-[38px]',
    md: 'text-sm px-5 py-2.5 gap-2 min-h-[44px]',
    lg: 'text-base px-6 py-3.5 gap-2.5 min-h-[50px] font-semibold',
  };

  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';
  const finalClass = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClass} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={finalClass}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={finalClass}>
        {content}
      </a>
    );
  }

  return (
    <button className={finalClass} disabled={disabled} {...props}>
      {content}
    </button>
  );
};
