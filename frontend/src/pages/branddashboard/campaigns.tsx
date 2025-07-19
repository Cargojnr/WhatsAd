"use client";

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
} from "@/components/ui/dialog";
import {
  Calendar,
  BadgeCent,
  FileEdit,
  Info,
  Trash,
  TrendingUp,
  Users,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";

// campaign typa definition
interface Campaign {
  id: string;
  name: string;
  description: string;
  budget: string;
  status: "active" | "pending" | "draft" | "completed";
  startDate: string;
  endDate: string;
  influencers: number;
  totalViews: number;
  bannerUrl?: string; // Optional banner URL for campaign
}

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { BrandSidebar } from "./app-sidebar";
import { BrandDashboardHeader } from "./brand-dashboard-headrer";
export function Campaigns() {
  // Mock data for campaigns (initial state)

  const [campaignsList, setCampaignsList] = useState<Campaign[]>([
    {
      id: "campaign1",
      name: "Summer Collection Promotion",
      description: "Promote our new summer collection...",
      budget: "GH₵1,000",
      status: "active",
      startDate: "2023-07-01",
      endDate: "2023-07-15",
      influencers: 8,
      totalViews: 48000,
      bannerUrl: "/img/img01.jpg", // Use public folder image
    },
    {
      id: "campaign2",
      name: "New Product Launch",
      description:
        "Help us launch our newest product. We need influencers to showcase the key features in their WhatsApp Status.",
      budget: "GH₵1,500",
      status: "pending",
      startDate: "2023-07-20",
      endDate: "2023-08-05",
      influencers: 3,
      totalViews: 0,
      bannerUrl: "/img/img02.jpg", // Use public  folder image
    },
    {
      id: "campaign3",
      name: "Brand Awareness Campaign",
      description:
        "Increase visibility of our brand among your WhatsApp audience with organic mentions.",
      budget: "GH₵800",
      status: "draft",
      startDate: "",
      endDate: "",
      influencers: 0,
      totalViews: 0,
      bannerUrl: "/img/img03.jpg", // Use public folder image
    },
    {
      id: "campaign4",
      name: "Holiday Special",
      description: "Promote our special holiday offers and limited-time deals.",
      budget: "GH₵1,200",
      status: "completed",
      startDate: "2023-05-01",
      endDate: "2023-05-15",
      influencers: 10,
      totalViews: 62000,
      bannerUrl: "/img/img04.jpg", // Use public folder image
    },
  ]);
  // Dialog and form state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState<Partial<Campaign>>({});
  //handle the creation of new campaigns
  const handleCreateCampaign = () => {
    const newId = `campaign${campaignsList.length + 1}`;
    const newEntry = {
      ...newCampaign,
      id: newId,
      status: "active",
      influencers: 0,
      totalViews: 0,
    } as Campaign;

    setCampaignsList((prev) => [...prev, newEntry]);
    setIsCreateDialogOpen(false);
    setNewCampaign({});
  };
  //handle the deletion of campaigns
  const handleDeleteCampaign = () => {
    if (!selectedCampaign) return;
    setCampaignsList((prev) =>
      prev.filter((c) => c.id !== selectedCampaign.id)
    );
    setIsDeleteDialogOpen(false);
  };
  // Helper to filter campaigns by status

  const getCampaignsByStatus = (status: string) => {
    return campaignsList.filter((campaign) => campaign.status === status);
  };
  // State for previewing banner images

  const [previewBannerUrl, setPreviewBannerUrl] = useState<string | null>(null);

  return (
    <SidebarProvider>
      <BrandSidebar />
      <SidebarInset>
        <BrandDashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Campaigns</h2>
              <p className="text-muted-foreground">
                Manage your WhatsApp Status promotion campaigns
              </p>
            </div>
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-green-600 text-white"
            >
              Create Campaign
            </Button>
          </div>
          {/* Tabs for campaign status */}
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="w-full sm:w-[60%] overflow-x-auto whitespace-nowrap flex justify-between text-sm">
              <TabsTrigger value="all">All Campaigns</TabsTrigger>
              <TabsTrigger value="active">
                Active ({getCampaignsByStatus("active").length})
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({getCampaignsByStatus("pending").length})
              </TabsTrigger>
              <TabsTrigger value="draft">
                Drafts ({getCampaignsByStatus("draft").length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({getCampaignsByStatus("completed").length})
              </TabsTrigger>
            </TabsList>
            {/* All Campaigns Tab */}
            <TabsContent value="all" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {campaignsList.map((campaign) => (
                  <Card key={campaign.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{campaign.name}</CardTitle>
                          <CardDescription>
                            {campaign.status === "active" ||
                            campaign.status === "completed"
                              ? `${campaign.startDate} to ${campaign.endDate}`
                              : campaign.status === "pending"
                              ? "Starts on " + campaign.startDate
                              : "Draft"}
                          </CardDescription>
                        </div>
                        <Badge
                          className={
                            campaign.status === "active" ? "bg-green-600 " : ""
                          }
                          variant={
                            campaign.status === "active"
                              ? "default"
                              : campaign.status === "pending"
                              ? "secondary"
                              : campaign.status === "draft"
                              ? "outline"
                              : "secondary"
                          }
                        >
                          {campaign.status.charAt(0).toUpperCase() +
                            campaign.status.slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm">{campaign.description}</p>

                      {/* Campaign details grid */}
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div className="flex items-center gap-2">
                          <BadgeCent className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Budget</p>
                            <p className="text-sm text-muted-foreground">
                              {campaign.budget}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Duration</p>
                            <p className="text-sm text-muted-foreground">
                              {campaign.startDate && campaign.endDate
                                ? `${Math.ceil(
                                    (new Date(campaign.endDate).getTime() -
                                      new Date(campaign.startDate).getTime()) /
                                      (1000 * 60 * 60 * 24)
                                  )} days`
                                : "Not set"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Influencers</p>
                            <p className="text-sm text-muted-foreground">
                              {campaign.influencers}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Total Views</p>
                            <p className="text-sm text-muted-foreground">
                              {campaign.totalViews > 0
                                ? campaign.totalViews.toLocaleString()
                                : "No data"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-wrap gap-2">
                      {/* Action buttons */}
                      {campaign.status !== "completed" && (
                        <>
                          <Button variant="outline" size="sm" asChild>
                            <Link
                              to={`/dashboard/brand/campaigns/${campaign.id}/edit`}
                            >
                              <FileEdit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </Button>
                          {campaign.status === "active" && (
                            <Button variant="outline" size="sm" asChild>
                              <Link
                                to={`/dashboard/brand/campaigns/${campaign.id}/influencers`}
                              >
                                <Users className="mr-2 h-4 w-4" />
                                Manage Influencers
                              </Link>
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedCampaign(campaign);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </Button>
                        </>
                      )}
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/dashboard/brand/campaigns/${campaign.id}`}>
                          <Info className="mr-2 h-4 w-4" />
                          Details
                        </Link>
                      </Button>
                      {campaign.status === "active" && (
                        <Button
                          size="sm"
                          asChild
                          className="bg-green-600 text-white"
                        >
                          <Link
                            to={`/dashboard/brand/campaigns/${campaign.id}/analytics`}
                          >
                            <BarChart3 className="mr-2 h-4 w-4" />
                            View Analytics
                          </Link>
                        </Button>
                      )}
                      {/* Banner image preview */}
                      {campaign.bannerUrl && (
                        <img
                          src={campaign.bannerUrl}
                          alt="Campaign Banner"
                          className="w-full h-32 object-cover rounded-t cursor-pointer"
                          onClick={() =>
                            setPreviewBannerUrl(campaign.bannerUrl ?? null)
                          }
                        />
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              {getCampaignsByStatus("active").length === 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>No Active Campaigns</CardTitle>
                    <CardDescription>
                      You don't have any active campaigns at the moment.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button
                      onClick={() => setIsCreateDialogOpen(true)}
                      className="bg-green-600 text-white"
                    >
                      Create Campaign
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                getCampaignsByStatus("active").map((campaign) => (
                  <Card key={campaign.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{campaign.name}</CardTitle>
                          <CardDescription>{`${campaign.startDate} to ${campaign.endDate}`}</CardDescription>
                        </div>
                        <Badge className="bg-green-600 text-white">
                          Active
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm">{campaign.description}</p>
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div className="flex items-center gap-2">
                          <BadgeCent className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Budget</p>
                            <p className="text-sm text-muted-foreground">
                              {campaign.budget}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Duration</p>
                            <p className="text-sm text-muted-foreground">
                              {`${Math.ceil(
                                (new Date(campaign.endDate).getTime() -
                                  new Date(campaign.startDate).getTime()) /
                                  (1000 * 60 * 60 * 24)
                              )} days`}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Influencers</p>
                            <p className="text-sm text-muted-foreground">
                              {campaign.influencers}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Total Views</p>
                            <p className="text-sm text-muted-foreground">
                              {campaign.totalViews.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          to={`/dashboard/brand/campaigns/${campaign.id}/edit`}
                        >
                          <FileEdit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          to={`/dashboard/brand/campaigns/${campaign.id}/influencers`}
                        >
                          <Users className="mr-2 h-4 w-4" />
                          Manage Influencers
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedCampaign(campaign);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/dashboard/brand/campaigns/${campaign.id}`}>
                          <Info className="mr-2 h-4 w-4" />
                          Details
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        asChild
                        className="bg-green-600 text-white"
                      >
                        <Link
                          to={`/dashboard/brand/campaigns/${campaign.id}/analytics`}
                        >
                          <BarChart3 className="mr-2 h-4 w-4" />
                          View Analytics
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </TabsContent>
            <TabsContent value="pending" className="space-y-4">
              {getCampaignsByStatus("pending").length === 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>No Active Campaigns</CardTitle>
                    <CardDescription>
                      You don't have any active campaigns at the moment.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button
                      onClick={() => setIsCreateDialogOpen(true)}
                      className="bg-green-600 text-white"
                    >
                      Create Campaign
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                getCampaignsByStatus("pending").map((campaign) => (
                  <Card key={campaign.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{campaign.name}</CardTitle>
                          <CardDescription>{`${campaign.startDate} to ${campaign.endDate}`}</CardDescription>
                        </div>
                        <Badge variant="secondary">Pending</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm">{campaign.description}</p>
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div className="flex items-center gap-2">
                          <BadgeCent className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Budget</p>
                            <p className="text-sm text-muted-foreground">
                              {campaign.budget}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Duration</p>
                            <p className="text-sm text-muted-foreground">
                              {`${Math.ceil(
                                (new Date(campaign.endDate).getTime() -
                                  new Date(campaign.startDate).getTime()) /
                                  (1000 * 60 * 60 * 24)
                              )} days`}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Influencers</p>
                            <p className="text-sm text-muted-foreground">
                              {campaign.influencers}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Total Views</p>
                            <p className="text-sm text-muted-foreground">
                              {campaign.totalViews.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          to={`/dashboard/brand/campaigns/${campaign.id}/edit`}
                        >
                          <FileEdit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedCampaign(campaign);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/dashboard/brand/campaigns/${campaign.id}`}>
                          <Info className="mr-2 h-4 w-4" />
                          Details
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </TabsContent>
            <TabsContent value="draft" className="space-y-4">
              {getCampaignsByStatus("draft").length === 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>No Active Campaigns</CardTitle>
                    <CardDescription>
                      You don't have any active campaigns at the moment.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button
                      onClick={() => setIsCreateDialogOpen(true)}
                      className="bg-green-600 text-white"
                    >
                      Create Campaign
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                getCampaignsByStatus("draft").map((campaign) => (
                  <Card key={campaign.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{campaign.name}</CardTitle>
                          <CardDescription>{`${campaign.startDate} to ${campaign.endDate}`}</CardDescription>
                        </div>
                        <Badge variant="outline">Draft</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm">{campaign.description}</p>
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div className="flex items-center gap-2">
                          <BadgeCent className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Budget</p>
                            <p className="text-sm text-muted-foreground">
                              {campaign.budget}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Duration</p>
                            <p className="text-sm text-muted-foreground">
                              {`${Math.ceil(
                                (new Date(campaign.endDate).getTime() -
                                  new Date(campaign.startDate).getTime()) /
                                  (1000 * 60 * 60 * 24)
                              )} days`}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Influencers</p>
                            <p className="text-sm text-muted-foreground">
                              {campaign.influencers}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Total Views</p>
                            <p className="text-sm text-muted-foreground">
                              {campaign.totalViews.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          to={`/dashboard/brand/campaigns/${campaign.id}/edit`}
                        >
                          <FileEdit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedCampaign(campaign);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/dashboard/brand/campaigns/${campaign.id}`}>
                          <Info className="mr-2 h-4 w-4" />
                          Details
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </TabsContent>
            <TabsContent value="completed" className="space-y-4">
              {getCampaignsByStatus("completed").length === 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>No Active Campaigns</CardTitle>
                    <CardDescription>
                      You don't have any active campaigns at the moment.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button asChild>
                      <Link to="/dashboard/brand/campaigns/new">
                        Create Campaign
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                getCampaignsByStatus("completed").map((campaign) => (
                  <Card key={campaign.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{campaign.name}</CardTitle>
                          <CardDescription>{`${campaign.startDate} to ${campaign.endDate}`}</CardDescription>
                        </div>
                        <Badge variant="secondary">completed</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm">{campaign.description}</p>
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div className="flex items-center gap-2">
                          <BadgeCent className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Budget</p>
                            <p className="text-sm text-muted-foreground">
                              {campaign.budget}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Duration</p>
                            <p className="text-sm text-muted-foreground">
                              {`${Math.ceil(
                                (new Date(campaign.endDate).getTime() -
                                  new Date(campaign.startDate).getTime()) /
                                  (1000 * 60 * 60 * 24)
                              )} days`}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Influencers</p>
                            <p className="text-sm text-muted-foreground">
                              {campaign.influencers}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Total Views</p>
                            <p className="text-sm text-muted-foreground">
                              {campaign.totalViews.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/dashboard/brand/campaigns/${campaign.id}`}>
                          <Info className="mr-2 h-4 w-4" />
                          Details
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </TabsContent>

            {/* Similar content for other tabs - pending, draft, completed */}
          </Tabs>
          {/* Simple Image Preview */}
          {previewBannerUrl && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
              onClick={() => setPreviewBannerUrl(null)}
            >
              <img
                src={previewBannerUrl}
                alt="Banner Preview"
                className="max-w-full max-h-[80vh] rounded shadow-lg"
              />
            </div>
          )}

          {/* Create Campaign Dialog */}

          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Campaign</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {/* Campaign creation form */}

                <input
                  type="text"
                  placeholder="Campaign Name"
                  className="w-full border px-2 py-1"
                  value={newCampaign.name || ""}
                  onChange={(e) =>
                    setNewCampaign({ ...newCampaign, name: e.target.value })
                  }
                />
                <textarea
                  placeholder="Description"
                  className="w-full border px-2 py-1"
                  value={newCampaign.description || ""}
                  onChange={(e) =>
                    setNewCampaign({
                      ...newCampaign,
                      description: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Budget"
                  className="w-full border px-2 py-1"
                  value={newCampaign.budget || ""}
                  onChange={(e) =>
                    setNewCampaign({ ...newCampaign, budget: e.target.value })
                  }
                />
                {/* Banner image upload */}

                <input
                  type="file"
                  accept="image/*"
                  className="w-full border px-2 py-1"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        setNewCampaign({
                          ...newCampaign,
                          bannerUrl: ev.target?.result as string,
                        });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                {/* Preview uploaded banner */}

                {newCampaign.bannerUrl && (
                  <img
                    src={newCampaign.bannerUrl}
                    alt="Banner Preview"
                    className="w-full h-32 object-cover rounded mt-2"
                  />
                )}
                <div className="flex gap-2">
                  <input
                    type="date"
                    className="border px-2 py-1"
                    value={newCampaign.startDate || ""}
                    onChange={(e) =>
                      setNewCampaign({
                        ...newCampaign,
                        startDate: e.target.value,
                      })
                    }
                  />
                  <input
                    type="date"
                    className="border px-2 py-1"
                    value={newCampaign.endDate || ""}
                    onChange={(e) =>
                      setNewCampaign({
                        ...newCampaign,
                        endDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-green-600 text-white"
                  onClick={handleCreateCampaign}
                >
                  Create
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {/* Delete Campaign Dialog */}

          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Campaign</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this campaign?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteCampaign}>
                  Delete Campaign
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
