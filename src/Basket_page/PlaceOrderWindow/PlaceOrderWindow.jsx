// PlaceOrderWindow.jsx
import React, { useEffect } from 'react';
import OKButton from "./OKButton/OKButton";
import '../DeleteProductWindow/DeleteProductWindow.css';
import cp from '../../images/add.png';

// const PlaceOrderWindow = ({ onClose, isOpen }) => {
//     const handleClose = (event) => {
//         if (event.target === event.currentTarget) {
//             onClose();
//         }
//     };

//     useEffect(() => {
//         const handleEsc = (event) => {
//             if (event.key === "Escape") {
//                 onClose();
//             }
//         };

//         window.addEventListener("keydown", handleEsc);
//         return () => {
//             window.removeEventListener("keydown", handleEsc);
//         };
//     }, [onClose]);

//     return (
//         <div className="deleteProductWindow-overlay" 
//              style={{ display: isOpen ? 'flex' : 'none' }} 
//              onClick={handleClose} 
//         >
//             <div className="deleteProductWindow-content">
//                 <div className='NameDeleteProductWindow'>
//                     <p>Заказ успешно оформлен</p>
//                     <button className='closeDeleteProductWindow' onClick={onClose}>
//                         <img src={cp} alt="Закрыть" />
//                     </button>
//                 </div>
//                 <div className='DescriptionDeleteProductWindow'>
//                     <p>Для просмотра подробной информации о заказе вы можете перейти к истории заказов.</p>
//                 </div>
//                 <div className='conteiner_buttons'>
//                     <CancelButton onClick={onClose} />
//                     <DeleteProductButton onClick={onClose} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PlaceOrderWindow;

// const PlaceOrderWindow = ({ onClose, isOpen, orderMessage, onConfirm }) => { // onPlaceOrder удален из пропсов
//     // Обработчик закрытия по клику на оверлей
//     const handleConfirm = () => {
//         onConfirm(); // Вызываем переданную функцию onConfirm (onClearBasket)
//         onClose();
//     };
//     const handleClose = (event) => {
//         // Закрываем окно только если клик был непосредственно по фоновому оверлею,
//         // а не по содержимому модального окна.
//         if (event.target === event.currentTarget) {
//             onClose();
//         }
//     };

//     // Определяем, является ли сообщение об ошибке, для динамического отображения текста и стилей
//     const isErrorMessage = orderMessage && (
//         orderMessage.includes('Ошибка') ||
//         orderMessage.includes('пуста') ||
//         orderMessage.includes('не удалось') ||
//         orderMessage.includes('отсутствуют') ||
//         orderMessage.includes('Произошла ошибка') // Добавьте другие ключевые слова ошибок, если необходимо
//     );

//     // useEffect для обработки закрытия по нажатию клавиши Escape
//     useEffect(() => {
//         const handleEsc = (event) => {
//             if (event.key === "Escape") {
//                 onClose();
//             }
//         };

//         // Добавляем слушатель события keydown только тогда, когда окно открыто
//         if (isOpen) {
//             window.addEventListener("keydown", handleEsc);
//         }

//         // Функция очистки: удаляем слушатель события при размонтировании компонента
//         // или при изменении зависимостей isOpen или onClose.
//         return () => {
//             window.removeEventListener("keydown", handleEsc);
//         };
//     }, [isOpen, onClose]); // Зависимости: isOpen для условного добавления/удаления слушателя, onClose для стабильности.

//     return (
//         // Главный контейнер оверлея. Класс "deleteProductWindow-overlay" сохранен.
//         // Стиль display управляет видимостью.
//         <div className={"deleteProductWindow-overlay"}
//             style={{ display: isOpen ? 'flex' : 'none' }}
//             onClick={handleClose}>
//             {/* Контейнер содержимого модального окна. Класс "deleteProductWindow-content" сохранен. */}
//             <div className="deleteProductWindow-content">
//                 <div className='NameDeleteProductWindow'> {/* Класс сохранен */}
//                     {/* Динамический заголовок: "Ошибка оформления заказа" или "Заказ успешно оформлен" */}
//                     <p>{isErrorMessage ? 'Ошибка оформления заказа' : 'Заказ успешно оформлен'}</p>
//                     <button className='closeDeleteProductWindow' onClick={handleConfirm}> {/* Класс сохранен */}
//                         <img src={cp} alt="Закрыть" />
//                     </button>
//                 </div>
//                 <div className='DescriptionDeleteProductWindow'> {/* Класс сохранен */}
//                     {/* Отображаем текущее сообщение о статусе заказа */}
//                     {orderMessage && (
//                         <p style={{
//                             color: isErrorMessage ? 'red' : 'green', // Красный для ошибок, зеленый для успеха
//                             fontWeight: 'bold',
//                             marginBottom: '10px' // Отступ снизу для лучшего вида
//                         }}>
//                             {orderMessage}
//                         </p>
//                     )}
//                     {/* Дополнительный текст, который отображается только при успешном заказе */}
//                     {!isErrorMessage && (
//                         <p>Для просмотра подробной информации о заказе вы можете перейти к истории заказов.</p>
//                     )}
//                 </div>
//                 <div className='conteiner_buttons'> {/* Класс сохранен */}
//                     {/* Кнопка "ОК", которая просто закрывает модальное окно */}
//                     <OKButton onClick={handleConfirm} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PlaceOrderWindow;


