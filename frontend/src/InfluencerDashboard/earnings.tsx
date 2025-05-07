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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BadgeCent, LineChart } from "lucide-react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "./app-sidebar";

import IdashboardHeader from "./idashboard-header";

const earnings = [
  {
    id: "PAY001",
    campaign: "Summer Sale Promotion",
    brand: "Fashion Brand Co.",
    amount: "GH₵350",
    status: "paid",
    date: "2023-05-15",
  },
  {
    id: "PAY002",
    campaign: "Product Launch",
    brand: "Tech Gadgets Inc.",
    amount: "GH₵500",
    status: "pending",
    date: "2023-06-01",
  },
  {
    id: "PAY003",
    campaign: "Brand Awareness",
    brand: "Healthy Foods",
    amount: "GH₵300",
    status: "paid",
    date: "2023-04-20",
  },
  {
    id: "PAY004",
    campaign: "Holiday Special",
    brand: "Gift Shop Online",
    amount: "GH₵400",
    status: "processing",
    date: "2023-06-10",
  },
];

export function EarningsOverview() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <IdashboardHeader />
        <div className="flex flex-1 flex-col gap-3 md:p-8 ">
          {/* <div className="space-y-8"> */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Earnings</h2>
            <p className="text-muted-foreground">
              Track your earnings from WhatsApp Status campaigns
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Earnings
                </CardTitle>
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                  <BadgeCent className="h-4 w-4 text-yellow-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">GH₵1,550</div>
                <p className="text-xs text-muted-foreground">
                  Lifetime earnings
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                  <BadgeCent className="h-4 w-4 text-yellow-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">GH₵900</div>
                <p className="text-xs text-muted-foreground">To be paid</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  This Month
                </CardTitle>
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                  <BadgeCent className="h-4 w-4 text-yellow-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">GH₵500</div>
                <p className="text-xs text-muted-foreground">
                  +GH₵200 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Per Campaign
                </CardTitle>
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                  <BadgeCent className="h-4 w-4 text-yellow-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">GH₵387</div>
                <p className="text-xs text-muted-foreground">
                  Based on 4 campaigns
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Earnings Over Time</CardTitle>
              <CardDescription>Your earnings history by month</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <div className="flex h-full items-center justify-center rounded-md border border-dashed p-4">
                <LineChart className="h-24 w-24 text-muted-foreground" />
                <span className="ml-4 text-muted-foreground">
                  Earnings Chart
                </span>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Transactions</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>
                    A record of all your earnings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Campaign</TableHead>
                        <TableHead>Brand</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {earnings.map((earning) => (
                        <TableRow key={earning.id}>
                          <TableCell className="font-medium">
                            {earning.campaign}
                          </TableCell>
                          <TableCell>{earning.brand}</TableCell>
                          <TableCell>{earning.amount}</TableCell>
                          <TableCell>
                            {new Date(earning.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                earning.status === "paid"
                                  ? "default"
                                  : earning.status === "pending"
                                  ? "outline"
                                  : "secondary"
                              }
                            >
                              {earning.status.charAt(0).toUpperCase() +
                                earning.status.slice(1)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pending">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Transactions</CardTitle>
                  <CardDescription>
                    Earnings that haven't been paid yet
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Campaign</TableHead>
                        <TableHead>Brand</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Expected Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {earnings
                        .filter((earning) => earning.status !== "paid")
                        .map((earning) => (
                          <TableRow key={earning.id}>
                            <TableCell className="font-medium">
                              {earning.campaign}
                            </TableCell>
                            <TableCell>{earning.brand}</TableCell>
                            <TableCell>{earning.amount}</TableCell>
                            <TableCell>
                              {new Date(earning.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  earning.status === "pending"
                                    ? "outline"
                                    : "secondary"
                                }
                              >
                                {earning.status.charAt(0).toUpperCase() +
                                  earning.status.slice(1)}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="paid">
              <Card>
                <CardHeader>
                  <CardTitle>Paid Transactions</CardTitle>
                  <CardDescription>
                    Earnings that have been paid
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Campaign</TableHead>
                        <TableHead>Brand</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {earnings
                        .filter((earning) => earning.status === "paid")
                        .map((earning) => (
                          <TableRow key={earning.id}>
                            <TableCell className="font-medium">
                              {earning.campaign}
                            </TableCell>
                            <TableCell>{earning.brand}</TableCell>
                            <TableCell>{earning.amount}</TableCell>
                            <TableCell>
                              {new Date(earning.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Badge>
                                {earning.status.charAt(0).toUpperCase() +
                                  earning.status.slice(1)}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
