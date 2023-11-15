import React, { Suspense, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import CookieConsent from 'react-cookie-consent';
import { useTranslation } from 'react-i18next';
import './i18n'
import Header from './components/Header';
import Footer from './components/Footer';
import AboutMe from './pages/AboutMe';
import Home from './pages/Home';
import TruckCovers from './pages/TruckCovers';
import AwningsAndShades from './pages/AwningsAndShades';
import WindproofCurtains from './pages/WindproofCurtains';
import IndustrialProducts from './pages/IndustrialProducts';
import CoversForFishpondsAndLagoons from './pages/CoversForFishpondsAndLagoons';
import CurtainsCowFarms from './pages/CurtainsCowFarms';
import PrefabricatedТents from './pages/PrefabricatedТents';
import LargeCovers from './pages/LargeCovers';
import LiningsAndCovers from './pages/LiningsAndCovers';
import WagonCovers from './pages/WagonCovers';
import Contact from './pages/Contact';
import Register from './pages/Administration/Register';
import Login from './pages/Administration/Login';
import UnderConstruction from './pages/UnderConstruction';
import Administration from './pages/Administration';
import NotFound from './pages/NotFound';

import './App.css';

const App = () => {
  const [hideMain, setHideMain] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedItem, setSelectedItem] = useState(localStorage.getItem("i18nextLng"));
  const { t } = useTranslation();

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
    <div className="app">
      <Suspense fallback={null}>
        <header className="top-navbar">
          <Header isMobile={isMobile} isOpen={isOpen} toggleClass={toggleClass} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
        </header>
        <main role="main">
          <Routes>
            <Route exact path="/" element={<Home hideMain={hideMain} isMobile={isMobile} />} />
            <Route exact path="/truck-covers" element={<TruckCovers isMobile={isMobile} hideMain={hideMain} />} preventScrollReset={true} />
            <Route exact path="/truck-covers/calculator" element={<UnderConstruction isMobile={isMobile} hideMain={hideMain} />} preventScrollReset={true} />
            <Route exact path="/windproof-curtains" element={<WindproofCurtains isMobile={isMobile} hideMain={hideMain} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />} preventScrollReset={true} />
            <Route exact path="/awnings-and-shades" element={<AwningsAndShades isMobile={isMobile} hideMain={hideMain} />} preventScrollReset={true} />
            <Route exact path="/covers-for-fishponds-and-lagoons" element={<CoversForFishpondsAndLagoons isMobile={isMobile} hideMain={hideMain} />} />
            <Route exact path="/curtains-for-cow-farms" element={<CurtainsCowFarms isMobile={isMobile} hideMain={hideMain} preventScrollReset={true} />} />
            <Route exact path="/industrial-products" element={<IndustrialProducts isMobile={isMobile} hideMain={hideMain} preventScrollReset={true} />} />
            <Route exact path="/prefabricated-tents" element={<PrefabricatedТents isMobile={isMobile} hideMain={hideMain} />} preventScrollReset={true} />
            <Route exact path="/large-covers" element={<LargeCovers isMobile={isMobile} hideMain={hideMain} preventScrollReset={true} />} />
            <Route exact path="/linings-and-covers" element={<LiningsAndCovers isMobile={isMobile} hideMain={hideMain} preventScrollReset={true} />} />
            <Route exact path="/cover-for-wagons" element={<WagonCovers isMobile={isMobile} hideMain={hideMain} preventScrollReset={true} />} />
            <Route exact path="/contact" element={<Contact hideMain={hideMain} isMobile={isMobile} preventScrollReset={true} />} />
            <Route exact path="/about-me" element={<AboutMe hideMain={hideMain} isMobile={isMobile} preventScrollReset={true} />} />
            <Route exact path="/register" element={<Register hideMain={hideMain} isMobile={isMobile} preventScrollReset={true} />} />
            <Route exact path="/login" element={<Login hideMain={hideMain} isMobile={isMobile} preventScrollReset={true} />} />
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
            buttonText={`${t('agree_button')}`}
            cookieName="pokrivalaCookie"
            style={{ display: 'flex', alignItems: 'center', background: "#2B373B", textAlign: 'left', padding: '10px 15px', opacity: '.85' }}
            buttonStyle={{ background: '#fff', color: "#4e503b", fontSize: "14px", fontWeight: '600', textTransform: 'uppercase', fontSize: '13px', fontWeight: '600' }}
            expires={150}
          >
            <p className="mb-0">{t('cookie_text')}</p>
          </CookieConsent>
        </div>
      </Suspense>
    </div>
  )
}

export default App;
