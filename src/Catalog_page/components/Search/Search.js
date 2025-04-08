import React, { useState } from 'react';
import styles from '../Search/Search.module.css';

function Search({ onSearchChange }) {
  const [localSearchText, setLocalSearchText] = useState(''); // Локальное состояние для текста

  const handleInputChange = (event) => {
    setLocalSearchText(event.target.value); // Обновляем локальное состояние
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearchChange(localSearchText); // Отправляем текст на сервер только при нажатии Enter
    }
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        maxLength="40"
        className={styles.searchInput}
        placeholder="Поиск..."
        value={localSearchText} 
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
}

export default Search;