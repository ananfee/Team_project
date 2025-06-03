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


// // Добавим prop onStatusUpdate, который будет приходить из HistoryPageAdmin
// const OrderAdmin = ({ id, client_name, client_phone, sale_date, sale_price, status: initialStatus, books, onStatusUpdate }) => {

//     const [currentStatus, setCurrentStatus] = useState(initialStatus);
//     const [isUpdating, setIsUpdating] = useState(false); // Для индикатора загрузки
//     const [updateError, setUpdateError] = useState(null); // Для отображения ошибки

//     // Эта функция будет вызвана DropDownStatus, когда пользователь выберет новый статус
//     const handleStatusChange = async (newStatusId) => {
//         setIsUpdating(true); // Начинаем обновление
//         setUpdateError(null); // Сбрасываем предыдущие ошибки

//         try {
//             // Вызываем функцию-колбэк от родителя, которая сделает API-запрос
//             await onStatusUpdate(id, newStatusId);
//             // Если запрос успешен, обновляем локальное состояние
//             setCurrentStatus(newStatusId); 
//         } catch (error) {
//             console.error(`Ошибка при обновлении статуса заказа ${id}:`, error);
//             setUpdateError("Ошибка обновления статуса."); // Устанавливаем сообщение об ошибке
//             // Можно здесь вернуть status к initialStatus, если не хотим optimistic update
//         } finally {
//             setIsUpdating(false); // Завершаем обновление
//         }
//     };

//     return (
//       <div className='order'>
//         <div className='frameOrders'>
//             <div className='OrderText'>
//                 <div className="imageBox">
//                     <img src={box} alt="" />
//                 </div>
//                 <p>Заказ № {id} от {sale_date}</p>
//                 {/* Индикаторы статуса обновления */}
//                 {isUpdating && <span style={{ marginLeft: '10px', color: 'blue' }}>Обновление...</span>}
//                 {updateError && <span style={{ marginLeft: '10px', color: 'red' }}>{updateError}</span>}
//             </div>
//             <DropDownStatus 
//                 currentStatus={currentStatus} 
//                 onStatusChange={handleStatusChange}
//                 disabled={isUpdating} // Передаем состояние disabled
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
//                   <div className="imageBook" key={book.book_id || index}> {/* Исправлен синтаксис key */}
//                     <img src={book.cover_image} alt={`Обложка книги ${index + 1}`} /> {/* Исправлен синтаксис alt */}
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



// OrderAdmin теперь принимает 'status' как проп, а не 'initialStatus'
const OrderAdmin = ({ id, client_name, client_phone, sale_date, sale_price, status, books, onStatusUpdate }) => {

    const [isUpdating, setIsUpdating] = useState(false); // Состояние для индикации загрузки
    const [updateError, setUpdateError] = useState(null); // Состояние для ошибки обновления

    // Эта функция будет вызвана компонентом DropDownStatus при изменении статуса
    const handleStatusChange = async (newStatusValue) => { // Переименовал параметр для ясности
        setIsUpdating(true); // Начинаем процесс обновления
        setUpdateError(null); // Сбрасываем предыдущие ошибки

        try {
            // Вызываем функцию-колбэк от родителя, которая сделает API-запрос и обновит родительское состояние.
            // Именно родительское состояние (ordersData в HistoryPageAdmin) является источником истины.
            await onStatusUpdate(id, newStatusValue);
            // Если onStatusUpdate успешно завершится, родительский компонент перерендерит OrderAdmin
            // с новым значением 'status' из своих пропсов, и UI обновится автоматически.
            // Поэтому здесь нет необходимости в setCurrentStatus.
        } catch (error) {
            console.error(`Ошибка при обновлении статуса заказа ${id}:`, error);
            // Устанавливаем более информативное сообщение об ошибке
            setUpdateError("Ошибка обновления статуса: " + (error.message || "Неизвестная ошибка")); 
        } finally {
            setIsUpdating(false); // Завершаем процесс обновления
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
                {/* Отображаем статус обновления */}
                {isUpdating && <span style={{ marginLeft: '10px', color: 'blue' }}>Обновление...</span>}
                {updateError && <span style={{ marginLeft: '10px', color: 'red' }}>{updateError}</span>}
            </div>
            <DropDownStatus 
                currentStatus={status} // ИСПОЛЬЗУЕМ ПРОПС 'status' НАПРЯМУЮ
                onStatusChange={handleStatusChange} // Передаём функцию для обработки изменения статуса
                // statusMap={STATUS_MAP} // Эту проп можно убрать, если DropDownStatus сам загружает статусы
                disabled={isUpdating} // Отключаем выпадающий список во время обновления
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
                  <div className="imageBook" key={book.book_id || index}>
                    <img src={book.cover_image} alt={`Обложка книги ${index + 1}`} /> 
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
