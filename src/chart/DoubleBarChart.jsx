import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
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
    color: "#b3b3ff",
  },
}

export function DoubleBarChart({ datas }) {

  const chartData = datas[1]?.reduce((acc, [channelType, month, totalSales]) => {
    // Check if the month exists in the accumulator
    let monthData = acc.find(item => item.month === month);
    
    if (!monthData) {
      // If the month doesn't exist, create a new entry for it
      monthData = { month };
      acc.push(monthData);
    }

    // Add the sales data for the current channel type
    if (channelType === "E-Commerce") {
      monthData.eCommerce = parseFloat(totalSales); // Convert to number
    } else if (channelType === "Store") {
      monthData.store = parseFloat(totalSales); // Convert to number
    }

    return acc;
  }, []);

  return (
    
        <ChartContainer config={chartConfig} className="w-full h-[200px]">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              style={{ fill: "#000000" }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="eCommerce" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="store" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
  )
}
