import React from 'react';
import ReactApexChart from 'react-apexcharts'; // ✅ Correct import

// Helper function to format numbers
const formatNumber = (num) => {
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + 'M';
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + 'K';
  }
  return num;
};

const LineCharts = ({ datas }) => {
  const series = [
    {
      name: 'Visitors', // ✅ A single string name
      data: datas[1]?.map((val) => Number(val)), // Convert to numbers
    },
  ];

  const options = {
    chart: {
      type: 'line',
      height: 90,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
      colors: ['#de0f3f'], // 🔥 Red line
    },
    xaxis: {
      categories: datas[0], // 🛠️ country names
      labels: {
        show: false,
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        show: false,
        formatter: (val) => formatNumber(val),
      },
    },
    tooltip: {
      theme: 'light',
      x: { show: false },
      y: {
        formatter: (value) => formatNumber(value),
      },
    },
    grid: {
      show: false,
    },
    markers: {
      size: 0,
    },
  };

  return (
    <div className="line1">
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default LineCharts;
