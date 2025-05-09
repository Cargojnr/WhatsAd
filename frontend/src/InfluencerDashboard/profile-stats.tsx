"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarChart, Eye, Star, TrendingUp } from "lucide-react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "./app-sidebar";
//for the chart
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

import IdashboardHeader from "./idashboard-header";
// Mock data for profile stats
const stats = {
  totalPromotions: 12,
  completedPromotions: 8,
  pendingPromotions: 3,
  rejectedPromotions: 1,
  averageViews: 15200,
  averageRating: 4.8,
  totalEarnings: 1550,
};

// Mock data for ratings
const ratings = [
  {
    id: "rating1",
    brand: "Fashion Brand Co.",
    campaign: "Summer Collection Promotion",
    rating: 5,
    feedback: "Great work! The content was exactly what we were looking for.",
    date: "2023-05-15",
  },
  {
    id: "rating2",
    brand: "Tech Gadgets Inc.",
    campaign: "Product Launch",
    rating: 4.5,
    feedback: "Good job showcasing our product features.",
    date: "2023-06-01",
  },
  {
    id: "rating3",
    brand: "Healthy Foods",
    campaign: "Organic Snacks Promotion",
    rating: 5,
    feedback: "Excellent promotion! We saw a significant increase in interest.",
    date: "2023-04-20",
  },
];

export function ProfileStats() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <IdashboardHeader />
        {/* <div className="space-y-8"> */}
        <div className="flex flex-1 flex-col gap-4 p-4 ">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Profile Stats</h2>
            <p className="text-muted-foreground">
              View your performance metrics and feedback
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Promotions
                </CardTitle>
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.totalPromotions}
                </div>
                <p className="text-xs text-muted-foreground">
                  All-time promotions
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Views
                </CardTitle>
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Eye className="h-5 w-5 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.averageViews.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Per WhatsApp Status
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Rating
                </CardTitle>
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Star className="h-4 w-4 text-yellow-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.averageRating}</div>
                <p className="text-xs text-muted-foreground">Out of 5 stars</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Completion Rate
                </CardTitle>
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <BarChart className="h-5 w-5 text-red-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(
                    (stats.completedPromotions / stats.totalPromotions) * 100
                  )}
                  %
                </div>
                <p className="text-xs text-muted-foreground">
                  {stats.completedPromotions} of {stats.totalPromotions}{" "}
                  completed
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Promotion Performance</CardTitle>
              <CardDescription>
                Breakdown of your promotion history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                    <span className="text-3xl font-bold text-green-500">
                      {stats.completedPromotions}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Completed
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                    <span className="text-3xl font-bold text-yellow-500">
                      {stats.pendingPromotions}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Pending
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                    <span className="text-3xl font-bold text-red-500">
                      {stats.rejectedPromotions}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Rejected
                    </span>
                  </div>
                </div>
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Total Visitors</CardTitle>
                      <CardDescription>
                        <span className="@[540px]/card:block hidden">
                          Total for the last 3 months
                        </span>
                        <span className="@[540px]/card:hidden">
                          Last 3 months
                        </span>
                      </CardDescription>
                      <CardContent className="flex h-full items-center justify-center w-full">
                        <ChartContainer
                          config={chartConfig}
                          className="aspect-auto h-[250px] w-full"
                        >
                          <AreaChart
                            data={chartData}
                            margin={{ left: 12, right: 12 }}
                          >
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
                {/* <div className="h-[200px] w-full rounded-md border border-dashed p-4">
                  <div className="flex h-full items-center justify-center">
                    <BarChart className="h-24 w-24 text-muted-foreground" />
                    <span className="ml-4 text-muted-foreground">
                      Promotion History Chart
                    </span>
                  </div>
                </div> */}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Brand Ratings & Feedback</CardTitle>
              <CardDescription>
                Ratings and feedback from brands you've worked with
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Brand</TableHead>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Feedback</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ratings.map((rating) => (
                    <TableRow key={rating.id}>
                      <TableCell className="font-medium">
                        {rating.brand}
                      </TableCell>
                      <TableCell>{rating.campaign}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{rating.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>{rating.feedback}</TableCell>
                      <TableCell>
                        {new Date(rating.date).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
