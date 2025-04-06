import React, {useState, useEffect} from 'react';
import Header from '../layout/Header.js';
import Search from './components/Search/Search.js';
import DropDownSort from './components/DropDownSort/DropDownSort.js';
import DropDownCategories from './components/DropDownCategories/DropDownCategories.js';
import Catalog from './components/Catalog/Catalog.js';
import Footer from "../components/footer/footer";
import { useNavigate } from 'react-router-dom';
import NotificationModal from '../NotificationModal/NotificationModal'; 


function Catalog_page()
{
  const navigate = useNavigate();
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


  const goToNewPage = () => {
   navigate('/new');
 };

  async function loadData()
  {
    setLoading(true);
    try {
      const [response1, response2] = await Promise.all([
        fetch("http://127.0.0.1:8000/catalog/books"), //дописать!! (все книги)
        fetch("http://127.0.0.1:8000/catalog/categories/") // дописать !! (список категорий)
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

  async function editBooks(parameter)
  {
    setLoading(true);
    try{
      let url = `http://127.0.0.1:8000/catalog/books/sorted/?id_category=${parameter}`; 
      if (parameter == "asc" || parameter == "desc")
      {
        url = `http://127.0.0.1:8000/catalog/books/sorted/?ordering=${parameter === "asc" ? "price" : "-price"}` 
      }
      const response = await fetch(url);
      const data = await response.json();
      setBooks(data);
    } 
    catch (err) {
      setError("Ошибка загрузки данных");
    }
    finally
    {
      setLoading(false);
    }
  };

  async function editBooksSearch(query)
  {
    setLoading(true);
    try{
      let url = "http://127.0.0.1:8000/catalog/books/search";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      setBooks(data);
    } 
    catch (err) {
      setError("Ошибка загрузки данных");
    }
    finally
    {
      setLoading(false);
    }
  };
  
  useEffect (() => {
    loadData();
  }, []);

  const handleChange = (parameter) => {
    editBooks(parameter);
  };

  const handleSearchChange = (query) => {
    editBooksSearch(query);
  };

  if (loading)
  {
    return <p>"Загрузка ..."</p>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', alignItems: 'center' }}>
      <Header onOpenModal={openModal} />
         {isModalOpen && (
        <NotificationModal onClose={closeModal} />
         )}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 42 }}>
                <Search onSearchChange={handleSearchChange} />
                <DropDownSort onSortChange={handleChange} />
                <DropDownCategories allCategories={categories} onCategoriesChange={handleChange} />
            </div>
            {error ? (
                <p style={{ fontSize: 20, color: 'lightgray' }}>{error}</p>
            ) : (
                books.length > 0 ? 
                    (<Catalog data={books} />) : 
                    (<p style={{ fontSize: 20, color: 'lightgray' }}>Похоже, у нас такого нет</p>)
            )}
            <button onClick={goToNewPage}>Перейти на новую страницу</button>
        </div>
        <Footer />
    </div>
);

}

export default Catalog_page;