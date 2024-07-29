import { useQuery } from '@tanstack/react-query';
import MainLayout from 'components/MainLayout';
import SearchableSelect from 'components/SearchableSelect';
import { IndexToMonthEnum } from 'enums/date';
import PropTypes from 'prop-types';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { IoArrowBack, IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import childServices from 'services/child.services';
import recordServices from 'services/record.services';
import KMSAnakComponent from '../../components/KMSAnak';
import Imunisasi from './components/Imunisasi';

const calculateAgeByMonth = (date, tanggalPencatatan) => {
  const today = new Date(tanggalPencatatan);
  const birthDate = new Date(date);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  return age * 12 + month;
};

const ResultModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;
  return (
    <div
      id="my-modal"
      className="fixed inset-0 grid place-items-center bg-gray-600 bg-opacity-50 h-full w-full z-50"
    >
      <div className="relative px-5 border max-h-[500px] overflow-y-auto w-96 shadow-lg rounded-md bg-white">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out"
          aria-label="Close modal"
        >
          <IoClose className="h-6 w-6" />
        </button>
        <div className="mt-3">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Hasil Pemeriksaan</h3>
          <div className="mt-2 py-3">
            <div className="text-sm text-gray-500">
              <p className="mb-2">
                <strong>Usia:</strong> {data.usia} bulan
              </p>
              <p className="mb-2">
                <strong>Berat Badan:</strong> {data.beratBadan} kg
              </p>
              <p className="mb-2">
                <strong>Tinggi Badan:</strong> {data.tinggiBadan} cm
              </p>
              <p className="mb-2">
                <strong>Jenis Kelamin:</strong>{' '}
                {data.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
              </p>
              <div className="mb-2">
                <strong>Status:</strong>
                <div className="flex flex-wrap gap-2 mt-1">
                  <span className="bg-gray-200 text-xs font-medium px-2.5 py-0.5 rounded">
                    {data.status['bb/u']}
                  </span>
                  <span className="bg-gray-200 text-xs font-medium px-2.5 py-0.5 rounded">
                    {data.status['tb/u']}
                  </span>
                  <span className="bg-gray-200 text-xs font-medium px-2.5 py-0.5 rounded">
                    {data.status['bb/tb']}
                  </span>
                </div>
              </div>
              {data.imunisasi.length > 0 && (
                <div className="mb-2">
                  <strong>Imunisasi:</strong>
                  <div className="mt-1">
                    {data.imunisasi.map((imun, index) => (
                      <div key={index} className="flex items-center mb-1">
                        <input
                          type="checkbox"
                          checked
                          readOnly
                          className="form-checkbox h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2 text-sm">{imun}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <KMSAnakComponent id={data.idAnak} />
      </div>
    </div>
  );
};

ResultModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object,
};

const HalamanTambahPemeriksaan = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState(null);

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

  const tanggalPencatatan = formData.tanggalPencatatan;

  const date = new Date();
  const ageInMonths = calculateAgeByMonth(tanggalLahir, tanggalPencatatan);

  const month = IndexToMonthEnum[date.getMonth()];

  const getVitaminA =
    ageInMonths >= 6 && ageInMonths <= 60 && month === 'Februari' && month === 'Agustus';
  const canGetASI = ageInMonths <= 24;
  const canGetMPASI = ageInMonths >= 6 && ageInMonths <= 24;

  const createHealthRecord = async (e) => {
    e.preventDefault();

    try {
      const response = await recordServices.createRecord({
        ...formData,
        jenisKelamin,
        usia: ageInMonths,
      });
      const { success, data } = response;

      if (success) {
        toast.success('Data pemeriksaan ditambahkan');
        setResult(data);
        setShowModal(true);
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
              className="w-full h-10 px-3 py-2 border border-[#E5E9F0] rounded-md focus:outline-none"
              onChange={handleValueChange}
              value={tanggalPencatatan}
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
            <div className="w-full h-10 px-3 py-2 border border-[#E5E9F0] rounded-md focus:outline-none">
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
              className="w-full h-10 px-3 py-2 border border-[#E5E9F0] rounded-md focus:outline-none"
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
              className="w-full h-10 px-3 py-2 border border-[#E5E9F0] rounded-md focus:outline-none"
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
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-[#E5E9F0]"
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
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-[#E5E9F0]"
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
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-[#E5E9F0]"
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
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-[#E5E9F0]"
                      />
                      <label htmlFor="vitA_tidak" className="ml-2 text-sm text-gray-700">
                        Tidak
                      </label>
                    </div>
                  </div>
                </div>
              )}
              {canGetASI && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">ASI</label>
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="ASI_ya"
                        name="asi"
                        value={1}
                        onChange={handleValueChange}
                        checked={formData.asi == 1}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-[#E5E9F0]"
                      />
                      <label htmlFor="ASI_ya" className="ml-2 text-sm text-gray-700">
                        Ya
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="ASI_tidak"
                        name="asi"
                        value={0}
                        onChange={handleValueChange}
                        checked={formData.asi == 0}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-[#E5E9F0]"
                      />
                      <label htmlFor="ASI_tidak" className="ml-2 text-sm text-gray-700">
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
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-[#E5E9F0]"
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
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-[#E5E9F0]"
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
            className="w-fit py-2 px-4 bg-[#4A90E2] text-white font-semibold rounded-md"
          >
            Tambah
          </button>
        </form>
      </div>
      <ResultModal
        isOpen={showModal}
        onClose={() => {
          navigate('/pemeriksaan');
          setShowModal(false);
        }}
        data={result}
      />
    </MainLayout>
  );
};

export default HalamanTambahPemeriksaan;
