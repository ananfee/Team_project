import React, {useState, useEffect} from 'react';
import Header from '../layout/Header.js';
import Search from './components/Search/Search.js';
import DropDownSort from './components/DropDownSort/DropDownSort.js';
import DropDownCategories from './components/DropDownCategories/DropDownCategories.js';
import Catalog from './components/Catalog/Catalog.js';
import Footer from "../components/footer/footer";
import { useNavigate } from 'react-router-dom';

function Catalog_page()
{
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ category: null, ordering: null });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedOrdering, setselectedOrdering] = useState(null);

  const goToNewPage = () => {
   navigate('/new');
 };

  async function loadData()
  {
    setLoading(true);
    try {
      const [response1, response2] = await Promise.all([
        fetch("http://127.0.0.1:8000/catalog/books/"), //дописать!! (все книги)
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

  async function editBooks(filterOptions) {
    setLoading(true);
    try {
      let url = "http://127.0.0.1:8000/catalog/books/sorted/";
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
      let url = `http://127.0.0.1:8000/catalog/books/search/?q=${query}`;
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

  if (loading)
  {
    return <p>"Загрузка ..."</p>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', alignItems: 'center' }}>
        <Header />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 42 }}>
                <Search onSearchChange={handleSearchChange} />
                <DropDownSort onSortChange={handleSortChange} SelOr={selectedOrdering} />
                <DropDownCategories allCategories={categories} onCategoriesChange={handleCategoryChange} SelCat={selectedCategory}/>
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