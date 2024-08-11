import { useMutation, useQuery } from '@tanstack/react-query';
import api from 'configs/api';
import PropTypes from 'prop-types';
import { useState } from 'react';

const ageGroups = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 18, 23, '24-59'];

const vaccineSchedule = [
  {
    name: 'Hepatitis B',
    schedule: [
      { start: 0, end: 0, color: 'bg-white' },
      { start: 1, end: 24, color: 'bg-gray-300' },
    ],
  },
  {
    name: 'BCG',
    schedule: [
      { start: 0, end: 1, color: 'bg-white' },
      { start: 2, end: 11, color: 'bg-yellow-300' },
      { start: 12, end: 24, color: 'bg-gray-300' },
    ],
  },
  {
    name: 'Polio tetes 1',
    schedule: [
      { start: 0, end: 1, color: 'bg-white' },
      { start: 2, end: 11, color: 'bg-yellow-300' },
      { start: 12, end: 24, color: 'bg-orange-300' },
    ],
  },
  {
    name: 'DPT-HB-Hib 1',
    schedule: [
      { start: 0, end: 1, color: 'bg-gray-300' },
      { start: 2, end: 2, color: 'bg-white' },
      { start: 3, end: 11, color: 'bg-yellow-300' },
      { start: 12, end: 24, color: 'bg-orange-300' },
    ],
  },
  {
    name: 'Polio Tetes 2',
    schedule: [
      { start: 0, end: 1, color: 'bg-gray-300' },
      { start: 2, end: 2, color: 'bg-white' },
      { start: 3, end: 11, color: 'bg-yellow-300' },
      { start: 12, end: 24, color: 'bg-orange-300' },
    ],
  },
  {
    name: 'Rota Virus (RV)1*',
    schedule: [
      { start: 0, end: 1, color: 'bg-gray-300' },
      { start: 2, end: 2, color: 'bg-white' },
      { start: 3, end: 6, color: 'bg-yellow-300' },
      { start: 6, end: 24, color: 'bg-gray-300' },
    ],
  },
  {
    name: 'PCV 1',
    schedule: [
      { start: 0, end: 1, color: 'bg-gray-300' },
      { start: 2, end: 2, color: 'bg-white' },
      { start: 3, end: 11, color: 'bg-yellow-300' },
      { start: 12, end: 24, color: 'bg-orange-300' },
    ],
  },
  {
    name: 'DPT-HB-Hib 2',
    schedule: [
      { start: 0, end: 2, color: 'bg-gray-300' },
      { start: 3, end: 3, color: 'bg-white' },
      { start: 3, end: 11, color: 'bg-yellow-300' },
      { start: 12, end: 24, color: 'bg-orange-300' },
    ],
  },
  {
    name: 'Polio tetes 3',
    schedule: [
      { start: 0, end: 2, color: 'bg-gray-300' },
      { start: 3, end: 3, color: 'bg-white' },
      { start: 3, end: 11, color: 'bg-yellow-300' },
      { start: 12, end: 24, color: 'bg-orange-300' },
    ],
  },
  {
    name: 'Rota Virus (RV)2*',
    schedule: [
      { start: 0, end: 2, color: 'bg-gray-300' },
      { start: 3, end: 3, color: 'bg-white' },
      { start: 3, end: 6, color: 'bg-yellow-300' },
      { start: 6, end: 24, color: 'bg-gray-300' },
    ],
  },
  {
    name: 'PCV 2',
    schedule: [
      { start: 0, end: 3, color: 'bg-gray-300' },
      { start: 4, end: 4, color: 'bg-white' },
      { start: 5, end: 11, color: 'bg-yellow-300' },
      { start: 12, end: 24, color: 'bg-orange-300' },
    ],
  },
  {
    name: 'DPT-HB-Hib 3',
    schedule: [
      { start: 0, end: 3, color: 'bg-gray-300' },
      { start: 4, end: 4, color: 'bg-white' },
      { start: 5, end: 11, color: 'bg-yellow-300' },
      { start: 12, end: 24, color: 'bg-orange-300' },
    ],
  },
  {
    name: 'Polio Tetes 4',
    schedule: [
      { start: 0, end: 3, color: 'bg-gray-300' },
      { start: 4, end: 4, color: 'bg-white' },
      { start: 5, end: 11, color: 'bg-yellow-300' },
      { start: 12, end: 24, color: 'bg-orange-300' },
    ],
  },
  {
    name: 'Polio Suntik (IPV) 1',
    schedule: [
      { start: 0, end: 3, color: 'bg-gray-300' },
      { start: 4, end: 4, color: 'bg-white' },
      { start: 5, end: 11, color: 'bg-yellow-300' },
      { start: 12, end: 24, color: 'bg-orange-300' },
    ],
  },
  {
    name: 'Rota Virus (RV) 3*',
    schedule: [
      { start: 0, end: 3, color: 'bg-gray-300' },
      { start: 4, end: 4, color: 'bg-white' },
      { start: 5, end: 6, color: 'bg-yellow-300' },
      { start: 7, end: 24, color: 'bg-gray-300' },
    ],
  },
  {
    name: 'Campak-Rubella (MR)',
    schedule: [
      { start: 0, end: 8, color: 'bg-gray-300' },
      { start: 9, end: 9, color: 'bg-white' },
      { start: 10, end: 11, color: 'bg-yellow-300' },
      { start: 12, end: 24, color: 'bg-orange-300' },
    ],
  },
  {
    name: 'Pola Suntik (IPV) 2',
    schedule: [
      { start: 0, end: 8, color: 'bg-gray-300' },
      { start: 9, end: 9, color: 'bg-white' },
      { start: 10, end: 11, color: 'bg-yellow-300' },
      { start: 12, end: 24, color: 'bg-orange-300' },
    ],
  },
  {
    name: 'Japanese Encephalitis (JE)*',
    schedule: [
      { start: 0, end: 9, color: 'bg-gray-300' },
      { start: 10, end: 10, color: 'bg-white' },
      { start: 11, end: 24, color: 'bg-orange-300' },
    ],
  },
  {
    name: 'PCV 3',
    schedule: [
      { start: 0, end: 11, color: 'bg-gray-300' },
      { start: 12, end: 12, color: 'bg-white' },
      { start: 13, end: 23, color: 'bg-yellow-300' },
      { start: 23, end: 24, color: 'bg-orange-300' },
    ],
  },
  {
    name: 'DPT-HB-Hib Lanjutan',
    schedule: [
      { start: 0, end: 12, color: 'bg-gray-300' },
      { start: 13, end: 13, color: 'bg-white' },
      { start: 22, end: 23, color: 'bg-yellow-300' },
      { start: 23, end: 24, color: 'bg-orange-300' },
    ],
  },
  {
    name: 'Campak-Rubella (MR) Lanjutan',
    schedule: [
      { start: 0, end: 12, color: 'bg-gray-300' },
      { start: 18, end: 18, color: 'bg-white' },
      { start: 22, end: 23, color: 'bg-yellow-300' },
      { start: 23, end: 24, color: 'bg-orange-300' },
    ],
  },
];

