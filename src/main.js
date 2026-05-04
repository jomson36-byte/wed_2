import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import './style.css';

const h = React.createElement;

createRoot(document.getElementById('root')).render(
  h(StrictMode, null, h(App)),
);
