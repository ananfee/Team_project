import { useState } from "react";
import styles from "./RelatedBooks.module.css";
import CatalogBook from "../../../Catalog_page/components/CatalogBook/CatalogBook";
import { useNavigate } from 'react-router-dom';

function RelatedBooks({ RelatedBooks }) {
  const navigate = useNavigate();
  const itemsPerPage = 6; 
  const [startIndex, setStartIndex] = useState(0); 

  const handleNext = () => {
    if (startIndex + itemsPerPage < RelatedBooks.length) {
      setStartIndex(startIndex + 1); 
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1); 
    }
  };

  const visibleBooks = RelatedBooks.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={styles.RelatedBooksContainer}>
      <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 28 }}>
        Похожие книги
      </p>
      {RelatedBooks.length === 0 ? (
        <p style={{marginTop: 30, fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 24, color: 'lightgray'}}>Не нашлось похожих книг</p>
      ) : (
        <>
          <button
            onClick={handlePrev}
            className={styles.PrevButton}
            disabled={startIndex === 0}
          >
          </button>
          <button
            onClick={handleNext}
            className={styles.NextButton}
            disabled={startIndex + itemsPerPage >= RelatedBooks.length}
          >
          </button>
          <div className={styles.SliderWrapper}>
            <div className={styles.ListRelatedBooks}>
              {visibleBooks.map(item => (
                <div key={item.id}
                  onDoubleClick={() => navigate(`/new/${item.id}`)}
                  style={{ cursor: 'pointer' }}>
                  <CatalogBook product={item} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default RelatedBooks;