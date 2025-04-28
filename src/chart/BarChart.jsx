import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, Tooltip, XAxis } from "recharts"

import {
  ChartContainer,
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
};

// Helper function to format number into Million
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

export function BarCharts({ datas }) {

  const chartData = datas[0]?.map((month, index) => ({
    month,  // Country name
    desktop: Number(datas[1][index])  // Sales number
  }));

  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full">
      <BarChart
        data={chartData}
        margin={{ top: 20 }}
      >
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={3}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
          style={{ fill: "#000000" }}
        />
        <Tooltip
          cursor={false}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const { month, desktop } = payload[0].payload;
              return (
                <div className="rounded-md bg-white p-2 shadow-md border text-sm text-black">
                  <div>
                    {month}: {formatNumber(desktop)}
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5} barSize={25}>
          <LabelList
            dataKey="desktop"
            position="top"
            offset={10}
            fontSize={12}
            formatter={(value) => formatNumber(value)}
            style={{ fill: "#ffb3b3" }}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
