import React, {useState, useRef, useEffect} from "react";
import styles from './AddBookWindow.module.css';
import AutocompleteInput from "./AutocompleteInput";
import FetchWithAuth from "../../../layout/LoginWindow/FetchWithAuth";

function AddBookWindow({isOpen, onClose, obj})
{
   const baseUrl = process.env.REACT_APP_API_URL;
   //для хранения значений полей для ввода
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
   //для хранения данных с сервера
   const [last_name, setLast_name] = useState([]);
   const [first_names, setFirst_names] = useState([]);
   const [patronymics, setPatronymics] = useState([]);
   const [discount, setDiscount] = useState([]);
   const [genre, setGenre] = useState([]);
   //для ошибок в полях при отправлении формы
   const [error, setError] = useState({title: "", count: "", genre: "", publisher: "",year: "",isbn: "",price: "", description: "", img: "", common: "", authors: ""});
   // для выпадающих списков
   const [isOpenDropDown, setIsOpenDropDown] = useState(false);
   const [isOpenDropDownDiscount, setIsOpenDropDownDiscount] = useState(false);
   const container = useRef();
   const container1 = useRef();
   //для картинки
   const inputRef = useRef();
   const [imgFile, setImgFile] = useState(null); //правки

   // Загрузка авторов, категорий и скидок
   const fetchDropdownData = async () => {
      // Авторы
      try {
        const response = await FetchWithAuth('http://127.0.0.1:8000/catalog/authors/');
        const authors = await response.json();
        setLast_name(authors.last_names || []);
        setFirst_names(authors.first_names || []);
        setPatronymics(authors.patronymics || []);
      } catch (error) {
        console.error('Ошибка при получении авторов', error);
      }
  
      // Скидки
      try {
        const response = await FetchWithAuth(`${baseUrl}catalog/discounts/`);
        const discounts = await response.json();
        setDiscount(discounts || []);
      } catch (error) {
        console.error('Ошибка при получении скидок', error);
      }
  
      // Категории
      try {
        const response = await FetchWithAuth(`${baseUrl}catalog/categories/`);
         const categories = await response.json();
        setGenre(categories || []);
      } catch (error) {
        console.error('Ошибка при получении категорий', error);
      }
    };


    const handleAddBook = async(e) => {
      e.preventDefault();
      let newErrors = {
         title: "", count: "", genre: "", publisher: "",year: "",isbn: "",price: "", 
         description: "", img: "", common: "", authors: ""
      };
      let hasError = false;
    
      if (!title) {
        newErrors.title = "Введите название книги";
        hasError = true;
      }
    
      if (count === '') {
         newErrors.count = "Введите количество экземпляров";
         hasError = true;
      } else if (
         isNaN(Number(count)) ||
         count.toString().trim() === '' ||
         !Number.isInteger(Number(count)) ||
         Number(count) < 0
      ) {
         newErrors.count = "Введите корректное неотрицательное целое число";
         hasError = true;
      }

      authors.forEach((author) => {
         if (!author.author_first_name || !author.author_last_name) {
            newErrors.authors = "Имя и фамилия обязательны для каждого автора";
            hasError = true;
         } else if (
            !/^[a-zA-Zа-яА-Я\s]+$/.test(author.author_first_name) ||
            !/^[a-zA-Zа-яА-Я\s]+$/.test(author.author_last_name) ||
            (author.author_patronymic && !/^[a-zA-Zа-яА-Я\s]+$/.test(author.author_patronymic))
         ) {
            newErrors.authors = "Имя, фамилия и отчество должны содержать только буквы";
            hasError = true;
         }
      });

      if (!selectedGenre) {
         newErrors.genre = "Выберите жанр книги";
         hasError = true;
      }

      if (!publisher) {
         newErrors.publisher = "Введите издательство книги";
         hasError = true;
      }
      
      if (!year) {
         newErrors.year = "Введите год издания";
         hasError = true;
      } else if (
         isNaN(Number(year)) ||
         year.toString().trim() === '' ||
         !Number.isInteger(Number(year)) ||
         Number(year) < 1457 ||
         Number(year) > currentYear
      ) {
         newErrors.year = "Введите корректный год в промежутке от 1457 до " + currentYear;
         hasError = true;
      }
      
      if (!isbn) {
         newErrors.isbn = "Введите ISBN";
         hasError = true;
      } else if (!/^97[89]-[\d]+-[\d]+-[\d]+-[\d]+$/.test(isbn)) {
         newErrors.isbn = "ISBN должен начинаться с 978- или с 979-, а также содержать ровно 4 дефиса";
         hasError = true;
      } 
      
       if (!price) {
         newErrors.price = "Введите цену книги";
         hasError = true;
      } else if (
         isNaN(Number(price)) ||
         price.toString().trim() === '' ||
         Number(price) < 0
      ) {
         newErrors.price = "Введите корректное неотрицательное число";
         hasError = true;
      }

      if (hasError) {
        setError(newErrors);
        return;
      }

       // Формируем FormData
      const formData = new FormData();

      // Добавляем обычные поля
      formData.append('title', title);
      formData.append('category', selectedGenre.id);
      formData.append('publishing', publisher);
      formData.append('publishing_year', year);
      formData.append('ISBN', isbn);
      formData.append('price', Number(price));
      formData.append('discount', selectedDiscount ? selectedDiscount.id : null);
      formData.append('number_of_copies', Number(count));
      formData.append('description', description);
      formData.append('authors_data_json', JSON.stringify(authors));
      formData.append('cover_image', imgFile);
      
       const isEdit = !!obj; 
  
       const url = isEdit
         ? `${baseUrl}catalog/books/update/${obj.id}/`
         : `${baseUrl}catalog/books/create/`;
       const method = isEdit ? 'PUT' : 'POST';
     
       try {
         const response = await FetchWithAuth(url, {
           method: method,
           body: formData,
         });
     
          if (!response.ok) {
            const errorData = await response.json();
            if (errorData.ISBN) {   
                 newErrors.isbn = "Книга с таким ISBN уже существует";
            }
            
            setError(newErrors);
            return;
         }
         onClose();
         window.location.reload();
       } catch {
         setError({
           title: "",
           count: "",
           genre: "",
           publisher: "",
           year: "",
           isbn: "",
           price: "",
           description: "",
           img: "",
           common: isEdit ? "Ошибка при редактировании книги" : "Ошибка при добавлении книги",
           authors: ""
         });
       }
    };
  
   
    useEffect(() => {
      if (isOpen) {
        fetchDropdownData();
      }
    }, [isOpen]);

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
           setImgFile(null);
           setError({title: "", count: "", genre: "", publisher: "",year: "",isbn: "",price: "", description: "", img: "", common: ""});
           return;
         }
         if (obj) {
            setTitle(obj.title || '');
            setCount(
               obj.number_of_copies !== undefined && obj.number_of_copies !== null
                     ? obj.number_of_copies.toString()
                     : ''
            );
            setAuthors(
               obj.authors && Array.isArray(obj.authors) && obj.authors.length
                  ? obj.authors.map(a => ({
                     author_last_name: a.author_last_name || '',
                     author_first_name: a.author_first_name || '',
                     author_patronymic: a.author_patronymic || ''
                     }))
                  : [{
                     author_last_name: '',
                     author_first_name: '',
                     author_patronymic: ''
                  }]
               );
            const foundGenre = genre.find(item => item.category_name === obj.category_name);
            setSelectedGenre(foundGenre || null);
            setPublisher(obj.publishing || '');
            setYear(obj.publishing_year || '');
            setISBN(obj.ISBN || '');
            setPrice(obj.price || '');
            const foundDiscount = obj.discount
            ? discount.find(item => item.id === obj.discount.id)
            : null;
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
           setImgFile(null);
         }
       }, [isOpen, obj, genre, discount]);
   
       const handleDeletePhoto = () => {
         setImg('');
         setImgFile(null);
       };
     
       const handleDownloadPhoto = (e) => {
         const file = e.target.files && e.target.files[0];
         if (file) {
            setImgFile(file);  //правки
            const reader = new FileReader();
            reader.onload = (ev) => setImg(ev.target.result);
            reader.readAsDataURL(file); 
         }
       };
      
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
            <button onClick={() => {onClose(); 
               setError({title: "", count: "", genre: "", publisher: "",year: "",isbn: "",price: "", description: "", img: "", common: "", authors: ""});
               setSelectedGenre(null); setSelectedDiscount(null);}} className={styles.closeBtn}></button>
            <div className={styles.ContentContainer}>
               <div className={styles.FhotoContainer}>
               <div className={styles.Fhoto}>
                  {img ? (
                     <img style={{ height: 370, width: 236 }} src={img} alt="Фото" />
                  ) : (
                     "ФОТО"
                  )}
               </div>

               <button
                  className={styles.DeleteFhotoButton}
                  type="button"
                  disabled={!img}
                  onClick={handleDeletePhoto}
                  style={
                     img
                        ? { backgroundColor: "#5D3C64", color: "white" }
                        : { opacity: 0.5}
                  }>Удалить фото</button>

               <button
                  className={styles.DownloadFhotoButton}
                  type="button"
                  disabled={!!img}
                  onClick={() => !img && inputRef.current.click()}
                  style={
                     !img
                        ? { backgroundColor: "#5D3C64", color: "white" }
                        : { backgroundColor: "#efeeee", color: "#424245", opacity: 0.5}
                  }
               >Загрузить фото</button>

               <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleDownloadPhoto}/>
               </div>
               <form onSubmit={handleAddBook}>
               <div className={styles.Button}>
               <div className={styles.InputContainer}>
               <div className={styles.InputContainerInner}>
                  <p>Название</p>
                  <input value={title} onChange={e => {setTitle(e.target.value); setError(prev => ({ ...prev, title: ""}));}} 
                  style={error.title ? { border: '1px solid #e13939' } : {}}/>
                  {error.title && <div className={styles.Error}>{error.title}</div>}
                  <p>Количество экземпляров</p>
                  <input value={count} onChange={e => {setCount(e.target.value); setError(prev => ({ ...prev, count: ""}));}} 
                  style={error.count ? { border: '1px solid #e13939' } : {}}/>
                  {error.count && <div className={styles.Error}>{error.count}</div>}
                  {authors.map((author, idx) => (
                     <div key={idx} style={{ marginBottom: 14, borderBottom: "1px solid rgb(190, 189, 189)", width: 298 }}>
                        <div className={styles.Author}>
                           <p>Автор {idx + 1}</p>
                           {authors.length > 1 && (
                           <button type="button" className={styles.DeleteAuthorButton}
                              onClick={() => setAuthors(prev => prev.filter((_, i) => i !== idx))}>
                           </button>
                           )}
                        </div>
                        <AutocompleteInput
                           value={author.author_last_name}
                           onChange={val =>
                           {setAuthors(prev =>
                              prev.map((a, i) =>
                                 i === idx ? { ...a, author_last_name: val } : a
                              )
                           ); setError(prev => ({ ...prev, authors: ""})); }
                           }
                           suggestions={last_name}
                           placeholder="Фамилия"
                        />
                        <AutocompleteInput
                           value={author.author_first_name}
                           onChange={val =>
                           {setAuthors(prev =>
                              prev.map((a, i) =>
                                 i === idx ? { ...a, author_first_name: val } : a
                              )
                           ); setError(prev => ({ ...prev, authors: ""}));}
                           }
                           suggestions={first_names}
                           placeholder="Имя"
                        />
                        <AutocompleteInput
                           value={author.author_patronymic}
                           onChange={val =>
                           {setAuthors(prev =>
                              prev.map((a, i) =>
                                 i === idx ? { ...a, author_patronymic: val } : a
                              )
                           ); setError(prev => ({ ...prev, authors: ""}));}
                           }
                           suggestions={patronymics}
                           placeholder="Отчество"
                        />
                     </div>
                     ))}
                     {error.authors && <div className={styles.Error}>{error.authors}</div>}
                     <div style={{ display: "flex", width: 310, justifyContent: "center" }}>
                     <button
                        type="button"
                        className={styles.AddAuthorButton}
                        onClick={() =>
                           setAuthors(prev => [...prev, { author_last_name: '', author_first_name: '', author_patronymic: '' }])
                        }
                     ></button>
                     </div>
                  <p>Жанр</p>
                  <div className={styles.DropDownSortContainer} ref={container}>
                  <button
                     type="button"
                     className={`${styles.DropDownSortButton} ${isOpenDropDown ? styles.Open : ""}`}
                     onClick={handleToggle}
                     style={{
                        color: selectedGenre ? "#000" : "#9b9b9b",
                        border: error.genre ? '1px solid #e13939' : undefined
                     }}
                     onChange={e => {
                        setError(prev => ({ ...prev, genre: ""}));
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
                  {error.genre && <div className={styles.Error}>{error.genre}</div>}
                  <p>Издательство</p>
                  <input value={publisher} onChange={e => {setPublisher(e.target.value); setError(prev => ({ ...prev, publisher: ""}));}}
                  style={error.publisher ? { border: '1px solid #e13939' } : {}}/>
                  {error.publisher && <div className={styles.Error}>{error.publisher}</div>}
                  <p>Год издания</p>
                  <input value={year} onChange={e => {setYear(e.target.value); setError(prev => ({ ...prev, year: ""}));}} 
                  style={error.year ? { border: '1px solid #e13939' } : {}}/>
                  {error.year && <div className={styles.Error}>{error.year}</div>}
                  <p>ISBN</p>
                  <input value={isbn} onChange={e => {setISBN(e.target.value); setError(prev => ({ ...prev, isbn: ""}));}} 
                  style={error.isbn ? { border: '1px solid #e13939' } : {}}/>
                  {error.isbn && <div className={styles.Error}>{error.isbn}</div>}
                  <p>Цена</p>
                  <input value={price} onChange={e => {setPrice(e.target.value); setError(prev => ({ ...prev, price: ""}));}} 
                  style={error.price ? { border: '1px solid #e13939' } : {}}/>
                  {error.price && <div className={styles.Error}>{error.price}</div>}
                  <p>Скидка</p>
                  <div className={styles.DropDownSortContainer} ref={container1}>
                     <button
                        type="button"
                        className={`${styles.DropDownSortButton} ${isOpenDropDownDiscount ? styles.Open : ""}`}
                        onClick={handleToggleDiscount}
                        style={{
                           color: selectedDiscount ? "#000" : "#9b9b9b",
                        }}>
                        {selectedDiscount ? selectedDiscount.discount_percentage : "Выберите скидку"}
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
                                 {item.discount_percentage}
                              </li>
                           ))}
                           </ul>
                        </div>
                     )}
                  </div>
                  <p>Описание</p>
                  <textarea value={description} rows={5} onChange={e => {setDescription(e.target.value); setError(prev => ({ ...prev, description: ""}));}}
                  style={error.description ? { border: '1px solid #e13939' } : {}} />
                  {error.description && <div className={styles.Error}>{error.description}</div>}
               </div>
               </div>
            <button className={styles.ButtonD} type="submit">{obj ? 'Изменить' : 'Добавить'}</button>
            </div>
            </form>
            </div>
         </div>
      </div>
   );
}

export default AddBookWindow;