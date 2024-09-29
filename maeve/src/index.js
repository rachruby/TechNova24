import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "@propelauth/react";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider authUrl={process.env.REACT_APP_AUTH_URL}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
