import KMSAnakComponent from 'components/KMSAnak';
import MainLayout from 'components/MainLayout';
import { MdArrowBack } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';

const HalamanKMSAnak = () => {
  const { id } = useParams();

  return (
    <MainLayout>
      <div className="px-4">
        <div className="flex items-center mb-4">
          <Link to="/" className="mr-2">
            <MdArrowBack size={24} className="text-[#4A90E2]" />
          </Link>
          <h1 className="text-[#4A5568] font-semibold text-lg">KMS Anak</h1>
        </div>
        <KMSAnakComponent id={id} />
      </div>
    </MainLayout>
  );
};

export default HalamanKMSAnak;
