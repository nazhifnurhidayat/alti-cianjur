import React, { useState } from 'react';
import { SITE_CONFIG } from '../../config';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackSrc = SITE_CONFIG.scenicImage,
  className = '',
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc);
  const [hasError, setHasError] = useState(false);

  return (
    <img
      src={hasError ? fallbackSrc : currentSrc}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setCurrentSrc(fallbackSrc);
        }
      }}
      className={`transition-opacity duration-300 ${className}`}
      {...props}
    />
  );
};
