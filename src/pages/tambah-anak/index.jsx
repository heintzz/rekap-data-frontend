import { useQuery } from '@tanstack/react-query';
import MainLayout from 'components/MainLayout';
import SearchableSelect from 'components/SearchableSelect';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { IoArrowBack } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import parentServices from 'services/parent.services';

const dusun = ['Pegundungan', 'Simpar', 'Srandil'];

const HalamanTambahAnak = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const { data, isLoading } = useQuery({
    queryKey: ['getOrangTua'],
    queryFn: async () => {
      const response = await parentServices.getParents();
      return response.data;
    },
  });

  const addChildData = async (e) => {
    e.preventDefault();

    try {
      const response = await parentServices.addChildData(formData);
      const { success } = response;
      if (success) {
        toast.success('Data anak ditambahkan');
        navigate('/data/anak');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Terjadi kesalahan pada server');
    }
  };

  const handleValueChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <MainLayout>
      <div className="px-4">
        <Link to="/data/anak" className="flex items-center">
          <button className="mr-2">
            <IoArrowBack size={24} />
          </button>
          <span className="text-lg font-semibold">Tambah Anak</span>
        </Link>
        <form onSubmit={addChildData} className="mt-4">
          {!isLoading && data && (
            <SearchableSelect
              options={data?.map((child) => ({
                id: child._id,
                name: child.nama,
              }))}
              labelKey="name"
              valueKey="id"
              placeholder="Pilih orang tua"
              label="Nama orang tua"
              onSelect={handleValueChange}
              name="idOrangTua"
            />
          )}
          <div className="mb-4">
            <label htmlFor="nama" className="block mb-2 text-sm font-medium text-gray-700">
              Nama
            </label>
            <input
              placeholder="Nama anak"
              name="nama"
              id="nama"
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              onChange={handleValueChange}
            ></input>
          </div>
          <div className="mb-4">
            <label htmlFor="nama" className="block mb-2 text-sm font-medium text-gray-700">
              NIK
            </label>
            <input
              placeholder="NIK anak"
              name="nik"
              id="nik"
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              onChange={handleValueChange}
            ></input>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Jenis kelamin</label>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="laki"
                  name="jenisKelamin"
                  value="L"
                  onChange={handleValueChange}
                  checked={formData.jenisKelamin == 'L'}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="laki" className="ml-2 text-sm text-gray-700">
                  Laki-laki
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="perempuan"
                  name="jenisKelamin"
                  value="P"
                  onChange={handleValueChange}
                  checked={formData.jenisKelamin == 'P'}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="vitA_tidak" className="ml-2 text-sm text-gray-700">
                  Perempuan
                </label>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="tanggalLahir" className="block mb-2 text-sm font-medium text-gray-700">
              Tanggal lahir
            </label>
            <input
              name="tanggalLahir"
              id="tanggalLahir"
              type="date"
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
              <option value="" disabled={formData.dusun !== ''}>
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
            className="w-fit py-2 px-4 bg-[#D1D8C5] text-white font-semibold rounded-md"
          >
            Tambah
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default HalamanTambahAnak;
