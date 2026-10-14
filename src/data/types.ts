export interface OrganisasiData {
  nama: string;
  singkatan: string;
  tagline: string;
  tahun_berdiri: string;
  sejarah: string;
  visi: string;
  misi: string[];
  tujuan: string;
  alamat: string;
  telepon: string;
  whatsapp: string;
  email: string;
  jam_layanan: string;
  instagram: string;
  facebook: string;
  youtube: string;
  maps_embed_url: string;
  logo_url: string;
  hero_image_url: string;
}

export interface StatistikItem {
  label: string;
  nilai: string | number;
  satuan: string;
  urutan: number;
}

export interface PengurusItem {
  id: string;
  nama: string;
  jabatan: string;
  bidang: string;
  periode: string;
  foto: string;
  urutan: number;
  tampil: boolean;
}

export interface PelatihItem {
  id: string;
  nama: string;
  spesialisasi: string;
  lisensi: string;
  pengalaman: string;
  bio: string;
  foto: string;
  urutan: number;
  tampil: boolean;
}

export interface AtletItem {
  id: string;
  nama: string;
  kategori: string;
  kelompok_usia: string;
  jenis_kelamin: 'Laki-laki' | 'Perempuan' | string;
  klub: string;
  bio: string;
  foto: string;
  tampil: boolean;
}

export interface PrestasiItem {
  id: string;
  kejuaraan: string;
  tahun: number;
  tingkat: 'Kabupaten' | 'Provinsi' | 'Nasional' | 'Internasional' | string;
  atlet_id?: string;
  nama_atlet: string;
  medali: 'Emas' | 'Perak' | 'Perunggu' | 'Juara Harapan' | string;
  tampil: boolean;
}

export interface BeritaItem {
  id: string;
  slug: string;
  judul: string;
  ringkasan: string;
  isi: string;
  gambar: string;
  tanggal: string; // YYYY-MM-DD
  kategori: string;
  tampil: boolean;
}

export interface GaleriItem {
  id: string;
  gambar: string;
  caption: string;
  album: string;
  tampil: boolean;
}
