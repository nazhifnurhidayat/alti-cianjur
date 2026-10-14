import React from 'react';

interface SectionTitleProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
  titleClassName?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  kicker,
  title,
  subtitle,
  align = 'center',
  className = '',
  titleClassName = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-10 sm:mb-12 ${isCenter ? 'text-center max-w-2xl mx-auto' : 'max-w-2xl'} ${className}`}>
      {kicker && (
        <div className="flex items-center gap-2 mb-2 justify-start font-medium text-xs tracking-wider uppercase text-[#D90429]">
          <span className="w-5 h-[2px] bg-[#D90429] inline-block"></span>
          <span>{kicker}</span>
        </div>
      )}
      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 leading-tight ${titleClassName}`}
        style={{ textWrap: 'balance' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base text-gray-600 leading-relaxed max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};
