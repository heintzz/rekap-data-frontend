import { useQuery } from '@tanstack/react-query';
import MainLayout from 'components/MainLayout';
import api from 'configs/api';
import toast from 'react-hot-toast';
import { FaUser } from 'react-icons/fa6';
import { MdArrowBack } from 'react-icons/md';
import { Link, useSearchParams } from 'react-router-dom';

const HalamanStatusAnak = () => {
  const [urlSearchParams] = useSearchParams();

  const status = urlSearchParams.get('status');
  const statusPerkembangan = urlSearchParams.get('statusPerkembangan');

  const name = status
    ? statusPerkembangan
      ? `${status} dan Gizi Buruk`
      : 'Gizi Buruk'
    : statusPerkembangan
    ? `${statusPerkembangan}`
    : '';

  const queryString = statusPerkembangan
    ? status
      ? `?statusPerkembangan=${statusPerkembangan}&status=${status}`
      : `?statusPerkembangan=${statusPerkembangan}`
    : status
    ? `?status=${status}`
    : '';

  const { data, isLoading, isError } = useQuery({
    queryKey: ['getStatusPerkembangan'],
    queryFn: async () => {
      try {
        const res = await api.get(`/summary/status${queryString}`);
        const { data } = res.data;
        return data;
      } catch (error) {
        toast.error('Gagal mendapatkan daftar anak');
        return [];
      }
    },
    refetchOnWindowFocus: false,
  });

  return (
    <MainLayout>
      <header className="flex justify-between items-center px-4">
        <Link to="/" className="flex items-center">
          <button className="mr-2">
            <MdArrowBack size={24} className="text-[#4A90E2]" />
          </button>
          <span className="text-lg font-semibold">Pemeriksaan {name}</span>
        </Link>
      </header>
      {data?.length === 0 ? (
        <p className="mt-4 mx-4">Tidak terdapat anak dalam indikasi tersebut</p>
      ) : null}
      <div className="mt-4 mx-4 space-y-3">
        {!isLoading &&
          data &&
          data?.map((anak) => (
            <Link
              key={anak?.idAnak._id}
              to={`/data/anak/${anak._id}`}
              className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between"
            >
              <div className="flex items-center">
                <FaUser size={24} className="text-gray-600 mr-3" />
                <h3 className="font-semibold text-gray-800">{anak?.idAnak.nama}</h3>
              </div>
            </Link>
          ))}
      </div>
    </MainLayout>
  );
};

export default HalamanStatusAnak;
