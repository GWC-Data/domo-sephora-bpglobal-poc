import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#3b3b3b",
  },
  mobile: {
    label: "Mobile",
    color: "#3b3b3b",
  },
  label: {
    color: "#ffb3b3",
  },
};

export function HorizontalBarChart({ data }) {
  // Preparing chartData from the input data
  const chartData = [
    {
      productName: "Male",
      desktop: parseFloat(data[1][0]), // Value for Male
    },
    {
      productName: "Female",
      desktop: parseFloat(data[1][1]), // Value for Female
    },
  ];

  return (
    <ChartContainer config={chartConfig} className="w-full h-[100px]">
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{
          left: 10,
          right: 16,
          top: 0,
          bottom: 16,
        }}
      >
        <YAxis
          dataKey="productName"
          type="category"
          tickLine={false}
          tickMargin={8}
          axisLine={false}
          style={{ fill: "#ffffff", fontSize: 12 }}
        />
        <XAxis type="number" hide />
        <ChartTooltip
          cursor={false}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const { productName, desktop } = payload[0].payload;
              return (
                <div className="rounded-md bg-white p-2 shadow-md text-xs text-black">
                  {productName}: {desktop}
                </div>
              );
            }
            return null;
          }}
        />
        <Bar
          dataKey="desktop"
          fill="var(--color-desktop)"
          radius={[4, 4, 4, 4]}
          barSize={24}
        >
          <LabelList
            dataKey="desktop"
            position="insideRight"
            offset={3}
            style={{ fill: "#ffffff" }}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
