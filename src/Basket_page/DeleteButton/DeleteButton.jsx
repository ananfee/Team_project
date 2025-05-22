import React from 'react'; // Убрал ненужный useState
import "./DeleteButton.css";
import bw from '../../images/bagWhite.png';

const DeleteButton = ({ onOpenModal }) => { // Добавили prop onOpenModal
    return (
        <button className="buttonDelete" onClick={onOpenModal}> {/* Добавили onClick */}
            <p style={{ fontWeight: 0 }}>Удалить товар</p>
            <img src={bw} alt="" />
        </button>
    );
};

export default DeleteButton;
