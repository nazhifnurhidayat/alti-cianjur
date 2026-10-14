import React, { useEffect, useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GaleriItem } from '../../data/types';
import { ImageWithFallback } from './ImageWithFallback';

interface LightboxProps {
  items: GaleriItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const currentItem = items[currentIndex];

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onNavigate(currentIndex - 1);
      }
      if (e.key === 'ArrowRight' && currentIndex < items.length - 1) {
        onNavigate(currentIndex + 1);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, items.length, onClose, onNavigate]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < items.length - 1) {
      onNavigate(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      onNavigate(currentIndex - 1);
    }
  };

  if (!isOpen || !currentItem) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Header */}
      <div className="absolute top-0 inset-x-0 p-4 sm:p-6 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 to-transparent">
        <div className="text-white text-xs sm:text-sm font-medium">
          {currentIndex + 1} / {items.length}
          {currentItem.album && (
            <span className="ml-3 text-white/70 border-l border-white/20 pl-3">
              {currentItem.album}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Tutup pratinjau"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Prev Button */}
      {currentIndex > 0 && (
        <button
          onClick={() => onNavigate(currentIndex - 1)}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Foto sebelumnya"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      {/* Next Button */}
      {currentIndex < items.length - 1 && (
        <button
          onClick={() => onNavigate(currentIndex + 1)}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Foto berikutnya"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}

      {/* Center Image */}
      <div className="relative max-w-5xl max-h-[82vh] w-full p-4 flex flex-col items-center justify-center">
        <ImageWithFallback
          src={currentItem.gambar}
          alt={currentItem.caption || 'Foto Galeri'}
          className="max-h-[72vh] max-w-full object-contain rounded-lg shadow-2xl"
        />
        {currentItem.caption && (
          <p className="mt-4 text-center text-sm sm:text-base text-white/90 max-w-2xl px-4 font-normal">
            {currentItem.caption}
          </p>
        )}
      </div>
    </div>
  );
};
