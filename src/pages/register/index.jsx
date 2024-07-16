import MainLayout from 'components/MainLayout';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import userServices from 'services/user.services';

const HalamanRegister = () => {
  const navigate = useNavigate();
  const [registerValue, setRegisterValue] = useState({
    nama: '',
    kataSandi: '',
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await userServices.userRegister(registerValue);
      const { success } = response;
      if (success) {
        toast.success('Berhasil mendaftar');
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Terjadi kesalahan pada server');
    }
  };

  const handleRegisterValue = (e) => {
    const { name, value } = e.target;
    setRegisterValue({
      ...registerValue,
      [name]: value,
    });
  };

  return (
    <MainLayout>
      <div className="px-5">
        <h1>Daftar</h1>
        <form onSubmit={handleRegister} className="mt-4 flex flex-col gap-y-3">
          <input
            type="text"
            name="nama"
            className="w-full rounded-2xl px-4 py-3 bg-gray-100 text-sm"
            placeholder="Nama pengguna"
            onChange={handleRegisterValue}
          />
          <input
            type="password"
            name="kataSandi"
            className="w-full rounded-2xl px-4 py-3 bg-gray-100 text-sm"
            placeholder="Kata sandi"
            onChange={handleRegisterValue}
          />
          <div className="flex items-center gap-x-2 text-sm mt-2">
            <button type="submit" className="w-fit px-4 py-1 bg-green-500 text-white rounded-2xl">
              Register
            </button>
            <a href="/login" className="underline text-black">
              Masuk akun
            </a>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default HalamanRegister;
