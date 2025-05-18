import React, { useState } from 'react';
import './ResultConteiner.css';
import PlaceOrderButton from '../PlaceOrderButton/PlaceOrderButton.jsx';
import PlaceOrderWindow from '../PlaceOrderWindow/PlaceOrderWindow'; // Импортируем окно заказа

const ResultConteiner = ({ totalItems, totalOriginalPrice, totalDiscount, finalPrice }) => {

    // Состояние для окна заказа
    const [isPlaceOrderWindowOpen, setIsPlaceOrderWindowOpen] = useState(false);

    const openPlaceOrderWindow = () => {
        setIsPlaceOrderWindowOpen(true);

    };

    const closePlaceOrderWindow = () => {
        setIsPlaceOrderWindowOpen(false);
        // TODO: Возможно, нужно очистить данные о заказе
    };

     // Вспомогательная функция для правильного склонения слова "товар"
    const formatItemWord = (count) => {
         // Возвращаем пустую строку или дефолтное значение, если count некорректен
        if (typeof count !== 'number' || count < 0 || !Number.isFinite(count)) return 'товаров';
        if (count === 1) return 'товар';

        const lastDigit = count % 10;
        const lastTwoDigits = count % 100;

        if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'товаров'; // 11-14 товаров
        if (lastDigit === 1) return 'товар'; // 1 товар (исключая 11)
        if (lastDigit >= 2 && lastDigit <= 4) return 'товара'; // 2-4 товара (исключая 12-14)
        return 'товаров'; // 0, 5-9, 10, 15-19, 20, 25-29...
    };

    // Функция для безопасного отображения цены (с форматированием)
    const displayPrice = (price) => {
        return price != null && typeof price === 'number' ? `${price.toFixed(2)} ₽` : '---';
    };

    return (
        <div className='resultConteiner'>
            <div className='conteinerDop'>
                <p style={{ fontSize: 24 }}>К оплате</p>
                <div className='infoText'>

                    {/* Общее количество товаров */}
                    <div className='resultProductPrice'>
                        <p style={{ fontSize: 16 }}>{totalItems != null ? totalItems : 0} {formatItemWord(totalItems != null ? totalItems : 0)}</p>
                        <p style={{ fontSize: 16 }}>{displayPrice(totalOriginalPrice)} </p>
                    </div>

                    {/* Сумма скидки */}
                    <div className='resultProductPrice'>
                        <p style={{ fontSize: 16 }}>Скидка</p>
                        <p style={{ fontSize: 16, color: "#ED0006" }}>
                             {totalDiscount != null && typeof totalDiscount === 'number' ? `-${totalDiscount.toFixed(2)} ₽` : '---'} {/* Отображаем как отрицательное число */}
                        </p>
                    </div>

                    {/* Итоговая цена со скидкой */}
                    <div className='resultProductPrice'>
                        <p style={{ fontSize: 16 }}>Итого</p>
                        <p style={{ fontSize: 16 }}>{displayPrice(finalPrice)}</p>
                    </div>
                </div>
                <PlaceOrderButton onOpenPlaceOrderWindow={openPlaceOrderWindow} />
            </div>
            <PlaceOrderWindow onClose={closePlaceOrderWindow} isOpen={isPlaceOrderWindowOpen} />
        </div>
    );
};

export default ResultConteiner;
