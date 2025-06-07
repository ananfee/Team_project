// import React, { useRef } from 'react';
// import './ListNotification.css';
// import Notific from '../Notific/Notific';

// const ListNotification = () => {
//   const notifications = [
//     { orderNumber: '0002', date: '25.03.25', time: '12:00', description: 'Ваш заказ принят в обработку. Мы сообщим вам о следующих этапах доставки.' },
//     { orderNumber: '0003', date: '26.03.25', time: '13:30', description: 'Заказ отправлен со склада.' },
//     { orderNumber: '0002', date: '25.03.25', time: '12:00', description: 'Ваш заказ принят в обработку. Мы сообщим вам о следующих этапах доставки.' },
//     { orderNumber: '0003', date: '26.03.25', time: '13:30', description: 'Заказ отправлен со склада.' },
//     { orderNumber: '0002', date: '25.03.25', time: '12:00', description: 'Ваш заказ принят в обработку. Мы сообщим вам о следующих этапах доставки.' },
//     { orderNumber: '0003', date: '26.03.25', time: '13:30', description: 'Заказ отправлен со склада.' },
//     { orderNumber: '0002', date: '25.03.25', time: '12:00', description: 'Ваш заказ принят в обработку. Мы сообщим вам о следующих этапах доставки.' },
//     { orderNumber: '0003', date: '26.03.25', time: '13:30', description: 'Заказ отправлен со склада.' },
//     { orderNumber: '0002', date: '25.03.25', time: '12:00', description: 'Ваш заказ принят в обработку. Мы сообщим вам о следующих этапах доставки.' },
//     { orderNumber: '0003', date: '26.03.25', time: '13:30', description: 'Заказ отправлен со склада.' },
//     { orderNumber: '0008', date: '26.03.25', time: '13:30', description: 'Заказ отправлен со склада.' },

//   ];
//     const frameLNRef = useRef(null);

//     const handleWheel = (event) => {
//         if (frameLNRef.current) {
//           frameLNRef.current.scrollTop += event.deltaY;
//           event.preventDefault(); // Prevent default scrolling behavior
//         }
//       };

//     return (
//         <div className="frameLN" ref={frameLNRef} onWheel={handleWheel}>
//             <div className="scrollable-content">
//                 {notifications.map((notification, index) => (
//                     <Notific key={index} {...notification} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ListNotification;

// import React, { useState, useEffect, useRef } from 'react';
// import './ListNotification.css';
// import Notific from '../Notific/Notific';

// const ListNotification = () => {
//     const [notifications, setNotifications] = useState([]);
//     const frameLNRef = useRef(null);

//     useEffect(() => {
//         const fetchNotifications = async () => {
//             try {
//                 const response = await fetch('http://127.0.0.1:8000/catalog/notifications/');
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 const data = await response.json();
//                 setNotifications(data);
//             } catch (error) {
//                 console.error("Error fetching notifications:", error);
//                 // Обработка ошибки, например, отображение сообщения об ошибке пользователю
//                 setNotifications([]); // Или установите состояние ошибки
//             }
//         };

//         fetchNotifications();
//     }, []); // Пустой массив зависимостей означает, что useEffect выполнится только один раз после монтирования компонента


//     const handleWheel = (event) => {
//         if (frameLNRef.current) {
//             frameLNRef.current.scrollTop += event.deltaY;
//             event.preventDefault();
//         }
//     };

//     return (
//         <div className="frameLN" ref={frameLNRef} onWheel={handleWheel}>
//             <div className="scrollable-content">
//                 {notifications.map((notification) => (
//                     <Notific
//                         key={notification.id}
//                         orderNumber={notification.id_order} // Используйте id_order как номер заказа
//                         date={notification.date}
//                         time={notification.time}
//                         description={notification.text_note}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ListNotification;

import React, { useState, useEffect, useRef } from 'react';
import './ListNotification.css';
import Notific from '../Notific/Notific';
import FetchWithAuth from '../../../layout/LoginWindow/FetchWithAuth';

const ListNotification = () => {
const baseUrl = process.env.REACT_APP_API_URL;
  const [notifications, setNotifications] = useState([]);
  const frameLNRef = useRef(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await FetchWithAuth('http://127.0.0.1:8000/catalog/notifications/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const processedNotifications = data.map(notification => {
          const dateNote = new Date(notification.date_note);
          const date = dateNote.toLocaleDateString();
          const time = dateNote.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          
          return {
            ...notification,
            date,
            time,
            orderNumber: notification.order_id,
            rawDate: dateNote,
          };
        });

        processedNotifications.sort((a, b) => b.rawDate - a.rawDate);

        setNotifications(processedNotifications);

      } catch (error) {
        console.error("Error fetching notifications:", error);
        setNotifications([]);
      }
    };

    fetchNotifications();
  }, []);

  const handleWheel = (event) => {
    if (frameLNRef.current) {
      frameLNRef.current.scrollTop += event.deltaY;
      event.preventDefault();
    }
  };

  return (
    <div className="frameLN" ref={frameLNRef} onWheel={handleWheel}>
      <div className="scrollable-content">
        {notifications.map((notification) => (
          <Notific
            key={notification.id}
            orderNumber={notification.orderNumber}
            date={notification.date}
            time={notification.time}
            description={notification.text_note}
          />
        ))}
      </div>
    </div>
  );
};

export default ListNotification;


