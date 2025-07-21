"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Check, Clock, BadgeCent, Upload } from "lucide-react";
import { AppSidebar } from "./app-sidebar";

import IdashboardHeader from "./idashboard-header";
type Promotion = {
  id: string;
  campaign: string;
  brand: string;
  description: string;
  budget: string;
  deadline: string;
  status: "in_progress" | "completed";
  proofSubmitted: boolean;
  completedDate?: string; // Optional field for completed promotions
};

// Mock data for promotions
const promotionsTracker: Promotion[] = [
  {
    id: "promo1",
    campaign: "Summer Collection Promotion",
    brand: "Fashion Brand Co.",
    description: "Showcase our summer collection in your WhatsApp Status",
    budget: "GH₵200",
    deadline: "2023-07-20",
    status: "in_progress",
    proofSubmitted: false,
  },
  {
    id: "promo2",
    campaign: "New Smartphone Launch",
    brand: "Tech Gadgets Inc.",
    description: "Feature our new smartphone in your WhatsApp Status",
    budget: "GH₵350",
    deadline: "2023-07-25",
    status: "in_progress",
    proofSubmitted: true,
  },
  {
    id: "promo3",
    campaign: "Organic Snacks Promotion",
    brand: "Healthy Foods",
    description: "Share our organic snacks in your WhatsApp Status",
    budget: "GH₵150",
    deadline: "2023-07-15",
    status: "completed",
    proofSubmitted: true,
  },
  {
    id: "promo4",
    campaign: "Home Workout Equipment",
    brand: "Fitness Gear Pro",
    description: "Demonstrate our workout equipment in your WhatsApp Status",
    budget: "GH₵250",
    deadline: "2023-06-30",
    status: "completed",
    proofSubmitted: true,
  },
];

