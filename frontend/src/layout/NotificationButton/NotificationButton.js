import React, { useState } from "react";
import "./NotificationButton.css";

const NotificationButton = ({ onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            className={`deliveryButton ${isHovered ? 'hovered' : ''}`}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img src="messages-2.svg" alt="" />
        </button>
    );
};

export default NotificationButton;
