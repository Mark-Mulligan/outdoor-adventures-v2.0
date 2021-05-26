import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import ParksPage from './pages/ParksPage';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/parks" component={ParksPage} />
    </BrowserRouter>
  );
}

export default App;
