import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  whiteText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  showText = true,
  size = 'md',
  whiteText = false,
}) => {
  const iconSizes = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  return (
    <div className={`flex items-center gap-3 shrink-0 ${className}`}>
      {/* Official ALTI Kab. Cianjur Logo Emblem */}
      <div
        className={`${iconSizes[size]} shrink-0 rounded-xl flex items-center justify-center relative overflow-hidden ${
          whiteText ? 'bg-white p-1 shadow-sm' : 'p-0.5'
        }`}
      >
        <img
          src="/logo-alti.svg"
          alt="Logo Resmi ALTI Kabupaten Cianjur"
          className="w-full h-full object-contain"
        />
      </div>

      {showText && (
        <div className="flex flex-col leading-tight select-none">
          <span
            className={`font-extrabold tracking-tight font-heading ${
              size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : size === 'xl' ? 'text-2xl' : 'text-base sm:text-lg'
            } ${whiteText ? 'text-white' : 'text-gray-900'}`}
          >
            ALTI <span className="text-[#D90429]">CIANJUR</span>
          </span>
          <span
            className={`text-[9px] sm:text-[10px] tracking-wider uppercase font-semibold ${
              whiteText ? 'text-white/80' : 'text-gray-500'
            }`}
          >
            Asosiasi Lari Trail Indonesia
          </span>
        </div>
      )}
    </div>
  );
};
