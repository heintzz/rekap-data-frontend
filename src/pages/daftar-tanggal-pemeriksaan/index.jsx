import { useQuery } from '@tanstack/react-query';
import MainLayout from 'components/MainLayout';
import { FiChevronRight } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { IndexToMonthEnum } from 'enums/date';
import recordServices from 'services/record.services';
import { IoArrowBack } from 'react-icons/io5';

const HalamanDaftarTanggalPemeriksaan = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ['getGroupedRecordDates'],
    queryFn: async () => {
      const response = await recordServices.getGroupedDates();
      return response.data;
    },
  });

  return (
    <MainLayout>
      <div className="px-5 grid gap-y-4">
        <div className="flex items-center mb-2">
          <button onClick={() => navigate(-1)} className="mr-4">
            <IoArrowBack className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold">Riwayat Pemeriksaan Anak</h1>
        </div>
        {!isLoading &&
          data &&
          data.map((date, index) => {
            const { year, month } = date;
            const dateString = `${IndexToMonthEnum[month - 1]} ${year}`;
            return (
              <Link
                key={index}
                to={`/pemeriksaan/waktu?year=${year}&month=${month}`}
                className={`text-sm ${
                  index === data.length - 1 ? '' : 'pb-2 border-b border-black'
                }`}
              >
                <div className="flex justify-between items-center">
                  <p className="font-medium text-gray-900">{dateString}</p>
                  <FiChevronRight className="text-gray-400" size={18} />
                </div>
              </Link>
            );
          })}
      </div>
    </MainLayout>
  );
};

export default HalamanDaftarTanggalPemeriksaan;
