import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../NotificationButton/NotificationButton.css";

const OrdersButton = () => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        navigate("/history");
    };

    return (
        <button
            className={`deliveryButton ${isHovered ? 'hovered' : ''}`} // Убрали styles
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img src="group.svg" alt="доставка" />
        </button>
    );
};

export default OrdersButton;
