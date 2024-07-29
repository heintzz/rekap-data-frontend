import { FaHandHoldingMedical } from 'react-icons/fa';
import { GoHomeFill } from 'react-icons/go';
import { HiMiniClipboardDocumentCheck } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 bg-white z-[3] flex justify-center shadow-sm border-t border-[#E5E9F0]">
      <div className="flex justify-around items-center w-full max-w-[425px] px-4">
        <Link to="/" className="flex flex-col items-center text-[#4A5568] hover:text-[#4A90E2]">
          <GoHomeFill size={24} />
          <span className="text-xs">Beranda</span>
        </Link>

        <Link
          to="/pemeriksaan/tambah"
          className="flex flex-col items-center text-[#4A5568] hover:text-[#4A90E2]"
        >
          <FaHandHoldingMedical size={24} />
          <span className="text-xs">Periksa</span>
        </Link>
        <Link
          to="/pemeriksaan"
          className="flex flex-col items-center text-[#4A5568] hover:text-[#4A90E2]"
        >
          <HiMiniClipboardDocumentCheck size={24} />
          <span className="text-xs">Riwayat</span>
        </Link>
      </div>
    </div>
  );
}
