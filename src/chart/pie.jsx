// PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ datas }) => {
  const data = {
    labels: datas[0],
    datasets: [
      {
        data: datas[1],
        backgroundColor: ['#de0f3f', '#000000'], // Updated colors
        borderColor: ['#ffffff', '#ffffff'],      // Keeping white border for contrast
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#000000', // Legend text color (black)
        },
      },
    },
  };

  return (
    <div className='text-center h-[95%] flex justify-center'>
      <Pie className='pie' data={data} options={options} />
    </div>
  );
};

export default PieChart;
