import useAuth from 'hooks/useAuth';
import HalamanDashboardKader from 'pages/dashboard-kader';
import HalamanDaftarOrangTua from 'pages/data-ortu';
import HomePage from 'pages/home';
import HalamanLogin from 'pages/login';
import HalamanRegister from 'pages/register';
import PropTypes from 'prop-types';
import { Navigate, Route, Routes } from 'react-router-dom';
import HalamanDaftarPemeriksaan from '../pages/daftar-pemeriksaan';
import HalamanDaftarAnak from '../pages/data-anak';
import HalamanTambahAnak from '../pages/tambah-anak';
import HalamanTambahOrangTua from '../pages/tambah-ortu';
import HalamanTambahPemeriksaan from '../pages/tambah-pemeriksaan';
import HalamanDaftarTanggalPemeriksaan from '../pages/daftar-tanggal-pemeriksaan';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return children;
  }

  if (user) {
    if (user.peran === 'kader') {
      return <Navigate to="/dashboard/kader" replace />;
    } else if (user.peran === 'admin') {
      return <Navigate to="/dashboard/admin" replace />;
    }
  }

  return children;
};

export default function RouterConfig() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <ProtectedRoute>
            <HalamanLogin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <ProtectedRoute>
            <HalamanRegister />
          </ProtectedRoute>
        }
      />
      <Route path="/dashboard/kader" element={<HalamanDashboardKader />} />
      <Route path="/data/ortu" element={<HalamanDaftarOrangTua />} />
      <Route path="/data/ortu/tambah" element={<HalamanTambahOrangTua />} />
      <Route path="/data/anak" element={<HalamanDaftarAnak />} />
      <Route path="/data/anak/tambah" element={<HalamanTambahAnak />} />
      <Route path="/pemeriksaan" element={<HalamanDaftarTanggalPemeriksaan />} />
      <Route path="/pemeriksaan/waktu" element={<HalamanDaftarPemeriksaan />} />
      <Route path="/pemeriksaan/tambah" element={<HalamanTambahPemeriksaan />} />
    </Routes>
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
