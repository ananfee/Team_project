// History_page.js
import React, { useState, useEffect } from 'react';
import NotificationModal from '../NotificationModal/NotificationModal.js';
import Header from '../layout/Header.js';
import "./History_page.css";
import OrderAdmin from './Order/Order_admin.jsx';
import Footer from "../components/footer/footer.jsx";
import FetchWithAuth from '../layout/LoginWindow/FetchWithAuth.js';
import book1 from '../images/image 1.png';
import book2 from '../images/image 2.png';
import book3 from '../images/image 3.png';

// const HistoryPageAdmin = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const openModal = () => {
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//     };
//     const role = localStorage.getItem('role'); 
    
//     const ordersAdminData = [
//     {
//         id: 2,
//         client_name: "new_user2",
//         client_phone: "+79991234544",
//         sale_date: "2025-04-20",
//         sale_price: 300.0,
//         status: 3,
//         books: [
//             {
//                 book_id: 2,
//                 title: "Мастер и Маргарита",
//                 count_of_book: 2,
//                 cover_image: book2
//             },
//             {
//                 book_id: 51,
//                 title: "Приключения Тома Сойера",
//                 count_of_book: 1,
//                 cover_image: book1
//             }
//         ]
//     },
//     {
//         id: 3,
//         client_name: "new_user2",
//         client_phone: "+79991234544",
//         sale_date: "2025-04-20",
//         sale_price: 500.0,
//         status: 3,
//         books: []
//     }
// ];

//     return (
//         <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', alignItems: 'center' }}>
//             <Header onOpenModal={openModal} />
//             {isModalOpen && <NotificationModal onClose={closeModal} />}
//             <div className="history">
//                 <div className="historyHeader">
//                     <p>ЗАКАЗЫ</p>
//                 </div>
//                 <div className='ListOrders'>
//                     {/* Рендерим несколько компонентов Order, используя map */}
//                     {ordersAdminData.map((order, index) => (
//                         <OrderAdmin
//                             key={index} // Важно! Добавляем key для каждого элемента
//                             id={order.id}
//                             client_name={order.client_name}
//                             client_phone={order.client_phone}
//                             sale_date={order.sale_date}
//                             sale_price={order.sale_price}
//                             status={order.status}
//                             books={order.books}
//                         />
//                     ))}
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// };

// export default HistoryPageAdmin;


// const HistoryPageAdmin = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [ordersData, setOrdersData] = useState([]); // Состояние для хранения данных о заказах
//     const [fetchError, setFetchError] = useState(null);
//     const [fetchLoading, setFetchLoading] = useState(true);

//     const openModal = () => {
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//     };

//         // Функция для обновления статуса заказа через API
//     const handleStatusUpdate = async (orderId, newStatus) => {
//         try {
//             // Предполагается, что FetchWithAuth сам добавит токен
//             const response = await FetchWithAuth(`http://127.0.0.1:8000/catalog/admin/orders/${orderId}/status/`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ status: newStatus }),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json(); 
//                 throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
//             }

//             // Если успешно, обновляем состояние ordersData в родительском компоненте
//             setOrdersData(prevOrders => 
//                 prevOrders.map(order => 
//                     order.id === orderId ? { ...order, status: newStatus } : order
//                 )
//             );
//             console.log(`Статус заказа ${orderId} успешно обновлен на ${newStatus}`);
//         } catch (error) {
//             console.error("Ошибка при обновлении статуса заказа:", error);
//             // Перебрасываем ошибку, чтобы OrderAdmin мог ее поймать и показать пользователю
//             throw error; 
//         }
//     };

//     useEffect(() => {
//     const fetchData = async () => {
//         try {
//             const response = await FetchWithAuth('http://127.0.0.1:8000/catalog/admin/orders/');

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();

//             if (Array.isArray(data)) {
//                 // Сортируем по убыванию даты
//                 const sortedData = data.sort((a, b) => new Date(b.sale_date) - new Date(a.sale_date));
//                 setOrdersData(sortedData);
//                 setFetchError(null);
//             } else {
//                 setFetchError(new Error("Получены данные неверного формата от сервера."));
//             }
//         } catch (error) {
//             setFetchError(error);
//             console.error("Ошибка при получении истории заказов:", error);
//         } finally {
//             setFetchLoading(false);
//         }
//     };

//     fetchData();
// }, []);