const VaccinationSchedule = ({ idAnak }) => {
  const [checkedVaccine, setCheckedVaccine] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVaccine, setSelectedVaccine] = useState(null);

  useQuery({
    queryKey: ['fetchVaccineData', idAnak],
    queryFn: async () => {
      const response = await api.get(`/immunisation/${idAnak}`);
      const { data } = response.data;
      const items = data?.imunisasi ? [...data.imunisasi] : [];
      setCheckedVaccine((prev) => [...prev, ...items]);
      return data;
    },
    refetchOnWindowFocus: false,
  });

  const updateImmunisationMutation = useMutation({
    mutationFn: async (newImunisasi) => {
      await api.put(`/immunisation/${idAnak}`, {
        imunisasi: newImunisasi,
      });
    },
  });

  const handleCheckboxChange = async (vaccineName, ageGroup) => {
    if (checkedVaccine.some((a) => a.name === `${vaccineName}_${ageGroup}`)) {
      setCheckedVaccine((prev) => prev.filter((a) => a.name !== `${vaccineName}_${ageGroup}`));
    } else {
      setSelectedVaccine({ name: vaccineName, ageGroup });
      setShowModal(true);
    }
  };

  const handleConfirmVaccine = (date) => {
    setCheckedVaccine((prev) => {
      const newVaccine = { name: `${selectedVaccine.name}_${selectedVaccine.ageGroup}`, date };
      const updatedArray = prev.filter((item) => !item.name.startsWith(`${selectedVaccine.name}_`));
      const newArray = [...updatedArray, newVaccine];
      updateImmunisationMutation.mutate(newArray);
      return newArray;
    });
    setShowModal(false);
  };

  const getCellColor = (schedule, index) => {
    const ageGroup = ageGroups[index];
    const ageValue = typeof ageGroup === 'string' ? parseInt(ageGroup.split('-')[0]) : ageGroup;
    const relevantSchedule = schedule.find(
      (s) => ageValue >= s.start && ageValue <= (s.end || s.start)
    );
    return relevantSchedule ? relevantSchedule.color : 'bg-white';
  };

  return (
    <div className="overflow-x-auto text-sm mt-4">
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-teal-100">
            <th className="sticky left-0 z-1 border border-gray-200 min-w-[150px] bg-teal-100">
              UMUR
            </th>
            {ageGroups.map((age) => (
              <th
                key={age}
                className="border border-gray-200 px-5 py-2 min-w-fit last:px-0 last:min-w-20"
              >
                {age}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="sticky left-0 z-1  bg-[#8ac7e1] text-center font-bold border border-gray-200 p-3">
              Jenis Vaksin
            </td>
            <td
              colSpan={16}
              className="bg-[#8ac7e1] text-center font-bold border border-gray-200 p-3"
            >
              Tanggal Pemberian dan Paraf Petugas
            </td>
          </tr>

          {vaccineSchedule.map((vaccine) => {
            const isRowChecked = checkedVaccine.some((item) =>
              item.name.startsWith(`${vaccine.name}_`)
            );
            return (
              <tr key={vaccine.name}>
                <td
                  className={`sticky left-0 z-1 border border-gray-200 p-3 ${
                    isRowChecked ? 'bg-green-500 text-white' : 'bg-white'
                  }`}
                >
                  {vaccine.name}
                </td>
                {ageGroups.map((_, index) => {
                  const cellColor = getCellColor(vaccine.schedule, index);
                  const checkboxId = `${vaccine.name}_${ageGroups[index]}`;

                  const isThisCheckboxChecked = checkedVaccine.some(
                    (item) => item.name === checkboxId
                  );

                  return (
                    <td
                      key={index}
                      className={`border border-gray-200 p-3 ${cellColor} text-center`}
                    >
                      {cellColor !== 'bg-gray-300' && (!isRowChecked || isThisCheckboxChecked) && (
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-blue-600"
                          checked={isThisCheckboxChecked}
                          onChange={() => handleCheckboxChange(vaccine.name, ageGroups[index])}
                        />
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {showModal && (
        <VaccineConfirmationModal
          onConfirm={handleConfirmVaccine}
          onCancel={() => setShowModal(false)}
          vaccineName={selectedVaccine?.name}
        />
      )}
    </div>
  );
};

const VaccineConfirmationModal = ({ onConfirm, onCancel, vaccineName }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-bold">{`Konfirmasi Imunisasi ${vaccineName}`}</h3>
        <div className="mt-3">
          <label className="block">Tanggal Imunisasi:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-2"
          />
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2"
          >
            Batal
          </button>
          <button
            onClick={() => onConfirm(date)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

VaccinationSchedule.propTypes = {
  idAnak: PropTypes.string,
};

VaccineConfirmationModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  vaccineName: PropTypes.string,
};

export default VaccinationSchedule;
