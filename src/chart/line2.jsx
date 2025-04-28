import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Helper function to format numbers (29K, 30M)
const formatNumber = (num) => {
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + 'M';
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + 'K';
  }
  return num;
};

const LineChart2 = ({ datas }) => {
  console.log(datas);

  const data = {
    labels: datas[0],
    datasets: [
      {
        data: datas[1],
        borderColor: '#de0f3f',            
        tension: 0.4,
        fill: false,
        pointBackgroundColor: 'transparent',    
        pointBorderColor: 'transparent',       
        borderDash: [],                      
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#000',
        bodyColor: '#000',
        borderColor: '#ccc',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function (context) {
            const value = context.raw;
            return formatNumber(Number(value));
          }
        }
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  return <Line className="line2 hgt" data={data} options={options} />;
};

export default LineChart2;
