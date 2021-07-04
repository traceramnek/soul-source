import React from 'react';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import GlobalUIManager from './features/globalUIManager/GlobalUIManager';


function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <GlobalUIManager></GlobalUIManager>
    </div>
  );
}

export default App;
