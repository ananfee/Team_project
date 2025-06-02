import React, { useState } from 'react';
import './ResultConteiner.css';
import PlaceOrderButton from '../PlaceOrderButton/PlaceOrderButton.jsx';
import PlaceOrderWindow from '../PlaceOrderWindow/PlaceOrderWindow'; // Импортируем окно заказа
import FetchWithAuth from '../../layout/LoginWindow/FetchWithAuth.js';


const ResultConteiner = ({ totalItems, totalOriginalPrice, totalDiscount, finalPrice, onClearBasket }) => {
    const [isPlaceOrderWindowOpen, setIsPlaceOrderWindowOpen] = useState(false);
    const [orderMessage, setOrderMessage] = useState(''); // Состояние для сообщения о статусе заказа

    const openPlaceOrderWindow = () => {
        setOrderMessage(''); // Очищаем сообщение при открытии нового окна, если оно было
        setIsPlaceOrderWindowOpen(true);
    };

    const closePlaceOrderWindow = () => {
        setIsPlaceOrderWindowOpen(false);
        setOrderMessage(''); // Также очищаем сообщение при закрытии окна
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
        // 1. Открываем окно сразу, чтобы показать пользователю, что что-то происходит.
        openPlaceOrderWindow();
        // 2. Устанавливаем начальное сообщение о процессе.
        setOrderMessage('Оформление заказа...');

        try {
            const response = await FetchWithAuth('http://127.0.0.1:8000/catalog/cart/checkout/', {
                method: 'POST',
            });

            if (response === null) {
                // Это может произойти, если FetchWithAuth не смог обновить токен.
                setOrderMessage("Ошибка авторизации. Попробуйте войти снова.");
                // Возвращаемся, не пытаясь обработать ответ дальше
                return;
            }

            if (!response.ok) {
                const errorData = await response.json();
                // Исправлен синтаксис строки и оператор ||
                const errorMessage = errorData?.error || errorData?.detail || `Ошибка оформления заказа: ${response.statusText}`;
                setOrderMessage(errorMessage); // Устанавливаем сообщение об ошибке
                console.error("Ошибка при оформлении заказа:", errorMessage);
                return; // Возвращаемся после обработки ошибки
            }

            const data = await response.json();
            setOrderMessage(data.message); // Успешное сообщение: "Заказ успешно оформлен"

            // Если заказ успешно оформлен, очищаем корзину.
            // PlaceOrderWindow остается открытым с этим сообщением, пока пользователь не нажмет "ОК".
            onClearBasket(); // Вызывает loadBasket в BasketPage, которая обновит корзину

        } catch (error) {
            console.error("Ошибка при оформлении заказа:", error);
            // Исправлен синтаксис строки
            setOrderMessage(`Произошла ошибка при оформлении заказа. ${error.message || 'Пожалуйста, попробуйте снова.'}`);
        }
        // Окно не закрывается здесь. Оно остается открытым с результатом, пока пользователь не нажмет "ОК"
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
                    orderMessage={orderMessage} // Передаем сообщение о статусе
                />
            </div>
        </div>
    );
};

export default ResultConteiner;
