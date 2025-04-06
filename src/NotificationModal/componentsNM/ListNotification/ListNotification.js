import React from 'react';
import './ListNotification.css'
import Notific from '../Notific/Notific'

const ListNotification = () => {

    const notifications = [
        { orderNumber: '0002', date: '25.03.25', time: '12:00', description: 'Ваш заказ принят в обработку. Мы сообщим вам о следующих этапах доставки.' },
        { orderNumber: '0003', date: '26.03.25', time: '13:30', description: 'Заказ отправлен со склада.' },
      ];
      
return (
    <div className="frameLN">
      {notifications.map((notification, index) => (
        <Notific key={index} {...notification} />
      ))}
    </div>
  );
};

export default ListNotification;