// import { AppSidebar1 } from "@/components/app-sidebar";
import { useState } from "react";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DollarSign,
  Eye,
  MessageSquare,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Bell, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppSidebar } from "./app-sidebar";

import { Link } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
        <header className="sticky top-0 z-40 border-b bg-background">
          {/* <SidebarTrigger className="-ml-1" /> */}

          <div className="container flex h-16 items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />

              <Link to="/" className="flex items-center gap-2">
                <span className="text-xl font-bold text-green-600">WhasAd</span>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/dashboard/notifications">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
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
                  {stats.pendingRequests}
                </div>
                <p className="text-xs text-muted-foreground">
                  Awaiting your response
                </p>
              </CardContent>
              <CardFooter>
                <Link to="" className="w-full">
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
                  <DollarSign className="h-5 w-5 text-yellow-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.totalEarnings}</div>
                <p className="text-xs text-muted-foreground">
                  Lifetime earnings
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/dashboard/earnings" className="w-full">
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
                <Link to="/dashboard/status-tracker" className="w-full">
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
                <Link to="/dashboard/profile-stats" className="w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    View Stats
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
          {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}

          <div className="grid auto-rows-min gap-4 md:grid-cols-2 mt-20">
            <Card>
              <CardHeader>
                <CardTitle>Recent Campaign Requests</CardTitle>
                <CardDescription>
                  Your most recent promotion requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {i === 1
                            ? "Summer Sale Promotion"
                            : i === 2
                            ? "Product Launch"
                            : "Brand Awareness"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {i === 1
                            ? "Fashion Brand Co."
                            : i === 2
                            ? "Tech Gadgets Inc."
                            : "Healthy Foods"}
                        </p>
                      </div>
                      <Badge
                        variant={
                          i === 1
                            ? "outline"
                            : i === 2
                            ? "secondary"
                            : "default"
                        }
                      >
                        {i === 1 ? "New" : i === 2 ? "Pending" : "Accepted"}
                      </Badge>
                    </div>
                  ))} */}
                  {campaignRequests.map((req, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <ShoppingBag className="h-5 w-5 text-muted-foreground" />
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
                <Link to="/dashboard/campaign-requests" className="w-full">
                  <Button variant="outline" className="w-full">
                    View All Requests
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>
                  Your most recent conversations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {i === 1
                            ? "Fashion Brand Co."
                            : i === 2
                            ? "Tech Gadgets Inc."
                            : "Healthy Foods"}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {i === 1
                            ? "When would you like to post the status?"
                            : i === 2
                            ? "Great! Our budget is $200 per post."
                            : "Thanks for your interest in our campaign."}
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {i === 1 ? "5m ago" : i === 2 ? "30m ago" : "2h ago"}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/dashboard/messages" className="w-full">
                  <Button variant="outline" className="w-full">
                    View All Messages
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
