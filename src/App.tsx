import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/layout';
import HomePage from './Pages/homePage';
import Services from './Pages/services';
import About from './Pages/about';
import Contact from './Pages/contact'; 
import PrivacyPolicy from './footerPages/PrivacyPolicy';
import TermsOfService from './footerPages/TermsOfService';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />       
          <Route path="services" element={<Services />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
