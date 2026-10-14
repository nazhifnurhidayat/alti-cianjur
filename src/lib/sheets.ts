import Papa from 'papaparse';
import { SHEET_ID, DEFAULT_SHEET_ID, SHEET_GIDS, SITE_CONFIG } from '../config';
import {
  OrganisasiData,
  StatistikItem,
  PengurusItem,
  PelatihItem,
  AtletItem,
  PrestasiItem,
  BeritaItem,
  GaleriItem,
} from '../data/types';
import {
  fallbackOrganisasi,
  fallbackStatistik,
  fallbackPengurus,
  fallbackPelatih,
  fallbackAtlet,
  fallbackPrestasi,
  fallbackBerita,
  fallbackGaleri,
} from '../data/fallback';

/**
 * Normalisasi URL gambar:
 * Mendukung link share Google Drive (berbagai format) menjadi Google Thumbnail URL yang dapat di-embed langsung.
 */
export function normalizeImageUrl(url: string | undefined | null, fallbackImg = SITE_CONFIG.scenicImage): string {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return fallbackImg;
  }

  const cleanUrl = url.trim();

  // Format Google Drive: drive.google.com/file/d/FILE_ID/view...
  const driveMatch1 = cleanUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch1 && driveMatch1[1]) {
    return `https://drive.google.com/thumbnail?id=${driveMatch1[1]}&sz=w1000`;
  }

  // Format Google Drive: drive.google.com/open?id=FILE_ID atau uc?id=FILE_ID
  const driveMatch2 = cleanUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (driveMatch2 && driveMatch2[1] && cleanUrl.includes('drive.google.com')) {
    return `https://drive.google.com/thumbnail?id=${driveMatch2[1]}&sz=w1000`;
  }

  return cleanUrl;
}

/**
 * Membuat slug URL yang aman dari teks judul
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Helper untuk parsing boolean dari string CSV
 */
function parseBool(val: any, defaultVal = true): boolean {
  if (val === undefined || val === null || val === '') return defaultVal;
  const s = String(val).trim().toUpperCase();
  if (s === 'FALSE' || s === '0' || s === 'NO' || s === 'TIDAK') return false;
  return true;
}

/**
 * Helper untuk parsing angka
 */
function parseNum(val: any, defaultVal = 0): number {
  if (val === undefined || val === null || val === '') return defaultVal;
  const n = Number(String(val).replace(/[^0-9.-]+/g, ''));
  return isNaN(n) ? defaultVal : n;
}

/**
 * URL Google Sheets Published CSV
 */
export function getPublishedCsvUrl(gid: string, cacheBuster?: number): string {
  const base = `https://docs.google.com/spreadsheets/d/e/${SHEET_ID}/pub?gid=${gid}&single=true&output=csv`;
  return cacheBuster ? `${base}&_t=${cacheBuster}` : base;
}

/**
 * Cek apakah SHEET_ID sudah diisi dengan benar oleh user
 */
export function isSheetConfigured(): boolean {
  return Boolean(
    SHEET_ID &&
    SHEET_ID !== "ISI_ID_PUBLISH_SHEET" &&
    (SHEET_ID.startsWith("2PACX-") || SHEET_ID.length > 20)
  );
}

/**
 * Mapper untuk tab 'organisasi' (Key-Value)
 */
export function mapOrganisasi(rows: Record<string, string>[]): OrganisasiData {
  const map: Record<string, string> = {};
  rows.forEach((r) => {
    const rawKey = (r.key || r.Key || r.KEY || '').trim().toLowerCase();
    // Bersihkan karakter aneh di key seperti semicolon
    const k = rawKey.replace(/[;:,]/g, '');
    const v = r.value !== undefined ? r.value : (r.Value || '');
    if (k) {
      // Bersihkan koma atau tanda kutip di awal nilai jika ada
      map[k] = String(v).trim().replace(/^[,"]+|[,"]+$/g, '').trim();
    }
  });

  if (Object.keys(map).length === 0) return fallbackOrganisasi;

  const misiRaw = map.misi || '';
  const misiArray = misiRaw
    ? misiRaw.split('|').map((m) => m.trim()).filter(Boolean)
    : fallbackOrganisasi.misi;

  const rawHero = map.hero_image_url || map.hero_image_ur || map.hero_image;

  return {
    nama: map.nama || fallbackOrganisasi.nama,
    singkatan: map.singkatan || fallbackOrganisasi.singkatan,
    tagline: map.tagline || fallbackOrganisasi.tagline,
    tahun_berdiri: map.tahun_berdiri || fallbackOrganisasi.tahun_berdiri,
    sejarah: map.sejarah || fallbackOrganisasi.sejarah,
    visi: map.visi || fallbackOrganisasi.visi,
    misi: misiArray,
    tujuan: map.tujuan || fallbackOrganisasi.tujuan,
    alamat: map.alamat || fallbackOrganisasi.alamat,
    telepon: map.telepon || fallbackOrganisasi.telepon,
    whatsapp: map.whatsapp || fallbackOrganisasi.whatsapp,
    email: map.email || fallbackOrganisasi.email,
    jam_layanan: map.jam_layanan || fallbackOrganisasi.jam_layanan,
    instagram: map.instagram || fallbackOrganisasi.instagram,
    facebook: map.facebook || fallbackOrganisasi.facebook,
    youtube: map.youtube || fallbackOrganisasi.youtube,
    maps_embed_url: map.maps_embed_url || fallbackOrganisasi.maps_embed_url,
    logo_url: map.logo_url || fallbackOrganisasi.logo_url,
    hero_image_url: normalizeImageUrl(rawHero, fallbackOrganisasi.hero_image_url),
  };
}

