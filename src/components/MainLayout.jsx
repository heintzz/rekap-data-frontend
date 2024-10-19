import Header from 'components/Header';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Menu from './Menu';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isLoginRoute = location.pathname === '/login';

  return (
    <div className="bg-neutral-100 grid place-content-center">
      <Header />
      <div className="flex flex-col bg-[#F9FAFC] w-screen max-w-[425px] overflow-y-hidden min-h-[100dvh] pt-[72px] relative pb-20">
        {children}
      </div>
      {!isLoginRoute && <Menu />}
    </div>
  );
};

export default MainLayout;

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
