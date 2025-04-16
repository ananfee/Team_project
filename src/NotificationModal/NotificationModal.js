import React, { useState } from 'react';
import NamePage from "./componentsNM/NamePage/NamePage";
import ListNotification from "./componentsNM/ListNotification/ListNotification";
import CloseButton from "./componentsNM/CloseButton/CloseButton";
import './NotificationModal.css';

const NotificationModal = ({ onClose }) => {
    const [isOpen, setIsOpen] = useState(true); // Состояние для управления открытием/закрытием модального окна

    const handleClose = () => {
        setIsOpen(false); // Закрываем модальное окно
        if (onClose) {
            onClose(); // Вызываем функцию onClose, если она передана
        }
    };

    if (!isOpen) {
        return null; // Если модальное окно закрыто, ничего не рендерим
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ placeItems: 'center' }}>
                <NamePage onClose={handleClose} />
                <ListNotification />
                <CloseButton onClick={handleClose} />
            </div>
        </div>
    );
};

export default NotificationModal;
