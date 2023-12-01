import React, { Suspense, memo, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router';
import CookieConsent from 'react-cookie-consent';
import { useTranslation } from 'react-i18next';
import './i18n'
import Header from './components/Header';
import Footer from './components/Footer';
import AboutMe from './pages/AboutMe';
import Home from './pages/Home';
import TruckCovers from './pages/TruckCovers';
import TruckCoversCalculator from './pages/TruckCoversCalculator';
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
import Administration from './pages/Administration';
import NotFound from './pages/NotFound';
// import UnderConstruction from './pages/UnderConstruction';

import './App.css';

const App = memo(function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [offerTitle, setOfferTitle] = useState('');
  const [selectedItem, setSelectedItem] = useState(localStorage.getItem("i18nextLng"));
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      setIsMobile(true);
    }

    if (pathname === '/') {
      navigate("/truck-covers", { replace: true });
    }
  }, []);

  const handleCardTitle = (e, title) => {
    setOfferTitle(title);
  }

  return (
    <div className="app">
      <Suspense fallback={null}>
        <header className="top-navbar">
          <Header isMobile={isMobile} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
        </header>
        <main role="main">
          <Routes>
            <Route exact path="/" element={<Home isMobile={isMobile} />} />
            <Route index exact path="/truck-covers" element={<TruckCovers handleCardTitle={handleCardTitle} isMobile={isMobile} />} preventScrollReset={true} />
            <Route exact path="/truck-covers/calculator" element={<TruckCoversCalculator isMobile={isMobile} offerTitle={offerTitle} />} preventScrollReset={true} />
            {/* <Route exact path="/truck-covers/calculator" element={<UnderConstruction isMobile={isMobile}  />} preventScrollReset={true} /> */}
            <Route exact path="/windproof-curtains" element={<WindproofCurtains isMobile={isMobile} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />} preventScrollReset={true} />
            <Route exact path="/awnings-and-shades" element={<AwningsAndShades isMobile={isMobile} />} preventScrollReset={true} />
            <Route exact path="/covers-for-fishponds-and-lagoons" element={<CoversForFishpondsAndLagoons isMobile={isMobile} />} />
            <Route exact path="/curtains-for-cow-farms" element={<CurtainsCowFarms isMobile={isMobile} preventScrollReset={true} />} />
            <Route exact path="/industrial-products" element={<IndustrialProducts isMobile={isMobile} preventScrollReset={true} />} />
            <Route exact path="/prefabricated-tents" element={<PrefabricatedТents isMobile={isMobile} />} preventScrollReset={true} />
            <Route exact path="/large-covers" element={<LargeCovers isMobile={isMobile} preventScrollReset={true} />} />
            <Route exact path="/linings-and-covers" element={<LiningsAndCovers isMobile={isMobile} preventScrollReset={true} />} />
            <Route exact path="/cover-for-wagons" element={<WagonCovers isMobile={isMobile} preventScrollReset={true} />} />
            <Route exact path="/contact" element={<Contact isMobile={isMobile} preventScrollReset={true} />} />
            <Route exact path="/about-me" element={<AboutMe isMobile={isMobile} preventScrollReset={true} />} />
            <Route exact path="/register" element={<Register isMobile={isMobile} preventScrollReset={true} />} />
            <Route exact path="/login" element={<Login isMobile={isMobile} preventScrollReset={true} />} />
            <Route exact path="/admin-panel" element={<Administration isMobile={isMobile} preventScrollReset={true} />} />
            <Route path="/not-found" element={<NotFound isMobile={isMobile} preventScrollReset={true} />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Routes>
        </main>
        <Footer isMobile={isMobile} />
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
});

export default App;
