import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import CookieConsent from 'react-cookie-consent';
import Home from './pages/Home';
import AwningsAndShades from './pages/AwningsAndShades';
import UnderConstruction from './pages/UnderConstruction';
import Contact from './pages/Contact';
import Header from './components/Header';
import Footer from './components/Footer';
import AboutMe from './pages/AboutMe';
import WindproofCurtains from './pages/WindproofCurtains';
import IndustrialProducts from './pages/IndustrialProducts';
import TruckCovers from './pages/TruckCovers';
import NotFound from './pages/NotFound';
import CoversForFishpondsAndLagoons from './pages/CoversForFishpondsAndLagoons';
import Administration from './pages/Administration';
import './App.css';

function App() {
  const [hideMain, setHideMain] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleClass = (e) => {
    setIsOpen(!isOpen);
    setHideMain(!hideMain);
  };

  useEffect(() => {
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      setIsMobile(true);
    }
  }, []);

  return (
    <div className="App">
      <header className="top-navbar">
        <Header isMobile={isMobile} isOpen={isOpen} toggleClass={toggleClass} />
      </header>
      <main role="main">
        <Routes>
          <Route exact path="/" element={<Home hideMain={hideMain} isMobile={isMobile} />} />
          <Route exact path="/truck-covers" element={<TruckCovers isMobile={isMobile} hideMain={hideMain} />} preventScrollReset={true} />
          <Route exact path="/truck-covers/calculator" element={<UnderConstruction isMobile={isMobile} hideMain={hideMain} />} preventScrollReset={true} />
          <Route exact path="/windproof-curtains" element={<WindproofCurtains isMobile={isMobile} hideMain={hideMain} />} preventScrollReset={true} />
          <Route exact path="/awnings-and-shades" element={<AwningsAndShades isMobile={isMobile} hideMain={hideMain} />} preventScrollReset={true} />
          <Route exact path="/covers-for-fishponds-and-lagoons" element={<CoversForFishpondsAndLagoons isMobile={isMobile} hideMain={hideMain} />} />
          <Route exact path="/curtains-for-cow-farms" element={<UnderConstruction isMobile={isMobile} hideMain={hideMain} preventScrollReset={true} />} />
          <Route exact path="/industrial-products" element={<IndustrialProducts isMobile={isMobile} hideMain={hideMain} preventScrollReset={true} />} />
          <Route exact path="/prefab-tents" element={<UnderConstruction isMobile={isMobile} hideMain={hideMain} />} preventScrollReset={true} />
          <Route exact path="/large-bedspreads" element={<UnderConstruction isMobile={isMobile} hideMain={hideMain} preventScrollReset={true} />} />
          <Route exact path="/linings-and-covers" element={<UnderConstruction isMobile={isMobile} hideMain={hideMain} preventScrollReset={true} />} />
          <Route exact path="/cover-for-wagons" element={<UnderConstruction isMobile={isMobile} hideMain={hideMain} preventScrollReset={true} />} />
          <Route exact path="/contact" element={<Contact hideMain={hideMain} isMobile={isMobile} preventScrollReset={true} />} />
          <Route exact path="/about-me" element={<AboutMe hideMain={hideMain} isMobile={isMobile} preventScrollReset={true} />} />
          <Route exact path="/admin-panel" element={<Administration hideMain={hideMain} isMobile={isMobile} preventScrollReset={true} />} />
          <Route path="/not-found" element={<NotFound hideMain={hideMain} isMobile={isMobile} preventScrollReset={true} />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </main>
      {!hideMain ? <Footer isMobile={isMobile} /> : <></>}
      <div className="container-fluid px-0">
        <CookieConsent
          buttonWrapperClasses={`${isMobile ? 'button-cookie-wrapper' : ''}`}
          buttonClasses={`${isMobile ? 'button-cookie' : ''}`}
          contentClasses={`${isMobile ? 'cookie-content' : ''}`}
          containerClasses={`${isMobile ? 'cookie-container' : ''}`}
          location="bottom"
          buttonText="Приемам"
          cookieName="pokrivalaCookie"
          style={{ display: 'flex', alignItems: 'center', background: "#2B373B", textAlign: 'left', padding: '10px 15px', opacity: '.85' }}
          buttonStyle={{ background: '#fff', color: "#4e503b", fontSize: "14px", fontWeight: '600', textTransform: 'uppercase', fontSize: '13px', fontWeight: '600' }}
          expires={150}
        >
          <p className="mb-0">
            Ние използваме "бисквитки", за да Ви осигурим по-добро съдържание и потребителско преживяване.
          </p>
        </CookieConsent>
      </div>
    </div>
  )
}

export default App;
