import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  Send,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';
import { useOrganisasi } from '../hooks/useSheet';

export const Kontak: React.FC = () => {
  const { data: org } = useOrganisasi();

  const [nama, setNama] = useState('');
  const [keperluan, setKeperluan] = useState('Informasi Atlet Binaan');
  const [pesan, setPesan] = useState('');
  const [preferensiKirim, setPreferensiKirim] = useState<'wa' | 'email'>('wa');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !pesan.trim()) return;

    if (preferensiKirim === 'wa') {
      const waText = encodeURIComponent(
        `Halo Sekretariat ALTI Kabupaten Cianjur,\n\nNama: ${nama}\nKeperluan: ${keperluan}\n\nPesan:\n${pesan}`
      );
      window.open(`https://wa.me/${org.whatsapp}?text=${waText}`, '_blank');
    } else {
      const mailSubject = encodeURIComponent(`[Website ALTI Cianjur] ${keperluan} - ${nama}`);
      const mailBody = encodeURIComponent(
        `Nama Pengirim: ${nama}\nKeperluan: ${keperluan}\n\nPesan:\n${pesan}\n\n---\nDikirim melalui Formulir Website Resmi ALTI Cianjur`
      );
      window.location.href = `mailto:${org.email}?subject=${mailSubject}&body=${mailBody}`;
    }
  };

  return (
    <div className="bg-white py-12 sm:py-16">
      <SEO
        title="Kontak & Sekretariat"
        description="Hubungi Sekretariat Asosiasi Lari Trail Indonesia (ALTI) Pengcab Kabupaten Cianjur. Alamat kantor, WhatsApp, email, dan peta lokasi."
      />

      <Container>
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-gray-100 max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-[#D90429]">
            <MapPin className="w-4 h-4" />
            <span>Layanan Informasi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Hubungi Sekretariat ALTI Cianjur
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Pintu komunikasi resmi bagi atlet, orang tua, penggiat komunitas, calon mitra sponsor,
            maupun instansi pemerintahan terkait kegiatan lari trail.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contacts & Hours */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 sm:p-8 space-y-6">
              <h2 className="text-lg font-bold text-gray-900 pb-3 border-b border-gray-100">
                Informasi Kantor Sekretariat
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#FFF1F2] text-[#D90429] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-gray-500 uppercase">Alamat Kantor</span>
                    <p className="text-gray-800 leading-relaxed font-medium mt-0.5">
                      {org.alamat}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#FFF1F2] text-[#D90429] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-gray-500 uppercase">Telepon Kantor</span>
                    <a href={`tel:${org.telepon}`} className="text-gray-800 font-semibold hover:text-[#D90429] transition-colors mt-0.5 block">
                      {org.telepon}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#FFF1F2] text-[#D90429] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-gray-500 uppercase">Email Resmi</span>
                    <a href={`mailto:${org.email}`} className="text-gray-800 font-semibold hover:text-[#D90429] transition-colors mt-0.5 block">
                      {org.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#FFF1F2] text-[#D90429] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-gray-500 uppercase">Jam Layanan</span>
                    <p className="text-gray-800 font-medium leading-relaxed mt-0.5">
                      {org.jam_layanan}
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick CTA */}
              <div className="pt-4 border-t border-gray-100">
                <a
                  href={`https://wa.me/${org.whatsapp}?text=Halo%20ALTI%20Cianjur,%20saya%20ingin%20bertanya%20seputar%20informasi%20organisasi.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-xs"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat Langsung via WhatsApp</span>
                </a>
              </div>

              {/* Social Media Links */}
              <div className="pt-2">
                <span className="block text-xs font-bold text-gray-500 uppercase mb-3">Media Sosial Resmi</span>
                <div className="flex items-center gap-2">
                  {org.instagram && (
                    <a
                      href={org.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-medium flex items-center gap-1.5 transition-colors border border-gray-100"
                    >
                      <Instagram className="w-4 h-4 text-pink-600" />
                      <span>Instagram</span>
                    </a>
                  )}
                  {org.facebook && (
                    <a
                      href={org.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-medium flex items-center gap-1.5 transition-colors border border-gray-100"
                    >
                      <Facebook className="w-4 h-4 text-blue-600" />
                      <span>Facebook</span>
                    </a>
                  )}
                  {org.youtube && (
                    <a
                      href={org.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-medium flex items-center gap-1.5 transition-colors border border-gray-100"
                    >
                      <Youtube className="w-4 h-4 text-red-600" />
                      <span>YouTube</span>
                    </a>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Interactive Form & Google Maps */}
          <div className="lg:col-span-7 space-y-6">
            {/* Contact Form */}
            <Card className="p-6 sm:p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Kirim Pesan / Pertanyaan
              </h2>
              <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                Formulir ini menghubungkan Anda langsung ke WhatsApp resmi atau aplikasi email Anda tanpa perlu registrasi akun.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Nama Lengkap <span className="text-[#D90429]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Contoh: Budi Gunawan"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#D90429] focus:ring-1 focus:ring-[#D90429]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Kategori Keperluan
                  </label>
                  <select
                    value={keperluan}
                    onChange={(e) => setKeperluan(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#D90429]"
                  >
                    <option value="Informasi Atlet Binaan">Pendaftaran / Informasi Atlet Binaan</option>
                    <option value="Kemitraan & Sponsor">Kerjasama Sponsor & Mitra Usaha</option>
                    <option value="Undangan Kejuaraan">Undangan Event / Kejuaraan Lari</option>
                    <option value="Sport Tourism & Jalur Trail">Eksplorasi Jalur Trail & Wisata Olahraga</option>
                    <option value="Lainnya">Keperluan Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Kirim Melalui
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPreferensiKirim('wa')}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                        preferensiKirim === 'wa'
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                          : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                      <span>WhatsApp Langsung</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreferensiKirim('email')}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                        preferensiKirim === 'email'
                          ? 'bg-[#FFF1F2] border-[#D90429] text-[#D90429]'
                          : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Mail className="w-4 h-4 text-[#D90429]" />
                      <span>Email Resmi</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Isi Pesan <span className="text-[#D90429]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={pesan}
                    onChange={(e) => setPesan(e.target.value)}
                    placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#D90429] focus:ring-1 focus:ring-[#D90429]"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full justify-center"
                    icon={<Send className="w-4 h-4" />}
                  >
                    {preferensiKirim === 'wa' ? 'Kirim ke WhatsApp' : 'Kirim via Email'}
                  </Button>
                </div>
              </form>
            </Card>

            {/* Google Maps Embed */}
            <Card className="overflow-hidden p-0 border border-gray-100 shadow-sm">
              <div className="p-4 bg-[#FAF7F5] border-b border-gray-100 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#D90429]" />
                  Lokasi Stadion Badak Putih Cianjur
                </span>
                <a
                  href="https://maps.google.com/?q=Stadion+Badak+Putih+Cianjur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#D90429] hover:underline font-semibold inline-flex items-center gap-1"
                >
                  <span>Buka di Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="w-full h-64 sm:h-80 bg-gray-100">
                <iframe
                  title="Peta Lokasi ALTI Cianjur"
                  src={org.maps_embed_url}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};
