// History_page.js
import React, { useState, useEffect } from 'react';
import NotificationModal from '../NotificationModal/NotificationModal.js';
import Header from '../layout/Header.js';
import "./History_page.css";
import OrderClient from './Order/Order_client.jsx';
import Footer from "../components/footer/footer.jsx";
import FetchWithAuth from '../layout/LoginWindow/FetchWithAuth.js';
import book1 from '../images/image 1.png';
import book2 from '../images/image 2.png';
import book3 from '../images/image 3.png';

// const HistoryPageClient = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const openModal = () => {
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//     };
//     const role = localStorage.getItem('role'); 
    
//     // Массив данных для заказов
//     const ordersData = [
//         {
//             orderNumber: '029329',
//             date: '01.03.2025',
//             sale_price: '870',
//             status_name: 'Оформлен',
//             books: [
//               { cover_image: book1 }
//             ]
//          },
//         { orderNumber: '029330', date: '02.03.2025', sale_price: '504', status_name: 'Оформлен',
//             books: [
//                 {book_id: '1', cover_image: book1 },
//                 {book_id: '4', cover_image: book2 },
//               ]
//          },
//         { orderNumber: '029331', date: '03.03.2025', sale_price: '906', status_name: 'Оформлен',
//             books: [
//                 { book_id: '2', cover_image: '/media/book_covers/book_example.jpg' }
//               ]
//          },
//         { orderNumber: '029331', date: '03.03.2025', sale_price: '2500', status_name: 'Оформлен',
//             books: [
//                 {book_id: '3', cover_image: '/media/book_covers/book_example.jpg' }
//                   ]
//          },
//     ];

//  return (
//         <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', alignItems: 'center' }}>
//             <Header onOpenModal={openModal} />
//             {isModalOpen && <NotificationModal onClose={closeModal} />}
//             <div className="history">
//                 <div className="historyHeader">
//                     <p>ЗАКАЗЫ</p>
//                 </div>
//                 <div className='ListOrders'>
//                     {/* Рендерим несколько компонентов Order, используя map */}
//                     {ordersData.map((order, index) => (
//                         <OrderClient
//                             key={index} // Важно! Добавляем key для каждого элемента
//                             orderNumber={order.orderNumber}
//                             date={order.date}
//                             sale_price={order.sale_price}
//                             status_name={order.status_name}
//                             books={order.books}
//                         />
//                     ))}
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// };

// export default HistoryPageClient;




// const HistoryPageClient = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     // Инициализируем ordersData как пустой массив
//     const [ordersData, setOrdersData] = useState([]);
//     const [fetchError, setFetchError] = useState(null);
//     const [fetchLoading, setFetchLoading] = useState(true);

//     const openModal = () => {
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // 1. Используем FetchWithAuth для получения Response
//                 const response = await FetchWithAuth('http://127.0.0.1:8000/catalog/order-history/');

//                 // 2. Проверяем статус ответа
//                 if (!response.ok) {
//                     // Если статус не 2xx, выбрасываем ошибку
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }

//                 // 3. Парсим ответ как JSON
//                 const data = await response.json();

//                 // 4. Проверяем, являются ли полученные данные массивом
//                 if (Array.isArray(data)) {
//                     // 5. Обрабатываем данные, если необходимо (например, форматируем дату)
//                     const processedOrders = data.map(order => {
//                          // Предполагаем, что sale_date - это строка, которую Date может распарсить
//                          // или уже объект Date. Если строка, toLocaleDateString() лучше.
//                          // Если формат даты другой, возможно, потребуется другая логика парсинга.
//                          const orderDate = new Date(order.sale_date);
//                          const formattedDate = orderDate.toLocaleDateString('ru-RU', {
//                              year: 'numeric',
//                              month: '2-digit',
//                              day: '2-digit',
//                          });

//                          return {
//                              ...order, // Копируем остальные свойства
//                              orderNumber: order.id, // Предполагаем, что id используется как orderNumber
//                              date: formattedDate, // Добавляем отформатированную дату
//                              // sale_price, status_name, books уже в order, если приходят с бэкенда
//                          };
//                     });

//                     // 6. Устанавливаем обработанные данные в состояние
//                     setOrdersData(processedOrders);
//                     setFetchError(null); // Сбрасываем ошибку при успешной загрузке
//                 } else {
//                     // Если данные не массив, это ошибка формата
//                     console.error("Полученные данные не являются массивом:", data);
//                     setFetchError(new Error("Получены данные неверного формата от сервера."));
//                     setOrdersData([]); // Устанавливаем пустой массив, чтобы избежать ошибок рендеринга
//                 }

//             } catch (error) {
//                 // Обработка ошибок при запросе или парсинге
//                 console.error("Ошибка при получении истории заказов:", error);
//                 setFetchError(error);
//                 setOrdersData([]); // Очищаем данные при ошибке
//             } finally {
//                 // Завершаем состояние загрузки независимо от результата
//                 setFetchLoading(false);
//             }
//         };

