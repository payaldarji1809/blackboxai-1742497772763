import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import NavigationPage from "./components/NavigationPage";
import ClientLogin from "./ClientLogin";
import RegisterClient from "./RegisterClient";
import ClientDashboard from "./ClientDashboard";
import VoterLogin from "./VoterLogin";
import RegisterVoter from "./RegisterVoter";
import Vote from "./Vote";
import VerifyVote from "./VerifyVote";
import Results from "./Results";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Add required resources */}
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <script src="https://cdn.tailwindcss.com"></script>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/navigate" element={<NavigationPage />} />
          <Route path="/client" element={<ClientLogin />} />
          <Route path="/register-client" element={<RegisterClient />} />
          <Route path="/dashboard" element={<ClientDashboard />} />
          <Route path="/voter" element={<VoterLogin />} />
          <Route path="/register-voter" element={<RegisterVoter />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/verify-vote" element={<VerifyVote />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
