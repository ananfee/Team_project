import {useState} from 'react';
import './Order.css'
import box from '../../images/box.png';
import DropDownStatus from './DropDownStatus/DropDownStatus';

// const OrderAdmin = ({ id, client_name, client_phone, sale_date, sale_price, status: initialStatus, books }) => {

//     const [currentStatus, setCurrentStatus] = useState(initialStatus); // Переименуйте переменную

//     const handleStatusChange = (newStatus) => {
//         setCurrentStatus(newStatus);
//     };

//     return (
//       <div className='order'>
//         <div className='frameOrders'>
//             <div className='OrderText'>
//                 <div className="imageBox">
//                     <img src={box} alt="" />
//                 </div>
//                 <p>Заказ № {id} от {sale_date}</p>
//             </div>
//             <DropDownStatus 
//                 currentStatus={currentStatus} 
//                 onStatusChange={handleStatusChange} // Передаём функцию
//             />
//         </div>
//         <div className='infoClient'>
//           <p>Получатель: {client_name}</p>
//           <p>Номер получателя: {client_phone}</p>
//         </div>
//         <div className='product'>
//             <p>Товары</p>
//             <div className="listProducts">
//               <div className="imageBooks">
//                 {books.map((book, index) => (
//                   <div className="imageBook" key={book.book_id || index}>
//                     <img src={book.cover_image} alt={`Обложка книги ${index + 1}`} />
//                   </div>
//                 ))}
//               </div>
//               <p>Итого {sale_price} ₽</p>
//             </div>
//         </div>
//       </div>
//     );
// };

// export default OrderAdmin;


// Добавим prop onStatusUpdate, который будет приходить из HistoryPageAdmin
const OrderAdmin = ({ id, client_name, client_phone, sale_date, sale_price, status: initialStatus, books, onStatusUpdate }) => {

    const [currentStatus, setCurrentStatus] = useState(initialStatus);
    const [isUpdating, setIsUpdating] = useState(false); // Для индикатора загрузки
    const [updateError, setUpdateError] = useState(null); // Для отображения ошибки

    // Эта функция будет вызвана DropDownStatus, когда пользователь выберет новый статус
    const handleStatusChange = async (newStatusId) => {
        setIsUpdating(true); // Начинаем обновление
        setUpdateError(null); // Сбрасываем предыдущие ошибки

        try {
            // Вызываем функцию-колбэк от родителя, которая сделает API-запрос
            await onStatusUpdate(id, newStatusId);
            // Если запрос успешен, обновляем локальное состояние
            setCurrentStatus(newStatusId); 
        } catch (error) {
            console.error(`Ошибка при обновлении статуса заказа ${id}:`, error);
            setUpdateError("Ошибка обновления статуса."); // Устанавливаем сообщение об ошибке
            // Можно здесь вернуть status к initialStatus, если не хотим optimistic update
        } finally {
            setIsUpdating(false); // Завершаем обновление
        }
    };

    return (
      <div className='order'>
        <div className='frameOrders'>
            <div className='OrderText'>
                <div className="imageBox">
                    <img src={box} alt="" />
                </div>
                <p>Заказ № {id} от {sale_date}</p>
                {/* Индикаторы статуса обновления */}
                {isUpdating && <span style={{ marginLeft: '10px', color: 'blue' }}>Обновление...</span>}
                {updateError && <span style={{ marginLeft: '10px', color: 'red' }}>{updateError}</span>}
            </div>
            <DropDownStatus 
                currentStatus={currentStatus} 
                onStatusChange={handleStatusChange}
                disabled={isUpdating} // Передаем состояние disabled
            />
        </div>
        <div className='infoClient'>
          <p>Получатель: {client_name}</p>
          <p>Номер получателя: {client_phone}</p>
        </div>
        <div className='product'>
            <p>Товары</p>
            <div className="listProducts">
              <div className="imageBooks">
                {books.map((book, index) => (
                  <div className="imageBook" key={book.book_id || index}> {/* Исправлен синтаксис key */}
                    <img src={book.cover_image} alt={`Обложка книги ${index + 1}`} /> {/* Исправлен синтаксис alt */}
                  </div>
                ))}
              </div>
              <p>Итого {sale_price} ₽</p>
            </div>
        </div>
      </div>
    );
};

export default OrderAdmin;
