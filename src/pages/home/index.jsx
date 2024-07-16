import MainLayout from 'components/MainLayout';
import Artikel from './components/Artikel';
import LoginMenu from './components/LoginMenu';
import PojokLiterasi from './components/PojokLiterasi';
import Slogan from './components/Slogan';
import VideoMateri from './components/VideoMateri';

const HomePage = () => {
  return (
    <MainLayout>
      <div className="px-5 grid gap-y-8">
        <Slogan />
        <LoginMenu />
        <Artikel />
        <PojokLiterasi />
        <VideoMateri />
      </div>
    </MainLayout>
  );
};

export default HomePage;
