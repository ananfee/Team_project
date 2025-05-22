import React, { useState } from 'react';
import './ResultConteiner.css';
import PlaceOrderButton from '../PlaceOrderButton/PlaceOrderButton.jsx';
import PlaceOrderWindow from '../PlaceOrderWindow/PlaceOrderWindow'; // Импортируем окно заказа
import FetchWithAuth from '../../layout/LoginWindow/FetchWithAuth.js';

// const ResultConteiner = ({ totalItems, totalOriginalPrice, totalDiscount, finalPrice }) => {

//     // Состояние для окна заказа
//     const [isPlaceOrderWindowOpen, setIsPlaceOrderWindowOpen] = useState(false);

//     const openPlaceOrderWindow = () => {
//         setIsPlaceOrderWindowOpen(true);

//     };

//     const closePlaceOrderWindow = () => {
//         setIsPlaceOrderWindowOpen(false);
//         // TODO: Возможно, нужно очистить данные о заказе
//     };

//      // Вспомогательная функция для правильного склонения слова "товар"
//     const formatItemWord = (count) => {
//          // Возвращаем пустую строку или дефолтное значение, если count некорректен
//         if (typeof count !== 'number' || count < 0 || !Number.isFinite(count)) return 'товаров';
//         if (count === 1) return 'товар';

//         const lastDigit = count % 10;
//         const lastTwoDigits = count % 100;

//         if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'товаров'; // 11-14 товаров
//         if (lastDigit === 1) return 'товар'; // 1 товар (исключая 11)
//         if (lastDigit >= 2 && lastDigit <= 4) return 'товара'; // 2-4 товара (исключая 12-14)
//         return 'товаров'; // 0, 5-9, 10, 15-19, 20, 25-29...
//     };

//     // Функция для безопасного отображения цены (с форматированием)
//     const displayPrice = (price) => {
//         return price != null && typeof price === 'number' ? `${price.toFixed(2)} ₽` : '---';
//     };

//     return (
//         <div className='resultConteiner'>
//             <div className='conteinerDop'>
//                 <p style={{ fontSize: 24 }}>К оплате</p>
//                 <div className='infoText'>

//                     {/* Общее количество товаров */}
//                     <div className='resultProductPrice'>
//                         <p style={{ fontSize: 16 }}>{totalItems != null ? totalItems : 0} {formatItemWord(totalItems != null ? totalItems : 0)}</p>
//                         <p style={{ fontSize: 16 }}>{displayPrice(totalOriginalPrice)} </p>
//                     </div>

//                     {/* Сумма скидки */}
//                     <div className='resultProductPrice'>
//                         <p style={{ fontSize: 16 }}>Скидка</p>
//                         <p style={{ fontSize: 16, color: "#ED0006" }}>
//                              {totalDiscount != null && typeof totalDiscount === 'number' ? `-${totalDiscount.toFixed(2)} ₽` : '---'} {/* Отображаем как отрицательное число */}
//                         </p>
//                     </div>

//                     {/* Итоговая цена со скидкой */}
//                     <div className='resultProductPrice'>
//                         <p style={{ fontSize: 16 }}>Итого</p>
//                         <p style={{ fontSize: 16 }}>{displayPrice(finalPrice)}</p>
//                     </div>
//                 </div>
//                 <PlaceOrderButton onOpenPlaceOrderWindow={openPlaceOrderWindow} />
//             </div>
//             <PlaceOrderWindow onClose={closePlaceOrderWindow} isOpen={isPlaceOrderWindowOpen} />
//         </div>
//     );
// };

// export default ResultConteiner;

const ResultConteiner = ({ totalItems, totalOriginalPrice, totalDiscount, finalPrice, onClearBasket }) => {
    const [isPlaceOrderWindowOpen, setIsPlaceOrderWindowOpen] = useState(false);
    const [orderMessage, setOrderMessage] = useState('');

    const openPlaceOrderWindow = () => setIsPlaceOrderWindowOpen(true);
    const closePlaceOrderWindow = () => {
        setIsPlaceOrderWindowOpen(false);
        setOrderMessage('');
    };

    const formatItemWord = (count) => {
        if (typeof count !== 'number' || count < 0 || !Number.isFinite(count)) return 'товаров';
        const lastDigit = count % 10;
        const lastTwoDigits = count % 100;
        if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'товаров';
        if (lastDigit === 1) return 'товар';
        if (lastDigit >= 2 && lastDigit <= 4) return 'товара';
        return 'товаров';
    };

    const formatPrice = (price) => {
        return (price != null && typeof price === 'number' && Number.isFinite(price)) ? `${price.toFixed(2)} ₽` : '---';
    };

    const handlePlaceOrder = async () => {
        try {
            const response = await FetchWithAuth('http://127.0.0.1:8000/catalog/cart/checkout/', {
                method: 'POST',
            });

            if (response === null) {
                throw new Error("Не удалось обновить токен авторизации.");
            }

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData?.error || 'Ошибка оформления заказа.';
                setOrderMessage(errorMessage);
                return;
            }

            const data = await response.json();
            setOrderMessage(data.message); // "Заказ успешно оформлен"
            onClearBasket(); // Очистить корзину, если заказ успешен
            closePlaceOrderWindow(); // Закрыть окно оформления заказа
        } catch (error) {
            console.error("Ошибка при оформлении заказа:", error);
            setOrderMessage("Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте снова.");
        }
    };

    return (
        <div className='resultConteiner'>
            <div className='conteinerDop'>
                <p className='total-title'>К оплате</p>
                <div className='infoText'>
                    <div className='resultProductPrice'>
                        <p className='item-count'>{totalItems ?? 0} {formatItemWord(totalItems)}</p>
                        <p className='original-price'>{formatPrice(totalOriginalPrice)} </p>
                    </div>
                    <div className='resultProductPrice'>
                        <p className='discount-label'>Скидка</p>
                        <p className='discount-value'>{formatPrice(totalDiscount ? -totalDiscount : 0)}</p>
                    </div>
                    <div className='resultProductPrice'>
                        <p className='total-label'>Итого</p>
                        <p className='total-value'>{formatPrice(finalPrice)}</p>
                    </div>
                </div>
                <PlaceOrderButton onOpenPlaceOrderWindow={openPlaceOrderWindow} />
            </div>
            <PlaceOrderWindow onClose={closePlaceOrderWindow} isOpen={isPlaceOrderWindowOpen} onPlaceOrder={handlePlaceOrder} orderMessage={orderMessage} />
        </div>
    );
};

export default ResultConteiner;
