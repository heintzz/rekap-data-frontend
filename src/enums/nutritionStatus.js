const weightOverAgeColors = {
  WOA_0: '#FF4136', // Red
  WOA_1: '#FF851B', // Orange
  WOA_2: '#2ECC40', // Green
  WOA_3: '#FFDC00', // Yellow
};

const heightOverAgeColors = {
  HOA_0: '#FF4136', // Red
  HOA_1: '#FF851B', // Orange
  HOA_2: '#2ECC40', // Green
  HOA_3: '#39CCCC', // Teal
};

const weightOverHeightColors = {
  WOH_0: '#85144b', // Maroon
  WOH_1: '#FF4136', // Red
  WOH_2: '#2ECC40', // Green
  WOH_3: '#FFDC00', // Yellow
  WOH_4: '#FF851B', // Orange
  WOH_5: '#B10DC9', // Purple
};

const weightOverAgeEnumReversed = {
  'Berat badan sangat kurang': 'WOA_0',
  'Berat badan kurang': 'WOA_1',
  'Berat badan normal': 'WOA_2',
  'Risiko berat badan lebih': 'WOA_3',
};

const heightOverAgeStatusReversed = {
  'Sangat pendek': 'HOA_0',
  Pendek: 'HOA_1',
  Normal: 'HOA_2',
  Tinggi: 'HOA_3',
};

const weightOverHeightStatusReversed = {
  'Gizi buruk': 'WOH_0',
  'Gizi kurang': 'WOH_1',
  'Gizi normal': 'WOH_2',
  'Berisiko gizi lebih': 'WOH_3',
  'Gizi lebih (overweight)': 'WOH_4',
  Obesitas: 'WOH_5',
};

const getColor = (status, category) => {
  switch (category) {
    case 'bb/u':
      return weightOverAgeColors[weightOverAgeEnumReversed[status]];
    case 'tb/u':
      return heightOverAgeColors[heightOverAgeStatusReversed[status]];
    case 'bb/tb':
      return weightOverHeightColors[weightOverHeightStatusReversed[status]];
    default:
      return '#D3D3D3';
  }
};

const nutritionStatus = { getColor };

export default nutritionStatus;
