import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../NotificationButton/NotificationButton.css";

const BasketButton = () => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        navigate("/basket");
    };

    return (
        <button
            className={`deliveryButton ${isHovered ? 'hovered' : ''}`} // Убрали styles
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img src="shopping-cart.svg" alt="корзина" />
        </button>
    );
};

export default BasketButton;
