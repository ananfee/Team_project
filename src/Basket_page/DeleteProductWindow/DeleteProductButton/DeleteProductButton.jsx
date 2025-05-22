import React, { useState } from 'react';
import "./DeleteProductButton.css";

const DeleteProductButton = ({ onQuantityChange }) => {


    return (
        <button  className="deleteProductButton" onClick={onQuantityChange}>
            <p>Удалить</p>
            </button>
    );
};

export default DeleteProductButton;
