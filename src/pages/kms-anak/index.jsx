import KMSAnakComponent from 'components/KMSAnak';
import MainLayout from 'components/MainLayout';
import { useParams } from 'react-router-dom';

const HalamanKMSAnak = () => {
  const { id } = useParams();

  return (
    <MainLayout>
      <div className="px-5">
        <KMSAnakComponent id={id} />
      </div>
    </MainLayout>
  );
};

export default HalamanKMSAnak;
