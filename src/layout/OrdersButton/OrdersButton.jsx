import React, { useState } from "react";
import "../NotificationButton/NotificationButton.css"; // Создайте OrdersButton.module.css

const OrdersButton = ({ onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            className={`deliveryButton ${isHovered ? 'hovered' : ''}`}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img src="group.svg" alt="" />
        </button>
    );
};
export default OrdersButton;
