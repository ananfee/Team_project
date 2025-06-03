import React, {useState, useEffect} from 'react';
import Header from '../layout/Header.js';
import Search from './components/Search/Search.js';
import DropDownSort from './components/DropDownSort/DropDownSort.js';
import DropDownCategories from './components/DropDownCategories/DropDownCategories.js';
import Catalog from './components/Catalog/Catalog.js';
import Footer from "../components/footer/footer";
import NotificationModal from '../NotificationModal/NotificationModal';
import styles from './Catalog_page.module.css';
import AddBookWindow from './components/AddBookWindow/AddBookWindow.js'

// const books = [
//    {
//       id_book: 1,
//       cover_image: "Book1.svg",
//       price: '321',
//       title: 'Wayward son',
//       authors: [
//                 {
//                     "author_last_name": "Шолохов",
//                     "author_first_name": "Михаил",
//                     "author_patronymic": "Александрович"
//                 }
//             ],
//       discounted_price: '300',
//       number_of_copies: '0'
//    },
//    {
//       id_book: 2,
//       cover_image: "Book2.svg",
//       price: '456',
//       title: 'Cinder',
//       authors: [
//                 {
//                     "author_last_name": "Шолохов",
//                     "author_first_name": "Михаил",
//                     "author_patronymic": "Александрович"
//                 }
//             ],
//       discounted_price: null,
//       number_of_copies: '3'
//    },
//    {
//       id_book: 3,
//       cover_image: "Book3.svg",
//       price: '257',
//       title: 'Supernova',
//       authors: [
//                 {
//                     "author_last_name": "Шолохов",
//                     "author_first_name": "Михаил",
//                     "author_patronymic": "Александрович"
//                 }
//             ],
//       discounted_price: null,
//       number_of_copies: '3'
//    },
//    {
//       id_book: 4,
//       cover_image: "Book4.svg",
//       price: '127',
//       title: 'The sunbearer trialssssssssss',
//       authors: [
//                 {
//                     "author_last_name": "Шолохов",
//                     "author_first_name": "Михаил",
//                     "author_patronymic": "Александрович"
//                 }
//             ],
//       discounted_price: null,
//       number_of_copies: '3'
//    },
//    {
//       id_book: 5,
//       cover_image: "Book5.svg",
//       price: '478',
//       title: 'Legend born',
//       authors: [
//                 {
//                     "author_last_name": "Шолохов",
//                     "author_first_name": "Михаил",
//                     "author_patronymic": "Александрович"
//                 }
//             ],
//       discounted_price: null,
//       number_of_copies: '3'
//    },
//    {
//       id_book: 6,
//       cover_image: "Book6.svg",
//       price: '562',
//       title: 'Deadly',
//       authors: [
//                 {
//                     "author_last_name": "Шолохов",
//                     "author_first_name": "Михаил",
//                     "author_patronymic": "Александрович"
//                 }
//             ],
//       discounted_price: '500',
//       number_of_copies: '3'
//    },
//    {
//       id_book: 7,
//       cover_image: "Book1.svg",
//       price: '321',
//       title: 'Wayward son',
//       authors: [
//                 {
//                     "author_last_name": "Кинг",
//                     "author_first_name": "Стивен",
//                     "author_patronymic": null
//                 }
//             ],
//       discounted_price: null,
//       number_of_copies: '3'
//    },
//    {
//       id_book: 8,
//       cover_image: "Book2.svg",
//       price: '456',
//       title: 'Cinder',
//       authors: [
//                 {
//                     "author_last_name": "Кинг",
//                     "author_first_name": "Стивен",
//                     "author_patronymic": null
//                 }
//             ],
//       discounted_price: null,
//       number_of_copies: '3'
//    },
//    {
//       id_book: 9,
//       cover_image: "Book3.svg",
//       price: '257',
//       title: 'Supernova',
//       authors: [
//                 {
//                     "author_last_name": "Шолохов",
//                     "author_first_name": "Михаил",
//                     "author_patronymic": "Александрович"
//                 }
//             ],
//       discounted_price: null,
//       number_of_copies: '3'
//    },
//    {
//       id_book: 10,
//       cover_image: "Book4.svg",
//       price: '127',
//       title: 'The sunbearer trials',
//       authors: [
//                 {
//                     "author_last_name": "Кинг",
//                     "author_first_name": "Стивен",
//                     "author_patronymic": null
//                 }
//             ],
//       discounted_price: null,
//       number_of_copies: '3'
//    },
//    {
//       id_book: 11,
//       cover_image: "Book5.svg",
//       price: '478',
//       title: 'Legend born',
//       authors: [
//                 {
//                     "author_last_name": "Кинг",
//                     "author_first_name": "Стивен",
//                     "author_patronymic": null
//                 }
//             ],
//       discounted_price: null,
//       number_of_copies: '3'
//    },
//    {
//       id_book: 12,
//       cover_image: "Book6.svg",
//       price: '562',
//       title: 'Deadly',
//       authors: [
//                 {
//                     "author_last_name": "Кинг",
//                     "author_first_name": "Стивен",
//                     "author_patronymic": null
//                 }
//             ],
//       discounted_price: null,
//       number_of_copies: '3'
//    },
//    {
//       id_book: 13,
//       cover_image: "Book1.svg",
//       price: '321',
//       title: 'Wayward son',
//       authors: [
//                 {
//                     "author_last_name": "Кинг",
//                     "author_first_name": "Стивен",
//                     "author_patronymic": null
//                 }
//             ],
//       discounted_price: null,
//       number_of_copies: '3'
//    }
// ];

