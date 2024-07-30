import { useQuery } from '@tanstack/react-query';
import MainLayout from 'components/MainLayout';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa6';
import { MdArrowBack } from 'react-icons/md';
import { TbSearch } from 'react-icons/tb';
import { Link, useParams } from 'react-router-dom';
import childServices from 'services/child.services';

const HalamanDaftarAnakOrangTua = () => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['getDaftarAnak', id],
    queryFn: async () => {
      const response = await childServices.getChildrenByParentId(id);
      return response.data;
    },
    refetchOnWindowFocus: false,
  });

  const filteredChildren = data?.filter((anak) =>
    anak.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <header className="flex justify-between items-center px-4">
        <Link to="/data/ortu" className="flex items-center">
          <button className="mr-2">
            <MdArrowBack size={24} className="text-[#4A90E2]" />
          </button>
          <span className="text-lg font-semibold">Kembali</span>
        </Link>
      </header>

      <div className="px-4 mt-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Ketik untuk mencari nama anak"
            className="w-full p-2 pl-10 bg-white rounded-md border shadow-md"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <TbSearch size={24} className="text-gray-400 absolute left-2 top-2" />
        </div>

        <div className="mt-4 space-y-3">
          {!isLoading &&
            data &&
            filteredChildren.map((anak) => (
              <Link
                key={anak._id}
                to={`/data/anak/${anak._id}`}
                className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <FaUser size={24} className="text-gray-600 mr-3" />
                  <h3 className="font-semibold text-gray-800">{anak.nama}</h3>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default HalamanDaftarAnakOrangTua;
