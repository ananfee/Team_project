import React from "react";
import styles from "./BookInfo.module.css";

function BookInfo({Book})
{
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
               <button className={Book.number_of_copies === "0" ? styles.basketButtonDisabled : styles.basketButton} 
                  disabled={Book.number_of_copies === "0" ? true : false}>В корзину</button>
            </div>
            <p className={styles.Stock} style={{ color: Book.number_of_copies === "0" ? 'red' : '#0F870A' }}>
               {Book.number_of_copies === "0" ? 'Нет в наличии' : 'В наличии'}
            </p>
         </div>
      </div>
   );
}

export default BookInfo;