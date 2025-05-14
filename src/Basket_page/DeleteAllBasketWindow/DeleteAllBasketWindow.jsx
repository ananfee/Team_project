import React, { useEffect } from 'react';
import CancelButton from "../DeleteProductWindow/CancelButton/CancelButton.jsx";
import DeleteProductButton from "../DeleteProductWindow/DeleteProductButton/DeleteProductButton.jsx";
import '../DeleteProductWindow/DeleteProductWindow.css';
import cp from '../../images/add.png';

const DeleteAllBasketWindow = ({ onClose, isOpen }) => {

    const handleClose = (event) => {
        if (event.target === event.currentTarget) { // Закрываем при клике вне окна
            onClose();
        }
    };

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleEsc);
        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [onClose]);

    return (
        <div className="deleteProductWindow-overlay" 
             style={{ display: isOpen ? 'flex' : 'none' }} 
             onClick={handleClose} // Закрываем при клике на оверлей
        >
            <div className="deleteProductWindow-content">
                <div className='NameDeleteProductWindow'>
                    <p>Очистка корзины</p>
                    <button className='closeDeleteProductWindow' onClick={onClose}>
                        <img src={cp} alt="Закрыть" />
                    </button>
                </div>
                <div className='DescriptionDeleteProductWindow'>
                    <p>Вы уверены, что хотите удалить все товары из корзины? Отменить данное действие будет невозможно.</p>
                </div>
                <div className='conteiner_buttons'>
                    <CancelButton onClick={onClose} />
                    <DeleteProductButton onClick={onClose} />
                </div>
            </div>
        </div>
    );
};

export default DeleteAllBasketWindow;
