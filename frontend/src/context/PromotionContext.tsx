import React, { createContext, useContext, useState, useEffect } from "react";

export interface Promotion {
  id: string;
  brand: { name: string; logo: string };
  campaign: string;
  description: string;
  budget: string;
  duration: string;
  status: "pending" | "accepted" | "in_progress" | "completed" | "rejected";
  date: string;
  bannerUrl?: string;
  proofSubmitted?: boolean;
  completedDate?: string;
  rejectReason?: string;
}

interface PromotionContextType {
  promotions: Promotion[];
  setPromotions: React.Dispatch<React.SetStateAction<Promotion[]>>;
  selectedPromotion: Promotion | null;
  setSelectedPromotion: (promotion: Promotion | null) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const PromotionContext = createContext<PromotionContextType | undefined>(undefined);

export const PromotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [promotions, setPromotions] = useState<Promotion[]>(() => {
    const stored = localStorage.getItem("promotions");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("promotions", JSON.stringify(promotions));
  }, [promotions]);

  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
  const [activeTab, setActiveTab] = useState<string>("pending");

  return (
    <PromotionContext.Provider
      value={{
        promotions,
        setPromotions,
        selectedPromotion,
        setSelectedPromotion,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </PromotionContext.Provider>
  );
};

export const usePromotionContext = () => {
  const context = useContext(PromotionContext);
  if (!context) throw new Error("usePromotionContext must be used within PromotionProvider");
  return context;
};