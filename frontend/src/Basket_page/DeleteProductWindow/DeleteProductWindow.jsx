import React from 'react'; // Убрал useState
import CancelButton from "./CancelButton/CancelButton";
import DeleteProductButton from "./DeleteProductButton/DeleteProductButton";
import './DeleteProductWindow.css';
import cp from '../../images/add.png';

const DeleteProductWindow = ({ onClose, isOpen, onQuantityChange }) => {
    return (
        <div className="deleteProductWindow-overlay" style={{ display: isOpen ? 'flex' : 'none' }}>
            <div className="deleteProductWindow-content">
                <div className='NameDeleteProductWindow'>
                    <p>Удаление товара</p>
                    <button className='closeDeleteProductWindow' onClick={onClose}>
                        <img src={cp} alt="Закрыть" />
                    </button>
                </div>
                <div className='DescriptionDeleteProductWindow'>
                    <p>Вы уверены, что хотите удалить из корзины выбранный товар? Отменить данное действие будет невозможно.</p>
                </div>
                <div className='conteiner_buttons'>
                    <CancelButton onClick={onClose} />
                    <DeleteProductButton onClick={onQuantityChange}/>
                </div>
            </div>
        </div>
    );
};

export default DeleteProductWindow;

