import React, {useState, useEffect} from "react";
import styles from "./BookInfo.module.css";
import WarningBasket from "../../../Catalog_page/components/WarningBasket/WarningBasket";
import AddBookWindow from "../../../Catalog_page/components/AddBookWindow/AddBookWindow";
import DeleteBookWindow from "../../../Catalog_page/components/DeleteBookWundow/DeleteBookWindow";
import FetchWithAuth from "../../../layout/LoginWindow/FetchWithAuth";

function BookInfo({Book})
{
   const [warningBasketModalOpen, setWarningBasketModalOpen] = useState(false);
   const [role, setRole] = useState("");
   const [editBookModalOpen, setEditBookModalOpen] = useState(false);
   const [deleteBookModalOpen, setDeleteBookModalOpen] = useState(false);
   const [editBookData, setEditBookData] = useState(null);
   const [deleteBookData, setDeleteBookData] = useState(null);

   const fetchBookForEdit = async (bookId) => {
      try {
        const response = await FetchWithAuth(`http://127.0.0.1:8000/catalog/books/update/${bookId}/`);
        if (response && response.ok) {
          const data = await response.json();
          setEditBookData(data.book);
          setEditBookModalOpen(true);
        }
      } catch (err) {
        alert('Ошибка при получении данных о книге');
        console.error(err);
      }
    };

   const fetchBookForDelete = async (bookId) => {
      try {
        const response = await FetchWithAuth(`http://127.0.0.1:8000/catalog/books/update/${bookId}/`);
        if (response && response.ok) {
          const data = await response.json();
          setDeleteBookData(data.book);
          setDeleteBookModalOpen(true);
        }
      } catch (err) {
        alert('Ошибка при получении данных о книге');
        console.error(err);
      }
    };

    const addToCart = async (bookId) => {
      try {
        const response = await FetchWithAuth('http://127.0.0.1:8000/catalog/cart/', {
          method: 'POST',
          body: JSON.stringify({
            book: bookId,
            count_of_book: 1,
          })
        });
        if (!response) {
          alert('Ошибка авторизации!');
          return;
        }
        const data = await response.json();
        if (!response.ok) {
          alert('Ошибка: ' + (data.detail || response.statusText));
        }
      } catch (e) {
        alert('Ошибка отправки запроса');
      }
    };
   
   useEffect(() => {
      setRole(localStorage.getItem('role'));
    }, []);

   return(
      <div className={styles.InfoContainer}>
         <img style={{width: 360, height: 564, display: 'block'}} src={Book.cover_image}/>
         <div className={styles.BookInfo}>
               <div className={styles.descriptionConteiner}>
                  <p className={styles.descriptionName}>Описание</p>
                  <p className={styles.description}>{Book.description}</p>
               </div>
               <div className={styles.mainInfo}>
                  <div className={styles.attributeName}>
                     <p>Название книги</p>
                     <p>ISBN</p>
                     <p>Год издания</p>
                     <p>Издательство</p>
                     <p>Авторы</p>
                  </div>
                  <div className={styles.attributeValue}>
                     <p>{Book.title}</p>
                     <p>{Book.ISBN}</p>
                     <p>{Book.publishing}</p>
                     <p>{Book.publishing_year}</p>
                     {Book.authors.map((author, index) => (
                        <p key={index}>
                           {author.author_last_name} {author.author_first_name} {author.author_patronymic}
                        </p>
                     ))}
                  </div>
               </div>
         </div>
         <div className={styles.BookPriceStatusContainer}>
            <div className={styles.BookPriceBasketContainer}>
               <div className={styles.BookPriceContainer}>
                  {Book.discounted_price != null ?
                     (<div style={{display:'flex', alignItems: 'center'}}>
                     <p style={{color: "#777777", 
                        textDecoration: 'line-through', textDecorationColor: 'red',
                        marginRight: 8}}>{Book.price} ₽</p>
                     <p style={{fontWeight: 500}}>{Book.discounted_price} ₽</p>
                     </div>
                     ) :
                     (<p style={{fontWeight: 500}}>{Book.price} ₽</p>)
                  }
               </div>
               {role == 'Сотрудник' ? 
               (<>
                  <div className={styles.ButtonContainer}>
                  <button
                     className={styles.EditBook}
                     onClick={() => fetchBookForEdit(Book.id)}
                  >Редактировать</button>
                  <AddBookWindow
                     isOpen={editBookModalOpen}
                     onClose={() => {
                     setEditBookModalOpen(false);
                     setEditBookData(null);
                     }}
                     obj={editBookData}
                  />
                  <button className={styles.Trash} onClick={() => fetchBookForDelete(Book.id)}>Удалить </button>
                  <DeleteBookWindow isOpen={deleteBookModalOpen} onClose={() => {setDeleteBookModalOpen(false); setDeleteBookData(null);}} obj={deleteBookData}/>
              </div>
               </>) : 
               role == 'Клиент' ? (
                  <>
                  <button className={Book.number_of_copies == "0" ? styles.basketButtonDisabled : styles.basketButton} 
                  disabled={Book.number_of_copies == "0" ? true : false} 
                  onClick={Book.number_of_copies == "0" ? undefined : () => addToCart(Book.id)}>В корзину</button>
                  </>
               ) : ( 
                  <>
                  <button className={Book.number_of_copies == "0" ? styles.basketButtonDisabled : styles.basketButton} 
                     disabled={Book.number_of_copies == "0" ? true : false} 
                     onClick={() => {setWarningBasketModalOpen(true);}}>В корзину</button>
                  <WarningBasket isOpen={warningBasketModalOpen} onClose={() => {setWarningBasketModalOpen(false);}}/> 
                  </>
               )}
            </div>
            <p className={styles.Stock} style={{ color: Book.number_of_copies == "0" ? 'red' : '#0F870A' }}>
               {Book.number_of_copies == "0" ? 'Нет в наличии' : 'В наличии'}
            </p>
         </div>
      </div>
   );
}

export default BookInfo;