import React, {useState, useEffect} from "react";
import styles from "./CatalogBook.module.css";
import AddBookWindow from "../AddBookWindow/AddBookWindow";
import DeleteBookWindow from "../DeleteBookWundow/DeleteBookWindow";
import FetchWithAuth from "../../../layout/LoginWindow/FetchWithAuth";
import WarningBasket from "../WarningBasket/WarningBasket";


// const editBookData = 
//    {
//       id: 1,
//       cover_image: "Book7.svg",
//       title: "Если все кошки исчезнут",
//       authors: [
//             {
//                 "author_last_name": "Роулинг",
//                 "author_first_name": "Джоан Кэтлин",
//                 "author_patronymic": null
//             }
//         ],
//       price: "339",
//       discounted_price: "300",
//       ISBN: "978-5-04-181395-6",
//       description: "Дни молодого почтальона сочтены. Оторванный от своей семьи и живущий один с со своим котом Капустой, он не был готов к страшному диагнозу: жить ему осталось всего несколько месяцев. Но прежде чем он сможет привести свои дела в порядок, появляется дьявол с очень необычным предложением. Темная сила обещает продлить умирающему жизнь, но в обмен за каждый дополнительный день одна вещь в мире будет исчезать бесследно... И вот начинается очень странная неделя, которая ставит молодого почтальона и его любимого кота на грань существования. С каждым исчезающим предметом почтальон размышляет о жизни, которую он прожил, о своих радостях и сожалениях, а также о людях, которых он любил и потерял.",
//       year: "2025",
//       number_of_copies: "0"
//    };

function CatalogBook({product, addAlert})
{
   const [editBookModalOpen, setEditBookModalOpen] = useState(false);
   const [deleteBookModalOpen, setDeleteBookModalOpen] = useState(false);
   const [warningBasketModalOpen, setWarningBasketModalOpen] = useState(false);
   const [editBookData, setEditBookData] = useState(null);
   const [deleteBookData, setDeleteBookData] = useState(null);

   const [role, setRole] = useState("");
   useEffect(() => {
    setRole(localStorage.getItem('role'));
    }, []);

 
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
        } else {
          addAlert(`Товар добавлен в корзину`);
          const totalItems = data.reduce((sum, item) => sum + parseInt(item.count_of_book, 10), 0);
          localStorage.setItem('totalItems', totalItems);
          window.dispatchEvent(new Event('cartUpdated'));
        }
      } catch (e) {
        alert('Ошибка отправки запроса');
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
              <div className={`${styles.ButtonContainer} prevent-navigation`}>
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
                <button className={styles.Trash} onClick={() => { fetchBookForDelete(product.id); }}></button>
                <DeleteBookWindow isOpen={deleteBookModalOpen} onClose={() => {setDeleteBookModalOpen(false); setDeleteBookData(null);}} obj={deleteBookData}/>
              </div>
            </>) 
            : role == 'Клиент' ?
            (<div>
              <div className="prevent-navigation">
                <button 
                  className={product.number_of_copies == "0" ? styles.basketButtonDisabled : styles.BasketButton} 
                  disabled={product.number_of_copies == "0" ? true : false}
                  onClick={product.number_of_copies == "0" ? undefined : () => addToCart(product.id)}>
                  {product.number_of_copies == "0" ? "Нет на складе" : "В корзину"}
                </button> 
              </div>
            </div>
            )
            :
            ( <>
                <div className="prevent-navigation">
                <button 
                  className={product.number_of_copies == "0" ? styles.basketButtonDisabled : styles.BasketButton} 
                  disabled={product.number_of_copies == "0" ? true : false} 
                  onClick={() => setWarningBasketModalOpen(true)}>
                    {product.number_of_copies == "0" ? "Нет на складе" : "В корзину"}
                  </button>
                <WarningBasket isOpen={warningBasketModalOpen} onClose={() => {setWarningBasketModalOpen(false);}}/>
                </div>
              </>
            )
          }
        </div>
      </div>
    );

}

export default CatalogBook;