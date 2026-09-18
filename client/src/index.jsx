import { createRoot } from 'react-dom/client';
import App from './App';

// Arwes BleepsProvider does not support StrictMode's effect replay.
createRoot(document.getElementById('root')).render(<App />);
