import React from 'react';
import ReactDOM from 'react-dom/client';
import Main_page from './Main_page';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Catalog_page from './Catalog_page/Catalog_page.js';
import Details_page from './Details_page/Details_page.js';

function App(){
  
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Catalog_page />} />
        <Route path="/new" element={<Details_page />} />
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
