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
                {books.map((book) => (
                  <div className="imageBooks" key={book.book_id}>
                    <img src={book.cover_image} alt={`Обложка книги ${book.book_id}`} />
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