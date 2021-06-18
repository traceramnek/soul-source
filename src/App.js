import React from 'react';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import GlobalSnackbar from './features/globalSnackbar/GlobalSnackbar';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <GlobalSnackbar></GlobalSnackbar>
    </div>
  );
}

export default App;
