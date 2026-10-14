import React, { useState } from 'react';
import { Award, Shield, Clock, BookOpen, RefreshCw, ChevronRight } from 'lucide-react';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Avatar } from '../components/common/Avatar';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { CardSkeleton } from '../components/common/Skeleton';
import { ErrorState } from '../components/common/ErrorState';
import { EmptyState } from '../components/common/EmptyState';
import { SEO } from '../components/common/SEO';
import { usePelatih } from '../hooks/useSheet';
import { PelatihItem } from '../data/types';

export const Pelatih: React.FC = () => {
  const { data: pelatihList, loading, error, reload } = usePelatih();
  const [selectedCoach, setSelectedCoach] = useState<PelatihItem | null>(null);

  return (
    <div className="bg-white py-12 sm:py-16">
      <SEO
        title="Tim Pelatih"
        description="Pelatih resmi berlisensi ALTI Kabupaten Cianjur yang membina atlet lari trail dan vertical kilometer."
      />

      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-gray-100 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-[#D90429]">
              <Award className="w-4 h-4" />
              <span>Instruktur & Tim Medis</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Tim Pelatih ALTI Cianjur
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl">
              Para instruktur, spesialis fisik elevasi, navigasi rimba, dan nutrisi olahraga bersertifikasi
              resmi yang membimbing atlet mencapai performa puncak. Klik kartu pelatih untuk melihat profil lengkap.
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

        {error && <ErrorState message={error} onRetry={reload} />}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CardSkeleton count={6} />
          </div>
        ) : pelatihList.length === 0 ? (
          <EmptyState
            title="Data Pelatih Belum Tersedia"
            description="Daftar pelatih belum terisi di spreadsheet atau belum diaktifkan."
            actionLabel="Muat Ulang"
            onAction={reload}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pelatihList.map((coach) => (
              <div
                key={coach.id}
                onClick={() => setSelectedCoach(coach)}
                className="cursor-pointer group focus:outline-none"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedCoach(coach);
                  }
                }}
              >
                <Card className="p-6 h-full flex flex-col justify-between group-hover:border-[#D90429]/30 group-hover:shadow-md transition-all">
                  <div>
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar
                        src={coach.foto}
                        name={coach.nama}
                        size="lg"
                        rounded="2xl"
                        className="w-16 h-16 shadow-2xs border border-gray-100"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="inline-block text-[11px] font-bold text-[#D90429] uppercase tracking-wider truncate max-w-full">
                          {coach.spesialisasi}
                        </span>
                        <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-[#D90429] transition-colors">
                          {coach.nama}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          <span>Pengalaman {coach.pengalaman}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 py-3 border-t border-gray-100 text-xs text-gray-600">
                      <div>
                        <span className="font-semibold text-gray-700 block">Lisensi / Sertifikasi:</span>
                        <span className="text-gray-600 line-clamp-2">{coach.lisensi}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 mt-4 flex items-center justify-between text-xs font-semibold text-[#D90429]">
                    <span>Lihat Bio & Rekam Jejak</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}

        {/* MODAL DETAIL PELATIH */}
        <Modal
          isOpen={!!selectedCoach}
          onClose={() => setSelectedCoach(null)}
          title={selectedCoach?.nama || 'Profil Pelatih'}
          maxWidth="lg"
        >
          {selectedCoach && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <Avatar
                  src={selectedCoach.foto}
                  name={selectedCoach.nama}
                  size="xl"
                  rounded="2xl"
                  className="w-24 h-24 sm:w-28 sm:h-28 shadow-sm border-2 border-white shrink-0"
                />
                <div className="space-y-1.5 text-center sm:text-left">
                  <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#FFF1F2] text-[#D90429] border border-[#D90429]/20">
                    {selectedCoach.spesialisasi}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedCoach.nama}
                  </h3>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-gray-500">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>Pengalaman Melatih: <strong>{selectedCoach.pengalaman}</strong></span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                <div>
                  <h4 className="text-xs uppercase font-bold text-gray-500 tracking-wider mb-1 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#D90429]" />
                    Lisensi Resmi
                  </h4>
                  <p className="text-sm font-medium text-gray-800 bg-[#FAF7F5] p-3 rounded-xl border border-gray-100">
                    {selectedCoach.lisensi}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs uppercase font-bold text-gray-500 tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#D90429]" />
                    Biografi & Pendekatan Pelatihan
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                    {selectedCoach.bio || 'Tidak ada deskripsi tambahan.'}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <Button variant="dark" size="sm" onClick={() => setSelectedCoach(null)}>
                  Tutup
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </Container>
    </div>
  );
};
