import React, { useState, useMemo } from 'react';
import { Camera, RefreshCw, ZoomIn } from 'lucide-react';
import { Container } from '../components/common/Container';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { Lightbox } from '../components/common/Lightbox';
import { CardSkeleton } from '../components/common/Skeleton';
import { ErrorState } from '../components/common/ErrorState';
import { EmptyState } from '../components/common/EmptyState';
import { SEO } from '../components/common/SEO';
import { useGaleri } from '../hooks/useSheet';

export const Galeri: React.FC = () => {
  const { data: galeriList, loading, error, reload } = useGaleri();
  const [selectedAlbum, setSelectedAlbum] = useState('Semua');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Album list
  const albumList = useMemo(() => {
    const set = new Set(galeriList.map((g) => g.album).filter(Boolean));
    return ['Semua', ...Array.from(set)];
  }, [galeriList]);

  // Filtered list
  const filteredGaleri = useMemo(() => {
    if (selectedAlbum === 'Semua') return galeriList;
    return galeriList.filter((g) => g.album === selectedAlbum);
  }, [galeriList, selectedAlbum]);

  return (
    <div className="bg-white py-12 sm:py-16">
      <SEO
        title="Galeri Dokumentasi"
        description="Dokumentasi foto kejuaraan, sesi latihan lintas alam, dan keindahan jalur lari trail pegunungan ALTI Kabupaten Cianjur."
      />

      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-gray-100 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-[#D90429]">
              <Camera className="w-4 h-4" />
              <span>Dokumentasi Visual</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Galeri Kegiatan ALTI Cianjur
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl">
              Sorot lensa aktivitas atlet di jalur alam Gede Pangrango, panggung podium kejuaraan, dan
              ekspedisi konservasi lingkungan. Klik foto untuk memperbesar tampilan.
            </p>
          </div>

          <button
            onClick={reload}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 hover:text-[#D90429] bg-gray-50 hover:bg-[#FFF1F2] rounded-xl transition-colors border border-gray-200 self-start md:self-end"
            title="Muat ulang galeri"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Perbarui Galeri</span>
          </button>
        </div>

        {/* Album Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {albumList.map((album) => (
            <button
              key={album}
              onClick={() => setSelectedAlbum(album)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all ${
                selectedAlbum === album
                  ? 'bg-[#D90429] text-white shadow-xs'
                  : 'bg-[#FAF7F5] text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {album}
            </button>
          ))}
        </div>

        {error && <ErrorState message={error} onRetry={reload} />}

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <CardSkeleton count={8} />
          </div>
        ) : filteredGaleri.length === 0 ? (
          <EmptyState
            title="Belum Ada Foto di Album Ini"
            description="Tidak ada dokumentasi foto yang sesuai dengan album yang dipilih."
            icon="inbox"
            actionLabel="Tampilkan Semua Album"
            onAction={() => setSelectedAlbum('Semua')}
          />
        ) : (
          /* Masonry Grid */
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filteredGaleri.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(index)}
                className="group relative rounded-2xl overflow-hidden bg-gray-100 break-inside-avoid shadow-xs hover:shadow-md transition-all cursor-pointer"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setLightboxIndex(index);
                  }
                }}
              >
                <ImageWithFallback
                  src={item.gambar}
                  alt={item.caption || 'Foto Dokumentasi ALTI Cianjur'}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Hover overlay with zoom icon & caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between text-white">
                  <div className="self-end p-2 bg-white/20 backdrop-blur-xs rounded-full">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                  <div>
                    {item.album && (
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#D90429] mb-1">
                        {item.album}
                      </span>
                    )}
                    <p className="text-xs font-medium line-clamp-3 leading-snug">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        <Lightbox
          items={filteredGaleri}
          currentIndex={lightboxIndex ?? 0}
          isOpen={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(newIndex) => setLightboxIndex(newIndex)}
        />
      </Container>
    </div>
  );
};
