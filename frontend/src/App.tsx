import "./App.css";
import Home from "./components/Home";

import { Routes, Route, useLocation } from "react-router-dom";

import LoginPage from "./components/LoginDialog";

import BrandSignUpPage from "./components/brand/brandSignupDialog";
import InfluencerSignUpPage from "./components/influencer/influencerSignupDialog";

import Page from "./pages/InfluencerDashboard/01dashboard";
import { CampaignRequests } from "./pages/InfluencerDashboard/campaign-requests";
import { StatusTracker } from "./pages/InfluencerDashboard/status-tracker";
import { EarningsOverview } from "./pages/InfluencerDashboard/earnings";
import { ProfileStats } from "./pages/InfluencerDashboard/profile-stats";
import { Settings } from "./pages/InfluencerDashboard/settings";
import BrandDashboardOverview from "./pages/branddashboard/dashboard-overview";
import { Campaigns } from "./pages/branddashboard/campaigns";
import { FindInfluencers } from "./pages/branddashboard/find-influencers";
import { BrandSettings } from "./pages/branddashboard/settings";
import { Payments } from "./pages/branddashboard/payments";
// import { BrandDashboardOverview } from "./branddashboard/dashboard-overview";

function IsignupPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get("role");
  if (role === "brand") {
    return <BrandSignUpPage />;
  } else if (role === "influencer") {
    return <InfluencerSignUpPage />;
  } else {
    return <div>Invalid role specified</div>;
  }
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/bsignup" element={<BrandSignUpPage />} />
      <Route path="/isignup" element={<InfluencerSignUpPage />} /> */}
      <Route path="/signup" element={<IsignupPage />} />
      <Route path="/idashboard" element={<Page />} />
      <Route path="/bdashboard" element={<BrandDashboardOverview />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="/influencers" element={<FindInfluencers />} />
      <Route path="/brandsettings" element={<BrandSettings />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/dashboard" element={<Page />} />
      <Route path="/campaign-requests" element={<CampaignRequests />} />
      <Route path="/status-tracker" element={<StatusTracker />} />
      <Route path="/earnings" element={<EarningsOverview />} />
      <Route path="/profile-stats" element={<ProfileStats />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;