//     return (
//         <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', alignItems: 'center' }}>
//             <Header onOpenModal={openModal} />
//             {isModalOpen && <NotificationModal onClose={closeModal} />}
//             <div className="history">
//                 <div className="historyHeader">
//                     <p>ЗАКАЗЫ</p>
//                 </div>
//                 <div className='ListOrders'>
//                     {fetchLoading && <p>Загрузка истории заказов...</p>}

//                     {fetchError && (
//                         <p style={{ color: 'red' }}>
//                             Ошибка при загрузке заказов: {fetchError.message}
//                         </p>
//                     )}

//                     {/* Рендерим компоненты Order, используя полученные данные */}
//                     {!fetchLoading && !fetchError && ordersData.length > 0 ? (
//                         ordersData.map((order) => (
//                             <OrderAdmin
//                                 key={order.id} // Используем id для key
//                                 id={order.id}
//                                 client_name={order.client_name}
//                                 client_phone={order.client_phone}
//                                 sale_date={order.sale_date}
//                                 sale_price={order.sale_price}
//                                 status={order.status}
//                                 books={order.books}
//                                 onStatusUpdate={handleStatusUpdate}
//                             />
//                         ))
//                     ) : (
//                         !fetchLoading && !fetchError && <p>У вас пока нет заказов.</p>
//                     )}
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// };

// export default HistoryPageAdmin;



// const HistoryPageAdmin = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [ordersData, setOrdersData] = useState([]);
//     const [fetchError, setFetchError] = useState(null);
//     const [fetchLoading, setFetchLoading] = useState(true);

//     const openModal = () => {
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//     };

//     const handleStatusUpdate = async (orderId, newStatus) => {
//         try {
//             const response = await FetchWithAuth(`http://127.0.0.1:8000/catalog/admin/orders/${orderId}/status/`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ status: newStatus }),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
//             }

//             // Обновление статуса в ordersData
//             setOrdersData(prevOrders =>
//                 prevOrders.map(order =>
//                     order.id === orderId ? { ...order, status: newStatus } : order
//                 )
//             );
//             console.log(`Статус заказа ${orderId} успешно обновлен на ${newStatus}`);
//         } catch (error) {
//             console.error("Ошибка при обновлении статуса заказа:", error);
//             setFetchError(error); // Показывать ошибку на странице
//             // Можно добавить более детальную обработку ошибок
//         }
//     };

//     useEffect(() => {
//         let isMounted = true;  // Флаг для предотвращения обновления состояния на размонтированном компоненте

//         const fetchData = async () => {
//             setFetchLoading(true);
//             setFetchError(null); // Очистка предыдущих ошибок

//             try {
//                 const response = await FetchWithAuth('http://127.0.0.1:8000/catalog/admin/orders/');

//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }

//                 const data = await response.json();

//                 if (isMounted) { // Проверяем, что компонент смонтирован
//                    if (Array.isArray(data)) {
//                         // Маппинг для порядка статусов
//                         const statusOrder = {
//                             "Обрабатывается": 1,
//                             "Передается в доставку": 2,
//                             "В пути": 3,
//                             "Доставлен": 4,
//                             "Получен": 5,
//                         };

//                         // Сортировка заказов
//                         const sortedData = [...data].sort((a, b) => {
//                             const statusPriorityA = statusOrder[a.status] || 6; // 6 - если статус неизвестен
//                             const statusPriorityB = statusOrder[b.status] || 6;

//                             // Сначала сортируем по статусу
//                             if (statusPriorityA !== statusPriorityB) {
//                                 return statusPriorityA - statusPriorityB;
//                             }

//                             // Если статусы одинаковые, сортируем по дате (сначала новые)
//                             return new Date(b.sale_date) - new Date(a.sale_date);
//                         });

//                         setOrdersData(sortedData);
//                         setFetchError(null);

//                    } else {
//                        setFetchError(new Error("Получены данные неверного формата от сервера."));
//                    }
//                 }

//             } catch (error) {
//                 if (isMounted) {
//                     setFetchError(error);
//                 }
//                 console.error("Ошибка при получении истории заказов:", error);
//             } finally {
//                 if (isMounted) {
//                     setFetchLoading(false);
//                 }
//             }
//         };

//         fetchData();

//     return () => {
//         isMounted = false; // Устанавливаем флаг при размонтировании
//     };
// }, []);

