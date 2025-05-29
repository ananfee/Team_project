import React, {useState, useRef, useEffect} from "react";
import styles from "./DropDownSort.module.css";

function DropDownSort({onSortChange, SelOr}) {
   const [isOpen, setIsOpen] = useState(false);
   const container = useRef();

   useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown",  handleClickOutside);
   }, []);

   const handleToggle = () => setIsOpen(!isOpen);

   const handleClickOutside = (e) => {
      if (container.current && !container.current.contains(e.target)) {
         setIsOpen(false);
      }
   };

   const handleOptionClick = (sortOrder) => {
      onSortChange(sortOrder);
   };

   return (
      <div className={styles.DropDownSortContainer} ref={container}>
         <button type="button" className={`${styles.DropDownSortButton} ${isOpen ? styles.Open : ""}`} onClick={handleToggle}>
            Сортировать по цене
         </button>
         {isOpen && (
            <div className={styles.DropDown}>
               <ul>
                  <li className={SelOr === 'price' ? styles.Selected : ""} onClick={() => handleOptionClick('price')}>
                     По возрастанию
                  </li>
                  <li className={SelOr === '-price' ? styles.Selected : ""} onClick={() => handleOptionClick('-price')}>
                     По убыванию
                  </li>
               </ul>
            </div>
         )}
      </div>
   );
}

export default DropDownSort;