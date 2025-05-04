import React, { useState } from 'react';
import "./NumberProducts.css";
import ac from '../../images/add-circle.png';
import mc from '../../images/minus-cirlce.png';

const NumberProducts = () => {
    const [count, setCount] = useState(1);

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleDecrement = () => {
        setCount(Math.max(1, count - 1)); // Не даем уменьшить количество ниже 1
    };

    return (
        <div className='rectangle0'>
            <button className='rectangleAdd' onClick={handleIncrement}>
                <img src={ac} alt="Увеличить" />
            </button>
            <div className='NumberProducts'>
                <p>{count}</p>
            </div>
            <button className='rectangleMinus' onClick={handleDecrement}>
                <img src={mc} alt="Уменьшить" />
            </button>
        </div>
    );
};

export default NumberProducts;