//     return (
//         <div className="history-page-container">
//             <Header onOpenModal={openModal} />
//             {isModalOpen && <NotificationModal onClose={closeModal} />}

//             <div className="history">
//                 <div className="historyHeader">
//                     <p>ЗАКАЗЫ</p>
//                 </div>
//                 <div className='ListOrders'>
//                     {fetchLoading && <p>Загрузка истории заказов...</p>}

//                     {fetchError && (
//                         <p className="error-message">
//                             {fetchError.message}
//                         </p>
//                     )}

//                     {!fetchLoading && !fetchError && ordersData.length > 0 ? (
//                         ordersData.map((order) => (
//                             <OrderAdmin
//                                 key={order.id}
//                                 id={order.id}
//                                 client_name={order.client_name}
//                                 client_phone={order.client_phone}
//                                 sale_date={order.sale_date}
//                                 sale_price={order.sale_price}
//                                 status={order.status}
//                                 books={order.books}
//                                 onStatusUpdate={handleStatusUpdate}
//                             />
//                         ))
//                     ) : (
//                         !fetchLoading && !fetchError && <p>У вас пока нет заказов.</p>
//                     )}
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// };
// export default  HistoryPageAdmin;




const HistoryPageAdmin = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ordersData, setOrdersData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [fetchLoading, setFetchLoading] = useState(true);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            const response = await FetchWithAuth('http://127.0.0.1:8000/catalog/admin/orders/${orderId}/status/', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error('HTTP error! status: ${response.status}, message: ${errorData.message}');
            }

            setOrdersData(prevOrders =>
                prevOrders.map(order =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                )
            );
            console.log('Статус заказа ${orderId} успешно обновлен на ${newStatus}');
        } catch (error) {
            console.error("Ошибка при обновлении статуса заказа:", error);
            throw error;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await FetchWithAuth('http://127.0.0.1:8000/catalog/admin/orders/');

                if (!response.ok) {
                    throw new Error('HTTP error! status: ${response.status}');
                }

                const data = await response.json();

                if (Array.isArray(data)) {
                    // Сортировка по ID статуса заказа (возрастанию), затем по дате (убыванию)
                    const sortedData = data.sort((a, b) => {
                        // 1. Сортировка по ID (возрастанию)
                        const idComparison = a.id - b.id;
                        if (idComparison !== 0) {
                            return idComparison;
                        }

                        // 2. Сортировка по статусу (возрастанию)
                        const statusA = String(a.status).toUpperCase();
                        const statusB = String(b.status).toUpperCase();
                        const statusComparison = statusA.localeCompare(statusB);
                        if (statusComparison !== 0) {
                            return statusComparison;
                        }

                        // 3. Сортировка по дате (убыванию)
                        const dateA = new Date(a.sale_date);
                        const dateB = new Date(b.sale_date);
                        return dateB.getTime() - dateA.getTime();
                    });

                    setOrdersData(sortedData);
                    setFetchError(null);
                } else {
                    setFetchError(new Error("Получены данные неверного формата от сервера."));
                }
            } catch (error) {
                setFetchError(error);
                console.error("Ошибка при получении истории заказов:", error);
            } finally {
                setFetchLoading(false);
            }
        };

        fetchData();
    }, []);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', alignItems: 'center' }}>
            <Header onOpenModal={openModal} />
            {isModalOpen && <NotificationModal onClose={closeModal} />}
            <div className="history">
                <div className="historyHeader">
                    <p>ЗАКАЗЫ</p>
                </div>
                <div className='ListOrders'>
                    {fetchLoading && <p>Загрузка истории заказов...</p>}

                    {fetchError && (
                        <p style={{ color: 'red' }}>
                            {fetchError.message}
                        </p>
                    )}

                    {!fetchLoading && !fetchError && ordersData.length > 0 ? (
                        ordersData.map((order) => (
                            <OrderAdmin
                                key={order.id}
                                id={order.id}
                                client_name={order.client_name}
                                client_phone={order.client_phone}
                                sale_date={order.sale_date}
                                sale_price={order.sale_price}
                                status={order.status}
                                books={order.books}
                                onStatusUpdate={handleStatusUpdate}
                            />
                        ))
                    ) : (
                        !fetchLoading && !fetchError && <p>У вас пока нет заказов.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HistoryPageAdmin;