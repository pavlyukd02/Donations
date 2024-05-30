import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, CampaignDetails, CreateCampaign, AllCampaigns, Withdraw, UpdateProject } from './pages';
import { Footer, Header, HowIT, Navbar } from './components';
import Dashboard from './pages/Dashboard';
import ScrollToTop from './utils/ScrollToTop';





const App = () => {
  return (
    <div className="relative sm:-8 min-h-screen flex flex-row  font-montserrat">
      <div className="flex-1 max-sm:w-full mx-auto">
        
          <Routes>

            <Route path="/" element={<Home />}  />
            <Route path="/campaign-details/:id" element={<CampaignDetails />} />
            <Route path="/create-campaign" element={<CreateCampaign />} />
            <Route path="/all-campaigns" element={<AllCampaigns />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/update-project/:id" element={<UpdateProject />} />

          </Routes>
          <Footer />
       
      </div>
    </div>
  );
};

export default App;
