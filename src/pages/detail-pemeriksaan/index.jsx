import { useQuery } from '@tanstack/react-query';
import MainLayout from 'components/MainLayout';
import moment from 'moment';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { MdArrowBack } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import childServices from 'services/child.services';
import recordServices from 'services/record.services';

const calculateAgeByMonth = (date, tanggalPencatatan) => {
  console.log(date, tanggalPencatatan);
  const today = new Date(tanggalPencatatan);
  const birthDate = new Date(date);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  return age * 12 + month;
};

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

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    if (['beratBadan', 'tinggiBadan', 'lingkarKepala', 'lingkarLengan'].includes(name)) {
      const newValue = value.replace(',', '.');
      setFormData((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (name === 'tanggalPencatatan') {
      setFormData((prev) => ({
        ...prev,
        usia: calculateAgeByMonth(childData?.tanggalLahir, formData?.tanggalPencatatan),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await recordServices.updateRecord(id, formData);
      const { success } = response;
      if (success) {
        toast.success('Data pemeriksaan berhasil diubah');
        navigate(-1);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Terjadi kesalahan pada server');
    }
  };

  return (
    <MainLayout>
      <div className="px-5 pb-10">
        <div className="flex items-center mb-6">
          <button onClick={() => navigate(-1)} className="mr-2">
            <MdArrowBack size={24} className="text-[#4A90E2]" />
          </button>
          <h1 className="text-xl font-semibold">Pemeriksaan Anak</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="tglLahir" className="block mb-2 text-sm font-medium text-gray-700">
              Tanggal Pemeriksaan
            </label>
            <input
              name="tanggalPencatatan"
              id="tanggalPencatatan"
              type="date"
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              onChange={handleValueChange}
              value={moment(formData?.tanggalPencatatan).format('YYYY-MM-DD')}
            ></input>
          </div>
          <div className="mb-4">
            <label htmlFor="tanggalLahir" className="block mb-2 text-sm font-medium text-gray-700">
              Tanggal Lahir
            </label>
            <div className="w-full h-10 px-3 py-2 text-[14px] border border-gray-300 rounded-md focus:outline-none">
              {moment(childData?.tanggalLahir).format('DD/MM/YYYY')}
            </div>
          </div>
          <div className="grid grid-cols-2 mb-4 gap-4">
            <div>
              <label htmlFor="beratBadan" className="block mb-2 text-sm font-medium text-gray-700">
                Berat Badan
              </label>
              <input
                placeholder="20"
                name="beratBadan"
                id="beratBadan"
                className="w-full h-10 px-3 py-2 text-[14px] border border-gray-300 rounded-md focus:outline-none"
                onChange={handleValueChange}
                defaultValue={formData?.beratBadan}
              ></input>
            </div>
            <div>
              <label htmlFor="tinggiBadan" className="block mb-2 text-sm font-medium text-gray-700">
                Panjang/Tinggi Badan
              </label>
              <input
                placeholder="80"
                name="tinggiBadan"
                id="tinggiBadan"
                className="w-full h-10 px-3 py-2 text-[14px] border border-gray-300 rounded-md focus:outline-none"
                onChange={handleValueChange}
                defaultValue={formData?.tinggiBadan}
              ></input>
            </div>
            <div>
              <label
                htmlFor="lingkarLengan"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Lingkar Lengan
              </label>
              <input
                placeholder="15"
                name="lingkarLengan"
                id="lingkarLengan"
                className="w-full h-10 px-3 text-[14px] py-2 border border-[#E5E9F0] rounded-md focus:outline-none"
                onChange={handleValueChange}
                defaultValue={formData?.lingkarLengan}
              ></input>
            </div>
            <div>
              <label
                htmlFor="lingkarKepala"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Lingkar Kepala
              </label>
              <input
                placeholder="5"
                name="lingkarKepala"
                id="lingkarKepala"
                className="w-full h-10 px-3 py-2 text-[14px] border border-[#E5E9F0] rounded-md focus:outline-none"
                onChange={handleValueChange}
                defaultValue={formData?.lingkarKepala}
              ></input>
            </div>
          </div>
          <button type="submit" className="bg-[#4A90E2] w-fit text-white px-4 py-2 rounded-md ">
            Simpan
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default HalamanDetailPemeriksaan;
