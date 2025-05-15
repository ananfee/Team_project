// History_page.js
import React, { useState, useEffect } from 'react';
import NotificationModal from '../NotificationModal/NotificationModal';
import Header from '../layout/Header.js';
import "./History_page.css";
import Order from './Order/Order';
import Footer from "../components/footer/footer";
import FetchWithAuth from '../layout/LoginWindow/FetchWithAuth.js';
// import book1 from '../images/image 1.png';
// import book2 from '../images/image 2.png';
// import book3 from '../../images/image 3.png';

// const HistoryPage = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const openModal = () => {
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//     };

//     // Массив данных для заказов
//     const ordersData = [
//         {
//             orderNumber: '029329',
//             date: '01.03.2025',
//             sale_price: '870',
//             status_name: 'Оформлен',
//             books: [
//               { cover_image: '/media/book_covers/book_example.jpg' }
//             ]
//          },
//         { orderNumber: '029330', date: '02.03.2025', sale_price: '504', status_name: 'Оформлен',
//             books: [
//                 {book_id: '1', cover_image: '/media/book_covers/book_example.jpg' },
//                 {book_id: '4', cover_image: '/media/book_covers/book_example.jpg' },
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
//                     {ordersData.map((order, index) => (
//                         <Order
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

// export default HistoryPage;

const HistoryPage = () => {

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ordersData, setOrdersData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [fetchLoading, setFetchLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await FetchWithAuth('http://5.129.207.153/api/catalog/order-history/');
                setOrdersData(data);
                setFetchError(null);
            } catch (error) {
                setFetchError(error);
                setOrdersData([]); // Очистить данные при ошибке
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
            {fetchLoading && <p>Загрузка данных...</p>}
            {fetchError && <p>Ошибка: {fetchError.message}</p>}
            {ordersData.map((order) => (
                        <Order
                        key={order.id}
                        orderNumber={order.id}
                        date={order.sale_date}
                        sale_price={order.sale_price}
                        status_name={order.status_name}
                        books={order.books}
                    />
            ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HistoryPage;