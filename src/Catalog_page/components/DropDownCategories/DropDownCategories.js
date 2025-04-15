import React, {useState, useRef, useEffect} from "react";
import styles from "./DropDownCategories.module.css";

function DropDownCategories({allCategories, onCategoriesChange, SelCat}) {
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

   const handleOptionClick = (id) => {
      onCategoriesChange(id);
   };

   return (
      <div className={styles.DropDownCategoriesContainer} ref={container}>
         <button type="button" className={`${styles.DropDownCategoriesButton} ${isOpen ? styles.Open : ""}`} onClick={handleToggle}>
            Категории
         </button>
         {isOpen && (
            <div className={styles.DropDown}>
               <ul>
                  {allCategories.map(item => (
                     <li key={item.id} 
                         className={SelCat === item.id ? styles.Selected : ""} 
                         onClick={() => handleOptionClick(item.id)}>
                           {item.category_name}
                     </li>
                  ))}
               </ul>
            </div>
         )}
      </div>
   );
}

export default DropDownCategories;