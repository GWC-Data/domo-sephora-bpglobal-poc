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

const BarChart2 = ({ datas }) => {
  const data = {
    labels: datas[0],
    datasets: [
      {
        label: 'Votes',
        data: datas[1],
        backgroundColor: ['#de0f3f', '#000000'], // 🔥 Only Red and Black
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y', // 👉 Make it horizontal
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: {
        ticks: { color: '#4b5563', font: { size: 9 } },
        grid: { display: false },
      },
      y: {
        ticks: { color: '#4b5563', font: { size: 9 } },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="w-full h-full p-2">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart2;