/**
 * Mapper untuk tab 'statistik'
 */
export function mapStatistik(rows: Record<string, any>[]): StatistikItem[] {
  const items = rows
    .map((r) => ({
      label: String(r.label || '').trim(),
      nilai: String(r.nilai || '').trim(),
      satuan: String(r.satuan || '').trim(),
      urutan: parseNum(r.urutan, 999),
    }))
    .filter((r) => r.label);

  if (items.length === 0) return fallbackStatistik;
  return items.sort((a, b) => a.urutan - b.urutan);
}

/**
 * Mapper untuk tab 'pengurus'
 */
export function mapPengurus(rows: Record<string, any>[]): PengurusItem[] {
  const items = rows
    .map((r, i) => ({
      id: String(r.id || `P${i + 1}`).trim(),
      nama: String(r.nama || '').trim(),
      jabatan: String(r.jabatan || '').trim(),
      bidang: String(r.bidang || '').trim(),
      periode: String(r.periode || '2024 - 2028').trim(),
      foto: normalizeImageUrl(r.foto),
      urutan: parseNum(r.urutan, i + 1),
      tampil: parseBool(r.tampil, true),
    }))
    .filter((r) => r.nama && r.tampil);

  if (items.length === 0) return fallbackPengurus;
  return items.sort((a, b) => a.urutan - b.urutan);
}

/**
 * Mapper untuk tab 'pelatih'
 */
export function mapPelatih(rows: Record<string, any>[]): PelatihItem[] {
  const items = rows
    .map((r, i) => ({
      id: String(r.id || `C${i + 1}`).trim(),
      nama: String(r.nama || '').trim(),
      spesialisasi: String(r.spesialisasi || '').trim(),
      lisensi: String(r.lisensi || '').trim(),
      pengalaman: String(r.pengalaman || '').trim(),
      bio: String(r.bio || '').trim(),
      foto: normalizeImageUrl(r.foto),
      urutan: parseNum(r.urutan, i + 1),
      tampil: parseBool(r.tampil, true),
    }))
    .filter((r) => r.nama && r.tampil);

  if (items.length === 0) return fallbackPelatih;
  return items.sort((a, b) => a.urutan - b.urutan);
}

/**
 * Mapper untuk tab 'atlet'
 */
export function mapAtlet(rows: Record<string, any>[]): AtletItem[] {
  const items = rows
    .map((r, i) => ({
      id: String(r.id || `A${i + 1}`).trim(),
      nama: String(r.nama || '').trim(),
      kategori: String(r.kategori || '').trim(),
      kelompok_usia: String(r.kelompok_usia || '').trim(),
      jenis_kelamin: String(r.jenis_kelamin || '').trim(),
      klub: String(r.klub || 'ALTI Cianjur').trim(),
      bio: String(r.bio || '').trim(),
      foto: normalizeImageUrl(r.foto),
      tampil: parseBool(r.tampil, true),
    }))
    .filter((r) => r.nama && r.tampil);

  if (items.length === 0) return fallbackAtlet;
  return items;
}

/**
 * Mapper untuk tab 'prestasi'
 */
