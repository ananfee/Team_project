import React, { useState } from 'react';
import "./DeleteButton.css";
import bw from '../../images/bagWhite.png';


const DeleteButton = () => {

    return (
        <button  className="buttonDelete">
            <p style={{fontWeight:0}}>Удалить товар</p>
            <img src={bw} alt=""/>
            </button>
    );
};

export default DeleteButton;
