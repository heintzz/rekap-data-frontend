import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const BBPerU = ({ bbPerUmur, dataAnak }) => {
  const data = {
    labels: bbPerUmur?.umur,
    datasets: [
      {
        label: '-3 SD',
        data: bbPerUmur['-3_SD'],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        pointRadius: 0,
        borderWidth: 2,
        order: 7,
      },
      {
        label: '-2 SD',
        data: bbPerUmur['-2_SD'],
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        pointRadius: 0,
        borderWidth: 2,
        order: 6,
      },
      {
        label: '-1 SD',
        data: bbPerUmur['-1_SD'],
        borderColor: 'rgba(255, 205, 86, 1)',
        backgroundColor: 'rgba(255, 205, 86, 0.2)',
        pointRadius: 0,
        borderWidth: 2,
        order: 5,
      },
      {
        label: 'Median',
        data: bbPerUmur.median,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        pointRadius: 0,
        borderWidth: 2,
        order: 4,
      },
      {
        label: '+1 SD',
        data: bbPerUmur['+1_SD'],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        pointRadius: 0,
        borderWidth: 2,
        order: 3,
      },
      {
        label: '+2 SD',
        data: bbPerUmur['+2_SD'],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        pointRadius: 0,
        borderWidth: 2,
        order: 2,
      },
      {
        label: '+3 SD',
        data: bbPerUmur['+3_SD'],
        borderColor: 'rgba(201, 203, 207, 1)',
        backgroundColor: 'rgba(201, 203, 207, 0.2)',
        pointRadius: 0,
        borderWidth: 2,
        order: 1,
      },
      {
        label: 'Data Anak',
        data: bbPerUmur?.umur?.map((umur) => {
          const dataPoint = dataAnak?.find((d) => d.umur === umur);
          return dataPoint ? dataPoint.beratBadan : NaN;
        }),
        borderColor: 'rgba(0, 0, 0, 1)',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        pointRadius: 1,
        borderWidth: 2,
        order: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            family: "'Plus Jakarta Sans', sans-serif",
          },
        },
      },
      title: {
        display: true,
        text: ' KMS - BB/U',
        font: {
          family: "'Plus Jakarta Sans', sans-serif",
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        titleFont: {
          family: "'Plus Jakarta Sans', sans-serif",
        },
        bodyFont: {
          family: "'Plus Jakarta Sans', sans-serif",
        },
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + ' kg';
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Umur (bulan)',
          font: {
            family: "'Plus Jakarta Sans', sans-serif",
          },
        },
        ticks: {
          font: {
            family: "'Plus Jakarta Sans', sans-serif",
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Berat Badan (kg)',
          font: {
            family: "'Plus Jakarta Sans', sans-serif",
          },
        },
        min: 0,
        max: 30,
        ticks: {
          stepSize: 2,
          font: {
            family: "'Plus Jakarta Sans', sans-serif",
          },
        },
      },
    },
    elements: {
      line: {
        tension: 0.1,
      },
    },
    font: {
      family: "'Plus Jakarta Sans', sans-serif",
    },
  };

  return (
    <div style={{ width: '100%' }}>
      <Line options={options} data={data} height={400} />
    </div>
  );
};

BBPerU.propTypes = {
  bbPerUmur: PropTypes.shape({
    umur: PropTypes.arrayOf(PropTypes.number).isRequired,
    '-3_SD': PropTypes.arrayOf(PropTypes.number).isRequired,
    '-2_SD': PropTypes.arrayOf(PropTypes.number).isRequired,
    '-1_SD': PropTypes.arrayOf(PropTypes.number).isRequired,
    median: PropTypes.arrayOf(PropTypes.number).isRequired,
    '+1_SD': PropTypes.arrayOf(PropTypes.number).isRequired,
    '+2_SD': PropTypes.arrayOf(PropTypes.number).isRequired,
    '+3_SD': PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  dataAnak: PropTypes.arrayOf(
    PropTypes.shape({
      umur: PropTypes.number.isRequired,
      beratBadan: PropTypes.number.isRequired,
    })
  ),
};

export default BBPerU;
