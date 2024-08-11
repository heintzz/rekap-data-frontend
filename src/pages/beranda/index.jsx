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
import Slogan from '../home/components/Slogan';
import VideoMateri from '../home/components/VideoMateri';

const StatisticSkeleton = () => (
  <div className="animate-pulse">
    <div className="grid grid-cols-2 gap-x-2 mt-3">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-start p-2 bg-white rounded-md border border-[#E5E9F0]"
        >
          <div className="h-3 w-20 bg-gray-200 rounded mb-2"></div>
          <div className="h-6 w-16 bg-gray-200 rounded mb-1"></div>
          <div className="h-2 w-8 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  </div>
);

const HalamanBeranda = () => {
  const { data, isLoading } = useQuery({
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
      <div className="px-4">
        <div className="greeting font-semibold text-lg mb-2">Selamat Datang!</div>
        <Slogan />
        {isLoading ? (
          <StatisticSkeleton />
        ) : (
          <>
            <div id="statistik" className="grid grid-cols-2 gap-x-2 mt-3">
              <div className="flex flex-col items-start p-2 bg-white rounded-md border border-[#E5E9F0]">
                <p className="text-xs">Jumlah Anak</p>
                <p className="text-xl font-bold text-[#4A90E2]">{data?.countChild || 0}</p>
                <p className="text-[10px]">anak</p>
              </div>
              <div className="flex flex-col items-start p-2 bg-white rounded-md border border-[#E5E9F0]">
                <p className="text-xs">Jumlah Orang Tua</p>
                <p className="text-xl font-bold text-[#4A90E2]">{data?.countParent || 0}</p>
                <p className="text-[10px]">orang tua</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-2 mt-3">
              <div className="flex flex-col items-start p-2 bg-white rounded-md border border-[#E5E9F0]">
                <p className="text-xs">Pemeriksaan (bulan ini)</p>
                <p className="text-xl font-bold text-[#4A90E2]">
                  {data?.countRecordThisMonth || 0}
                </p>
                <p className="text-[10px]">anak</p>
              </div>
              <div className="flex flex-col items-start p-2 bg-white rounded-md border border-[#E5E9F0]">
                <p className="text-xs">Gizi Buruk (bulan ini)</p>
                <p className="text-xl font-bold text-[#4A90E2]">
                  {data?.countMalnourishedChild || 0}
                </p>
                <p className="text-[10px]">anak</p>
              </div>
            </div>
          </>
        )}
        <div className="flex flex-col gap-3 mt-4">
          <Link
            to="/data/anak"
            className="bg-[#EBF4FF] rounded-xl p-3 flex items-center justify-between shadow-md"
          >
            <div className="flex items-center gap-x-3">
              <FaHandsHoldingChild size={20} className="text-[#4A90E2]" />
              <span className="text-base font-semibold">Data Anak</span>
            </div>
            <TfiArrowCircleRight size={20} className="text-[#4A90E2]" />
          </Link>
          <Link
            to="/data/ortu"
            className="bg-[#EBF4FF] rounded-xl p-3 flex items-center justify-between shadow-md"
          >
            <div className="flex items-center gap-x-3">
              <RiParentFill size={20} className="text-[#4A90E2]" />
              <span className="text-base font-semibold">Data Orang Tua</span>
            </div>
            <TfiArrowCircleRight size={20} className="text-[#4A90E2]" />
          </Link>
        </div>
        <div className="grid gap-y-6 mt-6">
          <Artikel />
          <PojokLiterasi />
          <VideoMateri />
        </div>
      </div>
    </MainLayout>
  );
};

export default HalamanBeranda;
