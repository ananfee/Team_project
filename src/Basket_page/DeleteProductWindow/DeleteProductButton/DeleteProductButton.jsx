import React, { useState } from 'react';
import "./DeleteProductButton.css";

const DeleteProductButton = ({ onOpenModal }) => {


    return (
        <button  className="deleteProductButton" onClick={onOpenModal}>
            <p>Удалить</p>
            </button>
    );
};

export default DeleteProductButton;
