import "./App.css";
import Home from "./components/Home";

import { Routes, Route } from "react-router-dom";

import LoginPage from "./components/LoginDialog";
import SignUpPage from "./components/SignUpDialog";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
