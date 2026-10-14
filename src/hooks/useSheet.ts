import { useState, useEffect, useCallback, useRef } from 'react';
import {
  fetchSheetTab,
  mapOrganisasi,
  mapStatistik,
  mapPengurus,
  mapPelatih,
  mapAtlet,
  mapPrestasi,
  mapBerita,
  mapGaleri,
  isSheetConfigured,
} from '../lib/sheets';
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

// In-memory cache singleton per sesi browser
const memoryCache: Record<string, any> = {};

interface UseSheetResult<T> {
  data: T;
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
  isFallback: boolean;
}

export function useSheetTab<T>(
  tabName: 'organisasi' | 'statistik' | 'pengurus' | 'pelatih' | 'atlet' | 'prestasi' | 'berita' | 'galeri',
  mapper: (rows: any[]) => T,
  fallbackData: T
): UseSheetResult<T> {
  const [data, setData] = useState<T>(() => {
    return memoryCache[tabName] !== undefined ? memoryCache[tabName] : fallbackData;
  });
  const [loading, setLoading] = useState<boolean>(() => {
    // Jika belum ada di cache dan sheet terkonfigurasi, loading = true
    return isSheetConfigured() && memoryCache[tabName] === undefined;
  });
  const [error, setError] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState<boolean>(!isSheetConfigured());

  const isMountedRef = useRef(true);

  const loadData = useCallback(
    async (cacheBuster?: number) => {
      if (!isSheetConfigured()) {
        setData(fallbackData);
        setIsFallback(true);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await fetchSheetTab<T>(tabName, mapper, fallbackData, cacheBuster);
        if (isMountedRef.current) {
          memoryCache[tabName] = result;
          setData(result);
          setIsFallback(false);
          setLoading(false);
        }
      } catch (err: any) {
        if (isMountedRef.current) {
          setError(err?.message || 'Gagal memuat data dari spreadsheet');
          setData(fallbackData);
          setIsFallback(true);
          setLoading(false);
        }
      }
    },
    [tabName, mapper, fallbackData]
  );

  useEffect(() => {
    isMountedRef.current = true;
    if (memoryCache[tabName] === undefined && isSheetConfigured()) {
      loadData();
    }
    return () => {
      isMountedRef.current = false;
    };
  }, [loadData, tabName]);

  const reload = useCallback(async () => {
    const buster = Date.now();
    delete memoryCache[tabName];
    await loadData(buster);
  }, [loadData, tabName]);

  return {
    data,
    loading,
    error,
    reload,
    isFallback,
  };
}

export function useOrganisasi() {
  return useSheetTab<OrganisasiData>('organisasi', mapOrganisasi, fallbackOrganisasi);
}

export function useStatistik() {
  return useSheetTab<StatistikItem[]>('statistik', mapStatistik, fallbackStatistik);
}

export function usePengurus() {
  return useSheetTab<PengurusItem[]>('pengurus', mapPengurus, fallbackPengurus);
}

export function usePelatih() {
  return useSheetTab<PelatihItem[]>('pelatih', mapPelatih, fallbackPelatih);
}

export function useAtlet() {
  return useSheetTab<AtletItem[]>('atlet', mapAtlet, fallbackAtlet);
}

export function usePrestasi() {
  return useSheetTab<PrestasiItem[]>('prestasi', mapPrestasi, fallbackPrestasi);
}

export function useBerita() {
  return useSheetTab<BeritaItem[]>('berita', mapBerita, fallbackBerita);
}

export function useGaleri() {
  return useSheetTab<GaleriItem[]>('galeri', mapGaleri, fallbackGaleri);
}
