import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Calendar, Users, Award, Shield, User } from 'lucide-react';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Avatar } from '../components/common/Avatar';
import { Badge, MedalBadge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';
import { useAtlet, usePrestasi } from '../hooks/useSheet';

export const AtletDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: atletList, loading } = useAtlet();
  const { data: allPrestasi } = usePrestasi();

  const atlet = atletList.find((a) => a.id.toLowerCase() === id?.toLowerCase());

  // Prestasi atlet ini
  const prestasiAtlet = allPrestasi.filter(
    (p) => p.atlet_id && p.atlet_id.toLowerCase() === id?.toLowerCase()
  );

  if (loading) {
    return (
      <div className="py-20 text-center">
        <Container>
          <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl border border-gray-100 animate-pulse space-y-4">
            <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto" />
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto" />
            <div className="h-4 bg-gray-100 rounded w-1/3 mx-auto" />
          </div>
        </Container>
      </div>
    );
  }

  if (!atlet) {
    return (
      <div className="py-20 text-center">
        <Container>
          <div className="max-w-md mx-auto p-8 bg-white rounded-2xl border border-gray-100 space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Atlet Tidak Ditemukan</h2>
            <p className="text-sm text-gray-500">
              Data atlet dengan ID "{id}" tidak ditemukan atau belum dipublikasikan.
            </p>
            <Button to="/atlet" variant="primary" size="sm" icon={<ArrowLeft className="w-4 h-4" />}>
              Kembali ke Daftar Atlet
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F5] py-12 sm:py-16">
      <SEO
        title={`${atlet.nama} - Profil Atlet`}
        description={`Profil dan prestasi atlet lari trail ${atlet.nama} binaan ALTI Kabupaten Cianjur, kategori ${atlet.kategori}.`}
        image={atlet.foto}
      />

      <Container>
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/atlet"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-[#D90429] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Atlet</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Profil Card */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 sm:p-8 text-center flex flex-col items-center">
              <Avatar
                src={atlet.foto}
                name={atlet.nama}
                size="xl"
                rounded="2xl"
                className="w-32 h-32 sm:w-40 sm:h-40 mb-4 shadow-sm border-4 border-white"
              />

              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#FFF1F2] text-[#D90429] border border-[#D90429]/20 mb-2">
                {atlet.kategori}
              </span>

              <h1 className="text-2xl font-extrabold text-gray-900 leading-snug">
                {atlet.nama}
              </h1>

              <p className="text-sm text-gray-500 mt-1">{atlet.klub}</p>

              {/* Biodata Key-Value Table */}
              <div className="w-full mt-6 pt-6 border-t border-gray-100 text-left space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Nomor / Kategori</span>
                  <span className="font-semibold text-gray-900">{atlet.kategori}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Jenis Kelamin</span>
                  <span className="font-semibold text-gray-900">{atlet.jenis_kelamin}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Kelompok Usia</span>
                  <span className="font-semibold text-gray-900">{atlet.kelompok_usia}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Klub / Afiliasi</span>
                  <span className="font-semibold text-gray-900">{atlet.klub}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-500 font-medium">Status Binaan</span>
                  <span className="font-semibold text-[#D90429]">Pelatcab ALTI Cianjur</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Bio & Prestasi */}
          <div className="lg:col-span-7 space-y-6">
            {/* Bio Card */}
            <Card className="p-6 sm:p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <User className="w-5 h-5 text-[#D90429]" />
                <span>Biografi & Karakteristik Atlet</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                {atlet.bio ||
                  'Atlet binaan berdedikasi tinggi yang aktif mengikuti program pemusatan latihan lari trail Kabupaten Cianjur.'}
              </p>
            </Card>

            {/* Rekam Prestasi Card */}
            <Card className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#D90429]" />
                  <span>Daftar Prestasi & Medali</span>
                </h2>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-gray-100 text-gray-700">
                  {prestasiAtlet.length} Prestasi
                </span>
              </div>

              {prestasiAtlet.length === 0 ? (
                <div className="text-center py-8 text-gray-500 text-xs">
                  Belum ada catatan medali resmi di database untuk atlet ini.
                </div>
              ) : (
                <div className="space-y-3">
                  {prestasiAtlet.map((p) => (
                    <div
                      key={p.id}
                      className="p-4 rounded-xl border border-gray-100 bg-[#FAF7F5] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-gray-500">
                            Tahun {p.tahun} · Tingkat {p.tingkat}
                          </span>
                        </div>
                        <h4 className="font-bold text-gray-900 text-sm">
                          {p.kejuaraan}
                        </h4>
                      </div>
                      <MedalBadge medali={p.medali} className="self-start sm:self-center" />
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};
