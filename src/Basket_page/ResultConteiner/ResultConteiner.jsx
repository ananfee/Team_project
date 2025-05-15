import React, { useState } from 'react';
import './ResultConteiner.css';
import PlaceOrderButton from '../PlaceOrderButton/PlaceOrderButton.jsx';
import ListProductsInBasket from '../ListProductsInBasket/ListProductsInBasket'; 
import PlaceOrderWindow from '../PlaceOrderWindow/PlaceOrderWindow'; // Импортируем окно заказа

const ResultConteiner = () => {
    const products = ListProductsInBasket.products; // Получаем products из ListProductsInBasket
    const totalItems = products.length;
    const totalPrice = products.reduce((sum, item) => sum + item.newPrice, 0);
    const discount = 123; // Ваша логика расчета скидки
    const finalPrice = totalPrice - discount;

    const [isPlaceOrderWindowOpen, setIsPlaceOrderWindowOpen] = useState(false); // Новое состояние для окна заказа

    const openPlaceOrderWindow = () => {
        setIsPlaceOrderWindowOpen(true);
    };

    const closePlaceOrderWindow = () => {
        setIsPlaceOrderWindowOpen(false);
    };

    return (
        <div className='resultConteiner'>
            <div className='conteinerDop'>
                <p style={{ fontSize: 24 }}>К оплате</p>
                <div className='infoText'>            
                    <div className='resultProductPrice'>
                        <p style={{ fontSize: 16 }}>{totalItems} {totalItems === 1 ? 'товар' : (totalItems >= 2 && totalItems <= 4) ? 'товара' : 'товаров'}</p>
                        <p style={{ fontSize: 16 }}>{totalPrice} ₽</p>
                    </div>
                    <div className='resultProductPrice'>
                        <p style={{ fontSize: 16 }}>Скидка</p>
                        <p style={{ fontSize: 16, color: "#ED0006" }}>{discount} ₽</p>
                    </div>
                    <div className='resultProductPrice'>
                        <p style={{ fontSize: 16 }}>Итого</p>
                        <p style={{ fontSize: 16 }}>{finalPrice} ₽</p> 
                    </div>
                </div>
                <PlaceOrderButton onOpenPlaceOrderWindow={openPlaceOrderWindow} /> {/* Передаем функцию открытия окна */}
            </div>
            {/* Добавляем окно заказа */}
            <PlaceOrderWindow onClose={closePlaceOrderWindow} isOpen={isPlaceOrderWindowOpen} />
        </div>
    );
};

export default ResultConteiner;
