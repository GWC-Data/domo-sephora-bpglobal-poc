import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart1 = ({ datas }) => {
  const data = {
    labels: datas[0],
    datasets: [
      {
        label: 'Sales',
        data: datas[1],
        backgroundColor: ['#de0f3f', '#000000'], // Updated colors
        borderRadius: 6, // Rounded bars
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        display: true,
        callbacks: {
          label: function (context) {
            const value = context.parsed.y || 0;
            if (value >= 1e6) return (value / 1e6).toFixed(1) + 'M';
            if (value >= 1e3) return (value / 1e3).toFixed(1) + 'K';
            return value;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#4b5563',
          font: {
            size: 9,
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-full h-full p-2"> 
      <Bar className='bar1 hgt' data={data} options={options} />
    </div>
  );
};

export default BarChart1;
