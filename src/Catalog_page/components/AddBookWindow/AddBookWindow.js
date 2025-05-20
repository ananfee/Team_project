import React, {useState, useRef, useEffect} from "react";
import styles from './AddBookWindow.module.css';

const genre = [
   {
       "id": 1,
       "category_name": "Детектив"
   },
   {
       "id": 2,
       "category_name": "Фантастика"
   },
   {
       "id": 3,
       "category_name": "Приключения"
   },
   {
      "id": 4,
      "category_name": "Роман"
   }];

const discount = [
      {
        "id": 1,
        "discount_value": "10%"
      },
      {
        "id": 2,
        "discount_value": "20%"
      },
      {
        "id": 3,
        "discount_value": "30%"
      }
    ];

function AddBookWindow({isOpen, onClose, obj})
{
   const [title, setTitle] = useState('');
   const [count, setCount] = useState('');
   const [authors, setAuthors] = useState([
      { author_last_name: '', author_first_name: '', author_patronymic: '' }
   ]);
   const [selectedGenre, setSelectedGenre] = useState(null);
   const [publisher, setPublisher] = useState('');
   const [year, setYear] = useState('');
   const [isbn, setISBN] = useState('');
   const [price, setPrice] = useState('');
   const [selectedDiscount, setSelectedDiscount] = useState(null);
   const [description, setDescription] = useState('');
   const [img, setImg] = useState('');
   const [isOpenDropDown, setIsOpenDropDown] = useState(false);
   const [isOpenDropDownDiscount, setIsOpenDropDownDiscount] = useState(false);
   const container = useRef();
   const container1 = useRef();

      useEffect(() => {
         if (!isOpen) {
            setTitle('');
           setCount('');
           setAuthors([
               { author_last_name: '', author_first_name: '', author_patronymic: '' }
            ]);
           setSelectedGenre(null);
           setPublisher('');
           setYear('');
           setISBN('');
           setPrice('');
           setSelectedDiscount(null);
           setDescription('');
           setImg('');
           return;
         }
         if (obj) {
            setTitle(obj.title || '');
            setCount(obj.number_of_copies || '');
            setAuthors(
               obj.authors && Array.isArray(obj.authors) && obj.authors.length
                  ? obj.authors
                  : [{
                     author_last_name: '',
                     author_first_name: '',
                     author_patronymic: ''
                  }]
               );
            const foundGenre = genre.find(item => item.category_name === obj.genre);
            setSelectedGenre(foundGenre || null);
            setPublisher(obj.publishing || '');
            setYear(obj.publishing_year || '');
            setISBN(obj.ISBN || '');
            setPrice(obj.price || '');
            const foundDiscount = discount.find(item => item.discount_value === obj.discount);
            setSelectedDiscount(foundDiscount || null);
            setDescription(obj.description || '');
            setImg(obj.cover_image || '');
           
         } else {
           setTitle('');
           setCount('');
           setAuthors([
               { author_last_name: '', author_first_name: '', author_patronymic: '' }
            ]);
           setSelectedGenre(null);
           setPublisher('');
           setYear('');
           setISBN('');
           setPrice('');
           setSelectedDiscount(null);
           setDescription('');
           setImg('');
         }
       }, [isOpen, obj, genre, discount]);

   useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown",  handleClickOutside);
   }, []);

   useEffect(() => {
      document.addEventListener("mousedown", handleClickOutsideDiscount);
      return () => document.removeEventListener("mousedown", handleClickOutsideDiscount);
   }, []);
   
   const handleToggle = () => {setIsOpenDropDown(!isOpenDropDown)};
   const handleToggleDiscount = () => {setIsOpenDropDownDiscount(!isOpenDropDownDiscount)};
   
   const handleClickOutside = (e) => {
      if (container.current && !container.current.contains(e.target)) {
         setIsOpenDropDown(false);
      }
   };
   const handleClickOutsideDiscount = (e) => {
      if (container1.current && !container1.current.contains(e.target)) {
         setIsOpenDropDownDiscount(false);
      }
   };

   if (!isOpen) return null;

   return (
      <div className={styles.overlay}>
        <div className={styles.modal}>
        <p className={styles.nameWindow}>{obj ? 'Редактирование книги' : 'Добавление книги'}</p>
            <button onClick={() => {onClose(); setSelectedGenre(null); setSelectedDiscount(null);}} className={styles.closeBtn}></button>
            <div className={styles.ContentContainer}>
               <div className={styles.FhotoContainer}>
                  <div className={styles.Fhoto}>{obj ? <img style={{height: 370, width: 236}} src={img}/> : 'FHOTO'}</div>
                  <button className={styles.DeleteFhotoButton} style={obj ? {backgroundColor: "#5D3C64", color: "white"} : {}}>Удалить фото</button>
                  <button className={styles.DownloadFhotoButton} style={obj ? {backgroundColor: "#efeeee", color: "#424245"} : {}}>Загрузить фото</button>
               </div>
               <div className={styles.Button}>
               <div className={styles.InputContainer}>
               <div className={styles.InputContainerInner}>
                  <p>Название</p>
                  <input value={title} onChange={e => setTitle(e.target.value)} />
                  <p>Количество экземпляров</p>
                  <input value={count} onChange={e => setCount(e.target.value)} />
                  {authors.map((author, idx) => (
                     <div key={idx}>
                        <p>Автор {idx + 1}</p>
                        <input
                           value={
                           author.author_last_name + ' ' +
                           author.author_first_name + ' ' +
                           author.author_patronymic
                           }
                           style={{ marginBottom: 10 }}
                           onChange={e => {
                           const parts = e.target.value.split(' ');
                           setAuthors(prev =>
                              prev.map((a, i) =>
                                 i === idx
                                 ? {
                                       author_last_name: parts[0] || '',
                                       author_first_name: parts[1] || '',
                                       author_patronymic: parts[2] || '',
                                    }
                                 : a
                              )
                           );
                           }}
                        />
                     </div>
                  ))}
                  <div style={{display: "flex", width: 310 , justifyContent: "center"}}>
                     <button className={styles.AddAuthorButton} 
                        onClick={() => setAuthors(prev => [...prev, {author_last_name: '', author_first_name: '', author_patronymic: '' }])}></button>
                  </div>
                  <p>Жанр</p>
                  <div className={styles.DropDownSortContainer} ref={container}>
                  <button
                     type="button"
                     className={`${styles.DropDownSortButton} ${isOpenDropDown ? styles.Open : ""}`}
                     onClick={handleToggle}
                     style={{
                        color: selectedGenre ? "#000" : "#9b9b9b"
                     }}>
                     {selectedGenre ? selectedGenre.category_name : "Выберите жанр"}
                  </button>
                  {isOpenDropDown && (
                     <div className={styles.DropDown}>
                        <ul>
                        {genre.map((item) => (
                           <li
                              key={item.id}
                              className={selectedGenre && selectedGenre.id === item.id ? styles.Selected : ""}
                              onClick={() => {
                                 setSelectedGenre(item);
                                 setIsOpenDropDown(false);
                              }}>
                              {item.category_name}
                           </li>
                        ))}
                        </ul>
                     </div>
                  )}
                  </div>
                  <p>Издательство</p>
                  <input value={publisher} onChange={e => setPublisher(e.target.value)} />
                  <p>Год издания</p>
                  <input value={year} onChange={e => setYear(e.target.value)} />
                  <p>ISBN</p>
                  <input value={isbn} onChange={e => setISBN(e.target.value)} />
                  <p>Цена</p>
                  <input value={price} onChange={e => setPrice(e.target.value)} />
                  <p>Скидка</p>
                  <div className={styles.DropDownSortContainer} ref={container1}>
                     <button
                        type="button"
                        className={`${styles.DropDownSortButton} ${isOpenDropDownDiscount ? styles.Open : ""}`}
                        onClick={handleToggleDiscount}
                        style={{
                           color: selectedDiscount ? "#000" : "#9b9b9b"
                        }}>
                        {selectedDiscount ? selectedDiscount.discount_value : "Выберите скидку"}
                     </button>
                     {isOpenDropDownDiscount && (
                        <div className={styles.DropDown}>
                           <ul>
                           {discount.map((item) => (
                              <li
                                 key={item.id}
                                 className={selectedDiscount && selectedDiscount.id === item.id ? styles.Selected : ""}
                                 onClick={() => {
                                 setSelectedDiscount(item);
                                 setIsOpenDropDownDiscount(false);
                                 }}>
                                 {item.discount_value}
                              </li>
                           ))}
                           </ul>
                        </div>
                     )}
                  </div>
                  <p>Описание</p>
                  <textarea value={description} rows={5} onChange={e => setDescription(e.target.value)} />
               </div>
               </div>
            <button className={styles.ButtonD}>{obj ? 'Изменить' : 'Добавить'}</button>
            </div>
            </div>
         </div>
      </div>
   );
}

export default AddBookWindow;