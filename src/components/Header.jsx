import SituntingIcon from 'assets/images/logo.png';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 h-14 bg-white z-[3] flex justify-center shadow-sm px-2 border-b border-[#E5E9F0]">
      <div className="flex relative justify-between items-center w-full max-w-[425px]">
        <div className="flex">
          <Link to="/" className="flex gap-x-1 items-center">
            <img src={SituntingIcon} alt="situnting icon" className="w-12" />
            <span className="font-semibold">SiTunting</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
