import { Sector, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function PieCharts({ data }) {
  // Ensure the data is in the expected format
  const chartData = data[0]?.map((category, index) => ({
    category: category,  // Category name like "Instore Purchase", "Sephora Ecom"
    sales: Number(data[1][index]),  // Sales values converted to numbers
    fill: index % 2 === 0 ? "#de0f3f" : "#3b3b3b", 
  }));

  const chartConfig = {
    label: {
      color: "#fff",
    },
  };

  

  return (
    <ChartContainer
      config={chartConfig}
      className="w-full mx-auto aspect-square max-h-[200px] "
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="sales"
          nameKey="category"
          innerRadius={60}
          strokeWidth={5}
          activeIndex={0}
          activeShape={({
            outerRadius = 0,
            ...props
          }) => (
            <Sector {...props} outerRadius={outerRadius + 10} />
          )}
        />
      </PieChart>
    </ChartContainer>
  );
}
