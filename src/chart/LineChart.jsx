import React from 'react';
// import ReactApexChart from 'react-apexcharts'; // ✅ Correct import

// // Helper function to format numbers
// const formatNumber = (num) => {
//   if (num >= 1e6) {
//     return (num / 1e6).toFixed(1) + 'M';
//   } else if (num >= 1e3) {
//     return (num / 1e3).toFixed(1) + 'K';
//   }
//   return num;
// };

// const LineCharts = ({ datas }) => {
//   const series = [
//     {
//       name: 'Visitors', // ✅ A single string name
//       data: datas[1]?.map((val) => Number(val)), // Convert to numbers
//     },
//   ];

//   const options = {
//     chart: {
//       type: 'line',
//       height: 90,
//       toolbar: { show: false },
//       zoom: { enabled: false },
//     },
//     stroke: {
//       curve: 'smooth',
//       width: 2,
//       colors: ['#de0f3f'], // 🔥 Red line
//     },
//     xaxis: {
//       categories: datas[0], // 🛠️ country names
//       labels: {
//         show: false,
//       },
//       axisBorder: { show: false },
//       axisTicks: { show: false },
//     },
//     yaxis: {
//       labels: {
//         show: false,
//         formatter: (val) => formatNumber(val),
//       },
//     },
//     tooltip: {
//       theme: 'light',
//       x: { show: false },
//       y: {
//         formatter: (value) => formatNumber(value),
//       },
//     },
//     grid: {
//       show: false,
//     },
//     markers: {
//       size: 0,
//     },
//   };

//   return (
//     <div className="line1">
//       <ReactApexChart options={options} series={series} type="line" height={350} />
//     </div>
//   );
// };

// export default LineCharts;

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, Tooltip, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#ffb3b3",
  },
  mobile: {
    label: "Mobile",
    color: "#ffb3b3",
  },
}

export function LineCharts ({ datas }) {

  const formatNumber = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B'; // Converts to billions with one decimal place
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'; // Converts to millions with one decimal place
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'; // Converts to thousands with one decimal place
    }
    return new Intl.NumberFormat('en-US').format(num); // Default formatting
  };
  
  const chartData = datas[0]?.map((country, index) => ({
    country,  // Country name
    visitors: Number(datas[1][index])  // Corresponding visitors (converted to a number)
  }))


  
  return (
    
    <ChartContainer config={chartConfig} className="h-[90px] w-full">
      <LineChart
        accessibilityLayer
        data={chartData} // Use the converted chart data
        margin={{
          top: 12,
          left: 12,
          right: 12,
        }}
      >
        <Tooltip 
          content={({ payload }) => {
            if (payload && payload.length > 0) {
              const { country, visitors } = payload[0].payload
              return (
                <div style={{ padding: '5px', backgroundColor: '#fff', border: '1px solid #ccc' }}>
                  <strong>{`${country}: ${formatNumber(visitors)}`}</strong>
                </div>
              )
            }
            return null
          }}
        />
        <Line
          dataKey="visitors" // Updated to match the new field name
          type="natural"
          stroke="var(--color-desktop)" // You can also use chartConfig.desktop.color here
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}
