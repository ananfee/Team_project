import {useState} from 'react';
import './Order.css'
import box from '../../images/box.png';

const OrderClient = ({ orderNumber, date, sale_price, status_name, books }) => {

    return (
      <div className='order'>
        <div className='frameOrders'>
            <div className='OrderText'>
                <div className="imageBox">
                    <img src={box} alt="" />
                </div>
                <p>Заказ № {orderNumber} от {date}</p>
            </div>
            <div className='StatusOrder'><p>{status_name}</p></div>
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

export default OrderClient;

