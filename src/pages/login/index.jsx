import MainLayout from 'components/MainLayout';
import useAuth from 'hooks/useAuth';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import userServices from 'services/user.services';
import { setToken } from 'utils/auth';

const HalamanLogin = () => {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loginValue, setLoginValue] = useState({
    nama: '',
    kataSandi: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await userServices.userLogin(loginValue);
      const { success, token } = response;
      if (success) {
        setToken(token);
        setLoginValue({
          nama: '',
          kataSandi: '',
        });
        await userServices.getUserData();
        setIsAuthenticated(true);
        navigate('/dashboard/kader');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Terjadi kesalahan pada server');
    }
  };

  const handleLoginValue = (e) => {
    const { name, value } = e.target;
    setLoginValue({
      ...loginValue,
      [name]: value,
    });
  };

  return (
    <MainLayout>
      <div className="px-5">
        <h1>Masuk</h1>
        <form onSubmit={handleLogin} className="mt-4 flex flex-col gap-y-3">
          <input
            type="text"
            name="nama"
            className="w-full rounded-2xl px-4 py-3 bg-gray-100 text-sm"
            placeholder="Nama pengguna"
            onChange={handleLoginValue}
          />
          <input
            type="password"
            name="kataSandi"
            className="w-full rounded-2xl px-4 py-3 bg-gray-100 text-sm"
            placeholder="Kata sandi"
            onChange={handleLoginValue}
          />
          <div className="flex items-center gap-x-2 text-sm mt-2">
            <button
              type="submit"
              onClick={handleLogin}
              className="w-fit px-4 py-1 bg-green-500 text-white rounded-2xl"
            >
              Login
            </button>
            <a href="/register" className="underline text-black">
              Daftar akun
            </a>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default HalamanLogin;
