import HalamanArtikel from 'pages/artikel';
import HalamanBeranda from 'pages/beranda';
import HalamanDaftarPemeriksaan from 'pages/daftar-pemeriksaan';
import HalamanDaftarTanggalPemeriksaan from 'pages/daftar-tanggal-pemeriksaan';
import HalamanDaftarAnak from 'pages/data-anak';
import HalamanDaftarOrangTua from 'pages/data-ortu';
import HalamanDaftarAnakOrangTua from 'pages/data-ortu/daftar-anak';
import HalamanDetailAnak from 'pages/detail-anak';
import HalamanDetailPemeriksaan from 'pages/detail-pemeriksaan';
import HalamanInformasiWebsite from 'pages/informasi';
import HalamanKMSAnak from 'pages/kms-anak';
import HalamanTambahAnak from 'pages/tambah-anak';
import HalamanTambahOrangTua from 'pages/tambah-ortu';
import HalamanTambahPemeriksaan from 'pages/tambah-pemeriksaan';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import HalamanStatusAnak from '../pages/status-daftar-anak';
import HalamanLogin from '../pages/login';
import { useEffect } from 'react';

function ProtectedRoute(element) {
  const isAuthenticated = !!localStorage.getItem(import.meta.env.VITE_AUTH_KEY);
  return isAuthenticated ? element : <Navigate to="/login" replace />;
}

export default function RouterConfig() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem(import.meta.env.VITE_AUTH_KEY);

  useEffect(() => {
    if (isAuthenticated && location.pathname === '/login') {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, location, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<HalamanLogin />} />
      <Route path="/" element={ProtectedRoute(<HalamanBeranda />)} />
      <Route path="/artikel" element={ProtectedRoute(<HalamanArtikel />)} />
      <Route path="/data/ortu" element={ProtectedRoute(<HalamanDaftarOrangTua />)} />
      <Route path="/data/ortu/:id" element={ProtectedRoute(<HalamanDaftarAnakOrangTua />)} />
      <Route path="/data/ortu/tambah" element={ProtectedRoute(<HalamanTambahOrangTua />)} />
      <Route path="/data/anak" element={ProtectedRoute(<HalamanDaftarAnak />)} />
      <Route path="/status/anak" element={ProtectedRoute(<HalamanStatusAnak />)} />
      <Route path="/data/anak/:id" element={ProtectedRoute(<HalamanDetailAnak />)} />
      <Route path="/data/anak/:id/kms" element={ProtectedRoute(<HalamanKMSAnak />)} />
      <Route path="/data/anak/tambah" element={ProtectedRoute(<HalamanTambahAnak />)} />
      <Route path="/pemeriksaan" element={ProtectedRoute(<HalamanDaftarTanggalPemeriksaan />)} />
      <Route path="/pemeriksaan/waktu" element={ProtectedRoute(<HalamanDaftarPemeriksaan />)} />
      <Route path="/pemeriksaan/tambah" element={ProtectedRoute(<HalamanTambahPemeriksaan />)} />
      <Route path="/pemeriksaan/:id" element={ProtectedRoute(<HalamanDetailPemeriksaan />)} />
      <Route path="/info-website" element={ProtectedRoute(<HalamanInformasiWebsite />)} />
    </Routes>
  );
}
