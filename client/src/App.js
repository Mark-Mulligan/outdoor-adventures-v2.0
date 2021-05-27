import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import LandingPage from './pages/LandingPage';
import ParksPage from './pages/ParksPage';

function App() {
  return (
    <Typography>
      <BrowserRouter>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/parks" component={ParksPage} />
      </BrowserRouter>
    </Typography>
  );
}

export default App;
