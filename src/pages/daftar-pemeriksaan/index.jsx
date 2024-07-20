import { useQuery } from '@tanstack/react-query';
import MainLayout from 'components/MainLayout';
import { fullTimeToDateString } from 'enums/date';
import { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiEdit } from 'react-icons/fi';
import { RiFileExcel2Fill } from 'react-icons/ri';
import { Link, useSearchParams } from 'react-router-dom';
import recordServices from 'services/record.services';
import PropTypes from 'prop-types';
import KMSAnakComponent from 'components/KMSAnak';

const AccordionComponent = ({ record, isOpen, toggleItem, isLast }) => {
  return (
    <div key={record._id} className={`text-sm ${isLast ? '' : 'pb-2 border-b border-black'}`}>
      <div className="flex justify-between items-center">
        <div className="font-medium text-gray-900">{record.idAnak?.nama || 'Tidak ada nama'}</div>
        <div className="flex items-center">
          <Link to={`/pemeriksaan/${record._id}`}>
            <button className="text-gray-400 hover:text-gray-600 mr-2">
              <FiEdit size={18} />
            </button>
          </Link>
          <button onClick={toggleItem} className="text-gray-400 hover:text-gray-600">
            {isOpen ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mt-4">
          <div className="mb-2">
            <p className="text-gray-500">Tanggal Pemeriksaan:</p>
            <p className="font-medium text-gray-900">
              {fullTimeToDateString(record.tanggalPencatatan)}
            </p>
          </div>

          <div className="mb-2">
            <p className="text-gray-500">Usia:</p>
            <p className="font-medium text-gray-900">{record.usia} bulan</p>
          </div>

          <div className="mb-2">
            <p className="text-gray-500">Pengukuran:</p>
            <p className="font-medium text-gray-900">
              BB: {record.beratBadan} kg, TB: {record.tinggiBadan} cm
            </p>
          </div>

          <div className="mb-2">
            <p className="text-sm text-gray-500">ASI Eksklusif:</p>
            <p className="font-medium text-gray-900">{record.asiEksklusif ? 'Ya' : 'Tidak'}</p>
          </div>

          <div className="mb-2">
            <p className="text-gray-500">Status gizi:</p>
            <div className="mt-1 flex flex-wrap gap-2 max-w-full overflow-hidden">
              <p className="w-fit rounded-xl bg-gray-200 text-sm py-1 px-2">
                BB/U {record.status['bb/u']}
              </p>
              <p className="w-fit rounded-xl bg-gray-200 text-sm py-1 px-2">
                TB/U {record.status['tb/u']}
              </p>
              <p className="w-fit rounded-xl bg-gray-200 text-sm py-1 px-2">
                BB/TB {record.status['bb/tb']}
              </p>
            </div>
          </div>

          <KMSAnakComponent id={record.idAnak._id} />
        </div>
      )}
    </div>
  );
};

AccordionComponent.propTypes = {
  record: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleItem: PropTypes.func.isRequired,
  isLast: PropTypes.bool.isRequired,
};

const HalamanDaftarPemeriksaan = () => {
  const [searchParams] = useSearchParams();
  const year = searchParams.get('year');
  const month = searchParams.get('month');
  const [openItemId, setOpenItemId] = useState(null);

  const toggleItem = (id) => {
    setOpenItemId((prevId) => (prevId === id ? null : id));
  };

  const { data, isLoading } = useQuery({
    queryKey: ['getRecordList', year, month],
    queryFn: async () => {
      const response = await recordServices.getRecords({
        year,
        month,
      });
      return response.data;
    },
  });

  return (
    <MainLayout>
      <div className="px-5 grid gap-y-4">
        {!isLoading &&
          data &&
          data?.map((record, index) => {
            return (
              <AccordionComponent
                key={record._id}
                record={record}
                isOpen={openItemId === record._id}
                toggleItem={() => toggleItem(record._id)}
                isLast={index === data.length - 1}
              />
            );
          })}
      </div>

      <div className="fixed bottom-16 right-6">
        <a href={`${import.meta.env.VITE_BASE_ENDPOINT_URL}/reports?year=${year}&month=${month}`}>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-lg flex items-center">
            <RiFileExcel2Fill className="mr-2" size={20} />
            Download Excel
          </button>
        </a>
      </div>
    </MainLayout>
  );
};

export default HalamanDaftarPemeriksaan;
