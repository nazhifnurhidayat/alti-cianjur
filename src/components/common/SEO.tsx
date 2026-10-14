import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_CONFIG } from '../../config';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  articleSection?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description = 'Website resmi Asosiasi Lari Trail Indonesia (ALTI) Pengcab Kabupaten Cianjur. Informasi atlet, pelatih, pengurus, prestasi, dan kegiatan lari trail.',
  image = SITE_CONFIG.heroImage,
  type = 'website',
  publishedTime,
  articleSection,
}) => {
  const pageTitle = title
    ? `${title} | ALTI Kabupaten Cianjur`
    : 'ALTI Kabupaten Cianjur - Website Resmi Asosiasi Lari Trail';

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SportsOrganization',
    name: 'Asosiasi Lari Trail Indonesia Kabupaten Cianjur',
    alternateName: 'ALTI Cianjur',
    sport: 'Trail Running',
    description: description,
    url: currentUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kompleks Stadion Badak Putih, Jl. Slamet Riyadi No. 12, Pamoyanan',
      addressLocality: 'Cianjur',
      addressRegion: 'Jawa Barat',
      postalCode: '43211',
      addressCountry: 'ID',
    },
    telephone: '+62 263 228914',
    email: 'sekretariat@alticianjur.org',
  };

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="ALTI Kabupaten Cianjur" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {articleSection && <meta property="article:section" content={articleSection} />}

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
    </Helmet>
  );
};
