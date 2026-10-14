import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Users, RefreshCw, ChevronRight, Award, Trophy } from 'lucide-react';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { CardSkeleton } from '../components/common/Skeleton';
import { ErrorState } from '../components/common/ErrorState';
import { EmptyState } from '../components/common/EmptyState';
import { SEO } from '../components/common/SEO';
import { useAtlet, usePrestasi } from '../hooks/useSheet';

const INITIAL_PAGE_SIZE = 8;
const PAGE_INCREMENT = 8;

export const Atlet: React.FC = () => {
  const { data: atletList, loading, error, reload } = useAtlet();
  const { data: prestasiList } = usePrestasi();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKategori, setSelectedKategori] = useState('Semua');
  const [selectedGender, setSelectedGender] = useState('Semua');
  const [selectedUsia, setSelectedUsia] = useState('Semua');
  const [visibleCount, setVisibleCount] = useState(INITIAL_PAGE_SIZE);

  // Ambil opsi filter unik dari data
  const kategoriOptions = useMemo(() => {
    const set = new Set(atletList.map((a) => a.kategori).filter(Boolean));
    return ['Semua', ...Array.from(set)];
  }, [atletList]);

  const genderOptions = ['Semua', 'Laki-laki', 'Perempuan'];

  const usiaOptions = useMemo(() => {
    const set = new Set(atletList.map((a) => a.kelompok_usia).filter(Boolean));
    return ['Semua', ...Array.from(set)];
  }, [atletList]);

  // Prestasi map untuk mencari prestasi singkat per atlet
  const prestasiPerAtlet = useMemo(() => {
    const map: Record<string, string> = {};
    prestasiList.forEach((p) => {
      if (p.atlet_id && !map[p.atlet_id]) {
        map[p.atlet_id] = `${p.medali} ${p.kejuaraan} (${p.tahun})`;
      }
    });
    return map;
  }, [prestasiList]);

  // Filter data
  const filteredAtlet = useMemo(() => {
    return atletList.filter((item) => {
      const matchSearch =
        item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.klub.toLowerCase().includes(searchQuery.toLowerCase());
      const matchKategori =
        selectedKategori === 'Semua' || item.kategori === selectedKategori;
      const matchGender =
        selectedGender === 'Semua' || item.jenis_kelamin === selectedGender;
      const matchUsia =
        selectedUsia === 'Semua' || item.kelompok_usia === selectedUsia;

      return matchSearch && matchKategori && matchGender && matchUsia;
    });
  }, [atletList, searchQuery, selectedKategori, selectedGender, selectedUsia]);

  const visibleList = filteredAtlet.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAtlet.length;

  const handleResetFilter = () => {
    setSearchQuery('');
    setSelectedKategori('Semua');
    setSelectedGender('Semua');
    setSelectedUsia('Semua');
    setVisibleCount(INITIAL_PAGE_SIZE);
  };

  return (
    <div className="bg-white py-12 sm:py-16">
      <SEO
        title="Daftar Atlet"
        description="Data lengkap atlet lari trail binaan ALTI Kabupaten Cianjur dari berbagai nomor perlombaan dan kelompok usia."
      />

      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-gray-100 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-[#D90429]">
              <Users className="w-4 h-4" />
              <span>Skuad Resmi</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Atlet ALTI Kabupaten Cianjur
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl">
              Profil pelari binaan cabang olahraga lari trail, siap berlaga di nomor Speed Trail, Short Trail,
              Long Trail, hingga Vertical Kilometre.
            </p>
          </div>

          <button
            onClick={reload}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 hover:text-[#D90429] bg-gray-50 hover:bg-[#FFF1F2] rounded-xl transition-colors border border-gray-200 self-start md:self-end"
            title="Muat ulang data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Perbarui Data</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#FAF7F5] rounded-2xl p-4 sm:p-6 mb-8 border border-gray-100 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="md:col-span-4 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama atlet atau klub..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(INITIAL_PAGE_SIZE);
                }}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#D90429] focus:ring-1 focus:ring-[#D90429] transition-colors"
              />
            </div>

            {/* Filter Kategori */}
            <div className="md:col-span-3">
              <select
                value={selectedKategori}
                onChange={(e) => {
                  setSelectedKategori(e.target.value);
                  setVisibleCount(INITIAL_PAGE_SIZE);
                }}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#D90429] transition-colors"
              >
                <option value="Semua">Kategori: Semua</option>
                {kategoriOptions.filter((k) => k !== 'Semua').map((kat) => (
                  <option key={kat} value={kat}>
                    {kat}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter Gender */}
            <div className="md:col-span-2">
              <select
                value={selectedGender}
                onChange={(e) => {
                  setSelectedGender(e.target.value);
                  setVisibleCount(INITIAL_PAGE_SIZE);
                }}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#D90429] transition-colors"
              >
                {genderOptions.map((g) => (
                  <option key={g} value={g}>
                    {g === 'Semua' ? 'Gender: Semua' : g}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter Kelompok Usia */}
            <div className="md:col-span-3">
              <select
                value={selectedUsia}
                onChange={(e) => {
                  setSelectedUsia(e.target.value);
                  setVisibleCount(INITIAL_PAGE_SIZE);
                }}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#D90429] transition-colors"
              >
                <option value="Semua">Usia: Semua</option>
                {usiaOptions.filter((u) => u !== 'Semua').map((usia) => (
                  <option key={usia} value={usia}>
                    {usia}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filter Counter & Reset */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-200/60">
            <span>
              Menampilkan <strong>{visibleList.length}</strong> dari{' '}
              <strong>{filteredAtlet.length}</strong> atlet
            </span>
            {(searchQuery || selectedKategori !== 'Semua' || selectedGender !== 'Semua' || selectedUsia !== 'Semua') && (
              <button
                onClick={handleResetFilter}
                className="text-[#D90429] hover:underline font-semibold"
              >
                Reset Semua Filter
              </button>
            )}
          </div>
        </div>

        {error && <ErrorState message={error} onRetry={reload} />}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CardSkeleton count={8} />
          </div>
        ) : filteredAtlet.length === 0 ? (
          <EmptyState
            title="Tidak Ada Atlet Ditemukan"
            description="Tidak ada atlet yang cocok dengan kata kunci atau filter yang Anda pilih."
            icon="search"
            actionLabel="Reset Filter"
            onAction={handleResetFilter}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {visibleList.map((atlet) => {
                const highlightPrestasi = prestasiPerAtlet[atlet.id];

                return (
                  <Link
                    key={atlet.id}
                    to={`/atlet/${atlet.id}`}
                    className="group focus:outline-none flex flex-col"
                  >
                    <Card className="p-5 h-full flex flex-col justify-between group-hover:border-[#D90429]/30 group-hover:shadow-md transition-all">
                      <div>
                        {/* Avatar & Badges */}
                        <div className="flex items-center gap-3.5 mb-4">
                          <Avatar
                            src={atlet.foto}
                            name={atlet.nama}
                            size="lg"
                            rounded="2xl"
                            className="w-16 h-16 shadow-2xs border border-gray-100 shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <span className="inline-block text-[11px] font-bold text-[#D90429] uppercase tracking-wider truncate max-w-full">
                              {atlet.kategori}
                            </span>
                            <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-[#D90429] transition-colors truncate">
                              {atlet.nama}
                            </h3>
                            <span className="text-xs text-gray-500 block truncate">
                              {atlet.klub}
                            </span>
                          </div>
                        </div>

                        {/* Metadata row */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          <Badge variant="gray" size="sm">
                            {atlet.jenis_kelamin}
                          </Badge>
                          <Badge variant="gray" size="sm">
                            {atlet.kelompok_usia}
                          </Badge>
                        </div>

                        {/* Prestasi Singkat jika ada */}
                        {highlightPrestasi ? (
                          <div className="p-2.5 rounded-xl bg-amber-50/70 border border-[#F4B942]/30 text-[11px] text-amber-900 flex items-start gap-1.5 line-clamp-2">
                            <Trophy className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{highlightPrestasi}</span>
                          </div>
                        ) : atlet.bio ? (
                          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                            {atlet.bio}
                          </p>
                        ) : null}
                      </div>

                      {/* CTA link */}
                      <div className="pt-3 border-t border-gray-100 mt-4 flex items-center justify-between text-xs font-semibold text-[#D90429]">
                        <span>Detail Biodata</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-10">
                <Button
                  onClick={() => setVisibleCount((prev) => prev + PAGE_INCREMENT)}
                  variant="outline"
                  size="md"
                >
                  Muat Lebih Banyak ({filteredAtlet.length - visibleCount} lagi)
                </Button>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};
