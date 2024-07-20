import PropTypes from 'prop-types';
import BBPerU from './KMSChart/BBPerU';
import TBPerU from './KMSChart/TBPerU';

import childData from '../../data';

export default function GrafikKMSAnak({ dataAnak }) {
  return (
    <>
      <BBPerU bbPerUmur={childData?.lakiLaki?.bbPerUmur} dataAnak={dataAnak} />
      <TBPerU tbPerUmur={childData?.lakiLaki?.tbPerUmur} dataAnak={dataAnak} />
    </>
  );
}

GrafikKMSAnak.propTypes = {
  dataAnak: PropTypes.array,
};
