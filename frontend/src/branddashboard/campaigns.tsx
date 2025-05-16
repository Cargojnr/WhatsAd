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

// Mock data for campaigns
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
}
const campaigns: Campaign[] = [
  {
    id: "campaign1",
    name: "Summer Collection Promotion",
    description:
      "Promote our new summer collection on WhatsApp Status. Highlight our colorful summer dresses and accessories.",
    budget: "GH₵1,000",
    status: "active",
    startDate: "2023-07-01",
    endDate: "2023-07-15",
    influencers: 8,
    totalViews: 48000,
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
  },
];
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { BrandSidebar } from "./app-sidebar";
import { BrandDashboardHeader } from "./brand-dashboard-headrer";
export function Campaigns() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteCampaign = () => {
    // In a real app, you would call your API to delete the campaign
    console.log("Deleting campaign:", selectedCampaign?.id);
    setIsDeleteDialogOpen(false);
  };

  const getCampaignsByStatus = (status: string) => {
    return campaigns.filter((campaign) => campaign.status === status);
  };

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
            <Button asChild className="bg-green-600 text-white">
              <Link to="/dashboard/brand/campaigns/new">Create Campaign</Link>
            </Button>
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="w-full sm:w-[30%] overflow-x-auto whitespace-nowrap flex justify-between text-sm">
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

            <TabsContent value="all" className="space-y-4">
              {campaigns.map((campaign) => (
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
                  </CardFooter>
                </Card>
              ))}
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
                    <Button asChild>
                      <Link to="/dashboard/brand/campaigns/new">
                        Create Campaign
                      </Link>
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
                    <Button asChild>
                      <Link to="/dashboard/brand/campaigns/new">
                        Create Campaign
                      </Link>
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
                    <Button asChild>
                      <Link to="/dashboard/brand/campaigns/new">
                        Create Campaign
                      </Link>
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

          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Campaign</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this campaign? This action
                  cannot be undone.
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
