import React from 'react';
import { Target, Flag, Compass, MapPin, Building, Award, ShieldCheck, HeartHandshake } from 'lucide-react';
import { Container } from '../components/common/Container';
import { SectionTitle } from '../components/common/SectionTitle';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { SEO } from '../components/common/SEO';
import { useOrganisasi } from '../hooks/useSheet';
import { SITE_CONFIG } from '../config';

export const Profil: React.FC = () => {
  const { data: org } = useOrganisasi();

  return (
    <div className="bg-white py-12 sm:py-16">
      <SEO
        title="Profil Organisasi"
        description="Profil, sejarah, visi, misi, dan tujuan resmi Asosiasi Lari Trail Indonesia (ALTI) Pengurus Cabang Kabupaten Cianjur."
      />

      {/* Header Banner */}
      <section className="border-b border-gray-100 pb-12 mb-12 bg-gradient-to-b from-[#FAF7F5] to-white">
        <Container>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-[#D90429]">
              <span className="w-5 h-[2px] bg-[#D90429]" />
              <span>Profil Lembaga</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Tentang ALTI Kabupaten Cianjur
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
              Mewadahi pembinaan atlet, komunitas penggiat lari lintas alam, serta memadukan potensi bentang alam
              pegunungan Cianjur dengan sport tourism berkelanjutan.
            </p>
          </div>
        </Container>
      </section>

      {/* Sejarah & Latar Belakang */}
      <section className="mb-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D90429]">
                <Compass className="w-4 h-4" />
                <span>Sejarah & Habitat Alami</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
                Lahir dari Kekuatan Bentang Alam Tatar Santri
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {org.sejarah}
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs text-gray-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#D90429]" />
                  Berdiri Sejak Tahun {org.tahun_berdiri}
                </span>
                <span className="flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-[#D90429]" />
                  Anggota Resmi KONI Cianjur
                </span>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[16/10]">
                <ImageWithFallback
                  src={SITE_CONFIG.scenicImage}
                  alt="Lanskap Jalur Trail Cianjur"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                  Panorama jalur pegunungan dan kebun teh Cianjur — sarana latihan alami atlet lari trail.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Visi & Misi */}
      <section className="py-16 bg-[#FAF7F5] border-y border-gray-100 mb-16">
        <Container>
          <SectionTitle
            kicker="Arah Kebijakan"
            title="Visi & Misi Organisasi"
            subtitle="Landasan filosofis dan rencana aksi ALTI Cianjur dalam memajukan olahraga lari trail."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Visi Card */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-[#FFF1F2] text-[#D90429] flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Visi</h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                "{org.visi}"
              </p>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#D90429] uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  <span>Tujuan Pokok</span>
                </div>
                <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                  {org.tujuan}
                </p>
              </div>
            </div>

            {/* Misi List */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#FFF1F2] text-[#D90429] flex items-center justify-center mb-6">
                <Flag className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Misi Strategis</h3>
              <ul className="space-y-4">
                {org.misi.map((m, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="w-6 h-6 rounded-full bg-[#FFF1F2] text-[#D90429] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Nilai Utama & Etika Lari Trail */}
      <section className="mb-16">
        <Container>
          <SectionTitle
            kicker="Etika Olahraga"
            title="Prinsip Utama Atlet ALTI Cianjur"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D90429] flex items-center justify-center mb-4 font-bold">
                01
              </div>
              <h4 className="font-bold text-gray-900 text-base mb-2">Konservasi & Alam</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Setiap atlet diwajibkan menjaga kelestarian jalur pegunungan, tidak membuang sampah sembarangan (Leave No Trace), dan menghargai keanekaragaman hayati.
              </p>
            </Card>

            <Card className="p-6">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D90429] flex items-center justify-center mb-4 font-bold">
                02
              </div>
              <h4 className="font-bold text-gray-900 text-base mb-2">Sportivitas & Solidaritas</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Saling tolong-menolong sesama pelari di lintasan terjal yang penuh risiko. Keselamatan dan persaudaraan di atas catatan waktu lomba.
              </p>
            </Card>

            <Card className="p-6">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D90429] flex items-center justify-center mb-4 font-bold">
                03
              </div>
              <h4 className="font-bold text-gray-900 text-base mb-2">Disiplin & Ketahanan Mental</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Berlatih konsisten di segala kondisi cuaca, menantang elevasi ekstrem dengan resiliensi dan sportivitas tinggi mengharumkan nama Cianjur.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Sekretariat Info & CTA */}
      <section className="pt-8">
        <Container>
          <div className="bg-[#FAF7F5] rounded-2xl p-6 sm:p-10 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#D90429] uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Sekretariat Resmi</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Kunjungi Kantor Sekretariat ALTI Cianjur
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 max-w-xl">
                {org.alamat}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Button to="/pengurus" variant="outline" size="sm">
                Lihat Susunan Pengurus
              </Button>
              <Button to="/kontak" variant="primary" size="sm">
                Hubungi Kami
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
