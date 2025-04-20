import React from 'react';
import ReactDOM from 'react-dom/client';
import Main_page from './Main_page';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Catalog_page from './Catalog_page/Catalog_page.js';
import Details_page from './Details_page/Details_page.js';
import HistoryPage from './History_page/History_page';

function App(){
  
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Main_page />} />
        {/* <Route path="/" element={<NotificationModal />} /> */}
        <Route path="/new/:id" element={<Details_page />} />
        <Route path="/cp" element={<Catalog_page />} />
        <Route path="/history" element={<HistoryPage />} />
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
