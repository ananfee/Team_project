import React, {useState} from "react";
import styles from "./CatalogBook.module.css";
import AddBookWindow from "../AddBookWindow/AddBookWindow";
import DeleteBookWindow from "../DeleteBookWundow/DeleteBookWindow";


const book = {
   id: 2,
   title: "Мастер и Маргарита",
   price: 1250.0,
   discount: '10%',
   genre: 'Роман',
   authors:[
       {
           author_last_name: "Булгаков",
           author_first_name: "Михаил",
           author_patronymic: "Афанасьевич"
       }
   ],
   cover_image: 'Book6.svg',
   ISBN: "978-5-05-000000-0",
   description: "«Мастер и Маргарита» — один из самых известных романов в литературе и мировой бестселлер! Он настолько многослоен, что перечитывать его можно бесконечно.\nОн погружает нас в атмосферу советской Москвы 1930-х годов, где, казалось бы, нет места ничему потустороннему. Нечистая сила во главе с самим Дьяволом Воландом однажды весенним днем появляется в Москве, чтобы навести порядок. Именно так начинается полная приключений и иронии история, в которой в конце концов побеждают любовь и верность.",
   publishing: "Эксмо",
   publishing_year: 2024,
   number_of_copies: 7
};

function CatalogBook({product})
{
   const [editBookModalOpen, setEditBookModalOpen] = useState(false);
   const [deleteBookModalOpen, setDeleteBookModalOpen] = useState(false);
   // const role = localStorage.getItem('role');
   const role = 'Сотрудник';
   return(
      <div className={styles.CatalogBook}>
         <img src={product.cover_image}
         style={{
            width: '160px',
            height: '250px',
            display: 'block'
         }}/>
         <div className={styles.InfoContainer}>
            <div className={styles.Info}>
               {product.discounted_price != null ?
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
            {role == 'Сотрудник' ? 
               (<>
                  <div className={styles.ButtonContainer}>
                  <button className={styles.EditBook} onClick={() => setEditBookModalOpen(true)} >Редактировать</button> 
                  <AddBookWindow isOpen={editBookModalOpen} onClose={() => setEditBookModalOpen(false)} obj={book} />
                  <button className={styles.Trash} onClick={() => setDeleteBookModalOpen(true)}></button>
                  <DeleteBookWindow isOpen={deleteBookModalOpen} onClose={() => setDeleteBookModalOpen(false)} />
                  </div>
               </>):
               <button className={styles.BasketButton}>В корзину</button>
            }
            
         </div>
      </div>
   );

}

export default CatalogBook;