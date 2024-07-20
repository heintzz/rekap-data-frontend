import { useQuery } from '@tanstack/react-query';
import MainLayout from 'components/MainLayout';
import toast from 'react-hot-toast';
import { FaHandsHoldingChild } from 'react-icons/fa6';
import { RiParentFill } from 'react-icons/ri';
import { TfiArrowCircleRight } from 'react-icons/tfi';
import { Link } from 'react-router-dom';
import summaryServices from 'services/summary.services';
import Artikel from '../home/components/Artikel';
import PojokLiterasi from '../home/components/PojokLiterasi';
import VideoMateri from '../home/components/VideoMateri';
import Slogan from '../home/components/Slogan';

const HalamanBeranda = () => {
  const { data } = useQuery({
    queryKey: ['getSummaries'],
    queryFn: async () => {
      try {
        const response = await summaryServices.getSummary();
        return response.data;
      } catch (error) {
        toast.error(error.response?.data?.message || 'Kesalahan server');
        return null;
      }
    },
    refetchOnWindowFocus: false,
  });

  return (
    <MainLayout>
      <div className="px-5">
        <div className="greeting font-semibold mb-2">Selamat Datang!</div>
        <Slogan />
        <div className="grid grid-cols-2 gap-x-2 mt-3">
          <div className="flex flex-col items-start p-2 bg-gray-200 rounded-md">
            <p className="text-sm">Jumlah Anak</p>
            <p className="text-2xl font-bold">{data?.countChild || 0}</p>
            <p className="text-xs">anak</p>
          </div>
          <div className="flex flex-col items-start p-2 bg-gray-200 rounded-md">
            <p className="text-sm">Jumlah Orang Tua</p>
            <p className="text-2xl font-bold">{data?.countParent || 0}</p>
            <p className="text-xs">orang tua</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-2 mt-3">
          <div className="flex flex-col items-start p-2 bg-gray-200 rounded-md">
            <p className="text-sm">Jumlah Pemeriksaan (bulan ini)</p>
            <p className="text-2xl font-bold">{data?.countRecordThisMonth || 0}</p>
            <p className="text-xs">anak</p>
          </div>
          <div className="flex flex-col items-start p-2 bg-gray-200 rounded-md">
            <p className="text-sm">Jumlah Anak dengan Gizi Buruk (bulan ini)</p>
            <p className="text-2xl font-bold">{data?.countMalnourishedChild || 0}</p>
            <p className="text-xs">anak</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <Link
            to="/data/anak"
            className="bg-gray-200 rounded-2xl p-4 flex items-center justify-between shadow-md"
          >
            <div className="flex items-center gap-x-4">
              <FaHandsHoldingChild size={24} />
              <span className="text-lg font-semibold">Data Anak</span>
            </div>
            <TfiArrowCircleRight size={24} />
          </Link>
          <Link
            to="/data/ortu"
            className="bg-gray-200 rounded-2xl p-4 flex items-center justify-between shadow-md"
          >
            <div className="flex items-center gap-x-4">
              <RiParentFill size={24} />
              <span className="text-lg font-semibold">Data Orang Tua</span>
            </div>
            <TfiArrowCircleRight size={24} />
          </Link>
        </div>
        <div className="grid gap-y-8 mt-8">
          <Artikel />
          <PojokLiterasi />
          <VideoMateri />
        </div>
      </div>
    </MainLayout>
  );
};

export default HalamanBeranda;
