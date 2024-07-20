import { useQuery } from '@tanstack/react-query';
import GrafikKMSAnak from 'components/GrafikKMS';
import PropTypes from 'prop-types';

import api from 'configs/api';

const KMSAnakComponent = ({ id }) => {
  const { data } = useQuery({
    queryKey: ['fetchChildRecord', id],
    queryFn: async () => {
      const response = await api.get(`/records/child/${id}`);
      const { data } = response.data;
      return data;
    },
  });

  const neededData = data?.map((child) => {
    return {
      umur: child.usia,
      beratBadan: child.beratBadan,
      tinggiBadan: child.tinggiBadan,
    };
  });

  return (
    <div className="px-5 pb-10 mt-5">
      <GrafikKMSAnak dataAnak={neededData} />
    </div>
  );
};

export default KMSAnakComponent;

KMSAnakComponent.propTypes = {
  id: PropTypes.string,
};
