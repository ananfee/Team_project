import React, {useState, useRef, useEffect} from "react";
import styles from './DeleteBookWindow.module.css';

function DeleteBookWindow ({isOpen, onClose})
{
   if (!isOpen) return null;

   return(
      <div className={styles.overlay}>
        <div className={styles.modal}>
            <p className={styles.nameWindow}>Удаление книги</p>
            <button onClick={() => {onClose();}} className={styles.closeBtn}></button>
            <div className={styles.Content}>
               <p>Вы уверены, что хотите удалить книгу “Спеши любить” - Николас Спаркс?</p>
               <div className={styles.ButtonContainer}>
                  <button style={{backgroundColor: "#efeeee", color: "#424245"}}>Отмена</button>
                  <button style={{backgroundColor: "#5D3C64", color: "white"}}>Удалить</button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default DeleteBookWindow;