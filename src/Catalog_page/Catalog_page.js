import React, {useState, useEffect} from 'react';
import Header from '../layout/Header.js';
import Search from './components/Search/Search.js';
import DropDownSort from './components/DropDownSort/DropDownSort.js';
import DropDownCategories from './components/DropDownCategories/DropDownCategories.js';
import Catalog from './components/Catalog/Catalog.js';





import { useNavigate } from 'react-router-dom';

function Catalog_page()
{
   const navigate = useNavigate();


const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);



  const goToNewPage = () => {
   navigate('/new');
 };

  async function loadData()
  {
    setLoading(true);
    try {
      const [response1, response2] = await Promise.all([
        fetch("catalog/books"), //дописать!! (все книги)
        fetch("catalog/categories/") // дописать !! (список категорий)
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
      let url = `catalog/books/sorted/?category=${parameter}`; // дописать!!!!
      if (parameter == "asc" || parameter == "desc")
      {
        url = `catalog/books/sorted/?ordering=${parameter === "asc" ? "price" : "-price"}` // дописать!!!!
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
      let url = "catalog/books/search";
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

  return(
   <div style={{height: '100%'}}>
            <Header />
            <div style={{display:'flex', alignItems: 'center', marginBottom: 42}}>
              <Search onSearchChange={handleSearchChange}/>
              <DropDownSort onSortChange={handleChange} />
              <DropDownCategories allCategories={categories} onCategoriesChange={handleChange} />
            </div>
            {error ? (<p style={{fontSize: 20, color: 'lightgray'}}>{error}</p>):  (
            books.length > 0 ? 
              (<Catalog data={books} />) : 
              (<p style={{fontSize: 20, color: 'lightgray'}}>Похоже, у нас такого нет</p>))}
            <button onClick={goToNewPage}>Перейти на новую страницу</button>
          </div>
  );

}

export default Catalog_page;