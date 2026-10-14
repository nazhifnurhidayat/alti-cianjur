import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tutup mobile menu saat pindah rute
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: 'Beranda', to: '/' },
    { label: 'Profil', to: '/profil' },
    { label: 'Pengurus', to: '/pengurus' },
    { label: 'Pelatih', to: '/pelatih' },
    { label: 'Atlet', to: '/atlet' },
    { label: 'Prestasi', to: '/prestasi' },
    { label: 'Galeri', to: '/galeri' },
    { label: 'Kontak', to: '/kontak' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-gray-100 py-3'
          : 'bg-white/90 backdrop-blur-xs py-4 border-b border-gray-100/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Wordmark & Emblem */}
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] rounded-lg"
            aria-label="Beranda ALTI Kabupaten Cianjur"
          >
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-gray-600">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 relative ${
                    isActive
                      ? 'text-[#D90429] font-semibold bg-[#FFF1F2]'
                      : 'hover:text-[#D90429] hover:bg-gray-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Primary Action Button & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              to="/atlet"
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Lihat Atlet
            </Button>

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-[#D90429] hover:bg-gray-100 rounded-xl transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none"
              aria-label={mobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 shadow-xl px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-[#FFF1F2] text-[#D90429] font-bold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                <span>{item.label}</span>
                {location.pathname === item.to && (
                  <span className="w-2 h-2 rounded-full bg-[#D90429]" />
                )}
              </NavLink>
            ))}
            <div className="pt-4 border-t border-gray-100 mt-2">
              <Button to="/kontak" variant="outline" className="w-full justify-center">
                Hubungi Sekretariat
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
