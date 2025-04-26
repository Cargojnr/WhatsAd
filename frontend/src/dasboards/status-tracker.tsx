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
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Check, Clock, DollarSign, Upload } from "lucide-react";
import { AppSidebar } from "./app-sidebar";
import { Link } from "react-router-dom";
import { Bell, User, LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for promotions
const promotions = [
  {
    id: "promo1",
    campaign: "Summer Collection Promotion",
    brand: "Fashion Brand Co.",
    description: "Showcase our summer collection in your WhatsApp Status",
    budget: "$200",
    deadline: "2023-07-20",
    status: "in_progress",
    proofSubmitted: false,
  },
  {
    id: "promo2",
    campaign: "New Smartphone Launch",
    brand: "Tech Gadgets Inc.",
    description: "Feature our new smartphone in your WhatsApp Status",
    budget: "$350",
    deadline: "2023-07-25",
    status: "in_progress",
    proofSubmitted: true,
  },
  {
    id: "promo3",
    campaign: "Organic Snacks Promotion",
    brand: "Healthy Foods",
    description: "Share our organic snacks in your WhatsApp Status",
    budget: "$150",
    deadline: "2023-07-15",
    status: "completed",
    proofSubmitted: true,
  },
  {
    id: "promo4",
    campaign: "Home Workout Equipment",
    brand: "Fitness Gear Pro",
    description: "Demonstrate our workout equipment in your WhatsApp Status",
    budget: "$250",
    deadline: "2023-06-30",
    status: "completed",
    proofSubmitted: true,
  },
];

export function StatusTracker() {
  const [selectedPromotion, setSelectedPromotion] = useState<any>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadProof = () => {
    // In a real app, you would upload the file to your backend
    console.log(
      "Uploading proof for promotion:",
      selectedPromotion?.id,
      "File:",
      selectedFile
    );
    setIsUploadDialogOpen(false);
    setSelectedFile(null);
  };

  const handleMarkAsCompleted = () => {
    // In a real app, you would call your API to update the status
    console.log("Marking promotion as completed:", selectedPromotion?.id);
    setIsCompleteDialogOpen(false);
  };

  const getPromotionsByStatus = (status: string) => {
    return promotions.filter((promo) => promo.status === status);
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
        {/* <div className="space-y-8"> */}
        <div className="flex flex-1 flex-col gap-3 md:p-8 ">
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
                            <p className="text-sm font-medium">Deadline</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(
                                promotion.deadline
                              ).toLocaleDateString()}
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
                    <CardFooter className="flex justify-between">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            onClick={() => setSelectedPromotion(promotion)}
                            disabled={promotion.proofSubmitted}
                          >
                            <Upload className="mr-2 h-4 w-4" />
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
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            onClick={() => setSelectedPromotion(promotion)}
                            disabled={!promotion.proofSubmitted}
                          >
                            <Check className="mr-2 h-4 w-4" />
                            Mark as Completed
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
                            <Button onClick={handleMarkAsCompleted}>
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
                          <p className="text-sm font-medium">Completed</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(promotion.deadline).toLocaleDateString()}
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
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
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
