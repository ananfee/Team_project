import React from "react";
import "./CloseButton.css";

const CloseButton = ({ onClick }) => {
    return (
        <button className="closeButton" onClick={onClick}>
            <p>Закрыть</p>
        </button>
    );
};

export default CloseButton;
