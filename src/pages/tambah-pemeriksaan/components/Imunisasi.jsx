import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';

const Imunisasi = ({ age, setData }) => {
  const [listImunisasi, setListImunisasi] = useState([]);

  const imunisasiMap = {
    0: ['Hepatitis B'],
    1: ['BCG', 'OPV1'],
    2: ['DPT-HB-Hib 1', 'OPV2'],
    3: ['DPT-HB-Hib 2', 'OPV3'],
    4: ['DPT-HB-Hib 3', 'OPV4'],
    9: ['Campak/MR'],
    '18-24': ['DPT-HB-HiB', 'Campak/MR'],
  };

  const handleChange = (e) => {
    const { value } = e.target;
    if (e.target.checked) {
      setListImunisasi([...listImunisasi, value]);
    } else {
      setListImunisasi(listImunisasi.filter((item) => item !== value));
    }
  };

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      imunisasi: listImunisasi,
    }));
  }, [listImunisasi]);

  const imunisasiCheck = useCallback((age) => {
    if (age >= 18 && age <= 24) {
      return imunisasiMap['18-24'];
    }
    const imunisasi = imunisasiMap[age];
    if (imunisasi) {
      return imunisasi;
    }
    return [];
  }, []);

  const isAvailable = useMemo(() => {
    return imunisasiCheck(age).length > 0;
  }, []);

  if (isAvailable) {
    return (
      <div className="form-group my-4">
        <label htmlFor="imunisasi">Imunisasi</label>
        {imunisasiCheck(age).map((imunisasi, index) => (
          <div key={index} className="form-check">
            <input
              type="checkbox"
              id={imunisasi}
              name={imunisasi}
              value={imunisasi}
              className="form-check-input"
              onChange={handleChange}
            />
            <label htmlFor={imunisasi} className="form-check-label">
              &nbsp;{imunisasi}
            </label>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

Imunisasi.propTypes = {
  age: PropTypes.string.isRequired,
  setData: PropTypes.func.isRequired,
};

export default Imunisasi;
