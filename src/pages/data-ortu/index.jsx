import { useQuery } from '@tanstack/react-query';
import MainLayout from 'components/MainLayout';
import { FaUser } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa6';
import { IoArrowBack } from 'react-icons/io5';
import { LiaClipboardListSolid } from 'react-icons/lia';
import { TbPlus, TbSearch } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import parentServices from 'services/parent.services';

const HalamanDaftarOrangTua = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['getOrangTua'],
    queryFn: async () => {
      const response = await parentServices.getParents();
      return response.data;
    },
  });

  return (
    <MainLayout>
      {/* Header */}
      <header className="flex justify-between items-center px-4">
        <Link to="/" className="flex items-center">
          <button className="mr-2">
            <IoArrowBack size={24} />
          </button>
          <span className="text-lg font-semibold">Kembali</span>
        </Link>
        <Link to="/data/ortu/tambah" className="font-semibold flex items-center gap-x-1">
          <TbPlus size={24} /> Tambah Orang Tua
        </Link>
      </header>

      {/* Search Bar */}
      <div className="mx-4 mt-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Ketik untuk mencari nama orang tua"
            className="w-full p-2 pl-10 bg-white rounded-md border shadow-md"
          />
          <TbSearch size={24} className="text-gray-400 absolute left-2 top-2" />
        </div>
      </div>

      {/* Total Anak */}
      <div className="mx-4 mt-4 flex gap-x-1 items-center">
        <LiaClipboardListSolid size={24} />
        <span>Total orang tua: {data?.length || 0} orang tua</span>
      </div>

      <div className="mx-4 mt-4 space-y-3">
        {!isLoading &&
          data &&
          data.map((parent) => (
            <Link
              to={`/data/ortu/${parent._id}`}
              key={parent._id}
              className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between"
            >
              <div className="flex items-center">
                <FaUser size={24} className="text-gray-600 mr-3" />
                <h3 className="font-semibold text-gray-800">{parent.nama}</h3>
              </div>
              <div className="text-blue-600 hover:underline">
                <FaChevronRight size={20} />
              </div>
            </Link>
          ))}
      </div>
    </MainLayout>
  );
};

export default HalamanDaftarOrangTua;
