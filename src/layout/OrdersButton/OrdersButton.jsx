import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../NotificationButton/NotificationButton.css";

const OrdersButton = () => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const role = localStorage.getItem('role'); 
    const handleClick = () => {
        // Направляем пользователя на соответствующий маршрут в зависимости от его роли
        if (role === 'Клиент') {
            navigate("/historyClient");
        } else if (role === 'Сотрудник') {
            navigate("/historyAdmin");
        } else {
            navigate("/"); // Выводим предупреждение в консоль для неизвестной роли
        }
    };

    return (
        <button
            className={`deliveryButton ${isHovered ? 'hovered' : ''}`} // Убрали styles
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img src="/group.svg" alt="доставка" />
        </button>
    );
};

export default OrdersButton;
