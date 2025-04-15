// History_page.js
import React, { useState } from 'react';
import NotificationModal from '../NotificationModal/NotificationModal';
import Header from '../layout/Header.js';
import "./History_page.css";
import Order from './Order/Order';
import Footer from "../components/footer/footer";



const HistoryPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Массив данных для заказов
    const ordersData = [
        { orderNumber: '029329', date: '01.03.2025', time: '12:30', description: 'Книги по программированию' },
        { orderNumber: '029330', date: '02.03.2025', time: '14:00', description: 'Художественная литература' },
        { orderNumber: '029331', date: '03.03.2025', time: '16:45', description: 'Учебники' },
        { orderNumber: '029331', date: '03.03.2025', time: '16:45', description: 'Учебники' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', alignItems: 'center' }}>
            <Header onOpenModal={openModal} />
            {isModalOpen && <NotificationModal onClose={closeModal} />}
            <div className="history">
                <div className="historyHeader">
                    <p>ЗАКАЗЫ</p>
                </div>
                <div className='ListOrders'>
                    {/* Рендерим несколько компонентов Order, используя map */}
                    {ordersData.map((order, index) => (
                        <Order
                            key={index} // Важно! Добавляем key для каждого элемента
                            orderNumber={order.orderNumber}
                            date={order.date}
                            time={order.time}
                            description={order.description}
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HistoryPage;
