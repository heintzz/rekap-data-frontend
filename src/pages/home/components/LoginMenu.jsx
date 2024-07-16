import { FaUserNurse } from 'react-icons/fa';
import { RiAdminLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const menu = [
  {
    name: 'Kader',
    icon: <FaUserNurse size={32} />,
    link: '/dashboard/kader',
  },
  {
    name: 'Admin',
    icon: <RiAdminLine size={32} />,
    link: '/dashboard/admin',
  },
];

export default function LoginMenu() {
  return (
    <div id="login-menu" className="flex gap-x-16 px-5 justify-center">
      {menu.map((item) => (
        <Link to="/login" key={item.name}>
          <div className="flex flex-col gap-y-1 items-center justify-between">
            <div className="grid place-content-center h-16 w-16 bg-gray-200 rounded-md">
              {item.icon}
            </div>
            <p className="text-center">{item.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
