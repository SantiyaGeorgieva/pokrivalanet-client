import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import Home from './pages/Home';
import AwningsAndShades from './pages/AwningsAndShades';
import UnderConstruction from './pages/UnderConstruction';
import Contact from './pages/Contact';
import Header from './components/Header';
import Footer from './components/Footer';
import CookieConsent from 'react-cookie-consent';

function App() {
  const [hideMain, setHideMain] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggle = () => {
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
        <Header isMobile={isMobile} isOpen={isOpen} toggle={toggle} />
      </header>
      <main role="main">
        <Routes>
          <Route exact path="/" element={<Home hideMain={hideMain} isMobile={isMobile} />} />
          <Route exact path="/truck-covers" element={<UnderConstruction isMobile={isMobile} hideMain={hideMain} />} preventScrollReset={true} />
          <Route exact path="/windproof-curtains" element={<UnderConstruction isMobile={isMobile} hideMain={hideMain} />} preventScrollReset={true} />
          <Route exact path="/awnings-and-shades" element={<AwningsAndShades isMobile={isMobile} hideMain={hideMain} />} />
          <Route exact path="/covers-for-fishponds-and-lagoons" element={<UnderConstruction isMobile={isMobile} hideMain={hideMain} />} />
          <Route exact path="/curtains-for-cow-farms" element={<UnderConstruction isMobile={isMobile} hideMain={hideMain} />} />
          <Route exact path="/industrial-products" element={<UnderConstruction isMobile={isMobile} hideMain={hideMain} />} />
          <Route exact path="/prefab-tents" element={<UnderConstruction isMobile={isMobile} hideMain={hideMain} />} />
          <Route exact path="/large-bedspreads" element={<UnderConstruction isMobile={isMobile} hideMain={hideMain} />} />
          <Route exact path="/linings-and-covers" element={<UnderConstruction isMobile={isMobile} hideMain={hideMain} />} />
          <Route exact path="/cover-for-wagons" element={<UnderConstruction isMobile={isMobile} hideMain={hideMain} />} />
          <Route exact path="/contact" element={<Contact hideMain={hideMain} />} />
        </Routes>
      </main>
      {!hideMain ? <Footer isMobile={isMobile} /> : <></>}
      <div className="container">
        <CookieConsent
          buttonWrapperClasses={`${isMobile ? 'test' : ''}`}
          buttonClasses={`${isMobile ? 'button-cookie' : ''}`}
          location="bottom"
          buttonText="Приеми"
          cookieName="pokrivalaCookie"
          style={{ display: 'flex', alignItems: 'center', background: "#2B373B", textAlign: 'left', padding: '10px 0 10px 15px', opacity: '.85' }}
          buttonStyle={{ background: '#fff', color: "#4e503b", fontSize: "14px", fontWeight: '600', borderRadius: '30px' }}
          expires={150}
        >
          <p className="mb-0">Pokrivala използва бисквитки, за да гарантира на потребителите използването на функциите на своя сайт, като предлага по-добро потребителско изживяване.</p>
          <p className="mb-0">Продължавайки да разглеждате сайта, вие се съгласявате с използването на бисквитки.</p>
        </CookieConsent>
      </div>
    </div>
  )
}

export default App;
