import React from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import Home from './pages/Home';
import Contact from './pages/Contact';
import UnderConstruction from './pages/UnderConstruction';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/truck-covers" element={<UnderConstruction />} preventScrollReset={true} />
        <Route exact path="/windproof-curtains" element={<UnderConstruction />} preventScrollReset={true} />
        <Route exact path="/awnings-and-shades" element={<UnderConstruction />} />
        <Route exact path="/covers-for-fishponds-and-lagoons" element={<UnderConstruction />} />
        <Route exact path="/curtains-for-cow-farms" element={<UnderConstruction />} />
        <Route exact path="/industrial-products" element={<UnderConstruction />} />
        <Route exact path="/prefab-tents" element={<UnderConstruction />} />
        <Route exact path="/large-bedspreads" element={<UnderConstruction />} />
        <Route exact path="/linings-and-covers" element={<UnderConstruction />} />
        <Route exact path="/cover-for-wagons" element={<UnderConstruction />} />
        <Route exact path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App;
