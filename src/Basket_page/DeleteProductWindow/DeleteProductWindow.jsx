import React,  { useEffect } from 'react'; // Убрал useState
import CancelButton from "./CancelButton/CancelButton";
import DeleteProductButton from "./DeleteProductButton/DeleteProductButton";
import './DeleteProductWindow.css';
import cp from '../../images/add.png';

const DeleteProductWindow = ({ onClose, isOpen, onConfirmDelete }) => {
        const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };
        useEffect(() => {
            const handleEsc = (event) => {
                if (event.key === "Escape") {
                    onClose();
                }
            };
    
            window.addEventListener("keydown", handleEsc);
            return () => {
                window.removeEventListener("keydown", handleEsc);
            };
        }, [onClose]);
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
                    <DeleteProductButton onClick={onConfirmDelete}/>
                </div>
            </div>
        </div>
    );
};

export default DeleteProductWindow;

