import "./App.css";
import Home from "./components/Home";

import { Routes, Route } from "react-router-dom";

import LoginPage from "./components/LoginDialog";

import BrandSignUpPage from "./components/brand/brandSignupDialog";
import InfluencerSignUpPage from "./components/influencer/influencerSignupDialog";

import Layout from "./components/dashboards/app/layout";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/bsignup" element={<BrandSignUpPage />} />
        <Route path="/isignup" element={<InfluencerSignUpPage />} />
        <Route path="/layout" element={<Layout children={undefined} />} />
      </Routes>
    </div>
  );
}

export default App;
