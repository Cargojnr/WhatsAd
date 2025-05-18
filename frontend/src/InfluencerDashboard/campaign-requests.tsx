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
import { Check, X, Calendar, BadgeCent, Info } from "lucide-react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";

import { AppSidebar } from "./app-sidebar";

import IdashboardHeader from "./idashboard-header";

// Mock data for promotion requests
interface Promotion {
  id: string;
  brand: {
    name: string;
    logo: string;
  };
  campaign: string;
  description: string;
  budget: string;
  duration: string;
  status: "pending" | "accepted" | "completed" | "rejected";
  date: string;
  submitDate?: string;
}

const promotionRequests: Promotion[] = [
  {
    id: "promo1",
    brand: {
      name: "Fashion Brand Co.",
      logo: "/placeholder.svg?height=40&width=40",
    },
    campaign: "Summer Collection Promotion",
    description:
      "We're looking for influencers to showcase our new summer collection in their WhatsApp Status. The promotion should highlight our colorful summer dresses and accessories.",
    budget: "GH₵200",
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
    budget: "GH₵350",
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
    budget: "GH₵150",
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
    budget: "GH₵250",
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
    budget: "GH₵300",
    duration: "10 days",
    status: "rejected",
    date: "2023-06-20",
  },
];

export function CampaignRequests() {
  const [promotions, setPromotions] = useState<Promotion[]>(promotionRequests);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(
    null
  );
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const [isRejectionDialogOpen, setIsRejectionDialogOpen] =
    useState<boolean>(false);

  const handleAccept = (promotion: Promotion) => {
    setPromotions((prevPromotions) =>
      prevPromotions.map((promo) =>
        promo.id === promotion.id
          ? {
              ...promo,
              status: "accepted",

              submitDate: new Date().toISOString(),
            }
          : promo
      )
    );
  };

  const handleReject = (promotion: Promotion) => {
    setSelectedPromotion(promotion);
    setIsRejectionDialogOpen(true);
  };

  const handleCompleted = (promotion: Promotion) => {
    setPromotions((prevPromotions) =>
      prevPromotions.map((promo) =>
        promo.id === promotion.id
          ? {
              ...promo,
              status: "completed",
              submitDate: new Date().toISOString(),
            }
          : promo
      )
    );
  };

  const confirmReject = () => {
    if (selectedPromotion) {
      setPromotions((prevPromotions) =>
        prevPromotions.map((promo) =>
          promo.id === selectedPromotion.id
            ? {
                ...promo,
                status: "rejected",

                submitDate: new Date().toISOString(),
              }
            : promo
        )
      );
    }
    setIsRejectionDialogOpen(false);
    setRejectionReason("");
    setSelectedPromotion(null);
  };

  const getPromotionsByStatus = (status: Promotion["status"]): Promotion[] => {
    return promotions.filter((promo) => promo.status === status);
  };
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <IdashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Campaign Requests
            </h2>
            <p className="text-muted-foreground">
              Manage promotion requests from brands
            </p>
          </div>

          <Tabs defaultValue="pending" className="space-y-4 ">
            <TabsList className="overflow-x-auto whitespace-nowrap flex justify-between text-sm sm:text-base w-full sm:w-[25%]">
              {(["pending", "accepted", "completed", "rejected"] as const).map(
                (status) => (
                  <TabsTrigger key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)} (
                    {getPromotionsByStatus(status).length})
                  </TabsTrigger>
                )
              )}
            </TabsList>
            {(["pending", "accepted", "completed", "rejected"] as const).map(
              (status) => (
                <TabsContent key={status} value={status} className="space-y-4">
                  {getPromotionsByStatus(status).length === 0 ? (
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          No {status.charAt(0).toUpperCase() + status.slice(1)}{" "}
                          Requests
                        </CardTitle>
                        <CardDescription>
                          You don't have any {status} promotion requests at the
                          moment.
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ) : (
                    getPromotionsByStatus(status).map((promotion) => (
                      <Card key={promotion.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle>{promotion.campaign}</CardTitle>
                              <CardDescription>
                                {promotion.brand.name}
                              </CardDescription>
                            </div>
                            <Badge>
                              {status === "pending"
                                ? "New Request"
                                : status === "accepted"
                                ? "In Progress"
                                : status === "completed"
                                ? "Completed"
                                : "Rejected"}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm">{promotion.description}</p>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="flex items-center gap-2">
                              <BadgeCent className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">
                                  {status === "completed" ? "Earned" : "Budget"}
                                </p>
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
                                <p className="text-sm font-medium">
                                  {status === "pending"
                                    ? "Received"
                                    : status === "accepted"
                                    ? "Accepted On"
                                    : status === "completed"
                                    ? "Completed On"
                                    : "Rejected On"}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {promotion.submitDate
                                    ? new Date(
                                        promotion.submitDate
                                      ).toLocaleDateString()
                                    : "N/A"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        {(status === "pending" || status === "accepted") && (
                          <CardFooter className="flex justify-between">
                            <div className="flex gap-2">
                              {status === "pending" && (
                                <>
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
                                    className="bg-green-600"
                                  >
                                    <Check className="mr-2 h-4 w-4" />
                                    Accept
                                  </Button>
                                </>
                              )}
                              {status === "accepted" && (
                                <Button
                                  size="sm"
                                  onClick={() => handleCompleted(promotion)}
                                  className="bg-green-600"
                                >
                                  Mark as Completed
                                </Button>
                              )}
                            </div>
                          </CardFooter>
                        )}
                      </Card>
                    ))
                  )}
                </TabsContent>
              )
            )}
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
export const getPendingPromotionRequestsCount = (): number => {
  return promotionRequests.filter((promo) => promo.status === "pending").length;
};
