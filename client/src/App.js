import { BrowserRouter as Router } from 'react-router-dom';
import { SoundsProvider, createSounds } from 'arwes';
import AppLayout from './views/AppLayout';
import { sounds } from './settings';
import './styles/mission-control.css';

const App = () => (
  <SoundsProvider sounds={createSounds(sounds)}>
    <Router><AppLayout /></Router>
  </SoundsProvider>
);
export default App;
