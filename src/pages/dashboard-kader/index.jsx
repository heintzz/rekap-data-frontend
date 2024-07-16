import MainLayout from 'components/MainLayout';
import useAuth from 'hooks/useAuth';
import { FaHandsHoldingChild } from 'react-icons/fa6';
import { RiParentFill } from 'react-icons/ri';
import { TfiArrowCircleRight } from 'react-icons/tfi';
import { Link } from 'react-router-dom';

const HalamanDashboardKader = () => {
  const { user } = useAuth();

  return (
    <MainLayout>
      <div className="px-5">
        <div className="greeting">
          Selamat Datang
          <div className="font-semibold">{user?.nama}</div>
        </div>
        <div className="w-full mt-2 px-4 py-2 min-h-[80px] bg-gray-200 rounded-md flex gap-x-3">
          <div className="flex flex-col items-start">
            <p>Jml. Anak</p>
            <p className="text-2xl">0</p>
            <p>orang</p>
          </div>
          <div className="flex flex-col items-start">
            <p>Jml. Pemeriksaan (bulan ini)</p>
            <p className="text-2xl">0</p>
            <p>orang</p>
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
      </div>
    </MainLayout>
  );
};

export default HalamanDashboardKader;
