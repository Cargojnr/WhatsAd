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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Bell, User, LogOut } from "lucide-react";
import { AppSidebar } from "./app-sidebar";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
        {/* <div className="space-y-8"> */}
        <div className="flex flex-1 flex-col gap-3 md:p-8 ">
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
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
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
                <Eye className="h-4 w-4 text-muted-foreground" />
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
                <Star className="h-4 w-4 text-muted-foreground" />
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
                <BarChart className="h-4 w-4 text-muted-foreground" />
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
                <div className="h-[200px] w-full rounded-md border border-dashed p-4">
                  <div className="flex h-full items-center justify-center">
                    <BarChart className="h-24 w-24 text-muted-foreground" />
                    <span className="ml-4 text-muted-foreground">
                      Promotion History Chart
                    </span>
                  </div>
                </div>
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
