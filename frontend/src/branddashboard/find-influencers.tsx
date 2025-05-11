"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Filter, MessageSquare, Search, Star, Users } from "lucide-react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { BrandSidebar } from "./app-sidebar";
import { BrandDashboardHeader } from "./brand-dashboard-headrer";
// Mock data for influencers
const influencers = [
  {
    id: "inf1",
    name: "Sarah Williams",
    username: "@sarahw",
    bio: "Fashion and lifestyle influencer sharing daily outfit inspiration",
    avatar: "/placeholder.svg?height=40&width=40",
    viewCount: 15200,
    categories: ["Fashion", "Lifestyle"],
    rating: 4.8,
    location: "New York, USA",
    pricePerStatus: "$200",
    status: "available",
  },
  {
    id: "inf2",
    name: "Mike Johnson",
    username: "@mikej",
    bio: "Tech enthusiast sharing the latest gadgets and tech news",
    avatar: "/placeholder.svg?height=40&width=40",
    viewCount: 10800,
    categories: ["Technology", "Gaming"],
    rating: 4.6,
    location: "San Francisco, USA",
    pricePerStatus: "$180",
    status: "available",
  },
  {
    id: "inf3",
    name: "David Chen",
    username: "@davidc",
    bio: "Healthy living advocate sharing fitness tips and nutritious recipes",
    avatar: "/placeholder.svg?height=40&width=40",
    viewCount: 20500,
    categories: ["Fitness", "Food"],
    rating: 4.9,
    location: "Los Angeles, USA",
    pricePerStatus: "$250",
    status: "available",
  },
  {
    id: "inf4",
    name: "Emily Rodriguez",
    username: "@emilyr",
    bio: "Travel enthusiast sharing adventures and destination tips",
    avatar: "/placeholder.svg?height=40&width=40",
    viewCount: 18900,
    categories: ["Travel", "Photography"],
    rating: 4.7,
    location: "Miami, USA",
    pricePerStatus: "$220",
    status: "available",
  },
  {
    id: "inf5",
    name: "Michael Smith",
    username: "@michaels",
    bio: "Music lover sharing new tracks and concert experiences",
    avatar: "/placeholder.svg?height=40&width=40",
    viewCount: 12600,
    categories: ["Music", "Entertainment"],
    rating: 4.5,
    location: "Nashville, USA",
    pricePerStatus: "$190",
    status: "working",
  },
  {
    id: "inf6",
    name: "Jessica Park",
    username: "@jessicap",
    bio: "Beauty expert sharing makeup tutorials and skincare routines",
    avatar: "/placeholder.svg?height=40&width=40",
    viewCount: 22800,
    categories: ["Beauty", "Fashion"],
    rating: 4.9,
    location: "Chicago, USA",
    pricePerStatus: "$270",
    status: "available",
  },
];

const categories = [
  "Fashion",
  "Beauty",
  "Technology",
  "Gaming",
  "Fitness",
  "Food",
  "Travel",
  "Photography",
  "Music",
  "Entertainment",
];

