import React from "react";
import styles from "./CatalogBook.module.css";

function CatalogBook({product})
{
   return(
      <div className={styles.CatalogBook}>
         <img src={product.cover_image}/>
         <div className={styles.InfoContainer}>
            <div className={styles.Info}>
               {product.discounted_price != "" ?
                  (<div style={{display:'flex', alignItems: 'center'}}>
                  <p style={{marginBottom: 2, color: "#777777", 
                     textDecoration: 'line-through', textDecorationColor: 'red',
                     marginRight: 6}}>{product.price} ₽</p>
                  <p style={{fontWeight: 'bold', marginBottom: 2}}>{product.discounted_price} ₽</p>
                  </div>
                  ) :
                  (<p style={{fontWeight: 'bold', marginBottom: 2}}>{product.price} ₽</p>)
               }
               <p style={{marginBottom: 2}}>{product.title}</p>
               {product.authors.map((author, index) => (
                  <p key={index} style={{ fontSize: 12, color: "#777777" }}>
                     {author.author_last_name} {author.author_first_name} {author.author_patronymic}
                  </p>
               ))}
            </div>
            <button className={styles.BasketButton}>В корзину</button>
         </div>
      </div>
   );

}

export default CatalogBook;