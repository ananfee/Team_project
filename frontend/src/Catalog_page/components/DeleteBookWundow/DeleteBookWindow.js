import React, {useState, useRef, useEffect} from "react";
import styles from './DeleteBookWindow.module.css';
import FetchWithAuth from "../../../layout/LoginWindow/FetchWithAuth";

function DeleteBookWindow ({isOpen, onClose, obj})
{
   const baseUrl = /api/;
   if (!isOpen) return null;

   async function handleDelete() {
    try {
      const response = await FetchWithAuth(
        `${baseUrl}catalog/books/delete/${obj.id}/`,
        { method: 'DELETE' }
      );
      if (response.ok) {
         onClose();
         window.location.reload();
      } else {
        alert('Ошибка при удалении');
      }
    } catch (err) {
      alert('Ошибка сервера');
    }
  }

   return(
      <div className={styles.overlay}>
        <div className={styles.modal}>
            <p className={styles.nameWindow}>Удаление книги</p>
            <button onClick={() => {onClose();}} className={styles.closeBtn}></button>
            <div className={styles.Content}>
               {obj.number_of_copies == 0 ? (
               <>
               <p>Вы уверены, что хотите удалить книгу “{obj.title}” - {
                  obj.authors
                     ? obj.authors.map(
                        a => [a.author_last_name, a.author_first_name, a.author_patronymic].filter(Boolean).join(' ')
                     ).join(', ')
                     : ''
               }?</p>
               <div className={styles.ButtonContainer}>
                  <button onClick={() => {onClose();}} style={{backgroundColor: "#efeeee", color: "#424245"}}>Отмена</button>
                  <button style={{backgroundColor: "#5D3C64", color: "white"}} onClick={handleDelete}>Удалить</button>
               </div>
               </>
               ): (
               <>
               <p>Невозможно удалить книгу “{obj.title}”, так как количество экземпляров не нулевое!</p>
               <div className={styles.ButtonContainer1}>
                  <button style={{backgroundColor: "#5D3C64", color: "white"}} onClick={() => {onClose();}}>Окей</button>
               </div>
               </>
            )}
            </div>
         </div>
      </div>
   );
}

export default DeleteBookWindow;