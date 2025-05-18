import React, { useState } from 'react';
import "./NumberProducts.css";
import ac from '../../images/add-circle.png';
import mc from '../../images/minus-cirlce.png';

// Компонент теперь принимает initialCount как пропс
const NumberProducts = ({ initialCount = 1 }) => { // Устанавливаем значение по умолчанию 1, если initialCount не передан или undefined
    // Используем initialCount для установки начального состояния
    // Math.max(1, ...) гарантирует, что начальное количество не будет меньше 1
    const [count, setCount] = useState(Math.max(1, initialCount));

    // Если initialCount может меняться после первого рендера, и вы хотите,
    // чтобы компонент NumberProducts обновлялся, нужно использовать useEffect:
    /*
    useEffect(() => {
        setCount(Math.max(1, initialCount));
    }, [initialCount]);
    // Если initialCount не меняется после загрузки данных корзины,
    // этот useEffect не обязателен и можно обойтись просто useState(Math.max(1, initialCount));
    */


    const handleIncrement = () => {
        setCount(count + 1);
        // TODO: Возможно, здесь нужно вызвать callback для уведомления родителя (ProductInBasket или выше)
        // об изменении количества, чтобы обновить общую стоимость позиции и корзины.
    };

    const handleDecrement = () => {
        setCount(Math.max(1, count - 1)); // Не даем уменьшить количество ниже 1
         // TODO: Возможно, здесь нужно вызвать callback для уведомления родителя
    };

    return (
        <div className='rectangle0'>
            <button className='rectangleAdd' onClick={handleIncrement}>
                <img src={ac} alt="Увеличить" />
            </button>
            <div className='NumberProducts'>
                <p>{count}</p> {/* Отображаем текущее состояние count */}
            </div>
            <button className='rectangleMinuss' onClick={handleDecrement}>
                <img src={mc} alt="Уменьшить" />
            </button>
        </div>
    );
};

export default NumberProducts;
