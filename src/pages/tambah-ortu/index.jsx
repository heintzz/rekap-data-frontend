import MainLayout from 'components/MainLayout';
import { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import parentServices from '../../services/parent.services';
import toast from 'react-hot-toast';

const dusun = ['Pegundungan', 'Simpar', 'Srandil'];

const HalamanTambahOrangTua = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({});

  const addParentData = async (e) => {
    e.preventDefault();
    try {
      const response = await parentServices.addParentData(input);
      const { success } = response;
      if (success) {
        toast.success('Data orang tua ditambahkan');
        navigate('/data/ortu');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Terjadi kesalahan pada server');
    }
  };

  const handleValueChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <MainLayout>
      <div className="px-4">
        <Link to="/data/ortu" className="flex items-center">
          <button className="mr-2">
            <IoArrowBack size={24} />
          </button>
          <span className="text-lg font-semibold">Tambah Orang Tua</span>
        </Link>
        <form onSubmit={addParentData} className="mt-4">
          <div className="mb-4">
            <label htmlFor="nama" className="block mb-2 text-sm font-medium text-gray-700">
              Nama
            </label>
            <input
              placeholder="Nama "
              name="nama"
              id="nama"
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              onChange={handleValueChange}
            ></input>
          </div>
          <div className="mb-4">
            <label htmlFor="nama" className="block mb-2 text-sm font-medium text-gray-700">
              No KK
            </label>
            <input
              placeholder="No KK"
              name="noKk"
              id="noKk"
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              onChange={handleValueChange}
            ></input>
          </div>
          <div className="mb-4">
            <label htmlFor="dusun" className="block mb-2 text-sm font-medium">
              Dusun
            </label>
            <select
              name="dusun"
              className="w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-none"
              onChange={handleValueChange}
              defaultValue=""
            >
              <option value="" disabled={input.dusun !== ''}>
                Pilih dusun
              </option>
              {dusun.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="rt" className="block mb-2 text-sm font-medium text-gray-700">
                  RT
                </label>
                <input
                  placeholder="RT"
                  name="rt"
                  id="rt"
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                  onChange={handleValueChange}
                />
              </div>
              <div>
                <label htmlFor="rw" className="block mb-2 text-sm font-medium text-gray-700">
                  RW
                </label>
                <input
                  placeholder="RW"
                  name="rw"
                  id="rw"
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                  onChange={handleValueChange}
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md"
          >
            Tambah
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default HalamanTambahOrangTua;
