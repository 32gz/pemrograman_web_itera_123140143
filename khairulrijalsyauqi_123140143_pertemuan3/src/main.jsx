import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import App from './App.jsx';
import './index.css';

// Siapkan aplikasi di root DOM dan pasang provider yang dipakai lintas halaman.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <BookProvider>
        <App />
      </BookProvider>
    </BrowserRouter>
  </StrictMode>
);
