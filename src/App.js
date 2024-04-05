import React, { Suspense, memo, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import CookieConsent from 'react-cookie-consent';
import { useTranslation } from 'react-i18next';
import './i18n';
import { endpoints, linkUrl } from './utils';
import Header from './components/Header';
import Footer from './components/Footer';
import TruckCovers from './pages/TruckCovers';
import TruckGondolaCalculator from './pages/TruckGondolaCalculator';
import TruckShuterCalculator from './pages/TruckShuterCalculator';
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
import Administration from './pages/Administration';
import Login from './pages/Administration/Login';
import NotFound from './pages/NotFound';
// import Home from './pages/Home';
// import Register from './pages/Administration/Register';
// import UnderConstruction from './pages/UnderConstruction';

import 'react-day-picker/dist/style.css';
import './App.css';
import { store } from './store';
import { refresh } from './reducers/authSlice';

const App = memo(function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [offerTitle, setOfferTitle] = useState('');
  const [selectedItem, setSelectedItem] = useState(localStorage.getItem("i18nextLng"));
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  let { user } = useSelector((state) => state.auth);
  user = user ?? ({ username: localStorage.getItem("username"), expirationTime: localStorage.getItem("expirationTime")});

  useEffect(() => {
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      setIsMobile(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) { 
      navigate("/admin-panel/1");
      setVisible(true);
    } else if (!isAuthenticated && new Date().toISOString() < user?.expirationTime) {
      store.dispatch(refresh());
      fetch(`${linkUrl()}${endpoints.refresh}`, {
        method: "GET",
        cache: "no-cache",
        pragma: "no-cache",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Access-Control-Allow-Headers",
          "Access-Control-Allow-Credentials": true
        },
        responseType: "json",
      });
    } else {  
      navigate("/login");
      setVisible(true);
    }

    setTimeout(() => {
      setVisible(false);
    }, 2500);
  }, [isAuthenticated]);

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
            {/* <Route exact path="/" element={<Home isMobile={isMobile} />} /> */}
            <Route index exact path="/" element={<TruckCovers handleCardTitle={handleCardTitle} isMobile={isMobile} />} preventScrollReset={true} />
            <Route exact path="/truck-covers/gondola-calculator" element={<TruckGondolaCalculator isMobile={isMobile} offerTitle={offerTitle} />} preventScrollReset={true} />
            <Route exact path="/truck-covers/shutter-calculator" element={<TruckShuterCalculator isMobile={isMobile} offerTitle={offerTitle} />} preventScrollReset={true} />
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
            {!isAuthenticated && <Route exact path="/login" element={<Login setError={setError} error={error} message={message} setVisible={setVisible} visible={visible} setMessage={setMessage} isMobile={isMobile} preventScrollReset={true} />} />}
            {isAuthenticated && <Route exact path="/admin-panel/:id" element={<Administration message={message} setMessage={setMessage} setError={setError} visible={visible} isMobile={isMobile} preventScrollReset={true} />} />}
            <Route path="/not-found" element={<NotFound isMobile={isMobile} preventScrollReset={true} />} />
            {/* <Route exact path="/register" element={<Register isMobile={isMobile} preventScrollReset={true} />} /> */}
            {/* <Route exact path="/some-route" element={<UnderConstruction isMobile={isMobile} />} preventScrollReset={true} /> */}
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Routes>
        </main>
        <Footer isMobile={isMobile} />
        <div className="container-fluid px-0">
          <CookieConsent
            ariaAcceptLabel={`${t('cookie_text')}`}
            buttonWrapperClasses={`${isMobile ? 'button-cookie-wrapper' : ''}`}
            buttonClasses={`${isMobile ? 'button-cookie' : ''}`}
            contentClasses={`${isMobile ? 'cookie-content' : ''}`}
            containerClasses={`${isMobile ? 'cookie-container' : ''}`}
            location="bottom"
            buttonText={`${t('agree_button')}`}
            cookieName="pokrivalaCookie"
            style={{ display: 'flex', alignItems: 'center', background: "#2B373B", textAlign: 'left', padding: '10px 15px', opacity: '.85' }}
            buttonStyle={{ background: '#fff', color: "#4e503b", fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', margin: 0 }}
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
