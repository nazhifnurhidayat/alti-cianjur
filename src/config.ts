/**
 * Konfigurasi Sumber Data Google Sheets & Website ALTI Kabupaten Cianjur.
 *
 * Pengurus/Admin dapat mem-publish Spreadsheet ke web (File > Share > Publish to Web > Format CSV).
 * Masukkan ID Publish (berawalan 2PACX-...) pada VITE_SHEET_ID di .env atau ganti DEFAULT_SHEET_ID di bawah.
 */

// ID publish Google Sheets resmi ALTI Cianjur
export const DEFAULT_SHEET_ID = "2PACX-1vSNl2THi1IDxf0aIbsA93lBPdpyWvTdhujf-r-Q2WPiOfgkYCAfelyHEVfEmZNzzWEDR-7r8TCVnevO";

// Prioritaskan Environment Variable VITE_SHEET_ID jika ada
export const SHEET_ID = import.meta.env.VITE_SHEET_ID || DEFAULT_SHEET_ID;

// GID tab lembar kerja Google Spreadsheet yang sudah dipublikasikan
export const SHEET_GIDS: Record<string, string> = {
  organisasi: "0",
  statistik: "1027513424",
  pengurus: "869038673",
  pelatih: "363465601",
  atlet: "587133266",
  prestasi: "1155691939",
  berita: "1259907308",
  galeri: "316092051",
};

export const SITE_CONFIG = {
  name: "ALTI Kabupaten Cianjur",
  fullName: "Asosiasi Lari Trail Indonesia Pengurus Cabang Kabupaten Cianjur",
  shortName: "ALTI Cianjur",
  tagline: "Menembus Rimba, Mengukir Prestasi di Tatar Santri",
  heroImage: "/src/assets/images/hero_trail_cianjur_1791945906275.jpg",
  athletesImage: "/src/assets/images/profile_trail_runners_1791945906579.jpg",
  podiumImage: "/src/assets/images/race_podium_championship_1791945908814.jpg",
  scenicImage: "/src/assets/images/scenic_cianjur_trail_1791945907741.jpg",
  email: "sekretariat@alticianjur.org",
  whatsapp: "6281223456789",
  phone: "+62 263 228914",
  address: "Kompleks Stadion Badak Putih, Jl. Slamet Riyadi No. 12, Pamoyanan, Cianjur, Jawa Barat 43211",
  hours: "Senin - Jumat: 08.00 - 16.00 WIB | Sabtu: 08.00 - 13.00 WIB",
  colors: {
    primary: "#D90429",
    darkRed: "#8D0801",
    gold: "#F4B942",
    offWhite: "#FAF7F5",
    textDark: "#1F2937",
  },
};
