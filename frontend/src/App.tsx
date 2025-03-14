import "./App.css";
import Home from "./components/Home";

import { Routes, Route } from "react-router-dom";

import LoginPage from "./components/LoginDialog";

import BrandSignUpPage from "./components/brand/brandSignupDialog";
import InfluencerSignUpPage from "./components/influencer/influencerSignupDialog";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/bsignup" element={<BrandSignUpPage />} />
        <Route path="/isignup" element={<InfluencerSignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
