import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/layout/Layout';

// Code-splitting via React.lazy untuk performa Lighthouse optimal
const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const Profil = lazy(() => import('./pages/Profil').then((m) => ({ default: m.Profil })));
const Pengurus = lazy(() => import('./pages/Pengurus').then((m) => ({ default: m.Pengurus })));
const Pelatih = lazy(() => import('./pages/Pelatih').then((m) => ({ default: m.Pelatih })));
const Atlet = lazy(() => import('./pages/Atlet').then((m) => ({ default: m.Atlet })));
const AtletDetail = lazy(() => import('./pages/AtletDetail').then((m) => ({ default: m.AtletDetail })));
const Prestasi = lazy(() => import('./pages/Prestasi').then((m) => ({ default: m.Prestasi })));
const Galeri = lazy(() => import('./pages/Galeri').then((m) => ({ default: m.Galeri })));
const Kontak = lazy(() => import('./pages/Kontak').then((m) => ({ default: m.Kontak })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

// Loading spinner fallback bertema merah putih
const PageLoader: React.FC = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
    <div className="w-10 h-10 border-4 border-[#FFF1F2] border-t-[#D90429] rounded-full animate-spin" />
    <span className="mt-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">
      Memuat Halaman...
    </span>
  </div>
);

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="profil" element={<Profil />} />
              <Route path="pengurus" element={<Pengurus />} />
              <Route path="pelatih" element={<Pelatih />} />
              <Route path="atlet" element={<Atlet />} />
              <Route path="atlet/:id" element={<AtletDetail />} />
              <Route path="prestasi" element={<Prestasi />} />
              <Route path="galeri" element={<Galeri />} />
              <Route path="kontak" element={<Kontak />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
}
