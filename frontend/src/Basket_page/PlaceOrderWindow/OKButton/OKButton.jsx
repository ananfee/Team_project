import React from 'react'; // Убрали ненужный useState
import "./OKButton.css";

const OKButton = ({ onClick }) => {
    return (
        <button onClick={onClick} className="OKButton">
            <p>Ок</p>
        </button>
    );
};

export default OKButton;
