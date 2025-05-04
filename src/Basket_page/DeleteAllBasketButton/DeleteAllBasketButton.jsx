import React, { useState } from 'react';
import "./DeleteAllBasketButton.css";
import bag from '../../images/bag.png';


const DeleteAllBasketButton = () => {

    return (
        <button className='buttonAllBasket'>
        <img src={bag} alt="" />
        <p>Очистить корзину</p>
        </button>
    );
};

export default DeleteAllBasketButton;