// const PlaceOrderWindow = ({ onClose, isOpen, orderMessage, onConfirm }) => {
//     const isOrderSuccessful = orderMessage === "Заказ успешно оформлен!";

//     // Обработчик подтверждения (закрытия)
//     const handleConfirm = () => {
//         if (isOrderSuccessful) {
//             onConfirm(); // Очищаем корзину только при успешном заказе
//         }
//         onClose(); // Закрываем окно в любом случае
//     };

//     const handleClose = (event) => {
//         if (event.target === event.currentTarget) {
//             onClose();
//         }
//     };

//     const isErrorMessage = orderMessage && (
//         orderMessage.includes('Ошибка') ||
//         orderMessage.includes('пуста') ||
//         orderMessage.includes('не удалось') ||
//         orderMessage.includes('отсутствуют') ||
//         orderMessage.includes('Произошла ошибка')
//     );

//     useEffect(() => {
//         const handleEsc = (event) => {
//             if (event.key === "Escape") {
//                 onClose();
//             }
//         };

//         if (isOpen) {
//             window.addEventListener("keydown", handleEsc);
//         }

//         return () => {
//             window.removeEventListener("keydown", handleEsc);
//         };
//     }, [isOpen, onClose]);

//     return (
//         <div
//             className="deleteProductWindow-overlay"
//             style={{ display: isOpen ? 'flex' : 'none' }}
//             onClick={handleClose}
//         >
//             <div className="deleteProductWindow-content">
//                 <div className='NameDeleteProductWindow'>
//                     <p>{isErrorMessage ? 'Ошибка оформления заказа' : 'Заказ успешно оформлен'}</p>
//                     <button className='closeDeleteProductWindow' onClick={onClose}>
//                         <img src={cp} alt="Закрыть" />
//                     </button>
//                 </div>
//                 <div className='DescriptionDeleteProductWindow'>
//                     {orderMessage && (
//                         <p
//                             style={{
//                                 color: isErrorMessage ? 'red' : 'green',
//                                 fontWeight: 'bold',
//                                 marginBottom: '10px'
//                             }}
//                         >
//                             {orderMessage}
//                         </p>
//                     )}
//                     {isOrderSuccessful && (
//                         <p>Для просмотра подробной информации о заказе вы можете перейти к истории заказов.</p>
//                     )}
//                 </div>
//                 <div className='conteiner_buttons'>
//                     <OKButton onClick={handleConfirm} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PlaceOrderWindow;


const PlaceOrderWindow = ({ onClose, isOpen, orderMessage, onConfirm }) => {
    const isOrderSuccessful = orderMessage === "Заказ успешно оформлен!";

    // Обработчик подтверждения (закрытия)
    const handleConfirm = () => {
        if (isOrderSuccessful) {
            onConfirm(); // Очищаем корзину только при успешном заказе
            window.location.reload(); // Обновляем страницу после очистки корзины
        }
        onClose(); // Закрываем окно в любом случае
    };

    const handleClose = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const isErrorMessage = orderMessage && (
        orderMessage.includes('Ошибка') ||
        orderMessage.includes('пуста') ||
        orderMessage.includes('не удалось') ||
        orderMessage.includes('отсутствуют') ||
        orderMessage.includes('Произошла ошибка')
    );

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleEsc);
        }

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen, onClose]);

    return (
        <div
            className="deleteProductWindow-overlay"
            style={{ display: isOpen ? 'flex' : 'none' }}
            onClick={handleClose}
        >
            <div className="deleteProductWindow-content">
                <div className='NameDeleteProductWindow'>
                    <p>{isErrorMessage ? 'Ошибка оформления заказа' : 'Заказ успешно оформлен'}</p>
                    <button className='closeDeleteProductWindow' onClick={onClose}>
                        <img src={cp} alt="Закрыть" />
                    </button>
                </div>
                <div className='DescriptionDeleteProductWindow'>
                    {orderMessage && (
                        <p
                            style={{
                                color: isErrorMessage ? 'red' : 'green',
                                fontWeight: 'bold',
                                marginBottom: '10px'
                            }}
                        >
                            {orderMessage}
                        </p>
                    )}
                    {isOrderSuccessful && (
                        <p>Для просмотра подробной информации о заказе вы можете перейти к истории заказов.</p>
                    )}
                </div>
                <div className='conteiner_buttons'>
                    <OKButton onClick={handleConfirm} />
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderWindow;

