import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from "./components/footer/footer";
import Body from './components/body/body'; 
import Header from './layout/Header'; 
import NotificationModal from './NotificationModal/NotificationModal'; 

function Main_page() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
      setIsModalOpen(true);
  };

  const closeModal = () => {
      setIsModalOpen(false);
  };
  const goToHistoryPage = () => {
    navigate('/history');
  };
  return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        margin: 0
      }}>
    <Header onOpenModal={openModal} />
    {isModalOpen && (
        <NotificationModal onClose={closeModal} />
      )}
    <Body/>
    <Footer/>
    </div>
  );
}

export default Main_page;
