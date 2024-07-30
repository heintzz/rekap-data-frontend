import HalamanArtikel from 'pages/artikel';
import HalamanBeranda from 'pages/beranda';
import HalamanDaftarPemeriksaan from 'pages/daftar-pemeriksaan';
import HalamanDaftarTanggalPemeriksaan from 'pages/daftar-tanggal-pemeriksaan';
import HalamanDaftarAnak from 'pages/data-anak';
import HalamanDaftarOrangTua from 'pages/data-ortu';
import HalamanDaftarAnakOrangTua from 'pages/data-ortu/daftar-anak';
import HalamanDetailAnak from 'pages/detail-anak';
import HalamanDetailPemeriksaan from 'pages/detail-pemeriksaan';
import HalamanKMSAnak from 'pages/kms-anak';
import HalamanTambahAnak from 'pages/tambah-anak';
import HalamanTambahOrangTua from 'pages/tambah-ortu';
import HalamanTambahPemeriksaan from 'pages/tambah-pemeriksaan';
import { Route, Routes } from 'react-router-dom';

export default function RouterConfig() {
  return (
    <Routes>
      <Route path="/" element={<HalamanBeranda />} />
      <Route path="/artikel" element={<HalamanArtikel />} />
      <Route path="/data/ortu" element={<HalamanDaftarOrangTua />} />
      <Route path="/data/ortu/:id" element={<HalamanDaftarAnakOrangTua />} />
      <Route path="/data/ortu/tambah" element={<HalamanTambahOrangTua />} />
      <Route path="/data/anak" element={<HalamanDaftarAnak />} />
      <Route path="/data/anak/:id" element={<HalamanDetailAnak />} />
      <Route path="/data/anak/:id/kms" element={<HalamanKMSAnak />} />
      <Route path="/data/anak/tambah" element={<HalamanTambahAnak />} />
      <Route path="/pemeriksaan" element={<HalamanDaftarTanggalPemeriksaan />} />
      <Route path="/pemeriksaan/waktu" element={<HalamanDaftarPemeriksaan />} />
      <Route path="/pemeriksaan/tambah" element={<HalamanTambahPemeriksaan />} />
      <Route path="/pemeriksaan/:id" element={<HalamanDetailPemeriksaan />} />
    </Routes>
  );
}
