# Website Resmi ALTI Kabupaten Cianjur (Asosiasi Lari Trail Indonesia)

Website profil organisasi resmi untuk **Asosiasi Lari Trail Indonesia (ALTI) Pengurus Cabang Kabupaten Cianjur**. Dibangun dengan arsitektur modern tanpa server backend, di mana seluruh konten (organisasi, pengurus, pelatih, atlet, prestasi, berita, galeri, dan kontak) dapat dikelola secara mandiri oleh admin non-teknis langsung melalui **Google Sheets (Publish to Web, CSV)**.

---

## 1. Fitur Utama Website

1. **Beranda**: Hero dinamis, counter statistik animasi, kilas profil, prestasi terkini, berita terbaru, pratinjau galeri, dan ajakan kemitraan.
2. **Profil**: Sejarah berdirinya organisasi, visi, misi berpoin, tujuan, serta nilai-nilai konservasi olahraga lari trail.
3. **Pengurus**: Susunan pengurus cabang periode 2024–2028 dengan sorotan khusus untuk Ketua Umum dan kartu pengurus lainnya diurutkan otomatis.
4. **Pelatih**: Daftar pelatih berlisensi dengan spesialisasi, pengalaman, serta modal pop-up bio interaktif.
5. **Atlet**: Daftar atlet binaan dengan fitur pencarian nama/klub instan, filter nomor lomba (Speed Trail, Short Trail, Long Trail, Vertical KM), jenis kelamin, kelompok usia, dan tombol pagination *Muat Lebih Banyak*.
6. **Detail Atlet (`/atlet/:id`)**: Lembar biodata lengkap atlet yang otomatis menampilkan seluruh riwayat medali/kejuaraan yang dimenangkan atlet tersebut.
7. **Prestasi**: Tabel kejuaraan resmi (desktop) dan kartu (mobile) dengan filter tahun dan tingkat (Kabupaten, Provinsi, Nasional, Internasional) serta badge medali berwarna.
8. **Warta & Berita**: Rilis artikel kegiatan dengan filter kategori, detail artikel yang mempertahankan paragraf, dan tombol share langsung ke WhatsApp.
9. **Galeri**: Grid masonry foto aktivitas dengan filter album dan Lightbox fullscreen interaktif (zoom, tombol prev/next, tombol Esc, dan swipe gestur mobile).
10. **Kontak**: Lokasi sekretariat, tautan WhatsApp langsung (`wa.me`), embed Google Maps Stadion Badak Putih, serta formulir kirim pesan tanpa backend.
11. **SEO & Metadata**: Dilengkapi `react-helmet-async`, Open Graph meta tags untuk WhatsApp/Facebook share card, Twitter Cards, dan Schema.org JSON-LD.

---

## 2. Cara Menjalankan Secara Lokal

### Prasyarat
- Node.js versi 18 ke atas
- npm atau pnpm/yarn

### Langkah Menjalankan
```bash
# 1. Pasang dependensi
npm install

# 2. Jalankan server pengembangan
npm run dev

# 3. Buka di browser
# http://localhost:3000 atau URL yang tampil di terminal
```

Untuk menguji build produksi:
```bash
npm run build
npm run preview
```

---

## 3. Cara Menyiapkan Google Sheets Sebagai CMS

Website ini dirancang untuk membaca data dari **satu Google Spreadsheet** yang memiliki 8 tab lembar kerja. Template CSV sudah disediakan di dalam folder `/sheet-template/`.

