import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import ParksPage from './pages/ParksPage';
import ParkPage from './pages/ParkPage';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/parks" component={ParksPage} />
      <Route exact path="/parks/:parkcode" component={ParkPage} />
    </BrowserRouter>
  );
}

export default App;
