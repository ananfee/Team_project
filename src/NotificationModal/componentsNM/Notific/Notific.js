import React from 'react';
import './Notific.css'

const Notific = ({ orderNumber, date, time, description }) => {
    return (
      <div className='notific'>
        <div className='frameOrder'>
          <p className='Order'>Заказ № {orderNumber} подтвержден</p>
          <div className='DateTimeOrder'>
            <p className='DateOrder'>{date}</p>
            <p className='TimeOrder'>{time}</p>
          </div>
        </div>
        <p className='descriptionNotific'>{description}</p>
      </div>
    );
  };

  export default Notific;