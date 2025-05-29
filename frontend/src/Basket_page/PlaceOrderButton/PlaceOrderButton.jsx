import React, { useState } from 'react';
import "./PlaceOrderButton.css";

const PlaceOrderButton = ({ onOpenPlaceOrderWindow }) => {

    return (
        <button onClick={onOpenPlaceOrderWindow} className="buttonPlaceOrder">
        <p>Оформить заказ</p>
        </button>
    );
};

export default PlaceOrderButton;
