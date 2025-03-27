import React, { useState } from "react";
import CatalogBook from "../CatalogBook/CatalogBook.js";
import styles from "./Catalog.module.css";

function Catalog({data}) // передачу дописать!!!!
{
   const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 18;

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = data.slice(indexOfFirstBook, indexOfLastBook);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, pageNumbers.length));
  };

  return (
   <div>
    <div className={styles.CatalogContainer}>
      {currentBooks.map(item => (
        <div key={item.id_book}>
            <CatalogBook product={item} />
        </div>
      ))}
    </div>
    <nav className={styles.paginationNav}>
      <button className={styles.ButtonNav} onClick={handlePrevious} disabled={currentPage === 1}>
         Назад
      </button>
      {pageNumbers.map(number => (
         <button
            key={number}
            onClick={() => handleClick(number)}
            className={`${styles.NumberPageButton} ${currentPage === number ? styles.active : ''}`}>
         {number}
         </button>
      ))}
      <button className={styles.ButtonNav} onClick={handleNext} disabled={currentPage === pageNumbers.length}>
         Вперед
      </button>
    </nav>
  </div>
  );
}

export default Catalog;