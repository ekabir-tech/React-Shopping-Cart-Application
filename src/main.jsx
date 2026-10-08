import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import CartProvider from './context/CartProvider.jsx';
import './index.css';

// Entry point: CartProvider makes the global cart available to the whole app.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>,
);
