import PropTypes from 'prop-types';
import Header from 'components/Header';
import Menu from './Menu';

const MainLayout = ({ children }) => {
  return (
    <div className="bg-neutral-100 grid place-content-center">
      <Header />
      <div className="flex flex-col bg-white w-screen max-w-[425px] overflow-y-hidden min-h-[100dvh] pt-[72px] relative pb-20">
        {children}
      </div>
      <Menu />
    </div>
  );
};

export default MainLayout;

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
