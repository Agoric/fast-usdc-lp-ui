import './installSesLockdown.ts';
import { ToastContainer } from 'react-toastify';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <ToastContainer className="mt-16" />
  </StrictMode>
);
