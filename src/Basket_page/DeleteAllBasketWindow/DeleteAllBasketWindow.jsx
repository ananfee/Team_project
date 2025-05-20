import React, { useEffect } from 'react';
import CancelButton from "../DeleteProductWindow/CancelButton/CancelButton.jsx";
import DeleteProductButton from "../DeleteProductWindow/DeleteProductButton/DeleteProductButton.jsx";
import '../DeleteProductWindow/DeleteProductWindow.css';
import cp from '../../images/add.png';
import FetchWithAuth from '../../layout/LoginWindow/FetchWithAuth.js';

// const DeleteAllBasketWindow = ({ onClose, isOpen }) => {

//     const handleClose = (event) => {
//         if (event.target === event.currentTarget) { // Закрываем при клике вне окна
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
//              onClick={handleClose} // Закрываем при клике на оверлей
//         >
//             <div className="deleteProductWindow-content">
//                 <div className='NameDeleteProductWindow'>
//                     <p>Очистка корзины</p>
//                     <button className='closeDeleteProductWindow' onClick={onClose}>
//                         <img src={cp} alt="Закрыть" />
//                     </button>
//                 </div>
//                 <div className='DescriptionDeleteProductWindow'>
//                     <p>Вы уверены, что хотите удалить все товары из корзины? Отменить данное действие будет невозможно.</p>
//                 </div>
//                 <div className='conteiner_buttons'>
//                     <CancelButton onClick={onClose} />
//                     <DeleteProductButton onClick={onClose} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DeleteAllBasketWindow;

const DeleteAllBasketWindow = ({ onClose, isOpen, onClearBasket }) => {

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
        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [onClose]);

    const handleClearBasket = async () => {
        try {
            const response = await FetchWithAuth('http://127.0.0.1:8000/catalog/cart/clear/', {
                method: 'DELETE',
            });

            if (response === null) {
                throw new Error("Не удалось обновить токен авторизации.");
            }

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData?.message || `Ошибка очистки корзины: ${response.status}`;
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log(data.message); // Показываем сообщение в консоли
            onClearBasket(); // Уведомляем родительский компонент, чтобы он обновил состояние корзины
            onClose(); // Закрываем модальное окно
        } catch (error) {
            console.error("Ошибка при очистке корзины:", error);
            // Здесь можно добавить отображение сообщения об ошибке для пользователя
        }
    };

    return (
        <div className="deleteProductWindow-overlay" 
             style={{ display: isOpen ? 'flex' : 'none' }} 
             onClick={handleClose}
        >
            <div className="deleteProductWindow-content">
                <div className='NameDeleteProductWindow'>
                    <p>Очистка корзины</p>
                    <button className='closeDeleteProductWindow' onClick={onClose}>
                        <img src={cp} alt="Закрыть" />
                    </button>
                </div>
                <div className='DescriptionDeleteProductWindow'>
                    <p>Вы уверены, что хотите удалить все товары из корзины? Отменить данное действие будет невозможно.</p>
                </div>
                <div className='conteiner_buttons'>
                    <CancelButton onClick={onClose} />
                    <DeleteProductButton onClick={handleClearBasket} /> {/* При нажатии вызываем метод очистки */}
                </div>
            </div>
        </div>
    );
};

export default DeleteAllBasketWindow;

