import { useQuery } from '@tanstack/react-query';
import MainLayout from 'components/MainLayout';
import SearchableSelect from 'components/SearchableSelect';
import { IndexToMonthEnum } from 'enums/date';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import childServices from 'services/child.services';
import recordServices from 'services/record.services';
import Imunisasi from './components/Imunisasi';

const calculateAgeByMonth = (date, tanggalPencatatan) => {
  const today = new Date(tanggalPencatatan);
  const birthDate = new Date(date);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  return age * 12 + month;
};

const HalamanTambahPemeriksaan = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pertamaKali: false,
    tanggalPencatatan: new Date().toISOString().split('T')[0],
  });
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['getDaftarAnak'],
    queryFn: async () => {
      const response = await childServices.getChildren();
      return response.data;
    },
  });

  const tanggalPencatatan = formData?.tanggalPencatatan
    ? formData.tanggalPencatatan
    : new Date().toISOString().split('T')[0];

  const date = new Date();
  const ageInMonths = calculateAgeByMonth(tanggalLahir, tanggalPencatatan);

  const month = IndexToMonthEnum[date.getMonth()];

  const getVitaminA =
    ageInMonths >= 6 && ageInMonths <= 60 && month === 'Februari' && month === 'Agustus';
  const canGetASIEksklusif = ageInMonths <= 6;
  const canGetMPASI = ageInMonths >= 6 && ageInMonths <= 24;

  const createHealthRecord = async (e) => {
    e.preventDefault();

    try {
      const response = await recordServices.createRecord({
        ...formData,
        jenisKelamin,
        usia: ageInMonths,
      });
      const { success } = response;
      if (success) {
        toast.success('Data pemeriksaan ditambahkan');
        navigate('/pemeriksaan');
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  const handleValueChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'idAnak') {
      const child = data.find((child) => child._id === value);
      setTanggalLahir(child.tanggalLahir);
      setJenisKelamin(child.jenisKelamin);
    }
  };

  console.log('formData', formData);

  return (
    <MainLayout>
      <div className="px-4 pb-10">
        <div className="flex items-center mb-6">
          <button onClick={() => navigate(-1)} className="mr-4">
            <IoArrowBack className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold">Pemeriksaan Anak</h1>
        </div>
        <form onSubmit={createHealthRecord}>
          <div className="mb-4">
            <label
              htmlFor="tanggalPencatatan"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Tanggal Pemeriksaan
            </label>
            <input
              name="tanggalPencatatan"
              id="tanggalPencatatan"
              type="date"
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              onChange={handleValueChange}
              defaultValue={formData.tanggalPencatatan}
            ></input>
          </div>
          {!isLoading && data && (
            <SearchableSelect
              options={data?.map((child) => ({
                id: child._id,
                name: child.nama,
              }))}
              labelKey="name"
              valueKey="id"
              placeholder="Nama anak"
              label="Nama anak"
              onSelect={handleValueChange}
              name="idAnak"
            />
          )}
          <div className="mb-4">
            <label htmlFor="beratBadan" className="block mb-2 text-sm font-medium text-gray-700">
              Tanggal Lahir
            </label>
            <div className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none">
              {tanggalLahir ? new Date(tanggalLahir).toLocaleDateString() : '-'}
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
            ></input>
          </div>

          {tanggalLahir && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Pertama kali</label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="pertamaKali_ya"
                      name="pertamaKali"
                      value={true}
                      onChange={handleValueChange}
                      checked={formData.pertamaKali}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="pertamaKali_ya" className="ml-2 text-sm text-gray-700">
                      Ya
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="pertamaKali_tidak"
                      name="pertamaKali"
                      value={false}
                      onChange={handleValueChange}
                      checked={!formData.pertamaKali}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="pertamaKali_tidak" className="ml-2 text-sm text-gray-700">
                      Tidak
                    </label>
                  </div>
                </div>
              </div>
              {getVitaminA && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vitamin A</label>
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="vitA_ya"
                        name="vitaminA"
                        value={1}
                        onChange={handleValueChange}
                        checked={formData.vitaminA == 1}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="vitA_ya" className="ml-2 text-sm text-gray-700">
                        Ya
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="vitA_tidak"
                        name="vitaminA"
                        value={0}
                        onChange={handleValueChange}
                        checked={formData.vitaminA == 0}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="vitA_tidak" className="ml-2 text-sm text-gray-700">
                        Tidak
                      </label>
                    </div>
                  </div>
                </div>
              )}
              {canGetASIEksklusif && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ASI Eksklusif
                  </label>
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="MPASI_ya"
                        name="asiEksklusif"
                        value={1}
                        onChange={handleValueChange}
                        checked={formData.asiEksklusif == 1}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="MPASI_ya" className="ml-2 text-sm text-gray-700">
                        Ya
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="vitA_tidak"
                        name="asiEksklusif"
                        value={0}
                        onChange={handleValueChange}
                        checked={formData.asiEksklusif == 0}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="vitA_tidak" className="ml-2 text-sm text-gray-700">
                        Tidak
                      </label>
                    </div>
                  </div>
                </div>
              )}
              {canGetMPASI && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">MPASI</label>
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="MPASI_ya"
                        name="mpasi"
                        value={1}
                        onChange={handleValueChange}
                        checked={formData.mpasi == 1}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="MPASI_ya" className="ml-2 text-sm text-gray-700">
                        Ya
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="vitA_tidak"
                        name="mpasi"
                        value={0}
                        onChange={handleValueChange}
                        checked={formData.mpasi == 0}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="vitA_tidak" className="ml-2 text-sm text-gray-700">
                        Tidak
                      </label>
                    </div>
                  </div>
                </div>
              )}
              <Imunisasi age={ageInMonths} setData={setFormData} />
            </>
          )} 
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default HalamanTambahPemeriksaan;
