import { useQuery } from '@tanstack/react-query';
import MainLayout from 'components/MainLayout';
import PropTypes from 'prop-types';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaUser } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import { LiaClipboardListSolid } from 'react-icons/lia';
import { MdArrowBack } from 'react-icons/md';
import { TbPlus, TbSearch } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import childServices from 'services/child.services';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 grid place-items-center bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className=" p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{message}</h3>
          <div className="flex items-center px-4 py-3 gap-x-2 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

const HalamanDaftarAnak = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [childToDelete, setChildToDelete] = useState(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['getDaftarAnak'],
    queryFn: async () => {
      const response = await childServices.getChildren();
      return response.data;
    },
    refetchOnWindowFocus: false,
  });

  const openDeleteModal = (e, id, nama) => {
    e.preventDefault();
    e.stopPropagation();
    setChildToDelete({ id, nama });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setChildToDelete(null);
  };

  const handleDelete = async () => {
    if (!childToDelete) return;

    try {
      const response = await childServices.deleteChild(childToDelete.id);
      const { success } = response;
      if (success) {
        toast.success('Data berhasil dihapus');
        refetch();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Terjadi kesalahan saat menghapus data');
    }
    closeModal();
  };

  return (
    <MainLayout>
      {/* Header */}
      <header className="flex justify-between items-center px-4">
        <Link to="/" className="flex items-center text-[#4A5568]">
          <button className="mr-2">
            <MdArrowBack size={24} className="text-[#4A90E2]" />
          </button>
          <span className="text-lg font-semibold">Kembali</span>
        </Link>
        <Link
          to="/data/anak/tambah"
          className="font-semibold flex items-center gap-x-1 text-[#4A90E2]"
        >
          <TbPlus size={24} /> Tambah Anak
        </Link>
      </header>

      {/* Search Bar */}
      <div className="mx-4 mt-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Ketik untuk mencari nama anak"
            className="w-full p-2 pl-10 bg-white rounded-md border border-[#E5E9F0] shadow-md"
          />
          <TbSearch size={24} className="text-[#4A5568] absolute left-2 top-2" />
        </div>
      </div>

      {/* Total Anak */}
      <div className="mx-4 mt-4 flex gap-x-1 items-center text-[#4A5568]">
        <LiaClipboardListSolid size={24} />
        <span>Total anak: {data?.length || 0} anak</span>
      </div>

      <div className="mx-4 mt-4 space-y-3">
        {!isLoading &&
          data &&
          data.map((anak) => (
            <Link
              key={anak._id}
              to={`/data/anak/${anak._id}`}
              className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between border border-[#E5E9F0]"
            >
              <div className="flex items-center">
                <FaUser size={24} className="text-[#4A90E2] mr-3" />
                <h3 className="font-semibold text-[#4A5568]">{anak.nama}</h3>
              </div>
              <div className="flex items-center">
                <button
                  onClick={(e) => openDeleteModal(e, anak._id, anak.nama)}
                  className="text-red-500 hover:text-red-600 mr-3"
                >
                  <FaTrashCan size={20} />
                </button>
              </div>
            </Link>
          ))}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        message={`Apakah Anda yakin ingin menghapus data ${childToDelete?.nama}?`}
      />
    </MainLayout>
  );
};

export default HalamanDaftarAnak;
