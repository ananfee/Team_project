import React from 'react';
import './ResultConteiner.css'
import PlaceOrderButton from '../PlaceOrderButton/PlaceOrderButton.jsx';
import ListProductsInBasket from '../ListProductsInBasket/ListProductsInBasket'; 

  const ResultConteiner = () => {
    const products = ListProductsInBasket.products; // получаем products из ListProductsInBasket
    const totalItems = products.length;
    const totalPrice = products.reduce((sum, item) => sum + item.newPrice, 0);
    const discount = 123; // Ваша логика расчета скидки
    const finalPrice = totalPrice - discount;
    const discountPrice = products.reduce((sum, item) => sum + item.newPrice, 0);


    return (
        <div className='resultConteiner'>
            <div className='conteinerDop'>
                <p style={{fontSize:24}}>К оплате</p>
                    <div className='infoText'>            
                        <div className='resultProductPrice'>
                        <p style={{ fontSize: 16 }}>{totalItems} {totalItems === 1 ? 'товар' : (totalItems >= 2 && totalItems <= 4) ? 'товара' : 'товаров'}</p>
                        <p style={{ fontSize: 16 }}>{totalPrice} ₽</p>
                    </div>
                    <div className='resultProductPrice'>
                        <p style={{fontSize:16}}>Скидка</p>
                        <p style={{fontSize:16, color: "#ED0006"}}>123 ₽</p>
                    </div>
                    <div className='resultProductPrice'>
                        <p style={{ fontSize: 16 }}>Итого</p>
                        <p style={{ fontSize: 16 }}>{finalPrice} ₽</p> 
                    </div>
                </div>
                <PlaceOrderButton />        
            </div>
        </div>
    );
};

  export default ResultConteiner;