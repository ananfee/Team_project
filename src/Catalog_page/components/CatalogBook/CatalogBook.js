import React, {useState} from "react";
import styles from "./CatalogBook.module.css";
import AddBookWindow from "../AddBookWindow/AddBookWindow";
import DeleteBookWindow from "../DeleteBookWundow/DeleteBookWindow";
import FetchWithAuth from "../../../layout/LoginWindow/FetchWithAuth";


function CatalogBook({product})
{
   const [editBookModalOpen, setEditBookModalOpen] = useState(false);
   const [deleteBookModalOpen, setDeleteBookModalOpen] = useState(false);
   const [editBookData, setEditBookData] = useState(null);
   const [deleteBookData, setDeleteBookData] = useState(null);
   const role = localStorage.getItem('role');

   const fetchBookForEdit = async (bookId) => {
      try {
        const result = await FetchWithAuth(`http://127.0.0.1:8000/catalog/books/${bookId}/`);
        if (result && result.book) {
          setEditBookData(result.book);
          setEditBookModalOpen(true);
        }
      } catch (err) {
        alert('Ошибка при получении данных о книге');
        console.error(err);
      }
    };

   const fetchBookForDelete = async (bookId) => {
      try {
        const result = await FetchWithAuth(`http://127.0.0.1:8000/catalog/books/${bookId}/`);
        if (result && result.book) {
          setDeleteBookData(result.book);
          setDeleteBookModalOpen(true);
        }
      } catch (err) {
        alert('Ошибка при получении данных о книге');
        console.error(err);
      }
    };

    return(
      <div className={styles.CatalogBook}>
        <img src={product.cover_image}
             style={{ width: '160px',  height: '250px',  display: 'block' }}/>
        <div className={styles.InfoContainer}>
          <div className={styles.Info}>
            {product.discounted_price != null ?
              (<div style={{display:'flex', alignItems: 'center'}}>
                <p style={{marginBottom: 2, color: "#777777", 
                  textDecoration: 'line-through', textDecorationColor: 'red',
                  marginRight: 6}}>{product.price} ₽</p>
                <p style={{fontWeight: 'bold', marginBottom: 2}}>{product.discounted_price} ₽</p>
              </div> ) : (<p style={{fontWeight: 'bold', marginBottom: 2}}>{product.price} ₽</p>) }
            <p style={{marginBottom: 2}}>{product.title}</p>
            {product.authors.map((author, index) => (
              <p key={index} style={{ fontSize: 12, color: "#777777" }}>
                {author.author_last_name} {author.author_first_name} {author.author_patronymic}
              </p> ))}
          </div>
          {role == 'Сотрудник' ? 
            (<>
              <div className={styles.ButtonContainer}>
                <button
                  className={styles.EditBook}
                  onClick={() => fetchBookForEdit(product.id)}
                >Редактировать</button>
                <AddBookWindow
                  isOpen={editBookModalOpen}
                  onClose={() => {
                    setEditBookModalOpen(false);
                    setEditBookData(null);
                  }}
                  obj={editBookData}
                />
                <button className={styles.Trash} onClick={() => fetchBookForDelete(product.id)}></button>
                <DeleteBookWindow isOpen={deleteBookModalOpen} onClose={() => {setDeleteBookModalOpen(false); setDeleteBookData(null);}} obj={deleteBookData}/>
              </div>
            </>)
            : <button className={styles.BasketButton}>В корзину</button>
          }
        </div>
      </div>
    );

}

export default CatalogBook;