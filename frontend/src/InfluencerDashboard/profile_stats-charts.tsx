import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
const chartData = [
  { month: "January", completed: 20, pending: 2, rejected: 1 },
  { month: "February", completed: 3, pending: 1, rejected: 0 },
  { month: "March", completed: 4, pending: 3, rejected: 1 },
  { month: "April", completed: 2, pending: 2, rejected: 0 },
  { month: "May", completed: 6, pending: 1, rejected: 1 },
  { month: "June", completed: 8, pending: 0, rejected: 9 },
];
const chartConfig = {
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-1))",
  },
  pending: {
    label: "Pending",
    color: "hsl(var(--chart-2))",
  },
  rejected: {
    label: "Rejected",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function ProfileStatsCharts() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription>
            <span className="@[540px]/card:block hidden">
              Total for the last 3 months
            </span>
            <span className="@[540px]/card:hidden">Last 3 months</span>
          </CardDescription>
          <CardContent className="flex h-full items-center justify-center w-full">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full"
            >
              <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
                {/* <defs>
                <linearGradient
                  id="fillDesktop"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--color-desktop)"
                    stopOpacity={1.0}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-desktop)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient
                  id="fillMobile"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--color-mobile)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-mobile)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs> */}
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Area
                  dataKey="completed"
                  type="natural"
                  fill="#4caf50"
                  fillOpacity={0.4}
                  stroke="#4caf50"
                  stackId="a"
                />
                <Area
                  dataKey="pending"
                  type="natural"
                  fill="#ffeb3b"
                  fillOpacity={0.4}
                  stroke="#ffeb3b"
                  stackId="a"
                />
                <Area
                  dataKey="rejected"
                  type="natural"
                  fill="#f44336"
                  fillOpacity={0.4}
                  stroke="#f44336"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
