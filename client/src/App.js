import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import axios from 'axios';
import { useCallback, useState, useEffect } from 'react';

import LandingPage from './pages/LandingPage';
import ParksPage from './pages/ParksPage';
import ParkPage from './pages/ParkPage';

function App() {
  const [apiUp, setApiUp] = useState(null);

  const checkApiOnline = useCallback(async () => {
    try {
      const response = await axios.get(`/api/testconnection`);
      if (response.status === 200) {
        setApiUp(true);
      } else {
        setApiUp(false);
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    checkApiOnline();
  }, [checkApiOnline]);

  return (
    <BrowserRouter>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/parks" component={ParksPage} />
      <Route exact path="/parks/:parkcode" component={ParkPage} />
    </BrowserRouter>
  );
}

export default App;
