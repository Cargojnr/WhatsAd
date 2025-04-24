"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Check,
  X,
  MessageSquare,
  Calendar,
  DollarSign,
  Info,
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
// Mock data for promotion requests
const promotionRequests = [
  {
    id: "promo1",
    brand: {
      name: "Fashion Brand Co.",
      logo: "/placeholder.svg?height=40&width=40",
    },
    campaign: "Summer Collection Promotion",
    description:
      "We're looking for influencers to showcase our new summer collection in their WhatsApp Status. The promotion should highlight our colorful summer dresses and accessories.",
    budget: "$200",
    duration: "1 week",
    status: "pending",
    date: "2023-07-15",
  },
  {
    id: "promo2",
    brand: {
      name: "Tech Gadgets Inc.",
      logo: "/placeholder.svg?height=40&width=40",
    },
    campaign: "New Smartphone Launch",
    description:
      "Help us promote our latest smartphone release. We'd like you to showcase the phone's key features in your WhatsApp Status updates over a period of 3 days.",
    budget: "$350",
    duration: "3 days",
    status: "pending",
    date: "2023-07-18",
  },
  {
    id: "promo3",
    brand: {
      name: "Healthy Foods",
      logo: "/placeholder.svg?height=40&width=40",
    },
    campaign: "Organic Snacks Promotion",
    description:
      "Promote our range of organic snacks in your WhatsApp Status. We'll provide product samples and key messaging points to highlight.",
    budget: "$150",
    duration: "5 days",
    status: "accepted",
    date: "2023-07-10",
  },
  {
    id: "promo4",
    brand: {
      name: "Fitness Gear Pro",
      logo: "/placeholder.svg?height=40&width=40",
    },
    campaign: "Home Workout Equipment",
    description:
      "Showcase our home workout equipment in your WhatsApp Status. Demonstrate how easy it is to use and the benefits of working out at home.",
    budget: "$250",
    duration: "1 week",
    status: "completed",
    date: "2023-06-25",
  },
  {
    id: "promo5",
    brand: {
      name: "Travel Agency",
      logo: "/placeholder.svg?height=40&width=40",
    },
    campaign: "Summer Vacation Packages",
    description:
      "Promote our summer vacation packages in your WhatsApp Status. Highlight the destinations, accommodations, and special offers.",
    budget: "$300",
    duration: "10 days",
    status: "rejected",
    date: "2023-06-20",
  },
];

export function CampaignRequests() {
  const [selectedPromotion, setSelectedPromotion] = useState<any>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isRejectionDialogOpen, setIsRejectionDialogOpen] = useState(false);

  const handleAccept = (promotion: any) => {
    // In a real app, you would call your API to update the status
    console.log("Accepted promotion:", promotion.id);
  };

  const handleReject = (promotion: any) => {
    setSelectedPromotion(promotion);
    setIsRejectionDialogOpen(true);
  };

  const confirmReject = () => {
    // In a real app, you would call your API to update the status
    console.log(
      "Rejected promotion:",
      selectedPromotion.id,
      "Reason:",
      rejectionReason
    );
    setIsRejectionDialogOpen(false);
    setRejectionReason("");
  };

  const getPromotionsByStatus = (status: string) => {
    return promotionRequests.filter((promo) => promo.status === status);
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
        <div className="flex flex-1 flex-col gap-3 md:p-8 ">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Campaign Requests
            </h2>
            <p className="text-muted-foreground">
              Manage promotion requests from brands
            </p>
          </div>

          <Tabs defaultValue="pending" className="space-y-4">
            <TabsList>
              <TabsTrigger value="pending">
                Pending ({getPromotionsByStatus("pending").length})
              </TabsTrigger>
              <TabsTrigger value="accepted">
                Accepted ({getPromotionsByStatus("accepted").length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({getPromotionsByStatus("completed").length})
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rejected ({getPromotionsByStatus("rejected").length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              {getPromotionsByStatus("pending").length === 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>No Pending Requests</CardTitle>
                    <CardDescription>
                      You don't have any pending promotion requests at the
                      moment.
                    </CardDescription>
                  </CardHeader>
                </Card>
              ) : (
                getPromotionsByStatus("pending").map((promotion) => (
                  <Card key={promotion.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{promotion.campaign}</CardTitle>
                          <CardDescription>
                            {promotion.brand.name}
                          </CardDescription>
                        </div>
                        <Badge>New Request</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm">{promotion.description}</p>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Budget</p>
                            <p className="text-sm text-muted-foreground">
                              {promotion.budget}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Duration</p>
                            <p className="text-sm text-muted-foreground">
                              {promotion.duration}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Info className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Received</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(promotion.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message Brand
                      </Button>
                      <div className="flex gap-2">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleReject(promotion)}
                        >
                          <X className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleAccept(promotion)}
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Accept
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="accepted" className="space-y-4">
              {getPromotionsByStatus("accepted").map((promotion) => (
                <Card key={promotion.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{promotion.campaign}</CardTitle>
                        <CardDescription>
                          {promotion.brand.name}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">In Progress</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">{promotion.description}</p>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Budget</p>
                          <p className="text-sm text-muted-foreground">
                            {promotion.budget}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Duration</p>
                          <p className="text-sm text-muted-foreground">
                            {promotion.duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Info className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Accepted On</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(promotion.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message Brand
                    </Button>
                    <Button size="sm">Mark as Completed</Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {getPromotionsByStatus("completed").map((promotion) => (
                <Card key={promotion.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{promotion.campaign}</CardTitle>
                        <CardDescription>
                          {promotion.brand.name}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">Completed</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">{promotion.description}</p>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Earned</p>
                          <p className="text-sm text-muted-foreground">
                            {promotion.budget}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Duration</p>
                          <p className="text-sm text-muted-foreground">
                            {promotion.duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Info className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Completed On</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(promotion.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="rejected" className="space-y-4">
              {getPromotionsByStatus("rejected").map((promotion) => (
                <Card key={promotion.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{promotion.campaign}</CardTitle>
                        <CardDescription>
                          {promotion.brand.name}
                        </CardDescription>
                      </div>
                      <Badge variant="destructive">Rejected</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">{promotion.description}</p>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Budget</p>
                          <p className="text-sm text-muted-foreground">
                            {promotion.budget}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Duration</p>
                          <p className="text-sm text-muted-foreground">
                            {promotion.duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Info className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Rejected On</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(promotion.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>

          <Dialog
            open={isRejectionDialogOpen}
            onOpenChange={setIsRejectionDialogOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reject Promotion Request</DialogTitle>
                <DialogDescription>
                  Please provide a reason for rejecting this promotion request.
                  This feedback will be shared with the brand.
                </DialogDescription>
              </DialogHeader>
              <Textarea
                placeholder="Reason for rejection..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="min-h-[100px]"
              />
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsRejectionDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={confirmReject}>
                  Reject Request
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