export function mapPrestasi(rows: Record<string, any>[]): PrestasiItem[] {
  const items = rows
    .map((r, i) => ({
      id: String(r.id || `PR${i + 1}`).trim(),
      kejuaraan: String(r.kejuaraan || '').trim(),
      tahun: parseNum(r.tahun, new Date().getFullYear()),
      tingkat: String(r.tingkat || 'Provinsi').trim(),
      atlet_id: r.atlet_id ? String(r.atlet_id).trim() : undefined,
      nama_atlet: String(r.nama_atlet || '').trim(),
      medali: String(r.medali || 'Emas').trim(),
      tampil: parseBool(r.tampil, true),
    }))
    .filter((r) => r.kejuaraan && r.tampil);

  if (items.length === 0) return fallbackPrestasi;
  // Urutkan tahun terbaru dahulu
  return items.sort((a, b) => b.tahun - a.tahun);
}

/**
 * Mapper untuk tab 'berita'
 */
export function mapBerita(rows: Record<string, any>[]): BeritaItem[] {
  const items = rows
    .map((r, i) => {
      const judul = String(r.judul || '').trim();
      const slug = r.slug && String(r.slug).trim() ? String(r.slug).trim() : slugify(judul || `berita-${i + 1}`);
      return {
        id: String(r.id || `B${i + 1}`).trim(),
        slug,
        judul,
        ringkasan: String(r.ringkasan || '').trim(),
        isi: String(r.isi || '').trim(),
        gambar: normalizeImageUrl(r.gambar),
        tanggal: String(r.tanggal || '').trim(),
        kategori: String(r.kategori || 'Kegiatan').trim(),
        tampil: parseBool(r.tampil, true),
      };
    })
    .filter((r) => r.judul && r.tampil);

  if (items.length === 0) return fallbackBerita;
  // Urutkan tanggal terbaru
  return items.sort((a, b) => (b.tanggal > a.tanggal ? 1 : -1));
}

/**
 * Mapper untuk tab 'galeri'
 */
export function mapGaleri(rows: Record<string, any>[]): GaleriItem[] {
  const items = rows
    .map((r, i) => ({
      id: String(r.id || `G${i + 1}`).trim(),
      gambar: normalizeImageUrl(r.gambar),
      caption: String(r.caption || '').trim(),
      album: String(r.album || 'Kegiatan').trim(),
      tampil: parseBool(r.tampil, true),
    }))
    .filter((r) => r.gambar && r.tampil);

  if (items.length === 0) return fallbackGaleri;
  return items;
}

/**
 * Fungsi utama untuk mengambil tab Sheets via CSV dengan PapaParse
 */
export async function fetchSheetTab<T>(
  tabName: keyof typeof SHEET_GIDS,
  mapper: (rows: any[]) => T,
  fallbackData: T,
  cacheBuster?: number
): Promise<T> {
  // Jika Sheet ID belum diisi oleh pengguna, langsung kembalikan data fallback
  if (!isSheetConfigured()) {
    return fallbackData;
  }

  const gid = SHEET_GIDS[tabName];
  if (!gid) {
    return fallbackData;
  }

  const url = getPublishedCsvUrl(gid, cacheBuster);

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'text/csv,text/plain,*/*',
      },
    });

    if (!response.ok) {
      console.warn(`[ALTI Sheets] Gagal memuat tab ${tabName}: HTTP ${response.status}. Menggunakan fallback data.`);
      return fallbackData;
    }

    const csvText = await response.text();
    if (!csvText || csvText.trim().length === 0) {
      return fallbackData;
    }

    const parseResult = Papa.parse<Record<string, any>>(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
    });

    if (parseResult.errors && parseResult.errors.length > 0) {
      console.warn(`[ALTI Sheets] Peringatan parsing CSV tab ${tabName}:`, parseResult.errors);
    }

    if (!parseResult.data || parseResult.data.length === 0) {
      return fallbackData;
    }

    let rows = parseResult.data;

    // Deteksi jika user paste seluruh CSV ke dalam Kolom A (sehingga header hanya 1 dan ada tanda koma di dalamnya)
    if (parseResult.meta.fields && parseResult.meta.fields.length === 1 && parseResult.meta.fields[0].includes(',')) {
      const rawLines = csvText.split(/\r?\n/).filter((line) => line.trim().length > 0);
      const cleanCsv = rawLines
        .map((line) => {
          let l = line.trim();
          if (l.startsWith('"') && l.endsWith('"')) {
            l = l.slice(1, -1).replace(/""/g, '"');
          }
          return l;
        })
        .join('\n');

      const reParse = Papa.parse<Record<string, any>>(cleanCsv, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (h) => h.trim(),
      });

      if (reParse.data && reParse.data.length > 0) {
        rows = reParse.data;
      }
    }

    return mapper(rows);
  } catch (err) {
    console.warn(`[ALTI Sheets] Error mengambil CSV tab ${tabName}:`, err);
    return fallbackData;
  }
}
