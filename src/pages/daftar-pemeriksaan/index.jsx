import { useQuery } from '@tanstack/react-query';
import KMSAnakComponent from 'components/KMSAnak';
import MainLayout from 'components/MainLayout';
import { fullTimeToDateString } from 'enums/date';
import PropTypes from 'prop-types';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaTrashCan } from 'react-icons/fa6';
import { FiChevronDown, FiChevronUp, FiEdit } from 'react-icons/fi';
import { RiFileExcel2Fill } from 'react-icons/ri';
import { Link, useSearchParams } from 'react-router-dom';
import recordServices from 'services/record.services';
import nutritionStatus from '../../enums/nutritionStatus';

const AccordionComponent = ({ record, isOpen, toggleItem, isLast, triggerRefetch }) => {
  const deleteRecord = async () => {
    try {
      const response = await recordServices.deleteRecord(record._id);
      const { success } = response;
      if (success) {
        toast.success('Data berhasil dihapus');
        triggerRefetch();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Terjadi kesalahan saat menghapus data');
    }
  };
  return (
    <div key={record._id} className={`text-sm ${isLast ? '' : 'pb-2 border-b border-black'}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button onClick={deleteRecord}>
            <FaTrashCan size={18} color="red" />
          </button>
          <div className="font-medium text-gray-900">{record.idAnak?.nama || 'Tidak ada nama'}</div>
        </div>
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
              BB: {record.beratBadan} kg, TB: {record.tinggiBadan} cm, LL: {record.lingkarLengan}{' '}
              cm, LK: {record.lingkarKepala} cm
            </p>
          </div>

          <div className="mb-2">
            <p className="text-sm text-gray-500">ASI:</p>
            <p className="font-medium text-gray-900">{record.asi ? 'Ya' : 'Tidak'}</p>
          </div>

          {record.imunisasi && record.imunisasi.length > 0 ? (
            <div className="mb-2">
              <p className="text-sm text-gray-500">Imunisasi:</p>
              <p className="font-medium text-gray-900">{record.imunisasi.join(', ')}</p>
            </div>
          ) : (
            <div className="mb-2">
              <p className="text-sm text-gray-500">Imunisasi:</p>
              <p className="font-medium text-gray-900">Tidak mendapat imunisasi</p>
            </div>
          )}

          <div className="mb-2">
            <p className="text-gray-500">Status gizi:</p>
            <div className="mt-1 flex text-xs flex-wrap gap-2 max-w-full overflow-hidden font-semibold text-white">
              <p
                className="w-fit rounded-xl py-1 px-2"
                style={{ backgroundColor: nutritionStatus.getColor(record.status['bb/u'], 'bb/u') }}
              >
                BB/U {record.status['bb/u']}
              </p>
              <p
                className="w-fit rounded-xl py-1 px-2"
                style={{ backgroundColor: nutritionStatus.getColor(record.status['tb/u'], 'tb/u') }}
              >
                TB/U {record.status['tb/u']}
              </p>
              <p
                className="w-fit rounded-xl py-1 px-2"
                style={{
                  backgroundColor: nutritionStatus.getColor(record.status['bb/tb'], 'bb/tb'),
                }}
              >
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
  triggerRefetch: PropTypes.func,
};

const HalamanDaftarPemeriksaan = () => {
  const [searchParams] = useSearchParams();
  const year = searchParams.get('year');
  const month = searchParams.get('month');
  const [openItemId, setOpenItemId] = useState(null);

  const toggleItem = (id) => {
    setOpenItemId((prevId) => (prevId === id ? null : id));
  };

  const { data, isLoading, refetch } = useQuery({
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
                triggerRefetch={refetch}
              />
            );
          })}
      </div>

      <div className="fixed bottom-[70px] right-6">
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
