import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Calendar, ChevronRight, RefreshCw } from 'lucide-react';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { CardSkeleton } from '../components/common/Skeleton';
import { ErrorState } from '../components/common/ErrorState';
import { EmptyState } from '../components/common/EmptyState';
import { SEO } from '../components/common/SEO';
import { useBerita } from '../hooks/useSheet';

export const Berita: React.FC = () => {
  const { data: beritaList, loading, error, reload } = useBerita();
  const [selectedKategori, setSelectedKategori] = useState('Semua');

  // Kategori unik
  const kategoriList = useMemo(() => {
    const set = new Set(beritaList.map((b) => b.kategori).filter(Boolean));
    return ['Semua', ...Array.from(set)];
  }, [beritaList]);

  // Filtered
  const filteredBerita = useMemo(() => {
    if (selectedKategori === 'Semua') return beritaList;
    return beritaList.filter((b) => b.kategori === selectedKategori);
  }, [beritaList, selectedKategori]);

  return (
    <div className="bg-white py-12 sm:py-16">
      <SEO
        title="Warta & Kegiatan"
        description="Berita resmi, dokumentasi kegiatan, rilis kejuaraan, dan warta pembinaan lari trail ALTI Kabupaten Cianjur."
      />

      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-gray-100 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-[#D90429]">
              <Newspaper className="w-4 h-4" />
              <span>Publikasi & Kabar</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Warta & Kegiatan ALTI Cianjur
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl">
              Ikuti kabar terbaru seputar kejuaraan lari trail, program pembinaan talenta muda, kegiatan konservasi,
              dan agenda olahraga lintas alam di Cianjur.
            </p>
          </div>

          <button
            onClick={reload}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 hover:text-[#D90429] bg-gray-50 hover:bg-[#FFF1F2] rounded-xl transition-colors border border-gray-200 self-start md:self-end"
            title="Muat ulang berita"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Perbarui Berita</span>
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {kategoriList.map((kategori) => (
            <button
              key={kategori}
              onClick={() => setSelectedKategori(kategori)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all ${
                selectedKategori === kategori
                  ? 'bg-[#D90429] text-white shadow-xs'
                  : 'bg-[#FAF7F5] text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {kategori}
            </button>
          ))}
        </div>

        {error && <ErrorState message={error} onRetry={reload} />}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CardSkeleton count={6} />
          </div>
        ) : filteredBerita.length === 0 ? (
          <EmptyState
            title="Belum Ada Berita"
            description="Tidak ada artikel yang sesuai dengan kategori yang dipilih."
            icon="inbox"
            actionLabel="Tampilkan Semua"
            onAction={() => setSelectedKategori('Semua')}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBerita.map((item) => (
              <Link
                key={item.id}
                to={`/berita/${item.slug}`}
                className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-2xs overflow-hidden hover:shadow-md hover:border-gray-200 transition-all"
              >
                <div className="aspect-[16/10] overflow-hidden bg-gray-100 relative">
                  <ImageWithFallback
                    src={item.gambar}
                    alt={item.judul}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#D90429] font-bold text-[11px] px-2.5 py-1 rounded-md shadow-2xs">
                    {item.kategori}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {new Date(item.tanggal).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-[#D90429] transition-colors line-clamp-2 mb-2">
                      {item.judul}
                    </h3>

                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                      {item.ringkasan}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 mt-4 flex items-center justify-between text-xs font-semibold text-[#D90429]">
                    <span>Baca Artikel</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};
