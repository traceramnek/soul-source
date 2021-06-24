import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import GlobalSnackbar from './features/globalSnackbar/GlobalSnackbar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <GlobalSnackbar></GlobalSnackbar>
      {/* <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </Switch> */}
    </div>
  );
}

export default App;
