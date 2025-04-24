import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
export function DashboardOverview() {
  const [isAvailable, setIsAvailable] = useState(true);

  const stats = {
    pendingRequests: 3,
    totalEarnings: 1250,
    completedPromotions: 8,
    viewCount: 15200,
  };

  return (
    <div className="   space-y-8 ">
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
          <Label htmlFor="availability">
            {isAvailable ? "Available for Promotions" : "Not Available"}
          </Label>
        </div>
      </div>
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Requests
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingRequests}</div>
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
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalEarnings}</div>
            <p className="text-xs text-muted-foreground">Lifetime earnings</p>
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
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
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
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.viewCount.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Average daily views</p>
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

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Campaign Requests</CardTitle>
            <CardDescription>
              Your most recent promotion requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
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
                      i === 1 ? "outline" : i === 2 ? "secondary" : "default"
                    }
                  >
                    {i === 1 ? "New" : i === 2 ? "Pending" : "Accepted"}
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
            <CardDescription>Your most recent conversations</CardDescription>
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
  );
}
