import React, {useState} from "react";
import styles from "../Search/Search.module.css";

function Search({onSearchChange})
{
   const [searchText, setSearchText] = useState('');

   const handleInputChange = (event) => {
      setSearchText(event.target.value);
   };

   const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSearch(searchText);
      }
   };
  
   const handleSearch = (query) => {
      onSearchChange(query);
   };

   return(
      <div className={styles.searchContainer}>
         <input type="text" maxlength="40" className={styles.searchInput} 
               placeholder="Поиск..." 
               value={searchText}
               onChange={handleInputChange}
               onKeyDown={handleKeyPress}/>
      </div>
   );
};

export default Search;