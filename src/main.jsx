import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/barlow/latin-400.css';
import '@fontsource/barlow/latin-600.css';
import '@fontsource/barlow-condensed/latin-700.css';
import App from './App.jsx';
import './styles/site.css';

createRoot(document.getElementById('root')).render(<BrowserRouter><App /></BrowserRouter>);
