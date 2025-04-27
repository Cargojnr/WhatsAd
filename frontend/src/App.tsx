import "./App.css";
import Home from "./components/Home";

import { Routes, Route } from "react-router-dom";

import LoginPage from "./components/LoginDialog";

import BrandSignUpPage from "./components/brand/brandSignupDialog";
import InfluencerSignUpPage from "./components/influencer/influencerSignupDialog";

// import { AppSidebar } from "./dasboards/app-sidebar";
// import { DashboardOverview } from "../iDashboard/dashboard-overview";

import Page from "./dashboards/01dashboard";
import { CampaignRequests } from "./dashboards/campaign-requests";
import { StatusTracker } from "./dashboards/status-tracker";
import { EarningsOverview } from "./dashboards/earnings";
import { ProfileStats } from "./dashboards/profile-stats";
import { Settings } from "./dashboards/settings";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/bsignup" element={<BrandSignUpPage />} />
      <Route path="/isignup" element={<InfluencerSignUpPage />} />
      <Route
        path="/idashboard"
        element={
          // <Layout>
          //   <DashboardOverview />
          // </Layout>
          <Page />
        }
      />
      <Route path="/dashboard" element={<Page />} />
      <Route path="/campaign-requests" element={<CampaignRequests />} />
      <Route path="/status-tracker" element={<StatusTracker />} />
      <Route path="/earnings" element={<EarningsOverview />} />
      <Route path="/profile-stats" element={<ProfileStats />} />
      <Route path="/settings" element={<Settings />} />
      {/* <Route path="/dasboard" element={<Layout children={undefined} />} /> */}
    </Routes>
  );
}

export default App;
