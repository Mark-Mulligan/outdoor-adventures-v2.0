import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import LandingPage from './pages/LandingPage';
import ParksPage from './pages/ParksPage';
import ParkPage from './pages/ParkPage';

function App() {
  return (
    <Typography component="div" className="app">
      <BrowserRouter>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/parks" component={ParksPage} />
        <Route exact path="/parks/:parkcode" component={ParkPage} />
      </BrowserRouter>
    </Typography>
  );
}

export default App;
