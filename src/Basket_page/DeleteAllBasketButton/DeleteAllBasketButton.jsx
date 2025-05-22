import React, { useState } from 'react';
import "./DeleteAllBasketButton.css";
import bag from '../../images/bag.png';


const DeleteAllBasketButton = ({ onOpenDeleteWindow }) => {

    return (
        <button  onClick={onOpenDeleteWindow} className='buttonAllBasket'>
        <img src={bag} alt="" />
        <p>Очистить корзину</p>
        </button>
    );
};

export default DeleteAllBasketButton;