//         fetchData(); // Вызываем функцию загрузки данных
//     }, []); // Пустой массив зависимостей означает, что эффект выполнится один раз после первого рендера

//     return (
//         <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', alignItems: 'center' }}>
//             <Header onOpenModal={openModal} />
//             {isModalOpen && <NotificationModal onClose={closeModal} />}

//             <div className="history">
//                 <div className="historyHeader">
//                     <p>ЗАКАЗЫ</p>
//                 </div>
//                 <div className='ListOrders'>
//                     {/* Отображение статуса загрузки, ошибки или данных */}
//                     {fetchLoading && <p>Загрузка истории заказов...</p>}

//                     {fetchError && (
//                         <p style={{ color: 'red' }}>
//                             Ошибка при загрузке заказов: {fetchError.message}
//                         </p>
//                     )}

//                     {/* Условный рендеринг списка заказов */}
//                     {!fetchLoading && !fetchError && Array.isArray(ordersData) && ordersData.length > 0 ? (
//                         ordersData.map((order) => (
//                             <OrderClient
//                                 key={order.id} // Используем оригинальный id для key
//                                 orderNumber={order.orderNumber} // Используем обработанный orderNumber
//                                 date={order.date}         // Используем обработанную дату
//                                 sale_price={order.sale_price} // Используем данные из API
//                                 status_name={order.status_name} // Используем данные из API
//                                 books={order.books}       // Используем данные из API
//                             />
//                         ))
//                     ) : (
//                         // Сообщение, если нет заказов после загрузки (и нет ошибки)
//                          !fetchLoading && !fetchError && <p>У вас пока нет заказов.</p>
//                     )}
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// };

// export default HistoryPageClient;



const HistoryPageClient = () => {
    const baseUrl = process.env.REACT_APP_API_URL; 
    const [isModalOpen, setIsModalOpen] = useState(false);
 const [ordersData, setOrdersData] = useState([]);
    // Зададим маппинг желаемого порядка статусов. Задаем порядок как нам нужно
    const statusOrder = {
        "Обрабатывается": 1,
        "Передается в доставку": 2,
        "В пути": 3,
        "Доставлен": 4,
        "Получен": 5
    };

    const orderSort = (a, b) => {
        const statusPriorityA = statusOrder[a.status_name] || 6; // Если статус неизвестен, ставим в конец
        const statusPriorityB = statusOrder[b.status_name] || 6;

        //Сначала сортируем по приоритету статуса
        if (statusPriorityA !== statusPriorityB) {
            return statusPriorityA - statusPriorityB;
        }

        //Если статусы совпадают, сортируем по дате (сначала новые)
        return new Date(b.sale_date) - new Date(a.sale_date);
    };

    useEffect(() => {
        const fetchData = async () => {
            setFetchLoading(true);
            setFetchError(null);

            try {
                const response = await FetchWithAuth(`${baseUrl}catalog/order-history/`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (Array.isArray(data)) {
                    const processedOrders = data.map(order => {
                        const orderDate = new Date(order.sale_date);
                        const formattedDate = orderDate.toLocaleDateString('ru-RU', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                        });

                        return {
                            ...order,
                            orderNumber: order.id,
                            date: formattedDate,
                        };
                    });

                    const sortedOrders = [...processedOrders].sort(orderSort);

                    setOrdersData(sortedOrders);
                } else {
                    console.error("Полученные данные не являются массивом:", data);
                    setFetchError(new Error("Получены данные неверного формата от сервера."));
                    setOrdersData([]);
                }

            } catch (error) {
                console.error("Ошибка при получении истории заказов:", error);
                setFetchError(error);
                setOrdersData([]);
            } finally {
                setFetchLoading(false);
            }
        };

        fetchData();
    }, []);

    if (fetchLoading) {
        return <div className="loading-indicator">Загрузка истории заказов...</div>;
    }

    if (fetchError) {
        return (
            <div className="error-message">
                Ошибка при загрузке заказов: {fetchError.message}
            </div>
        );
    }

    return (
        <div className="history-page-container">
            <Header onOpenModal={openModal} />
            {isModalOpen && <NotificationModal onClose={closeModal} />}

            <div className="history">
                <div className="historyHeader">
                    <p>ЗАКАЗЫ</p>
                </div>
                <div className="ListOrders">
                    {ordersData.length === 0 ? (
                        <p>Нет данных об истории заказов.</p>
                    ) : (
                        <ul>
                            {ordersData.map(order => (
                                <li key={order.id}>
                                    Номер заказа: {order.orderNumber}, Дата: {order.date}, Статус: {order.status_name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HistoryPageClient;
