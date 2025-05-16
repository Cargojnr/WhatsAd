import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BadgeCent,
  BarChart3,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";

import { BrandSidebar } from "./app-sidebar";

import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { BrandDashboardHeader } from "./brand-dashboard-headrer";

export default function BrandDashboardOverview() {
  const stats = {
    activeCampaigns: 3,
    totalBudget: 2500,
    activatedInfluencers: 12,
    averageReach: 45600,
  };
  return (
    <SidebarProvider>
      <BrandSidebar />
      <SidebarInset>
        <BrandDashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Brand Dashboard
              </h2>
              <p className="text-muted-foreground">
                Welcome back! Here's an overview of your campaigns and
                performance.
              </p>
            </div>
            <Button asChild className="bg-green-600 text-white">
              <Link to="/campaigns/new">Create New Campaign</Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Campaigns
                </CardTitle>
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.activeCampaigns}
                </div>
                <p className="text-xs text-muted-foreground">
                  Currently running
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/campaigns" className="w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    View Campaigns
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Budget
                </CardTitle>
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <BadgeCent className="h-5 w-5 text-yellow-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">GH₵{stats.totalBudget}</div>
                <p className="text-xs text-muted-foreground">
                  Allocated for campaigns
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/payments" className="w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    Manage Budget
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Influencers
                </CardTitle>
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.activatedInfluencers}
                </div>
                <p className="text-xs text-muted-foreground">
                  Working with you
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/influencers" className="w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    View Influencers
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Reach
                </CardTitle>
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.averageReach.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Per campaign</p>
              </CardContent>
              <CardFooter>
                <Link to="/analytics" className="w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    View Analytics
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Active Campaigns</CardTitle>
                <CardDescription>
                  Your currently running promotion campaigns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
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
                            ? "8 influencers"
                            : i === 2
                            ? "3 influencers"
                            : "1 influencer"}
                        </p>
                      </div>
                      <Badge
                        className={i === 1 ? "bg-green-600 " : ""}
                        variant={
                          i === 1
                            ? "default"
                            : i === 2
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {i === 1 ? "Active" : i === 2 ? "Pending" : "Draft"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/campaigns" className="w-full">
                  <Button variant="outline" className="w-full">
                    View All Campaigns
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* <Card>
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>
                  Your most recent conversations with influencers
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
                            ? "Sarah Williams"
                            : i === 2
                            ? "Mike Johnson"
                            : "David Chen"}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {i === 1
                            ? "I'd be happy to promote your summer collection!"
                            : i === 2
                            ? "When would you like me to post the status?"
                            : "Thanks for your offer, I'd like to discuss pricing."}
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
                <Link to="/messages" className="w-full">
                  <Button variant="outline" className="w-full">
                    View All Messages
                  </Button>
                </Link>
              </CardFooter>
            </Card> */}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recommended Influencers</CardTitle>
              <CardDescription>
                Influencers that match your target audience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <UserPlus className="h-6 w-6 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm font-medium">
                            {i === 1
                              ? "Sarah Williams"
                              : i === 2
                              ? "Mike Johnson"
                              : "David Chen"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {i === 1
                              ? "15.2K views"
                              : i === 2
                              ? "10.8K views"
                              : "20.5K views"}{" "}
                            •{" "}
                            {i === 1
                              ? "Fashion"
                              : i === 2
                              ? "Tech"
                              : "Lifestyle"}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 sm:mt-0"
                        >
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/influencers" className="w-full">
                <Button variant="outline" className="w-full">
                  Find More Influencers
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