### Langkah 1: Buat Spreadsheet Baru
1. Buka [Google Sheets](https://sheets.new) di browser Anda.
2. Beri nama spreadsheet, misalnya: `Database Website ALTI Cianjur`.
3. Buat 8 tab (lembar kerja) dengan nama persis seperti berikut (huruf kecil):
   - `organisasi`
   - `statistik`
   - `pengurus`
   - `pelatih`
   - `atlet`
   - `prestasi`
   - `berita`
   - `galeri`

### Langkah 2: Impor Template CSV
Buka setiap file yang ada di folder `/sheet-template/` pada repositori ini:
- `sheet-template/organisasi.csv` -> Impor ke tab `organisasi`
- `sheet-template/statistik.csv` -> Impor ke tab `statistik`
- `sheet-template/pengurus.csv` -> Impor ke tab `pengurus`
- `sheet-template/pelatih.csv` -> Impor ke tab `pelatih`
- `sheet-template/atlet.csv` -> Impor ke tab `atlet`
- `sheet-template/prestasi.csv` -> Impor ke tab `prestasi`
- `sheet-template/berita.csv` -> Impor ke tab `berita`
- `sheet-template/galeri.csv` -> Impor ke tab `galeri`

> **PENTING:** Jangan mengubah nama kolom pada baris pertama (header). Anda bebas menambah, mengedit, atau menghapus baris data di bawahnya.

### Langkah 3: Publish Spreadsheet ke Web (Format CSV)
1. Pada menu Google Sheets, klik **File** > **Bagikan (Share)** > **Publikasikan ke web (Publish to web)**.
2. Pilih tab yang ingin dipublikasikan, lalu pilih format **Nilai yang dipisahkan koma (.csv)**.
3. Klik tombol **Publikasikan (Publish)**.
4. Anda akan mendapatkan URL dengan format seperti:
   `https://docs.google.com/spreadsheets/d/e/2PACX-1vRxxxxxxxxxxxxxxxxxxxxxxx/pub?gid=0&single=true&output=csv`
5. Salin ID Publish yang berawalan `2PACX-...` tersebut.
6. Perhatikan nilai `gid` untuk masing-masing tab (dapat dilihat di URL browser saat memilih tab tertentu di Sheets).

### Langkah 4: Hubungkan ke Website
Ada dua cara mudah:

#### Opsi A: Lewat File `.env` (Direkomendasikan untuk Vercel / Lokal)
Tambahkan baris berikut di file `.env` lokal Anda atau di Environment Variables Vercel:
```env
VITE_SHEET_ID="2PACX-1vRxxxxxxxxxxxxxxxxxxxxxxx"
```

#### Opsi B: Ubah Langsung di `src/config.ts`
Buka file `src/config.ts`, ganti nilai konstanta:
```typescript
export const DEFAULT_SHEET_ID = "2PACX-1vRxxxxxxxxxxxxxxxxxxxxxxx";
```
Dan sesuaikan angka `gid` pada objek `SHEET_GIDS` jika berbeda dengan tab Anda.

---

## 4. Panduan Format Data Khusus

### 4.1 Menggunakan Foto dari Google Drive
Pengurus dapat langsung menyalin link foto yang disimpan di Google Drive:
1. Upload foto ke Google Drive.
2. Klik kanan foto > **Bagikan (Share)** > Ubah Akses Umum menjadi **"Siapa saja yang memiliki link" (Anyone with the link)**.
3. Salin tautan (contoh: `https://drive.google.com/file/d/1a2b3c4d5e6f/view?usp=sharing`).
4. Tempel link tersebut langsung ke kolom `foto` atau `gambar` di Google Sheets. Sistem website akan otomatis mengonversi link tersebut menjadi URL thumbnail beresolusi tinggi.

### 4.2 Menampilkan atau Menyembunyikan Data
Setiap tab data memiliki kolom `tampil`:
- Isi `TRUE` untuk menampilkan.
- Isi `FALSE` untuk menyembunyikan tanpa perlu menghapus baris.

### 4.3 Mengatur Urutan Tampilan
Gunakan kolom `urutan` (angka bulat: 1, 2, 3...) untuk menentukan siapa yang tampil lebih awal pada tab `pengurus`, `pelatih`, dan `statistik`.

### 4.4 Catatan Waktu Sinkronisasi (Google Cache)
Setelah Anda mengedit spreadsheet, Google Sheets membutuhkan waktu sekitar **3 sampai 5 menit** untuk memperbarui file CSV publiknya di server CDN Google. Jika belum langsung berubah, silakan tunggu sejenak atau gunakan tombol **"Perbarui Data"** pada website.

---

## 5. Peringatan Keamanan & Privasi Data

> **PERINGATAN KERAHASIAAN:**
> Data yang dipublikasikan melalui Google Sheets ke web berstatus **publik** dan dapat dibaca oleh siapa saja.
> **DILARANG KERAS** memasukkan data pribadi sensitif seperti:
> - Nomor Induk Kependudukan (NIK) atlet/pengurus
> - Alamat rumah pribadi atlet
> - Nomor telepon / WhatsApp pribadi atlet pelajar
> - Rekening bank pribadi selain rekening resmi organisasi

---

## 6. Cara Deploy ke Vercel

Repositori ini telah dilengkapi dengan konfigurasi `vercel.json` bawaan untuk menangani Single Page Application (SPA).

1. Push kode ini ke repositori GitHub Anda.
2. Buka dashboard [Vercel](https://vercel.com) dan klik **Add New Project**.
3. Hubungkan repositori GitHub ALTI Cianjur.
4. Pada konfigurasi build:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Tambahkan Environment Variable (opsional jika sudah diisi di config):
   - Key: `VITE_SHEET_ID`
   - Value: `[ID Publish Google Sheets Anda]`
6. Klik **Deploy**. Website resmi ALTI Cianjur akan aktif secara global dengan domain gratis `.vercel.app` atau domain kustom Anda.
