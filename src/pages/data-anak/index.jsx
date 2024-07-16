import { useQuery } from '@tanstack/react-query';
import MainLayout from 'components/MainLayout';
import { FaChevronRight, FaUser } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';
import { LiaClipboardListSolid } from 'react-icons/lia';
import { TbPlus, TbSearch } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import childServices from '../../services/child.services';

const HalamanDaftarAnak = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['getDaftarAnak'],
    queryFn: async () => {
      const response = await childServices.getChildren();
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
        <Link to="/data/anak/tambah" className="font-semibold flex items-center gap-x-1">
          <TbPlus size={24} /> Tambah Anak
        </Link>
      </header>

      {/* Search Bar */}
      <div className="mx-4 mt-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Ketik untuk mencari nama anak"
            className="w-full p-2 pl-10 bg-white rounded-md border shadow-md"
          />
          <TbSearch size={24} className="text-gray-400 absolute left-2 top-2" />
        </div>
      </div>

      {/* Total Anak */}
      <div className="mx-4 mt-4 flex gap-x-1 items-center">
        <LiaClipboardListSolid size={24} />
        <span>Total anak: {data?.length || 0} anak</span>
      </div>

      <div className="mx-4 mt-4 space-y-3">
        {!isLoading &&
          data &&
          data.map((anak) => (
            <div
              key={anak._id}
              className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between"
            >
              <div className="flex items-center">
                <FaUser size={24} className="text-gray-600 mr-3" />
                <h3 className="font-semibold text-gray-800">{anak.nama}</h3>
              </div>
              <Link to={`/data/anak/${anak._id}`} className="text-blue-600 hover:underline">
                <FaChevronRight size={20} />
              </Link>
            </div>
          ))}
      </div>
    </MainLayout>
  );
};

export default HalamanDaftarAnak;
