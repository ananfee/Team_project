import React from 'react';
import './Order.css'
import box from '../../images/box.png';
import book1 from '../../images/image 1.png';
import book2 from '../../images/image 2.png';
import book3 from '../../images/image 3.png';


const Order = ({ orderNumber, date, time, description }) => {
    return (
      <div className='order'>
        <div className='frameOrders'>
            <div className='OrderText'>
                <div className="imageBox">
                    <img src={box} alt="" />
                </div>
                <p>Заказ № 029329 от 01.03.2025</p>
            </div>
          <div className='StatusOrder'>
            <p>Оформлен</p>
          </div>
        </div>
        <div className='payAdress'>
            <p>Оплата при получении · Самовывоз</p>
            <p>Вершинина, 46, - 3 этаж, офис 304</p>
        </div>
        
        <div className='product'>
            <p>Товары</p>
            <div className='listProducts'>
                <div className="imageBooks">
                    <img src={book1} alt="" />
                    <img src={book2} alt="" />
                    <img src={book3} alt="" />
                </div>
                <p>Итого 872 ₽</p>
            </div>
        </div>

      </div>
    );
  };

  export default Order;