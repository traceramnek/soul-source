import React from 'react';
import './App.scss';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import GlobalUIManager from './features/globalUIManager/GlobalUIManager';


function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <GlobalUIManager></GlobalUIManager>
      <Footer />
    </div>
  );
}

export default App;
