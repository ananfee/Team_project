import React, {useState, useRef, useEffect} from "react";
import styles from './WarningBasket.module.css';

function DeleteBookWindow ({isOpen, onClose})
{
   if (!isOpen) return null;

   return(
      <div className={styles.overlay}>
        <div className={styles.modal}>
            <p className={styles.nameWindow}>Предупреждение</p>
            <button onClick={() => {onClose();}} className={styles.closeBtn}></button>
            <div className={styles.Content}>
               <p>Войдите в аккаунт, чтобы добавить книгу в корзину</p>
               <div className={styles.ButtonContainer}>
                  <button style={{backgroundColor: "#5D3C64", color: "white"}} onClick={() => {onClose();}}>Окей</button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default DeleteBookWindow;