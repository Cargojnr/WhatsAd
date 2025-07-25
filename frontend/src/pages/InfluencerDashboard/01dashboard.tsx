import { getPendingPromotionRequestsCount } from "./campaign-requests";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BadgeCent, Eye, ShoppingBag, TrendingUp } from "lucide-react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";

import { AppSidebar } from "./app-sidebar";

import { Link } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import IdashboardHeader from "./idashboard-header";
import { EarningsCharts } from "./earnings-charts";
import { ProfileStatsCharts } from "./profile_stats-charts";
const campaignRequests: {
  title: string;
  brand: string;
  status: string;
  badgeClass: string;
  variant: "outline" | "secondary" | "default" | "destructive";
}[] = [
  {
    title: "Summer Sale Promotion",
    brand: "Fashion Brand Co.",
    status: "New",
    badgeClass: "border-green-600 text-green-600",
    variant: "outline",
  },
  {
    title: "Product Launch",
    brand: "Tech Gadgets Inc.",
    status: "Pending",
    badgeClass: "bg-yellow-100 text-yellow-800",
    variant: "secondary",
  },
  {
    title: "Brand Awareness",
    brand: "Healthy Foods",
    status: "Accepted",
    badgeClass: "bg-blue-600 text-white",
    variant: "default",
  },
];

export default function Page() {
  const [isAvailable, setIsAvailable] = useState(true);

  const stats = {
    pendingRequests: 3,
    totalEarnings: 1250,
    completedPromotions: 8,
    viewCount: 1520,
  };
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <IdashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Influencer Dashboard
              </h2>
              <p className="text-muted-foreground">
                Welcome back! Here's an overview of your influencer account.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="availability"
                checked={isAvailable}
                onCheckedChange={setIsAvailable}
              />
              <Label
                htmlFor="availability"
                className={isAvailable ? "text-green-600" : "text-gray-500"}
              >
                {isAvailable ? "Available for Promotions" : "Not Available"}
              </Label>
            </div>
          </div>
          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Requests
                </CardTitle>
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <ShoppingBag className="h-5 w-5 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {/* {stats.pendingRequests} */}
                  {getPendingPromotionRequestsCount()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Awaiting your response
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/campaign-requests" className="w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    View Requests{" "}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Earnings
                </CardTitle>
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <BadgeCent className="h-5 w-5 text-yellow-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  GH₵{stats.totalEarnings}
                </div>
                <p className="text-xs text-muted-foreground">
                  Lifetime earnings
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/earnings" className="w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    View Earnings
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Completed Promotions
                </CardTitle>
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.completedPromotions}
                </div>
                <p className="text-xs text-muted-foreground">
                  Successfully completed
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/status-tracker" className="w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    View History
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  WhatsApp Views
                </CardTitle>
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Eye className="h-5 w-5 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.viewCount.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Average daily views
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/profile-stats" className="w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    View Stats
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          <div className="grid auto-rows-min gap-4 md:grid-cols-2 mt-20">
            <EarningsCharts />
            <ProfileStatsCharts />
          </div>
          <div className="grid auto-rows-min gap-4 md:grid-cols-1 mt-20">
            <Card>
              <CardHeader>
                <CardTitle>Recent Campaign Requests</CardTitle>
                <CardDescription>
                  Your most recent promotion requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaignRequests.map((req, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <ShoppingBag className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {req.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {req.brand}
                        </p>
                      </div>
                      <Badge variant={req.variant} className={req.badgeClass}>
                        {req.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/campaign-requests" className="w-full">
                  <Button variant="outline" className="w-full">
                    View All Requests
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
