import React from 'react'; // Убрал useState
import CancelButton from "./CancelButton/CancelButton";
import DeleteProductButton from "./DeleteProductButton/DeleteProductButton";
import './DeleteProductWindow.css';
import cp from '../../images/add.png';

const DeleteProductWindow = ({ onClose, isOpen, onConfirmDelete }) => {
    return (
        // Используем style для условного отображения. Для больших проектов лучше CSS-классы.
        <div className="deleteProductWindow-overlay" style={{ display: isOpen ? 'flex' : 'none' }}>
            {/* Добавляем onClick на оверлей, чтобы закрывать по клику вне окна, но не на самом окне */}
            <div className="deleteProductWindow-content" onClick={e => e.stopPropagation()}>
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
                    {/* Передаем onConfirmDelete в DeleteProductButton */}
                    <DeleteProductButton onClick={onConfirmDelete}/>
                </div>
            </div>
        </div>
    );
};

export default DeleteProductWindow;

