import React, { useState } from 'react';
import './ProductInBasket.css'
import image1 from '../../images/image 1.png';
import NumberProducts from '../NumberProducts/NumberProducts.jsx';
import DeleteButton from '../DeleteButton/DeleteButton.jsx';
import DeleteProductWindow from '../DeleteProductWindow/DeleteProductWindow.jsx';
  
const ProductInBasket = ({ book, count_of_book, onDelete, onQuantityChange }) => { 
    const [isDeleteWindowOpen, setIsDeleteWindowOpen] = useState(false);

    const handleQuantityChange = (newQuantity) => {
        onQuantityChange(book.id, newQuantity);
    };

    const handleOpenDeleteWindow = () => {
        setIsDeleteWindowOpen(true);
    };

    const handleCloseDeleteWindow = () => {
        setIsDeleteWindowOpen(false);
    };
        const handleConfirmDelete = () => {
        handleCloseDeleteWindow(); // Закрываем окно после подтверждения
        onDelete(book.id); // Вызываем функцию удаления из родительского компонента
    };
        // Вспомогательная функция для форматирования полного имени автора из объекта { author_last_name, author_first_name, author_patronymic }
    const formatAuthorName = (author) => {
        if (!author) return '';
        // Собираем части имени, отфильтровывая пустые или null значения
        const parts = [author.author_last_name, author.author_first_name, author.author_patronymic].filter(Boolean);
        // Объединяем части имени пробелами
        return parts.join(' ');
    };
        // Форматируем список авторов
    let authorsString = 'Автор неизвестен'; // Текст по умолчанию
    if (book && Array.isArray(book.authors) && book.authors.length > 0) {
        // Если массив авторов существует и не пустой, проходим по нему
        authorsString = book.authors.map(author => formatAuthorName(author)).join(', '); // Объединяем имена авторов через запятую с пробелом
    }
    
    return (
        <div className='product_container'>
            <div className='conteinerImgInfo'>
                <div className='imgProduct'>
                    <img src={book.cover_image} alt={book.title} /> {/* Используем пропс image */}
                </div>
                <div className='conteiner0'>
                    <div className='infoBook'>
                        {/* Используем пропс title из book. Добавляем проверку на существование book и title */}
                        <p style={{fontSize: 16, color: "#000000"}}>{book?.title || 'Название неизвестно'}</p>
                        {/* Отображаем отформатированную строку с авторами */}
                        <p style={{fontSize: 14, color: "#777777"}}>{authorsString}</p>
                </div>
                    <NumberProducts initialCount={count_of_book} />
                </div>
            </div>
            <div className='conteiner00'>
            {book.discounted_price != null ?
              ( <div className='priceProduct'>
                    <p style={{color: "#777777", textDecoration: 'line-through', textDecorationColor: 'red'}}>{book.price*count_of_book} ₽</p> {/* Используем пропс oldPrice */}
                    <p style={{fontWeight: 500}}>{book.discounted_price*count_of_book} ₽</p> {/* Используем пропс newPrice */}
                </div> ) : (<div className='priceProduct'>
                    <p style={{fontWeight: 500}}>{book.discounted_price*count_of_book} ₽</p> {/* Используем пропс newPrice */}
                </div>) }
                <div>
                    <DeleteButton onOpenModal={handleOpenDeleteWindow} /> {/* Передаем функцию */}
                    <DeleteProductWindow isOpen={isDeleteWindowOpen} onClose={handleCloseDeleteWindow} onConfirmDelete={handleConfirmDelete} /> {/* Передаем состояние и onClose */}
                </div>
            </div>
        </div>
    );
};

export default ProductInBasket;

