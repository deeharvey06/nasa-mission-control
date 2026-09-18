import { BrowserRouter } from 'react-router-dom';
import { BleepsProvider } from '@arwes/react-bleeps';
import AppLayout from './views/AppLayout';
import { sounds } from './settings';
import './styles/mission-control.css';
import './styles/accessibility.css';

export default function App() {
  return (
    <BleepsProvider {...sounds}>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </BleepsProvider>
  );
}
