import React from 'react';
import { Compass, Home, ArrowLeft } from 'lucide-react';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';

export const NotFound: React.FC = () => {
  return (
    <div className="bg-[#FAF7F5] min-h-[75vh] flex items-center justify-center py-16 px-4">
      <SEO
        title="404 - Halaman Tidak Ditemukan"
        description="Halaman yang Anda tuju tidak ditemukan pada website resmi ALTI Kabupaten Cianjur."
      />

      <Container size="narrow">
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border-2 border-red-100 shadow-sm max-w-lg mx-auto relative overflow-hidden">
          <div className="w-20 h-20 bg-[#FFF1F2] text-[#D90429] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xs">
            <Compass className="w-10 h-10 animate-spin-slow" />
          </div>

          <span className="font-stats font-extrabold text-5xl sm:text-6xl text-[#D90429] tracking-tight block mb-2">
            404
          </span>

          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Jalur Tidak Ditemukan
          </h1>

          <p className="text-sm text-gray-600 mb-8 leading-relaxed max-w-sm mx-auto">
            Tampaknya Anda tersesat di luar rute lintasan trail. Halaman yang Anda cari mungkin sudah dipindahkan
            atau tautan tidak valid.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button to="/" variant="primary" size="md" icon={<Home className="w-4 h-4" />}>
              Kembali ke Beranda
            </Button>
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              size="md"
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              Halaman Sebelumnya
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
