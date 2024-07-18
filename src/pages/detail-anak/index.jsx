import { useQuery } from '@tanstack/react-query';
import MainLayout from 'components/MainLayout';
import moment from 'moment';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import childServices from 'services/child.services';

const dusun = ['Pegundungan', 'Simpar', 'Srandil'];

const HalamanDetailAnak = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useQuery({
    queryKey: ['getChildData', id],
    queryFn: async () => {
      const response = await childServices.getChild(id);
      setFormData(response.data);
      return response.data;
    },
    refetchOnWindowFocus: false,
  });

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      const response = await childServices.updateChildData(id, formData);
      const { success } = response;
      if (success) {
        toast.success('Data anak berhasil diubah');
        setIsEditing(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Terjadi kesalahan pada server');
    }
  };

  const EditIcon = () => (
    <button onClick={toggleEditMode} className="text-blue-500 hover:text-blue-700">
      {isEditing ? 'Batal' : 'Edit'}
    </button>
  );

  const renderField = (label, name, value, type = 'text') => (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      {isEditing ? (
        <input
          type={type}
          name={name}
          id={name}
          className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          value={value || ''}
          onChange={handleValueChange}
        />
      ) : (
        <div className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-gray-100">
          {value}
        </div>
      )}
    </div>
  );

  return (
    <MainLayout>
      <div className="px-5">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="mr-4">
              <IoArrowBack className="w-6 h-6 text-gray-600" />
            </button>
            <h2 className="text-2xl font-bold">Detail Anak</h2>
          </div>
          <EditIcon />
        </div>
        <form>
          {renderField('Nama', 'nama', formData?.nama)}
          {renderField('NIK', 'nik', formData?.nik)}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Kelamin</label>
            {isEditing ? (
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="laki"
                    name="jenisKelamin"
                    value="L"
                    onChange={handleValueChange}
                    checked={formData?.jenisKelamin === 'L'}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="laki" className="ml-2 text-sm text-gray-700">
                    Laki-laki
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="perempuan"
                    name="jenisKelamin"
                    value="P"
                    onChange={handleValueChange}
                    checked={formData?.jenisKelamin === 'P'}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="perempuan" className="ml-2 text-sm text-gray-700">
                    Perempuan
                  </label>
                </div>
              </div>
            ) : (
              <div className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-gray-100">
                {formData?.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
              </div>
            )}
          </div>

          {renderField(
            'Tanggal Lahir',
            'tglLahir',
            moment(formData?.tanggalLahir).format('YYYY-MM-DD'),
            'date'
          )}

          <div className="mb-4">
            <label htmlFor="dusun" className="block mb-2 text-sm font-medium text-gray-700">
              Dusun
            </label>
            {isEditing ? (
              <select
                name="dusun"
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                onChange={handleValueChange}
                value={formData?.alamat?.dusun || ''}
              >
                <option value="" disabled>
                  Pilih dusun
                </option>
                {dusun.map((d, index) => (
                  <option key={index} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            ) : (
              <div className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-gray-100">
                {formData?.alamat?.dusun}
              </div>
            )}
          </div>

          <div className="mb-4">
            <div className="grid grid-cols-2 gap-4">
              {renderField('RT', 'rt', formData?.alamat?.rt)}
              {renderField('RW', 'rw', formData?.alamat?.rw)}
            </div>
          </div>

          {isEditing && (
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Simpan
            </button>
          )}
        </form>
      </div>
    </MainLayout>
  );
};

export default HalamanDetailAnak;
