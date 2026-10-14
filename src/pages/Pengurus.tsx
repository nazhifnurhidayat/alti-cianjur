import React from 'react';
import { Shield, RefreshCw, Calendar, Briefcase } from 'lucide-react';
import { Container } from '../components/common/Container';
import { SectionTitle } from '../components/common/SectionTitle';
import { Card } from '../components/common/Card';
import { Avatar } from '../components/common/Avatar';
import { CardSkeleton } from '../components/common/Skeleton';
import { ErrorState } from '../components/common/ErrorState';
import { EmptyState } from '../components/common/EmptyState';
import { SEO } from '../components/common/SEO';
import { usePengurus } from '../hooks/useSheet';

export const Pengurus: React.FC = () => {
  const { data: pengurusList, loading, error, reload } = usePengurus();

  // Ketua Umum biasanya memiliki urutan = 1 atau jabatan Ketua Umum
  const ketua = pengurusList.find(
    (p) => p.urutan === 1 || p.jabatan.toLowerCase().includes('ketua umum')
  );
  const anggotaLain = pengurusList.filter((p) => p.id !== ketua?.id);

  return (
    <div className="bg-white py-12 sm:py-16">
      <SEO
        title="Pengurus Cabang"
        description="Susunan Pengurus Cabang Asosiasi Lari Trail Indonesia (ALTI) Kabupaten Cianjur masa bakti resmi."
      />

      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-gray-100 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-[#D90429]">
              <Shield className="w-4 h-4" />
              <span>Struktur Organisasi</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Pengurus ALTI Kabupaten Cianjur
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl">
              Jajaran kepengurusan cabang yang berdedikasi memajukan tata kelola, pembinaan prestasi, dan
              ekosistem olahraga lari lintas alam di Kabupaten Cianjur.
            </p>
          </div>

          <button
            onClick={reload}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 hover:text-[#D90429] bg-gray-50 hover:bg-[#FFF1F2] rounded-xl transition-colors border border-gray-200 self-start md:self-end"
            title="Muat ulang data dari Google Sheets"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Perbarui Data</span>
          </button>
        </div>

        {error && <ErrorState message={error} onRetry={reload} />}

        {loading ? (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-gray-100 p-8 max-w-3xl mx-auto animate-pulse flex flex-col sm:flex-row items-center gap-6">
              <div className="w-32 h-32 rounded-2xl bg-gray-200" />
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-100 rounded w-1/3" />
                <div className="h-3 bg-gray-100 rounded w-full" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <CardSkeleton count={4} />
            </div>
          </div>
        ) : pengurusList.length === 0 ? (
          <EmptyState
            title="Data Pengurus Belum Tersedia"
            description="Daftar pengurus belum terisi pada spreadsheet atau belum dipublikasikan."
            actionLabel="Muat Ulang"
            onAction={reload}
          />
        ) : (
          <div className="space-y-12">
            {/* KARTU KETUA UMUM (MENONJOL DI ATAS) */}
            {ketua && (
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-4">
                  <span className="text-xs uppercase font-bold tracking-widest text-[#D90429] bg-[#FFF1F2] px-3 py-1 rounded-full border border-[#D90429]/20">
                    Pimpinan Utama
                  </span>
                </div>
                <Card className="p-6 sm:p-8 border-2 border-[#D90429]/20 shadow-md bg-gradient-to-br from-white via-white to-[#FFF1F2]/30">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6">
                    <Avatar
                      src={ketua.foto}
                      name={ketua.nama}
                      size="xl"
                      rounded="2xl"
                      className="w-32 h-32 sm:w-36 sm:h-36 shadow-sm border-2 border-white shrink-0"
                    />
                    <div className="flex-1 space-y-2">
                      <span className="inline-block text-xs font-semibold text-[#D90429] uppercase tracking-wider">
                        {ketua.jabatan}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                        {ketua.nama}
                      </h2>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-y-1 gap-x-4 text-xs text-gray-500 pt-1">
                        {ketua.bidang && (
                          <span className="flex items-center gap-1.5">
                            <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                            {ketua.bidang}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          Masa Bakti: {ketua.periode}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 pt-2 leading-relaxed">
                        Memimpin koordinasi dan arah strategis pembinaan olahraga lari trail Kabupaten Cianjur
                        bersama KONI dan jajaran stakeholder olahraga tatar santri.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* JAJARAN WAKIL KETUA, SEKRETARIS, BENDAHARA & BIDANG */}
            <div>
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-gray-900">
                  Jajaran Pengurus & Ketua Bidang
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Masa Bakti {ketua?.periode || '2025 - 2029'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {anggotaLain.map((item) => (
                  <Card key={item.id} className="p-5 flex flex-col items-center text-center">
                    <Avatar
                      src={item.foto}
                      name={item.nama}
                      size="lg"
                      rounded="2xl"
                      className="w-24 h-24 mb-4 shadow-2xs border-2 border-white"
                    />
                    <span className="text-[11px] font-bold text-[#D90429] uppercase tracking-wider mb-1">
                      {item.jabatan}
                    </span>
                    <h4 className="font-bold text-gray-900 text-sm leading-snug mb-1">
                      {item.nama}
                    </h4>
                    {item.bidang && <span className="text-xs text-gray-500 mb-3">{item.bidang}</span>}

                    <div className="w-full pt-3 border-t border-gray-100 mt-auto flex items-center justify-center text-[11px] text-gray-400">
                      <span>Periode {item.periode}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};
