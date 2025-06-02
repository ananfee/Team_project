import React, { useState } from 'react';
import "./DeleteProductButton.css";

const DeleteProductButton = ({ onClick }) => {
    return (
        <button className="deleteProductButton" onClick={onClick}>
            <p>Удалить</p>
        </button>
    );
};

export default DeleteProductButton;

