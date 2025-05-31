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


const HistoryPageAdmin = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ordersData, setOrdersData] = useState([]); // Состояние для хранения данных о заказах
    const [fetchError, setFetchError] = useState(null);
    const [fetchLoading, setFetchLoading] = useState(true);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

        // Функция для обновления статуса заказа через API
    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            // Предполагается, что FetchWithAuth сам добавит токен
            const response = await FetchWithAuth(`http://127.0.0.1:8000/catalog/admin/orders/${orderId}/status/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                const errorData = await response.json(); 
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
            }

            // Если успешно, обновляем состояние ordersData в родительском компоненте
            setOrdersData(prevOrders => 
                prevOrders.map(order => 
                    order.id === orderId ? { ...order, status: newStatus } : order
                )
            );
            console.log(`Статус заказа ${orderId} успешно обновлен на ${newStatus}`);
        } catch (error) {
            console.error("Ошибка при обновлении статуса заказа:", error);
            // Перебрасываем ошибку, чтобы OrderAdmin мог ее поймать и показать пользователю
            throw error; 
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Получаем данные о заказах
                const response = await FetchWithAuth('http://5.129.207.153:8001/catalog/admin/orders/');

                // Проверяем статус ответа
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // Парсим ответ как JSON
                const data = await response.json();

                // Проверяем, являются ли полученные данные массивом
                if (Array.isArray(data)) {
                    // Устанавливаем данные о заказах
                    setOrdersData(data);
                    setFetchError(null); // Сбрасываем ошибку при успешной загрузке
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

        fetchData(); // Вызываем функцию загрузки данных
    }, []); // Завершаем эффект один раз после первого рендера

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
                            Ошибка при загрузке заказов: {fetchError.message}
                        </p>
                    )}

                    {/* Рендерим компоненты Order, используя полученные данные */}
                    {!fetchLoading && !fetchError && ordersData.length > 0 ? (
                        ordersData.map((order) => (
                            <OrderAdmin
                                key={order.id} // Используем id для key
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

