import React, { createContext, useContext, useState } from "react";

type CampaignRequest = {
  title: string;
  brand: string;
  status: string;
  badgeClass: string;
  variant: "outline" | "secondary" | "default" | "destructive";
};

type CampaignRequestsContextType = {
  campaignRequests: CampaignRequest[];
  setCampaignRequests: React.Dispatch<React.SetStateAction<CampaignRequest[]>>;
};

const CampaignRequestsContext = createContext<
  CampaignRequestsContextType | undefined
>(undefined);

export const CampaignRequestsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [campaignRequests, setCampaignRequests] = useState<CampaignRequest[]>([
    {
      title: "Summer Sale Promotion",
      brand: "Fashion Brand Co.",
      status: "New",
      badgeClass: "border-green-600 text-green-600",
      variant: "outline",
    },
    {
      title: "Product Launch",
      brand: "Tech Gadgets Inc.",
      status: "Pending",
      badgeClass: "bg-yellow-100 text-yellow-800",
      variant: "secondary",
    },
    {
      title: "Brand Awareness",
      brand: "Healthy Foods",
      status: "Accepted",
      badgeClass: "bg-blue-600 text-white",
      variant: "default",
    },
  ]);

  return (
    <CampaignRequestsContext.Provider
      value={{ campaignRequests, setCampaignRequests }}
    >
      {children}
    </CampaignRequestsContext.Provider>
  );
};

export const useCampaignRequests = () => {
  const context = useContext(CampaignRequestsContext);
  if (!context) {
    throw new Error(
      "useCampaignRequests must be used within a CampaignRequestsProvider"
    );
  }
  return context;
};
