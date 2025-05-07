import "./App.css";
import Home from "./components/Home";

import { Routes, Route } from "react-router-dom";

import LoginPage from "./components/LoginDialog";

import BrandSignUpPage from "./components/brand/brandSignupDialog";
import InfluencerSignUpPage from "./components/influencer/influencerSignupDialog";

import Page from "./InfluencerDashboard/01dashboard";
import { CampaignRequests } from "./InfluencerDashboard/campaign-requests";
import { StatusTracker } from "./InfluencerDashboard/status-tracker";
import { EarningsOverview } from "./InfluencerDashboard/earnings";
import { ProfileStats } from "./InfluencerDashboard/profile-stats";
import { Settings } from "./InfluencerDashboard/settings";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/bsignup" element={<BrandSignUpPage />} />
      <Route path="/isignup" element={<InfluencerSignUpPage />} />
      <Route path="/idashboard" element={<Page />} />
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
