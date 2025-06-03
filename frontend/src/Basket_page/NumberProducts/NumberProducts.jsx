import { useState } from 'react';
import { useEffect } from 'react';
import "./NumberProducts.css";
import ac from '../../images/add-circle.png';
import mc from '../../images/minus-cirlce.png';


// // Компонент теперь принимает initialCount как пропс
// const NumberProducts = ({ initialCount = 1 }) => { // Устанавливаем значение по умолчанию 1, если initialCount не передан или undefined
//     // Используем initialCount для установки начального состояния
//     // Math.max(1, ...) гарантирует, что начальное количество не будет меньше 1
//     const [count, setCount] = useState(Math.max(1, initialCount));

//     // Если initialCount может меняться после первого рендера, и вы хотите,
//     // чтобы компонент NumberProducts обновлялся, нужно использовать useEffect:
//     useEffect(() => {
//         setCount(Math.max(1, initialCount));
//     }, [initialCount]);
//     // Если initialCount не меняется после загрузки данных корзины,
//     // этот useEffect не обязателен и можно обойтись просто useState(Math.max(1, initialCount));


//     const handleIncrement = () => {
//         setCount(count + 1);
//         // TODO: Возможно, здесь нужно вызвать callback для уведомления родителя (ProductInBasket или выше)
//         // об изменении количества, чтобы обновить общую стоимость позиции и корзины.
//     };

//     const handleDecrement = () => {
//         setCount(Math.max(1, count - 1)); // Не даем уменьшить количество ниже 1
//          // TODO: Возможно, здесь нужно вызвать callback для уведомления родителя
//     };

//     return (
//         <div className='rectangle0'>
//             <button className='rectangleAdd' onClick={handleIncrement}>
//                 <img src={ac} alt="Увеличить" />
//             </button>
//             <div className='NumberProducts'>
//                 <p>{count}</p> {/* Отображаем текущее состояние count */}
//             </div>
//             <button className='rectangleMinuss' onClick={handleDecrement}>
//                 <img src={mc} alt="Уменьшить" />
//             </button>
//         </div>
//     );
// };

// export default NumberProducts;


// const NumberProducts = ({ initialCount, onQuantityChange }) => {
//     const [count, setCount] = useState(Math.max(1, initialCount));


//     useEffect(() => {
//         setCount(Math.max(1, initialCount));
//     }, [initialCount]);

//     const handleIncrement = () => {
//         setCount(count + 1);
//         onQuantityChange(count + 1); // Вызов callback с новым количеством
//     };

//     const handleDecrement = () => {
//         setCount(Math.max(1, count - 1));
//         onQuantityChange(Math.max(1, count - 1)); // Вызов callback с новым количеством
//     };

//     return (
//         <div className='rectangle0'>
//             <button className='rectangleAdd' onClick={handleIncrement}>
//                 <img src={ac} alt="Увеличить" />
//             </button>
//             <div className='NumberProducts'>
//                 <p>{count}</p>
//             </div>
//             <button className='rectangleMinuss' onClick={handleDecrement}>
//                 <img src={mc} alt="Уменьшить" />
//             </button>
//         </div>
//     );
// };

// export default NumberProducts;


// const NumberProducts = ({ initialCount, onQuantityChange }) => {
//     const [count, setCount] = useState(initialCount);

//     // Используем useEffect для синхронизации внутреннего состояния с внешним пропсом
//     // Это важно, если initialCount может меняться извне (например, при загрузке корзины)
//     useEffect(() => {
//         setCount(initialCount);
//     }, [initialCount]);

//     const handleIncrement = () => {
//         const newCount = count + 1;
//         setCount(newCount); // Обновляем внутреннее состояние
//         onQuantityChange(newCount); // Сообщаем родителю об изменении
//     };

//     const handleDecrement = () => {
//         if (count > 1) { // Не позволяем количеству стать меньше 1
//             const newCount = count - 1;
//             setCount(newCount); // Обновляем внутреннее состояние
//             onQuantityChange(newCount); // Сообщаем родителю об изменении
//         }
//         // Если count === 1, то при нажатии '-' не делаем ничего.
//         // Если вы хотите, чтобы при уменьшении до 0 товар удалялся,
//         // то нужно добавить дополнительную логику здесь, вызывающую функцию удаления.
//     };

//     return (
//         <div className='rectangle0'>
//             <button className='rectangleAdd' onClick={handleIncrement}>
//                 <img src={ac} alt="Увеличить" />
//             </button>
//             <div className='NumberProducts'>
//                 <p>{count}</p>
//             </div>
//             <button className='rectangleMinuss' onClick={handleDecrement}>
//                 <img src={mc} alt="Уменьшить" />
//             </button>
//         </div>
//     );
// };

// export default NumberProducts;

const NumberProducts = ({ initialCount, onQuantityChange, onBlur }) => {
    // Инициализируем count из initialCount
    const [count, setCount] = useState(initialCount);

    // Синхронизируем внутреннее состояние 'count' с внешним пропсом 'initialCount'
    // Это важно, если initialCount может измениться (например, при перезагрузке корзины извне)
    useEffect(() => {
        setCount(initialCount);
    }, [initialCount]); // Зависимость от initialCount

    const handleIncrement = () => {
        const newCount = count + 1;
        setCount(newCount); // Обновляем внутреннее состояние UI
        onQuantityChange(newCount); // Передаем НОВОЕ число родителю
    };

    const handleDecrement = () => {
        if (count > 1) { // Не позволяем количеству стать меньше 1
            const newCount = count - 1;
            setCount(newCount); // Обновляем внутреннее состояние UI
            onQuantityChange(newCount); // Передаем НОВОЕ число родителю
        } else if (count === 1) {
            // Опционально: если вы хотите удалять товар, когда количество становится 0
            // onQuantityChange(0); // Или какой-то другой флаг для удаления
            // Но в нашей текущей логике BasketPage, удаление происходит через отдельную кнопку
        }
    };

    return (
        <div className='rectangle0' onBlur={onBlur}>
            <button className='rectangleAdd' onClick={handleIncrement}>
                <img src={ac} alt="Увеличить" />
            </button>
            <div className='NumberProducts'>
                <p>{count}</p>
            </div>
            <button className='rectangleMinuss' onClick={handleDecrement}>
                <img src={mc} alt="Уменьшить" />
            </button>
        </div>
    );
};

export default NumberProducts;

