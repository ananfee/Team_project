// PlaceOrderWindow.jsx
import React, { useEffect } from 'react';
import CancelButton from "../DeleteProductWindow/CancelButton/CancelButton.jsx";
import PlaceOrderButton from "../PlaceOrderButton/PlaceOrderButton.jsx";
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

const PlaceOrderWindow = ({ onClose, isOpen, onPlaceOrder, orderMessage }) => {
    const handleClose = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <div className={`placeOrderWindow-overlay ${isOpen ? 'open' : ''}`} onClick={handleClose}>
            <div className="placeOrderWindow-content">
                <div className='NamePlaceOrderWindow'>
                    <p>Подтверждение заказа</p>
                    <button className='closePlaceOrderWindow' onClick={onClose}>
                        <img src={cp} alt="Закрыть" />
                    </button>
                </div>
                <div className='DescriptionPlaceOrderWindow'>
                    <p>Вы уверены, что хотите оформить заказ?</p>
                    {orderMessage && <p className='order-message'>{orderMessage}</p>} {/* Отображаем сообщение о результате */}
                </div>
                <div className='conteiner_buttons'>
                    <CancelButton onClick={onClose} />
                    <PlaceOrderButton onClick={onPlaceOrder} /> {/* Кнопка для оформления заказа */}
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderWindow;
