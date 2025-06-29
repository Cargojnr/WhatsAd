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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreditCard, DollarSign, Plus, Wallet } from "lucide-react";

// Mock data for payments
const payments = [
  {
    id: "pay1",
    influencer: "Sarah Williams",
    campaign: "Summer Collection Promotion",
    amount: "GH₵200",
    status: "completed",
    date: "2023-07-10",
  },
  {
    id: "pay2",
    influencer: "Mike Johnson",
    campaign: "Product Launch",
    amount: "GH₵350",
    status: "pending",
    date: "2023-07-15",
  },
  {
    id: "pay3",
    influencer: "David Chen",
    campaign: "Brand Awareness",
    amount: "GH₵150",
    status: "completed",
    date: "2023-06-28",
  },
  {
    id: "pay4",
    influencer: "Emily Rodriguez",
    campaign: "Holiday Special",
    amount: "GH₵250",
    status: "processing",
    date: "2023-07-12",
  },
];

// Mock data for payment methods
const paymentMethods = [
  {
    id: "card1",
    type: "credit_card",
    name: "Visa ending in 4242",
    expiry: "05/25",
    isDefault: true,
  },
  {
    id: "card2",
    type: "credit_card",
    name: "Mastercard ending in 5555",
    expiry: "08/24",
    isDefault: false,
  },
];
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { BrandSidebar } from "./app-sidebar";
import { BrandDashboardHeader } from "./brand-dashboard-headrer";

export function Payments() {
  const [isAddFundsDialogOpen, setIsAddFundsDialogOpen] = useState(false);
  const [fundAmount, setFundAmount] = useState("");
  const [isAddCardDialogOpen, setIsAddCardDialogOpen] = useState(false);

  const handleAddFunds = () => {
    // In a real app, you would call your payment processor API
    console.log("Adding funds:", fundAmount);
    setIsAddFundsDialogOpen(false);
    setFundAmount("");
  };

  const handleAddCard = () => {
    // In a real app, you would call your payment processor API
    console.log("Adding new payment method");
    setIsAddCardDialogOpen(false);
  };

  return (
    <SidebarProvider>
      <BrandSidebar />
      <SidebarInset>
        <BrandDashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Payments</h2>
              <p className="text-muted-foreground">
                Manage your campaign payments and billing
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Dialog
                open={isAddFundsDialogOpen}
                onOpenChange={setIsAddFundsDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Funds
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Funds to Your Account</DialogTitle>
                    <DialogDescription>
                      Add funds to your account to pay influencers for your
                      campaigns.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                        id="amount"
                        placeholder="GH₵100"
                        value={fundAmount}
                        onChange={(e) => setFundAmount(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Payment Method</Label>
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className="flex items-center space-x-2 rounded-md border p-2"
                        >
                          <input
                            type="radio"
                            id={method.id}
                            name="paymentMethod"
                            defaultChecked={method.isDefault}
                          />
                          <label
                            htmlFor={method.id}
                            className="flex flex-1 items-center gap-2"
                          >
                            <CreditCard className="h-4 w-4" />
                            <span>{method.name}</span>
                            {method.isDefault && (
                              <Badge variant="outline">Default</Badge>
                            )}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddFundsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleAddFunds}>Add Funds</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog
                open={isAddCardDialogOpen}
                onOpenChange={setIsAddCardDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Add Payment Method
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Payment Method</DialogTitle>
                    <DialogDescription>
                      Add a new credit card or payment method to your account.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="4242 4242 4242 4242"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" placeholder="John Doe" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddCardDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleAddCard}>Add Card</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Available Balance
                </CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">GH₵1,250</div>
                <p className="text-xs text-muted-foreground">
                  Available for campaigns
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Payments
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">GH₵350</div>
                <p className="text-xs text-muted-foreground">Being processed</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Spent
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">GH₵2,500</div>
                <p className="text-xs text-muted-foreground">
                  All-time spending
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Payment Methods
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {paymentMethods.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Active payment methods
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="transactions" className="space-y-4">
            <TabsList>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>

            <TabsContent value="transactions">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>
                    View all your payments to influencers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Influencer</TableHead>
                        <TableHead>Campaign</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">
                            {payment.influencer}
                          </TableCell>
                          <TableCell>{payment.campaign}</TableCell>
                          <TableCell>{payment.amount}</TableCell>
                          <TableCell>
                            {new Date(payment.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                payment.status === "completed"
                                  ? "default"
                                  : payment.status === "pending"
                                  ? "outline"
                                  : "secondary"
                              }
                            >
                              {payment.status.charAt(0).toUpperCase() +
                                payment.status.slice(1)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Transactions
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="payment-methods">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your payment methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-primary/10 p-2 text-primary">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Expires {method.expiry}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {method.isDefault && <Badge>Default</Badge>}
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        {!method.isDefault && (
                          <Button variant="ghost" size="sm">
                            Set as Default
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsAddCardDialogOpen(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Payment Method
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>
                    Manage your billing details and address
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 font-medium">Billing Address</h3>
                    <p className="text-sm">123 Business Street</p>
                    <p className="text-sm">Suite 101</p>
                    <p className="text-sm">San Francisco, CA 94103</p>
                    <p className="text-sm">United States</p>
                    <Button variant="link" className="mt-2 h-auto p-0 text-sm">
                      Edit Address
                    </Button>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 font-medium">Billing Contact</h3>
                    <p className="text-sm">John Doe</p>
                    <p className="text-sm">john.doe@example.com</p>
                    <p className="text-sm">+1 (555) 123-4567</p>
                    <Button variant="link" className="mt-2 h-auto p-0 text-sm">
                      Edit Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
