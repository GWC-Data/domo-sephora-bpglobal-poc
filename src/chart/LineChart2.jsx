import { CartesianGrid, Line, LineChart, XAxis, Tooltip, LabelList } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

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

export function LineChartTwo({ datas }) {
  // Format the data for the chart
  const chartData = datas[0].map((month, index) => ({
    month,
    desktop: Number(datas[1][index]), // Convert string to number
  }));

  console.log("Formatted Chart Data:", chartData);  // Log formatted data

  // Number formatting function
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

  return (
    <ChartContainer config={chartConfig} className="w-full h-[200px]">
      <LineChart
        data={chartData}
        margin={{
          top: 12,
          left: 16,
          right: 16,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
          style={{ fill: "#000000" }}
        />
        {/* Try using the built-in Tooltip first */}
        <Tooltip
          cursor={false}
          content={({ payload }) => {
            console.log("Payload:", payload);  // Log the payload to see if it's populated
            if (payload && payload.length > 0) {
              const { month, desktop } = payload[0].payload;
              return (
                <ChartTooltipContent>
                  <div>{`${month}: ${formatNumber(desktop)}`}</div>
                </ChartTooltipContent>
              );
            }
            return null; // Don't render if no payload
          }}
        />
        <Line
          dataKey="desktop"
          type="natural"
          stroke="var(--color-desktop)"
          strokeWidth={2}
          dot={{
            fill: "var(--color-desktop)",
          }}
          activeDot={{
            r: 6,
          }}
        >

<LabelList
                position="top"
                offset={12}
                formatter={(value) => formatNumber(value)}
                className="fill-foreground"
                fontSize={12}
              />

        </Line>
      </LineChart>
    </ChartContainer>
  );
}
