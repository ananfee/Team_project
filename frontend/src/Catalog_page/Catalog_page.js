import React, {useState, useEffect} from 'react';
import Header from '../layout/Header.js';
import Search from './components/Search/Search.js';
import DropDownSort from './components/DropDownSort/DropDownSort.js';
import DropDownCategories from './components/DropDownCategories/DropDownCategories.js';
import Catalog from './components/Catalog/Catalog.js';
import Footer from "../components/footer/footer";
import NotificationModal from '../NotificationModal/NotificationModal'; 


function Catalog_page()
{
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
        fetch("http://backend:8001/catalog/books/"),
        fetch("http://backend:8001/catalog/categories/")
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
      let url = "http://backend:8001/catalog/books/sorted/";
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
      let url = `http://backend:8001/catalog/books/search/?q=${query}`;
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
      <Header onOpenModal={openModal} />
         {isModalOpen && (
        <NotificationModal onClose={closeModal} />
         )}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 42 ,marginTop: 42}}>
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
        </div>
        <Footer />
    </div>
  );

}

export default Catalog_page;