import React from 'react'; // Убрали ненужный useState
import "./CancelButton.css";

const CancelButton = ({ onClick }) => {
    return (
        <button onClick={onClick} className="cancelButton">
            <p>Отмена</p>
        </button>
    );
};

export default CancelButton;
