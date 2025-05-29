import React from 'react';
import ReactDOM from 'react-dom/client';
import Main_page from './Main_page';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Catalog_page from './Catalog_page/Catalog_page.js';
import Details_page from './Details_page/Details_page.js';
import HistoryPageClient from './History_page/History_page_client.js';
import HistoryPageAdmin from './History_page/History_page_admin.js';
import BasketPage from './Basket_page/Basket_page';

function App(){
  
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Main_page />} />
        <Route path="/new/:id" element={<Details_page />} />
        <Route path="/cp" element={<Catalog_page />} />
        <Route path="/historyClient" element={<HistoryPageClient />} />
        <Route path="/historyAdmin" element={<HistoryPageAdmin />} />
        <Route path="/basket" element={<BasketPage />} />
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
