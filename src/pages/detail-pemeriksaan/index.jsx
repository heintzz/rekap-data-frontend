import { useQuery } from '@tanstack/react-query';
import MainLayout from 'components/MainLayout';
import moment from 'moment';
import { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import recordServices from 'services/record.services';
import childServices from 'services/child.services';
import toast from 'react-hot-toast';

const HalamanDetailPemeriksaan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const [childData, setChildData] = useState({});

  const { data: recordData } = useQuery({
    queryKey: ['getRecordData', id],
    queryFn: async () => {
      const response = await recordServices.getRecord(id);
      setFormData(response.data);
      return response.data;
    },
  });

  const idAnak = recordData?.idAnak;

  useQuery({
    queryKey: ['getChildData', idAnak],
    queryFn: async () => {
      const response = await childServices.getChild(idAnak);
      setChildData(response.data);
      return response.data;
    },
    enabled: !!idAnak,
  });

  console.log(formData);

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await recordServices.updateRecord(id, formData);
      const { success } = response;
      if (success) {
        toast.success('Data pemeriksaan berhasil diubah');
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Terjadi kesalahan pada server');
    }
  };

  return (
    <MainLayout>
      <div className="px-5 pb-10">
        <div className="flex items-center mb-6">
          <button onClick={() => navigate(-1)} className="mr-4">
            <IoArrowBack className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold">Pemeriksaan Anak</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="tglLahir" className="block mb-2 text-sm font-medium text-gray-700">
              Tanggal Pemeriksaan
            </label>
            <input
              name="tglPencatatan"
              id="tglPencatatan"
              type="date"
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              onChange={handleValueChange}
              value={moment(formData?.tanggalPencatatan).format('YYYY-MM-DD')}
            ></input>
          </div>
          <div className="mb-4">
            <label htmlFor="beratBadan" className="block mb-2 text-sm font-medium text-gray-700">
              Tanggal Lahir
            </label>
            <div className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none">
              {moment(childData?.tanggalLahir).format('DD/MM/YYYY')}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="beratBadan" className="block mb-2 text-sm font-medium text-gray-700">
              Berat Badan
            </label>
            <input
              placeholder="20"
              name="beratBadan"
              id="beratBadan"
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              onChange={handleValueChange}
              defaultValue={formData?.beratBadan}
            ></input>
          </div>
          <div className="mb-4">
            <label htmlFor="tinggiBadan" className="block mb-2 text-sm font-medium text-gray-700">
              Panjang/Tinggi Badan
            </label>
            <input
              placeholder="80"
              name="tinggiBadan"
              id="tinggiBadan"
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              onChange={handleValueChange}
              defaultValue={formData?.tinggiBadan}
            ></input>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Simpan
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default HalamanDetailPemeriksaan;
