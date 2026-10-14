import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, ExternalLink } from 'lucide-react';
import { Logo } from '../common/Logo';
import { useOrganisasi } from '../../hooks/useSheet';

export const Footer: React.FC = () => {
  const { data: org } = useOrganisasi();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#8D0801] text-white pt-16 pb-10 border-t-4 border-[#D90429] relative overflow-hidden">
      {/* Subtle topographic background accent */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-topo-pattern" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-white/15">
          {/* Column 1: Organization Identity */}
          <div className="space-y-4">
            <Logo size="lg" whiteText={true} />
            <p className="text-white/80 text-sm leading-relaxed pt-2">
              Wadah resmi pembinaan olahraga lari lintas alam (trail running) Kabupaten Cianjur.
              Menempa ketangguhan atlet muda di bentang alam Gunung Gede Pangrango.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {org.instagram && (
                <a
                  href={org.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  aria-label="Instagram ALTI Cianjur"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {org.facebook && (
                <a
                  href={org.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  aria-label="Facebook ALTI Cianjur"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {org.youtube && (
                <a
                  href={org.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  aria-label="YouTube ALTI Cianjur"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Tautan Halaman */}
          <div>
            <h3 className="text-base font-bold text-white mb-4 tracking-wide font-heading">
              Jelajahi
            </h3>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <Link to="/profil" className="hover:text-white hover:underline transition-colors">
                  Profil & Visi Misi
                </Link>
              </li>
              <li>
                <Link to="/pengurus" className="hover:text-white hover:underline transition-colors">
                  Struktur Pengurus Cabang
                </Link>
              </li>
              <li>
                <Link to="/pelatih" className="hover:text-white hover:underline transition-colors">
                  Tim Pelatih Berlisensi
                </Link>
              </li>
              <li>
                <Link to="/atlet" className="hover:text-white hover:underline transition-colors">
                  Daftar Atlet Binaan
                </Link>
              </li>
              <li>
                <Link to="/prestasi" className="hover:text-white hover:underline transition-colors">
                  Rekam Jejak Prestasi
                </Link>
              </li>
              <li>
                <Link to="/galeri" className="hover:text-white hover:underline transition-colors">
                  Galeri Dokumentasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Jam Layanan & Mitra */}
          <div>
            <h3 className="text-base font-bold text-white mb-4 tracking-wide font-heading">
              Sekretariat & Mitra
            </h3>
            <div className="space-y-3 text-sm text-white/80">
              <div>
                <span className="block text-xs uppercase font-semibold text-[#F4B942]">
                  Jam Operasional
                </span>
                <span className="text-white/90">{org.jam_layanan}</span>
              </div>
              <div className="pt-2">
                <span className="block text-xs uppercase font-semibold text-[#F4B942]">
                  Afiliasi Resmi
                </span>
                <p className="text-xs text-white/70 leading-relaxed mt-1">
                  KONI Kabupaten Cianjur · Pengda ALTI Jawa Barat · Disparpora Kab. Cianjur
                </p>
              </div>
              <div className="pt-2">
                <Link
                  to="/galeri"
                  className="inline-flex items-center gap-1.5 text-xs text-white/90 hover:text-white underline font-medium"
                >
                  <span>Galeri Dokumentasi Latihan</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Column 4: Kontak Resmi */}
          <div>
            <h3 className="text-base font-bold text-white mb-4 tracking-wide font-heading">
              Hubungi Kami
            </h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#F4B942] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm leading-relaxed">{org.alamat}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#F4B942] shrink-0" />
                <a href={`tel:${org.telepon}`} className="hover:text-white transition-colors text-xs sm:text-sm">
                  {org.telepon}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#F4B942] shrink-0" />
                <a href={`mailto:${org.email}`} className="hover:text-white transition-colors text-xs sm:text-sm">
                  {org.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/70 gap-4">
          <p>© {currentYear} ALTI Kabupaten Cianjur. Hak Cipta Dilindungi Undang-Undang.</p>
          <p className="flex items-center gap-4">
            <Link to="/profil" className="hover:text-white">Tentang Organisasi</Link>
            <span aria-hidden="true">·</span>
            <Link to="/kontak" className="hover:text-white">Kontak Sekretariat</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
