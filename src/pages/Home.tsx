import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, Users, Shield, Calendar, Award, ChevronRight, Compass, Sparkles, MapPin, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { SectionTitle } from '../components/common/SectionTitle';
import { MedalBadge } from '../components/common/Badge';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { SEO } from '../components/common/SEO';
import {
  useOrganisasi,
  useStatistik,
  usePrestasi,
  useGaleri,
  useAtlet,
  usePelatih,
  usePengurus,
} from '../hooks/useSheet';
import { SITE_CONFIG } from '../config';

// Komponen angka statistik dengan animasi hitung
const AnimatedCounter: React.FC<{ value: string | number; suffix?: string }> = ({ value, suffix = '' }) => {
  const numValue = typeof value === 'number' ? value : parseInt(value, 10);
  const isNumeric = !isNaN(numValue) && numValue < 1900; // Bukan tahun seperti 2021
  const [displayValue, setDisplayValue] = useState(isNumeric ? 0 : value);

  useEffect(() => {
    if (!isNumeric) {
      setDisplayValue(value);
      return;
    }

    let start = 0;
    const end = numValue;
    const duration = 1200;
    const stepTime = Math.max(Math.floor(duration / end), 20);

    const timer = setInterval(() => {
      start += Math.ceil(end / 40);
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, isNumeric, numValue]);

  return (
    <span className="font-stats font-bold text-3xl sm:text-4xl text-gray-900 tracking-tight">
      {displayValue}
      {suffix}
    </span>
  );
};

export const Home: React.FC = () => {
  const { data: org, reload: reloadOrg, loading: loadingOrg } = useOrganisasi();
  const { data: stats, reload: reloadStats, loading: loadingStats } = useStatistik();
  const { data: allPrestasi, reload: reloadPrestasi, loading: loadingPrestasi } = usePrestasi();
  const { data: allGaleri, reload: reloadGaleri, loading: loadingGaleri } = useGaleri();
  const { data: allAtlet, reload: reloadAtlet, loading: loadingAtlet } = useAtlet();
  const { data: allPelatih, reload: reloadPelatih, loading: loadingPelatih } = usePelatih();
  const { data: allPengurus, reload: reloadPengurus, loading: loadingPengurus } = usePengurus();

  const isRefreshing =
    loadingOrg ||
    loadingStats ||
    loadingPrestasi ||
    loadingGaleri ||
    loadingAtlet ||
    loadingPelatih ||
    loadingPengurus;

  const handleRefreshAll = async () => {
    await Promise.all([
      reloadOrg(),
      reloadStats(),
      reloadPrestasi(),
      reloadGaleri(),
      reloadAtlet(),
      reloadPelatih(),
      reloadPengurus(),
    ]);
  };

  // 3 prestasi terbaru
  const latestPrestasi = allPrestasi.slice(0, 3);
  // 6 preview galeri
  const previewGaleri = allGaleri.slice(0, 6);

  // Hitung jumlah riil realtime dari database Google Spreadsheet
  const countAtlet = allAtlet.length;
  const countPelatih = allPelatih.length;
  const countPengurus = allPengurus.length;
  const countPrestasi = allPrestasi.length;

  const dynamicStats = [
    {
      label: 'Atlet Binaan',
      nilai: countAtlet > 0 ? countAtlet : (stats[0]?.nilai || 0),
      satuan: 'Pelari',
      icon: <Users className="w-5 h-5 text-[#D90429]" />,
    },
    {
      label: 'Pelatih Berlisensi',
      nilai: countPelatih > 0 ? countPelatih : (stats[1]?.nilai || 0),
      satuan: 'Pelatih',
      icon: <Award className="w-5 h-5 text-[#D90429]" />,
    },
    {
      label: 'Pengurus Cabang',
      nilai: countPengurus > 0 ? countPengurus : (stats[2]?.nilai || 0),
      satuan: 'Personel',
      icon: <Shield className="w-5 h-5 text-[#D90429]" />,
    },
    {
      label: 'Total Medali Resmi',
      nilai: countPrestasi > 0 ? countPrestasi : (stats[3]?.nilai || 0),
      satuan: 'Medali',
      icon: <Trophy className="w-5 h-5 text-[#D90429]" />,
    },
    {
      label: 'Tahun Berdiri',
      nilai: org.tahun_berdiri || '2021',
      satuan: 'Sejak',
      icon: <Calendar className="w-5 h-5 text-[#D90429]" />,
    },
  ];

  return (
    <div className="bg-white">
      <SEO
        title="Beranda"
        description={`${org.nama} - ${org.tagline}. Wadah resmi pembinaan atlet lari trail Kabupaten Cianjur.`}
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF1F2]/60 via-white to-white pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-gray-100">
        <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-[#D90429]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 -z-10 w-80 h-80 bg-[#F4B942]/10 rounded-full blur-3xl pointer-events-none" />

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Regional Authority Kicker */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[#D90429]/20 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#D90429]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#D90429]">
                  KONI & Pengda ALTI Jawa Barat
                </span>
              </div>

              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-[1.15]"
                style={{ textWrap: 'balance' }}
              >
                Asosiasi Lari Trail Indonesia <br />
                <span className="text-[#D90429]">Kabupaten Cianjur</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
                {org.tagline}. Membina ketangguhan fisik dan mental pelari lintas alam di jalur megah
                Gunung Gede Pangrango menuju panggung juara nasional dan dunia.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  to="/profil"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Kenali Kami
                </Button>
                <Button
                  to="/atlet"
                  variant="outline"
                  size="lg"
                  icon={<Users className="w-4 h-4" />}
                >
                  Lihat Atlet
                </Button>
              </div>

              {/* Trust markers & Realtime Sync Indicator */}
              <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-y-2 gap-x-6 text-xs text-gray-500 font-medium">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <span className="flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-[#D90429]" /> Basis Elevasi Gn. Gede Pangrango
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#F4B942]" /> Binaan Resmi KONI Cianjur
                  </span>
                </div>

                <button
                  onClick={handleRefreshAll}
                  disabled={isRefreshing}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:border-[#D90429] text-gray-700 hover:text-[#D90429] shadow-2xs transition-colors"
                  title="Perbarui data langsung dari Google Sheets"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#D90429]' : ''}`} />
                  <span className="font-medium text-[11px]">
                    {isRefreshing ? 'Memperbarui...' : 'Sinkronkan Data'}
                  </span>
                </button>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] group">
                <ImageWithFallback
                  src={org.hero_image_url || SITE_CONFIG.heroImage}
                  alt="Atlet ALTI Cianjur di Lintasan Trail"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-[#D90429] mb-1">
                    Gede Pangrango Trail
                  </span>
                  <p className="text-sm font-medium leading-snug line-clamp-2">
                    Laboratorium alamiah terbaik pembinaan atlet lari pegunungan di Tatar Santri.
                  </p>
                </div>
              </div>
              {/* Accent decorative badge - Dinamis dari prestasi riil terbaru */}
              {latestPrestasi.length > 0 && (
                <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg border border-gray-100 p-4 items-center gap-3 z-10 max-w-xs">
                  <div className="w-10 h-10 rounded-lg bg-[#FFF1F2] text-[#D90429] flex items-center justify-center font-bold shrink-0">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] text-gray-500 font-medium truncate">
                      Prestasi {latestPrestasi[0].tingkat} ({latestPrestasi[0].tahun})
                    </div>
                    <div className="text-xs font-bold text-gray-900 truncate">
                      {latestPrestasi[0].medali} · {latestPrestasi[0].kejuaraan}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* 2. STATISTIK DENGAN ANIMATED COUNTER */}
      <section className="py-12 bg-[#FAF7F5] border-b border-gray-100">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {dynamicStats.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs hover:border-[#D90429]/20 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs uppercase font-semibold text-gray-500 tracking-wider">
                    {item.label}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#FFF1F2] flex items-center justify-center">
                    {item.icon}
                  </div>
                </div>
                <div>
                  <AnimatedCounter value={item.nilai} />
                  <div className="text-xs text-gray-500 mt-0.5 font-medium">{item.satuan}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. SEKILAS PROFIL */}
      <section className="py-16 sm:py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
                <ImageWithFallback
                  src={SITE_CONFIG.athletesImage}
                  alt="Pelari Lari Trail Cianjur"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                  Sesi latihan rutin pemusatan latihan atlet ALTI Cianjur di kawasan hutan pinus.
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
              <SectionTitle
                align="left"
                kicker="Tentang Organisasi"
                title="Menempa Daya Tahan dan Karakter Juara di Alam Bebas"
              />
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {org.sejarah}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#FAF7F5] border border-gray-100">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Visi Kami</h4>
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {org.visi}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF7F5] border border-gray-100">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Sport Tourism & Konservasi</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Menjunjung prinsip lari ramah lingkungan "Leave No Trace" dan menggerakkan ekonomi wisata lokal.
                  </p>
                </div>
              </div>
              <div className="pt-2">
                <Button to="/profil" variant="outline" size="md" icon={<ChevronRight className="w-4 h-4" />} iconPosition="right">
                  Pelajari Profil Lengkap & Struktur
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. PRESTASI TERBARU (3 KARTU) */}
      <section className="py-16 sm:py-20 bg-[#FAF7F5] border-y border-gray-100">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 font-medium text-xs tracking-wider uppercase text-[#D90429]">
                <span className="w-5 h-[2px] bg-[#D90429]" />
                <span>Pencapaian Terbaik</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Prestasi Kejuaraan Terkini
              </h2>
            </div>
            <Button to="/prestasi" variant="ghost" size="sm" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
              Lihat Semua Prestasi
            </Button>
          </div>

          {latestPrestasi.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-sm text-gray-500">
              Belum ada data prestasi yang dimasukkan di Google Spreadsheet.
            </div>
          ) : (
            <div className={`grid grid-cols-1 ${latestPrestasi.length === 1 ? 'max-w-md' : latestPrestasi.length === 2 ? 'md:grid-cols-2 max-w-3xl' : 'md:grid-cols-3'} gap-6`}>
              {latestPrestasi.map((item) => (
                <Card key={item.id} className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Tahun {item.tahun} · {item.tingkat}
                      </span>
                      <MedalBadge medali={item.medali} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 leading-snug mb-2">
                      {item.kejuaraan}
                    </h3>
                  </div>
                  <div className="pt-4 border-t border-gray-100 mt-4 flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      Atlet: <span className="font-semibold text-gray-900">{item.nama_atlet}</span>
                    </div>
                    {item.atlet_id ? (
                      <Link
                        to={`/atlet/${item.atlet_id}`}
                        className="text-xs text-[#D90429] font-medium hover:underline inline-flex items-center gap-1"
                      >
                        Profil <ChevronRight className="w-3 h-3" />
                      </Link>
                    ) : null}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* 5. PREVIEW GALERI (GRID FOTO) */}
      <section className="py-16 sm:py-20 bg-white border-t border-gray-100">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 font-medium text-xs tracking-wider uppercase text-[#D90429]">
                <span className="w-5 h-[2px] bg-[#D90429]" />
                <span>Dokumentasi</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Aktivitas di Lintasan
              </h2>
            </div>
            <Button to="/galeri" variant="ghost" size="sm" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
              Buka Semua Galeri
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {previewGaleri.map((photo) => (
              <Link
                key={photo.id}
                to="/galeri"
                className="group relative rounded-xl overflow-hidden aspect-square bg-gray-100 shadow-2xs block"
              >
                <ImageWithFallback
                  src={photo.gambar}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                  <span className="text-[11px] text-white font-medium line-clamp-2">
                    {photo.caption}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 7. CTA BERGABUNG / HUBUNGI KAMI */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#D90429] to-[#8D0801] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-topo-pattern pointer-events-none" />
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
            <span className="inline-block px-3 py-1 rounded-md bg-white/20 text-white text-xs font-semibold tracking-wider uppercase">
              Mari Berkolaborasi
            </span>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Dukung Pembinaan Atlet dan Kemajuan Lari Trail Kabupaten Cianjur
            </h2>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed">
              Buka peluang kemitraan, registrasi atlet muda, kerjasama sponsor kejuaraan, atau eksplorasi
              rute sport tourism bersama ALTI Kabupaten Cianjur.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button
                to="/kontak"
                variant="white"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Hubungi Sekretariat
              </Button>
              <Button
                href={`https://wa.me/${org.whatsapp}?text=Halo%20ALTI%20Cianjur,%20saya%20ingin%20mendapatkan%20informasi%20mengenai%20pembinaan%20atlet%20lari%20trail.`}
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Chat WhatsApp
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
