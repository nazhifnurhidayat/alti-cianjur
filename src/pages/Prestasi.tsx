import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Filter, RefreshCw, ChevronRight, Medal } from 'lucide-react';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { MedalBadge } from '../components/common/Badge';
import { TableRowSkeleton } from '../components/common/Skeleton';
import { ErrorState } from '../components/common/ErrorState';
import { EmptyState } from '../components/common/EmptyState';
import { SEO } from '../components/common/SEO';
import { usePrestasi } from '../hooks/useSheet';

export const Prestasi: React.FC = () => {
  const { data: prestasiList, loading, error, reload } = usePrestasi();

  const [selectedTahun, setSelectedTahun] = useState('Semua');
  const [selectedTingkat, setSelectedTingkat] = useState('Semua');

  // Tahun options
  const tahunOptions = useMemo(() => {
    const set = new Set(prestasiList.map((p) => String(p.tahun)).filter(Boolean));
    return ['Semua', ...Array.from(set).sort((a, b) => Number(b) - Number(a))];
  }, [prestasiList]);

  // Tingkat options
  const tingkatOptions = ['Semua', 'Kabupaten', 'Provinsi', 'Nasional', 'Internasional'];

  // Filtered
  const filteredPrestasi = useMemo(() => {
    return prestasiList.filter((item) => {
      const matchTahun =
        selectedTahun === 'Semua' || String(item.tahun) === selectedTahun;
      const matchTingkat =
        selectedTingkat === 'Semua' || item.tingkat === selectedTingkat;
      return matchTahun && matchTingkat;
    });
  }, [prestasiList, selectedTahun, selectedTingkat]);

  // Statistik perolehan medali
  const summaryMedali = useMemo(() => {
    let emas = 0;
    let perak = 0;
    let perunggu = 0;
    let harapan = 0;

    prestasiList.forEach((p) => {
      const m = p.medali.toLowerCase();
      if (m.includes('emas') || m.includes('gold') || m === '1') emas++;
      else if (m.includes('perak') || m.includes('silver') || m === '2') perak++;
      else if (m.includes('perunggu') || m.includes('bronze') || m === '3') perunggu++;
      else harapan++;
    });

    return { emas, perak, perunggu, harapan, total: prestasiList.length };
  }, [prestasiList]);

  const handleReset = () => {
    setSelectedTahun('Semua');
    setSelectedTingkat('Semua');
  };

  return (
    <div className="bg-white py-12 sm:py-16">
      <SEO
        title="Prestasi & Medali"
        description="Rekam jejak prestasi atlet ALTI Kabupaten Cianjur di kejuaraan lari trail tingkat kabupaten, provinsi, nasional, dan internasional."
      />

      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-gray-100 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-[#D90429]">
              <Trophy className="w-4 h-4" />
              <span>Rekam Prestasi</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Prestasi Kejuaraan ALTI Cianjur
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl">
              Daftar medali dan kejuaraan resmi yang berhasil diraih oleh atlet-atlet lari trail Kabupaten Cianjur
              di berbagai ajang kompetisi lintas alam.
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

        {/* Medal Summary Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-amber-50/70 border border-[#F4B942]/40 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F4B942] text-amber-950 font-bold flex items-center justify-center shrink-0">
              <Medal className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold font-stats text-amber-950">{summaryMedali.emas}</div>
              <div className="text-xs text-amber-800 font-semibold uppercase">Medali Emas</div>
            </div>
          </div>

          <div className="bg-slate-100/70 border border-slate-300 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-400 text-white font-bold flex items-center justify-center shrink-0">
              <Medal className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold font-stats text-slate-800">{summaryMedali.perak}</div>
              <div className="text-xs text-slate-700 font-semibold uppercase">Medali Perak</div>
            </div>
          </div>

          <div className="bg-orange-50/70 border border-amber-300 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-700 text-white font-bold flex items-center justify-center shrink-0">
              <Medal className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold font-stats text-amber-950">{summaryMedali.perunggu}</div>
              <div className="text-xs text-amber-800 font-semibold uppercase">Medali Perunggu</div>
            </div>
          </div>

          <div className="bg-red-50/70 border border-red-200 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D90429] text-white font-bold flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold font-stats text-red-950">{summaryMedali.total}</div>
              <div className="text-xs text-red-800 font-semibold uppercase">Total Kejuaraan</div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#FAF7F5] rounded-2xl p-4 sm:p-5 mb-8 border border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
              <Filter className="w-4 h-4 text-[#D90429]" />
              <span>Filter:</span>
            </div>

            {/* Tahun Filter */}
            <select
              value={selectedTahun}
              onChange={(e) => setSelectedTahun(e.target.value)}
              className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#D90429]"
            >
              <option value="Semua">Semua Tahun</option>
              {tahunOptions.filter((t) => t !== 'Semua').map((t) => (
                <option key={t} value={t}>
                  Tahun {t}
                </option>
              ))}
            </select>

            {/* Tingkat Filter */}
            <select
              value={selectedTingkat}
              onChange={(e) => setSelectedTingkat(e.target.value)}
              className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#D90429]"
            >
              <option value="Semua">Semua Tingkat</option>
              {tingkatOptions.filter((t) => t !== 'Semua').map((t) => (
                <option key={t} value={t}>
                  Tingkat {t}
                </option>
              ))}
            </select>

            {(selectedTahun !== 'Semua' || selectedTingkat !== 'Semua') && (
              <button
                onClick={handleReset}
                className="text-xs text-[#D90429] hover:underline font-semibold ml-2"
              >
                Reset
              </button>
            )}
          </div>

          <div className="text-xs text-gray-500 font-medium">
            Menampilkan <strong>{filteredPrestasi.length}</strong> catatan prestasi
          </div>
        </div>

        {error && <ErrorState message={error} onRetry={reload} />}

        {loading ? (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs">
            <table className="w-full text-left">
              <tbody>
                <TableRowSkeleton rows={6} />
              </tbody>
            </table>
          </div>
        ) : filteredPrestasi.length === 0 ? (
          <EmptyState
            title="Tidak Ada Data Prestasi"
            description="Tidak ada catatan prestasi yang cocok dengan filter yang Anda tentukan."
            icon="search"
            actionLabel="Reset Filter"
            onAction={handleReset}
          />
        ) : (
          <>
            {/* DESKTOP TABLE */}
            <div className="hidden md:block bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#FAF7F5] border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3.5 px-6">Tahun</th>
                    <th className="py-3.5 px-6">Kejuaraan</th>
                    <th className="py-3.5 px-6">Tingkat</th>
                    <th className="py-3.5 px-6">Nama Atlet</th>
                    <th className="py-3.5 px-6 text-right">Medali</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredPrestasi.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-4 px-6 font-stats font-bold text-gray-900 whitespace-nowrap">
                        {item.tahun}
                      </td>
                      <td className="py-4 px-6 font-semibold text-gray-900">
                        {item.kejuaraan}
                      </td>
                      <td className="py-4 px-6 text-xs text-gray-600 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-md bg-gray-100 font-medium">
                          {item.tingkat}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {item.atlet_id ? (
                          <Link
                            to={`/atlet/${item.atlet_id}`}
                            className="font-medium text-[#D90429] hover:underline inline-flex items-center gap-1 group"
                          >
                            <span>{item.nama_atlet}</span>
                            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                        ) : (
                          <span className="font-medium text-gray-800">{item.nama_atlet}</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <MedalBadge medali={item.medali} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="md:hidden space-y-4">
              {filteredPrestasi.map((item) => (
                <Card key={item.id} className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500 font-stats">
                      Tahun {item.tahun} · {item.tingkat}
                    </span>
                    <MedalBadge medali={item.medali} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm leading-snug">
                    {item.kejuaraan}
                  </h3>
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-gray-500">Nama Atlet:</span>
                    {item.atlet_id ? (
                      <Link
                        to={`/atlet/${item.atlet_id}`}
                        className="font-semibold text-[#D90429] hover:underline inline-flex items-center gap-0.5"
                      >
                        <span>{item.nama_atlet}</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    ) : (
                      <span className="font-semibold text-gray-900">{item.nama_atlet}</span>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </Container>
    </div>
  );
};
