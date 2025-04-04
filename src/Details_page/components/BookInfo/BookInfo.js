import React from "react";
import styles from "./BookInfo.module.css";

function BookInfo({Book})
{
   return(
      <div className={styles.InfoContainer}>
         <img style={{width: 360, height: 566}} src={Book.cover_image}/>
         <div className={styles.BookInfo}>
               <div className={styles.descriptionConteiner}>
                  <p className={styles.descriptionName}>Описание</p>
                  <p className={styles.description}>{Book.description}</p>
               </div>
               <div className={styles.mainInfo}>
                  <div className={styles.attributeName}>
                     <p>Авторы</p>
                     <p>Название книги</p>
                     <p>ISBN</p>
                     <p>Год издания</p>
                  </div>
                  <div className={styles.attributeValue}>
                     <p>{Book.authors}</p>
                     <p>{Book.title}</p>
                     <p>{Book.ISBN}</p>
                     <p>{Book.year}</p>
                  </div>
               </div>
         </div>
         <div className={styles.BookPriceStatusContainer}>
            <div className={styles.BookPriceContainer}>

            </div>
         </div>
      </div>
   );
}

export default BookInfo;