import {useState} from 'react';
import './Order.css'
import box from '../../images/box.png';
import DropDownStatus from './DropDownStatus/DropDownStatus';

const OrderAdmin = ({ id, client_name, client_phone, sale_date, sale_price, status: initialStatus, books }) => {

    const [currentStatus, setCurrentStatus] = useState(initialStatus); // Переименуйте переменную

    const handleStatusChange = (newStatus) => {
        setCurrentStatus(newStatus);
    };

    return (
      <div className='order'>
        <div className='frameOrders'>
            <div className='OrderText'>
                <div className="imageBox">
                    <img src={box} alt="" />
                </div>
                <p>Заказ № {id} от {sale_date}</p>
            </div>
            <DropDownStatus 
                currentStatus={currentStatus} 
                onStatusChange={handleStatusChange} // Передаём функцию
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