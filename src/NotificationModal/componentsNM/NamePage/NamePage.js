import React from 'react';
import cp from '../../../images/add.png';
import './NamePage.css';

const NamePage = ({ onClose }) => {
    return (
        <div className="frameNP">
            <p className="namePage">Уведомления</p>
            <button className='closePage' onClick={onClose}>
                <img src={cp} alt="Закрыть" />
            </button>
        </div>
    );
};

export default NamePage;
