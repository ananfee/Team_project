import React, { useEffect } from 'react';
import OKButton from "./OKButton/OKButton";
import '../DeleteProductWindow/DeleteProductWindow.css';
import cp from '../../images/add.png';
const PlaceOrderWindow = ({ onClose, isOpen, orderMessage, onConfirm }) => {
    const isOrderSuccessful = orderMessage === "Заказ успешно оформлен!";

    // Обработчик подтверждения (закрытия)
    const handleConfirm = () => {
        if (isOrderSuccessful) {
            onConfirm(); // Очищаем корзину только при успешном заказе
        }
        window.location.reload(); // Обновляем страницу
        onClose(); // Закрываем окно в любом случае
    };

    const handleClose = (event) => {
        if (event.target === event.currentTarget) {
             window.location.reload(); // Обновляем страницу
            onClose();

        }
    };

    const isErrorMessage = orderMessage && (
        orderMessage.includes('Ошибка') ||
        orderMessage.includes('пуста') ||
        orderMessage.includes('не удалось') ||
        orderMessage.includes('отсутствуют') ||
        orderMessage.includes('Произошла ошибка')
    );

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape") {
                 window.location.reload(); // Обновляем страницу
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleEsc);
        }

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen, onClose]);

    return (
        <div
            className="deleteProductWindow-overlay"
            style={{ display: isOpen ? 'flex' : 'none' }}
            onClick={handleClose}
        >
            <div className="deleteProductWindow-content">
                <div className='NameDeleteProductWindow'>
                    <p>{isErrorMessage ? 'Ошибка оформления заказа' : 'Заказ успешно оформлен'}</p>
                    <button className='closeDeleteProductWindow' onClick={() => { window.location.reload(); onClose(); }}>
                        <img src={cp} alt="Закрыть" />
                    </button>
                </div>
                <div className='DescriptionDeleteProductWindow'>
                    {orderMessage && (
                        <p
                            style={{
                                color: isErrorMessage ? 'red' : 'green',
                                fontWeight: 'bold',
                                marginBottom: '10px'
                            }}
                        >
                            {orderMessage}
                        </p>
                    )}
                    {isOrderSuccessful && (
                        <p>Для просмотра подробной информации о заказе вы можете перейти к истории заказов.</p>
                    )}
                </div>
                <div className='conteiner_buttons'>
                    <OKButton onClick={handleConfirm} />
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderWindow;