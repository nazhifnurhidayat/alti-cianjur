import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, Share2, MessageCircle } from 'lucide-react';
import { Container } from '../components/common/Container';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';
import { useBerita } from '../hooks/useSheet';

export const BeritaDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: beritaList, loading } = useBerita();

  const artikel = beritaList.find((b) => b.slug === slug || b.id === slug);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <Container size="narrow">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto" />
            <div className="h-4 bg-gray-100 rounded w-1/3 mx-auto" />
            <div className="w-full h-72 bg-gray-200 rounded-2xl" />
          </div>
        </Container>
      </div>
    );
  }

  if (!artikel) {
    return (
      <div className="py-20 text-center">
        <Container size="narrow">
          <div className="p-8 bg-white rounded-2xl border border-gray-100 space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Artikel Tidak Ditemukan</h2>
            <p className="text-sm text-gray-500">
              Artikel yang Anda tuju mungkin telah dipindahkan atau belum dipublikasikan.
            </p>
            <Button to="/berita" variant="primary" size="sm" icon={<ArrowLeft className="w-4 h-4" />}>
              Kembali ke Daftar Berita
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  // Format tanggal Indonesia
  const formattedDate = new Date(artikel.tanggal).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Teks share WhatsApp
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const waShareText = encodeURIComponent(
    `*${artikel.judul}*\n\n${artikel.ringkasan}\n\nBaca selengkapnya di website resmi ALTI Cianjur: ${shareUrl}`
  );
  const waShareUrl = `https://api.whatsapp.com/send?text=${waShareText}`;

  // Artikel terkait
  const relatedArticles = beritaList
    .filter((b) => b.id !== artikel.id && b.kategori === artikel.kategori)
    .slice(0, 2);

  return (
    <article className="bg-white py-12 sm:py-16">
      <SEO
        title={artikel.judul}
        description={artikel.ringkasan}
        image={artikel.gambar}
        type="article"
        publishedTime={artikel.tanggal}
        articleSection={artikel.kategori}
      />

      <Container size="narrow">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/berita"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-[#D90429] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Semua Berita</span>
          </Link>
        </div>

        {/* Header Metadata */}
        <header className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-2.5 py-1 rounded-md bg-[#FFF1F2] text-[#D90429] font-bold text-xs border border-[#D90429]/20">
              {artikel.kategori}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <time dateTime={artikel.tanggal}>{formattedDate}</time>
            </span>
          </div>

          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight"
            style={{ textWrap: 'balance' }}
          >
            {artikel.judul}
          </h1>

          <p className="text-base text-gray-600 leading-relaxed font-medium">
            {artikel.ringkasan}
          </p>
        </header>

        {/* Featured Image */}
        <div className="relative rounded-2xl overflow-hidden aspect-[16/9] shadow-md mb-8 bg-gray-100">
          <ImageWithFallback
            src={artikel.gambar}
            alt={artikel.judul}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Body (Preserving paragraphs and new lines) */}
        <div className="text-gray-800 leading-relaxed space-y-5 text-sm sm:text-base font-normal pb-8 border-b border-gray-100">
          {artikel.isi.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="whitespace-pre-line leading-relaxed">
              {paragraph.trim()}
            </p>
          ))}
        </div>

        {/* WhatsApp Share Button */}
        <div className="pt-6 pb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
            <Share2 className="w-4 h-4 text-[#D90429]" />
            <span>Bagikan Berita Ini:</span>
          </div>

          <a
            href={waShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition-colors shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Bagikan ke WhatsApp</span>
          </a>
        </div>

        {/* Related News */}
        {relatedArticles.length > 0 && (
          <div className="pt-10">
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              Berita Terkait Lainnya
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/berita/${rel.slug}`}
                  className="group block p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-xs transition-all bg-[#FAF7F5]"
                >
                  <span className="text-[11px] text-[#D90429] font-bold block mb-1">
                    {rel.kategori}
                  </span>
                  <h4 className="font-bold text-gray-900 text-sm group-hover:text-[#D90429] transition-colors line-clamp-2 mb-2">
                    {rel.judul}
                  </h4>
                  <span className="text-[11px] text-gray-500">
                    {new Date(rel.tanggal).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </article>
  );
};
