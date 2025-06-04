import React, { useState } from 'react';
import './ResultConteiner.css';
import PlaceOrderButton from '../PlaceOrderButton/PlaceOrderButton.jsx';
import PlaceOrderWindow from '../PlaceOrderWindow/PlaceOrderWindow'; // Импортируем окно заказа
import FetchWithAuth from '../../layout/LoginWindow/FetchWithAuth.js';


const ResultConteiner = ({
    totalItems,
    totalOriginalPrice,
    totalDiscount,
    finalPrice,
    onClearBasket // Передаем функцию очистки корзины
}) => {
    const [isPlaceOrderWindowOpen, setIsPlaceOrderWindowOpen] = useState(false);
    const [orderMessage, setOrderMessage] = useState('');

    const openPlaceOrderWindow = () => {
        setOrderMessage('');
        setIsPlaceOrderWindowOpen(true);
    };

    const closePlaceOrderWindow = () => {
        setIsPlaceOrderWindowOpen(false);
        setOrderMessage('');
    };
    const formatItemWord = (count) => {
        // Исправлен оператор ||
        if (typeof count !== 'number' || count < 0 || !Number.isFinite(count)) return 'товаров';
        const lastDigit = count % 10;
        const lastTwoDigits = count % 100;
        if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'товаров';
        if (lastDigit === 1) return 'товар';
        if (lastDigit >= 2 && lastDigit <= 4) return 'товара';
        return 'товаров';
    };
    const formatPrice = (price) => {
        // Исправлен оператор || и синтаксис строки
        if (price == null || typeof price !== 'number' || !Number.isFinite(price)) {
            return '--- ₽';
        }
        return `${Math.round(price)} ₽`;
    };
    const handlePlaceOrder = async () => {
        openPlaceOrderWindow();
        setOrderMessage('Оформление заказа...');

        try {
            const response = await FetchWithAuth('http://127.0.0.1:8000/catalog/cart/checkout/', {
                method: 'POST',
            });

            if (response === null) {
                setOrderMessage("Ошибка авторизации. Попробуйте войти снова.");
                return;
            }

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData?.error || errorData?.detail || `Ошибка оформления заказа: ${response.statusText}`;
                setOrderMessage(errorMessage);
                console.error("Ошибка при оформлении заказа:", errorMessage);
                return;
            }

            const data = await response.json();
            setOrderMessage(data.message || "Заказ успешно оформлен!");

            // НЕ вызываем onClearBasket здесь. Это будет сделано в PlaceOrderWindow.

        } catch (error) {
            console.error("Ошибка при оформлении заказа:", error);
            setOrderMessage(`Произошла ошибка при оформлении заказа. ${error.message || 'Пожалуйста, попробуйте снова.'}`);
        }
    };

    return (
                <div className='resultConteiner'>
            <div className='conteinerDop'>
                 <p style={{ fontSize: 24 }}>К оплате</p>
                <div className='infoText'>
                    <div className='resultProductPrice'>
                        <p style={{ fontSize: 16 }}>{totalItems ?? 0} {formatItemWord(totalItems)}</p>
                        <p style={{ fontSize: 16 }}>{formatPrice(totalOriginalPrice)} </p>
                    </div>
                    <div className='resultProductPrice'>
                        <p style={{ fontSize: 16 }}>Скидка</p>
                        <p style={{ fontSize: 16, color: "#ED0006" }}>{formatPrice(totalDiscount ? -Math.abs(totalDiscount) : 0)}</p>
                    </div>
                    <div className='resultProductPrice'>
                        <p style={{ fontSize: 16 }}>Итого</p>
                        <p style={{ fontSize: 16 }}>{formatPrice(finalPrice)}</p>
                    </div>
                </div>
                {/* Теперь PlaceOrderButton напрямую вызывает handlePlaceOrder */}
                <PlaceOrderButton onOpenPlaceOrderWindow={handlePlaceOrder} />
                {/* PlaceOrderWindow теперь получает только orderMessage и управляется состоянием isOpen */}
                <PlaceOrderWindow
                    onClose={closePlaceOrderWindow}
                    isOpen={isPlaceOrderWindowOpen}


orderMessage={orderMessage}
                    onConfirm={onClearBasket} // Передаем onClearBasket в PlaceOrderWindow
                />
            </div>
        </div>
    );
};

export default ResultConteiner;