export function StatusTracker() {
  const [promotions, setPromotions] = useState<Promotion[]>(promotionsTracker);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(
    null
  );
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [viewDetails, setViewDetails] = useState<Promotion | null>(null);
  const [isViewDetailsDialogOpen, setIsViewDetailsDialogOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadProof = () => {
    if (selectedPromotion) {
      setPromotions((prevPromotions) =>
        prevPromotions.map((promo) =>
          promo.id === selectedPromotion.id
            ? { ...promo, proofSubmitted: true }
            : promo
        )
      );
    }

    console.log("Uploading proof...", selectedPromotion?.id, selectedFile);

    setSelectedFile(null);
    setIsUploadDialogOpen(false); // This closes the dialog
    setSelectedPromotion(null); // optional
  };

  const handleMarkAsCompleted = () => {
    if (selectedPromotion) {
      setPromotions((prevPromotions) =>
        prevPromotions.map((promo) =>
          promo.id === selectedPromotion.id
            ? {
                ...promo,
                status: "completed",

                completedDate: new Date().toISOString(), // Update the status and add completedDate
              }
            : promo
        )
      );
    }
    setIsCompleteDialogOpen(false);
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
        {/* <div className="space-y-8"> */}
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Status Promotion Tracker
            </h2>
            <p className="text-muted-foreground">
              Track and manage your WhatsApp Status promotions
            </p>
          </div>

          <Tabs defaultValue="in_progress" className="space-y-4">
            <TabsList>
              <TabsTrigger value="in_progress">
                In Progress ({getPromotionsByStatus("in_progress").length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({getPromotionsByStatus("completed").length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="in_progress" className="space-y-4">
              {getPromotionsByStatus("in_progress").length === 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>No Active Promotions</CardTitle>
                    <CardDescription>
                      You don't have any active promotions at the moment.
                    </CardDescription>
                  </CardHeader>
                </Card>
              ) : (
                getPromotionsByStatus("in_progress").map((promotion) => (
                  <Card key={promotion.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{promotion.campaign}</CardTitle>
                          <CardDescription>{promotion.brand}</CardDescription>
                        </div>
                        <Badge variant="outline">In Progress</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm">{promotion.description}</p>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex items-center gap-2">
                          <BadgeCent className="h-4 w-4 text-muted-foreground" />
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
                            <p className="text-sm font-medium">Deadline</p>
                            <p className="text-sm text-muted-foreground">
                              {promotion.completedDate
                                ? new Date(
                                    promotion.completedDate
                                  ).toLocaleDateString()
                                : "N/A"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Status</p>
                            <p className="text-sm text-muted-foreground">
                              {promotion.proofSubmitted
                                ? "Proof Submitted"
                                : "Awaiting Proof"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between gap-1">
                      <Dialog
                        open={isUploadDialogOpen}
                        onOpenChange={setIsUploadDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSelectedPromotion(promotion);

                              setIsUploadDialogOpen(true);
                            }}
                            disabled={promotion.proofSubmitted}
                            className=" px-2 py-1 text-sm"
                          >
                            <Upload className="  mr-1 h-3 w-3" />
                            {promotion.proofSubmitted
                              ? "Proof Submitted"
                              : "Upload Proof"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Upload Proof of Promotion</DialogTitle>
                            <DialogDescription>
                              Upload a screenshot or video of your WhatsApp
                              Status showing the promotion.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="proof">Proof of Promotion</Label>
                              <Input
                                id="proof"
                                type="file"
                                accept="image/*,video/*"
                                onChange={handleFileChange}
                              />
                              <p className="text-xs text-muted-foreground">
                                Accepted formats: JPG, PNG, MP4. Max size: 10MB.
                              </p>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setIsUploadDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleUploadProof}
                              disabled={!selectedFile}
                            >
                              Upload
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Dialog
                        open={isCompleteDialogOpen}
                        onOpenChange={setIsCompleteDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            onClick={() => setSelectedPromotion(promotion)}
                            disabled={!promotion.proofSubmitted}
                            className="bg-green-600"
                          >
                            <Check className="mr-1 h-3 w-3" />
                            Completed
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Mark Promotion as Completed
                            </DialogTitle>
                            <DialogDescription>
                              Are you sure you want to mark this promotion as
                              completed? This will notify the brand that you
                              have fulfilled your obligations.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setIsCompleteDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleMarkAsCompleted}
                              className="bg-green-600"
                            >
                              Mark as Completed
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {getPromotionsByStatus("completed").map((promotion) => (
                <Card key={promotion.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{promotion.campaign}</CardTitle>
                        <CardDescription>{promotion.brand}</CardDescription>
                      </div>
                      <Badge variant="secondary">Completed</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">{promotion.description}</p>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <BadgeCent className="h-4 w-4 text-muted-foreground" />
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
                          <p className="text-sm font-medium">Completed</p>
                          <p className="text-sm text-muted-foreground">
                            {promotion.completedDate
                              ? new Date(
                                  promotion.completedDate
                                ).toLocaleDateString()
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Status</p>
                          <p className="text-sm text-muted-foreground">
                            Verified
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setViewDetails(promotion);
                        setIsViewDetailsDialogOpen(true);
                      }}
                    >
                      View Details
                    </Button>
                    <Dialog
                      open={isViewDetailsDialogOpen}
                      onOpenChange={setIsViewDetailsDialogOpen}
                    >
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Promotion Details</DialogTitle>
                        </DialogHeader>
                        {viewDetails && (
                          <div className="space-y-2">
                            <p>
                              <strong>Campaign:</strong> {viewDetails.campaign}
                            </p>
                            <p>
                              <strong>Brand:</strong> {viewDetails.brand}
                            </p>
                            <p>
                              <strong>Description:</strong>{" "}
                              {viewDetails.description}
                            </p>
                            <p>
                              <strong>Budget:</strong> {viewDetails.budget}
                            </p>
                            <p>
                              <strong>Deadline:</strong>{" "}
                              {new Date(
                                viewDetails.deadline
                              ).toLocaleDateString()}
                            </p>
                            <p>
                              <strong>Completed On:</strong>{" "}
                              {viewDetails.completedDate
                                ? new Date(
                                    viewDetails.completedDate
                                  ).toLocaleString()
                                : "N/A"}
                            </p>
                            <p>
                              <strong>Status:</strong> Completed
                            </p>
                          </div>
                        )}
                        <DialogFooter>
                          <Button
                            onClick={() => setIsViewDetailsDialogOpen(false)}
                          >
                            Close
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
