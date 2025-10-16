import { createRoot } from 'react-dom/client';
import './bootstrap';
import './assets/styles/index.css';
import App from './app';

createRoot(document.getElementById('root')!).render(<App />);