export function FindInfluencers() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [viewRange, setViewRange] = useState([5000, 25000]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState<any>(null);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);

  const filteredInfluencers = influencers.filter((influencer) => {
    const matchesSearch =
      influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      influencer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      influencer.bio.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategories =
      selectedCategories.length === 0 ||
      influencer.categories.some((category) =>
        selectedCategories.includes(category)
      );

    const matchesViewRange =
      influencer.viewCount >= viewRange[0] &&
      influencer.viewCount <= viewRange[1];

    return matchesSearch && matchesCategories && matchesViewRange;
  });

  const handleSelectCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleViewRangeChange = (values: number[]) => {
    setViewRange(values);
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setViewRange([5000, 25000]);
    setSearchTerm("");
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
                Find Influencers
              </h2>
              <p className="text-muted-foreground">
                Discover and connect with WhatsApp influencers
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search influencers by name, username, or bio..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Dialog
              open={isFilterDialogOpen}
              onOpenChange={setIsFilterDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                  {(selectedCategories.length > 0 ||
                    viewRange[0] !== 5000 ||
                    viewRange[1] !== 25000) && (
                    <Badge variant="secondary" className="ml-2">
                      Active
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Filter Influencers</DialogTitle>
                  <DialogDescription>
                    Refine the influencer list based on your criteria
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label>Categories</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((category) => (
                        <div
                          key={category}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() =>
                              handleSelectCategory(category)
                            }
                          />
                          <label
                            htmlFor={`category-${category}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>View Count Range</Label>
                    <Slider
                      defaultValue={viewRange}
                      min={1000}
                      max={30000}
                      step={1000}
                      value={viewRange}
                      onValueChange={handleViewRangeChange}
                    />
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        {viewRange[0].toLocaleString()} views
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {viewRange[1].toLocaleString()} views
                      </span>
                    </div>
                  </div>
                </div>
                <DialogFooter className="flex justify-between sm:justify-between">
                  <Button variant="outline" onClick={handleClearFilters}>
                    Clear Filters
                  </Button>
                  <Button
                    type="submit"
                    onClick={() => setIsFilterDialogOpen(false)}
                  >
                    Apply Filters
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Influencers</TabsTrigger>
              <TabsTrigger value="available">Available Now</TabsTrigger>
              <TabsTrigger value="working">Currently Working</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredInfluencers.map((influencer) => (
                  <Card key={influencer.id} className="overflow-hidden">
                    <CardHeader className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={influencer.avatar || "/placeholder.svg"}
                            alt={influencer.name}
                          />
                          <AvatarFallback>
                            {influencer.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1 overflow-hidden">
                          <CardTitle className="text-base">
                            {influencer.name}
                          </CardTitle>
                          <CardDescription className="truncate">
                            {influencer.username}
                          </CardDescription>
                        </div>
                        <Badge
                          variant={
                            influencer.status === "available"
                              ? "default"
                              : "secondary"
                          }
                          className="ml-auto flex items-center gap-1"
                        >
                          {influencer.status === "available"
                            ? "Available"
                            : "Working"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="line-clamp-2 text-sm">{influencer.bio}</p>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {influencer.categories.map((category) => (
                          <Badge
                            key={category}
                            variant="outline"
                            className="text-xs"
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <div className="flex items-center text-sm">
                          <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span>
                            {influencer.viewCount.toLocaleString()} views
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{influencer.rating} rating</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2 border-t p-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          setSelectedInfluencer(influencer);
                          setIsProfileDialogOpen(true);
                        }}
                      >
                        View Profile
                      </Button>
                      <Button size="sm" className="flex-1" asChild>
                        <Link
                          to={`/dashboard/brand/messages?id=${influencer.id}`}
                        >
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Contact
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              {filteredInfluencers.length === 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>No Influencers Found</CardTitle>
                    <CardDescription>
                      Try adjusting your filters or search terms
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" onClick={handleClearFilters}>
                      Clear Filters
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </TabsContent>

            {/* Similar content for other tabs */}
          </Tabs>

          <Dialog
            open={isProfileDialogOpen}
            onOpenChange={setIsProfileDialogOpen}
          >
            {selectedInfluencer && (
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Influencer Profile</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={selectedInfluencer.avatar || "/placeholder.svg"}
                        alt={selectedInfluencer.name}
                      />
                      <AvatarFallback>
                        {selectedInfluencer.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">
                        {selectedInfluencer.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedInfluencer.username}
                      </p>
                      <div className="mt-2 flex items-center">
                        <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="mr-4">
                          {selectedInfluencer.rating}
                        </span>
                        <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>
                          {selectedInfluencer.viewCount.toLocaleString()} views
                        </span>
                      </div>
                    </div>
                    <Badge
                      variant={
                        selectedInfluencer.status === "available"
                          ? "default"
                          : "secondary"
                      }
                      className="ml-auto flex items-center gap-1"
                    >
                      {selectedInfluencer.status === "available"
                        ? "Available"
                        : "Working"}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold">About</h4>
                    <p className="text-sm">{selectedInfluencer.bio}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="mb-1 font-semibold">Categories</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedInfluencer.categories.map(
                          (category: string) => (
                            <Badge key={category} variant="outline">
                              {category}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold">Location</h4>
                      <p className="text-sm">{selectedInfluencer.location}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold">Pricing</h4>
                    <p className="text-sm">
                      <strong>{selectedInfluencer.pricePerStatus}</strong> per
                      WhatsApp Status
                    </p>
                  </div>
                </div>
                <DialogFooter className="flex gap-2 sm:justify-between">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsProfileDialogOpen(false);
                    }}
                  >
                    Close
                  </Button>
                  <div className="flex gap-2">
                    <Button asChild>
                      <Link
                        to={`/dashboard/brand/messages?id=${selectedInfluencer.id}`}
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Contact
                      </Link>
                    </Button>
                    <Button>Add to Campaign</Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            )}
          </Dialog>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
