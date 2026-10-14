import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  ...props
}) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${
        hoverEffect
          ? 'transition-all duration-200 hover:shadow-md hover:border-gray-200'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
