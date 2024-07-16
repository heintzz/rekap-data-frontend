import { FaHandHoldingMedical } from 'react-icons/fa';
import { GoHomeFill } from 'react-icons/go';
import { HiMiniClipboardDocumentCheck } from 'react-icons/hi2';
import { IoLogOut } from 'react-icons/io5';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from 'utils/auth';
import useAuth from '../hooks/useAuth';

export default function Menu() {
  const { setIsAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const authPath = ['/login', '/register', '/'];

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    navigate('/');
  };

  const restrictedWhenLoggedIn = authPath.includes(location.pathname);

  return restrictedWhenLoggedIn ? null : (
    <div className="fixed bottom-0 left-0 right-0 h-14 bg-gray-200 z-[3] flex justify-center shadow-sm">
      <div className="flex justify-around items-center w-full max-w-[425px] px-4">
        <Link to="/" className="flex flex-col items-center">
          <GoHomeFill size={24} />
          <span className="text-xs">Beranda</span>
        </Link>

        <Link to="/pemeriksaan/tambah" className="flex flex-col items-center">
          <FaHandHoldingMedical size={24} />
          <span className="text-xs">Periksa</span>
        </Link>
        <Link to="/pemeriksaan" className="flex flex-col items-center">
          <HiMiniClipboardDocumentCheck size={24} />
          <span className="text-xs">Riwayat</span>
        </Link>
        <button onClick={handleLogout} className="flex flex-col items-center">
          <IoLogOut size={24} />
          <span className="text-xs">Keluar</span>
        </button>
      </div>
    </div>
  );
}
