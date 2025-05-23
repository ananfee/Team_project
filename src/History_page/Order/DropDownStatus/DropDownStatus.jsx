import React, { useState, useRef, useEffect } from "react";
import styles from "./DropDownStatus.module.css";
import st from '../../../images/strelochka.png';
import FetchWithAuth from '../../../layout/LoginWindow/FetchWithAuth.js';

const DropDownStatus = ({ currentStatus, onStatusChange }) => {
   const [isOpen, setIsOpen] = useState(false);
   const container = useRef();

   useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, []);

   const handleToggle = () => setIsOpen(!isOpen);

   const handleClickOutside = (e) => {
      if (container.current && !container.current.contains(e.target)) {
         setIsOpen(false);
      }
   };

   const handleOptionClick = (status) => {
      onStatusChange(status.id); // Передаём ID статуса вместо имени
      setIsOpen(false);
   };

   const statusData = [
       { id: 1, name_status: "Обрабатывается" },
       { id: 2, name_status: "Передается в доставку" },
       { id: 3, name_status: "В пути" },
       { id: 4, name_status: "Доставлен" },
       { id: 5, name_status: "Получен" }
   ];

   // Находим текущее имя статуса на основе currentStatus (id)
   const currentStatusName = statusData.find(status => status.id === currentStatus)?.name_status || "Неизвестный статус";

   return (
      <div className={styles.DropDownStatusContainer} ref={container}>
         <button 
            type="button" 
            className={`${styles.DropDownStatusButton} ${isOpen ? styles.Open : ""}`} 
            onClick={handleToggle}
         >
            {currentStatusName} {/* Отображаем текущее имя статуса */}
            <div className={styles.imageStrelochka}>
                <img src={st} alt="Стрелка" />
            </div>
         </button>
         {isOpen && (
            <div className={styles.DropDown}>
               <ul>
                  {statusData.map((status) => (
                     <li key={status.id} onClick={() => handleOptionClick(status)}>
                        {status.name_status} {/* Отображаем имя статуса */}
                     </li>
                  ))}
               </ul>
            </div>
         )}
      </div>
   );
};

export default DropDownStatus;



// const DropDownStatus = ({ currentStatus, onStatusChange }) => {
//    const [isOpen, setIsOpen] = useState(false);
//    const [statusData, setStatusData] = useState([]); // Состояние для хранения данных статусов
//    const container = useRef();

//    useEffect(() => {
//       const fetchStatusData = async () => {
//          try {
//             const response = await FetchWithAuth("http://127.0.0.1:8000/catalog/status/");
//             const data = await response.json();
//             setStatusData(data); // Устанавливаем полученные данные
//          } catch (error) {
//             console.error("Ошибка при получении статусов:", error);
//          }
//       };

//       fetchStatusData(); // Вызываем функцию для загрузки данных

//       document.addEventListener("mousedown", handleClickOutside);
//       return () => document.removeEventListener("mousedown", handleClickOutside);
//    }, []); // Выполняем один раз при монтировании

//    const handleToggle = () => setIsOpen(!isOpen);

//    const handleClickOutside = (e) => {
//       if (container.current && !container.current.contains(e.target)) {
//          setIsOpen(false);
//       }
//    };

//    const handleOptionClick = (status) => {
//       onStatusChange(status.id); // Передаем ID статуса вместо имени
//       setIsOpen(false);
//    };

//    // Находим текущее имя статуса на основе currentStatus (id)
//    const currentStatusName = statusData.find(status => status.id === currentStatus)?.name_status || "Неизвестный статус";

//    return (
//       <div className={styles.DropDownStatusContainer} ref={container}>
//          <button 
//             type="button" 
//             className={`${styles.DropDownStatusButton} ${isOpen ? styles.Open : ""}`} 
//             onClick={handleToggle}
//          >
//             {currentStatusName} {/* Отображаем текущее имя статуса */}
//             <div className={styles.imageStrelochka}>
//                 <img src={st} alt="Стрелка" />
//             </div>
//          </button>
//          {isOpen && (
//             <div className={styles.DropDown}>
//                <ul>
//                   {statusData.map((status) => (
//                      <li key={status.id} onClick={() => handleOptionClick(status)}>
//                         {status.name_status} {/* Отображаем имя статуса */}
//                      </li>
//                   ))}
//                </ul>
//             </div>
//          )}
//       </div>
//    );
// };

// export default DropDownStatus;