function Catalog_page()
{
  const [addBookModalOpen, setAddBookModalOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [filters, setFilters] = useState({ category: null, ordering: null });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedOrdering, setselectedOrdering] = useState(null);

  async function loadData()
  {
    setLoading(true);
    try {
      const [response1, response2] = await Promise.all([
        fetch("http://5.129.207.153:8001/catalog/books/"),
        fetch("http://5.129.207.153:8001/catalog/categories/")
      ]);

      const [data1, data2] = await Promise.all([
        response1.json(),
        response2.json()
      ]);

      setBooks(data1);
      setCategories(data2);
    }
    catch (err) {
      setError("Ошибка загрузки данных");
    }
    finally
    {
      setLoading(false);
    }
  };

  async function editBooks(filterOptions) {
    setLoading(true);
    try {
      let url = "http://5.129.207.153:8001/catalog/books/sorted/";
      const params = new URLSearchParams();
  
      if (filterOptions.category) {
        params.append("category", filterOptions.category);
      }
  
      if (filterOptions.ordering) {
        params.append("ordering", filterOptions.ordering);
      }
  
      url += `?${params.toString()}`;
      const response = await fetch(url);
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      setError("Ошибка загрузки данных");
    } finally {
      setLoading(false);
    }
  }

  async function editBooksSearch(query)
  {
    try{
      let url = `http://5.129.207.153:8001/catalog/books/search/?q=${query}`;
      const response = await fetch(url);
      const data = await response.json();
      setBooks(data);
    } 
    catch (err) {
      setError("Ошибка загрузки данных");
    }
  };
  
  useEffect (() => {
    loadData();
  }, []);

  const handleSearchChange = (query) => {
    editBooksSearch(query);
    setselectedOrdering(null);
    setSelectedCategory(null);
  };

  const handleSortChange = (sortOrder) => {
    setselectedOrdering(sortOrder);
    setFilters((prev) => ({
      ...prev,
      ordering: sortOrder,
    }));
  };
  
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setFilters((prev) => ({
      ...prev,
      category: categoryId,
    }));
  };

  useEffect(() => {
    editBooks(filters);
  }, [filters]);

  const [role, setRole] = useState("");
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('accessToken'));
  
  useEffect(() => {
    setIsAuth(!!localStorage.getItem('accessToken'));
    setRole(localStorage.getItem('role'));
  }, []);

  if (loading)
  {
    return <p>"Загрузка ..."</p>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', alignItems: 'center' }}>
      <Header 
      onOpenModal={openModal} 
      />
        {isModalOpen && (
        <NotificationModal onClose={closeModal} />
          )} 
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 42, marginTop: 42 }}>
                <Search 
                onSearchChange={handleSearchChange} 
                />
                <DropDownSort 
                onSortChange={handleSortChange} SelOr={selectedOrdering} 
                />
                {role == 'Сотрудник' ? (<>
                      <button className={styles.AddBook} onClick={() => setAddBookModalOpen(true)}>Добавить книгу</button> 
                      <AddBookWindow isOpen={addBookModalOpen} onClose={() => setAddBookModalOpen(false)} />
                    </>):
                    <DropDownCategories 
                    allCategories={categories} onCategoriesChange={handleCategoryChange} SelCat={selectedCategory}
                    />
                }
            </div>
            {error ? (
                <p style={{ fontSize: 20, color: 'lightgray' }}>{error}</p>
            ) : (
                 books.length > 0 ?  
                    (
                      <Catalog data={books}/>
                     ) : 
                    (<p style={{ fontSize: 20, color: 'lightgray' }}>Похоже, у нас такого нет</p>) 
            )} 
        </div>
        <Footer />
    </div>
  );

}

export default Catalog_page;