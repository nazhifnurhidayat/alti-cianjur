import React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  size?: 'normal' | 'narrow' | 'wide';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  size = 'normal',
  ...props
}) => {
  const sizeClasses = {
    narrow: 'max-w-4xl',
    normal: 'max-w-7xl',
    wide: 'max-w-[1400px]',
  };

  return (
    <div
      className={`mx-auto px-4 sm:px-6 lg:px-8 w-full ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
