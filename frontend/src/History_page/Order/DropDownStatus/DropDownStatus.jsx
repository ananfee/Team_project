import React, { useState, useRef, useEffect } from "react";
import styles from "./DropDownStatus.module.css";
import st from '../../../images/strelochka.png';
import FetchWithAuth from '../../../layout/LoginWindow/FetchWithAuth.js';

// const DropDownStatus = ({ currentStatus, onStatusChange }) => {
//    const [isOpen, setIsOpen] = useState(false);
//    const container = useRef();

//    useEffect(() => {
//       document.addEventListener("mousedown", handleClickOutside);
//       return () => document.removeEventListener("mousedown", handleClickOutside);
//    }, []);

//    const handleToggle = () => setIsOpen(!isOpen);

//    const handleClickOutside = (e) => {
//       if (container.current && !container.current.contains(e.target)) {
//          setIsOpen(false);
//       }
//    };

//    const handleOptionClick = (status) => {
//       onStatusChange(status.id); // Передаём ID статуса вместо имени
//       setIsOpen(false);
//    };

//    const statusData = [
//        { id: 1, name_status: "Обрабатывается" },
//        { id: 2, name_status: "Передается в доставку" },
//        { id: 3, name_status: "В пути" },
//        { id: 4, name_status: "Доставлен" },
//        { id: 5, name_status: "Получен" }
//    ];

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

// const DropDownStatus = ({ currentStatus, onStatusChange, disabled }) => { // Добавлен disabled
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

//    const handleToggle = () => {
//        if (!disabled) { // Запрещаем открытие, если disabled
//            setIsOpen(!isOpen);
//        }
//    };

//    const handleClickOutside = (e) => {
//       if (container.current && !container.current.contains(e.target)) {
//          setIsOpen(false);
//       }
//    };

//    const handleOptionClick = (status) => {
//       onStatusChange(status.id); // Передаем ID статуса
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
//             disabled={disabled} // Применяем disabled к кнопке
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

const DropDownStatus = ({ currentStatus, onStatusChange, disabled }) => {
   const baseUrl = process.env.REACT_APP_API_URL;
   const [isOpen, setIsOpen] = useState(false);
   const [statusData, setStatusData] = useState([]); // Состояние для хранения данных статусов
   const container = useRef();

   useEffect(() => {
      const fetchStatusData = async () => {
         try {
            const response = await FetchWithAuth(`${baseUrl}catalog/status/`);
            if (!response.ok) {
                 const errorText = await response.text();
                 throw new Error(`Ошибка загрузки статусов: ${response.status} ${errorText}`);
            }
            const data = await response.json();
            setStatusData(data); // Устанавливаем полученные данные
         } catch (error) {
            console.error("Ошибка при получении статусов:", error);
            // Возможно, здесь стоит установить состояние ошибки для DropDownStatus,
            // чтобы пользователь видел, что статусы не загружены.
         }
      };

      fetchStatusData(); // Вызываем функцию для загрузки данных

      // Добавляем обработчик для закрытия при клике вне компонента
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, []); // Выполняем один раз при монтировании

   const handleToggle = () => {
       if (!disabled) { // Запрещаем открытие, если disabled
           setIsOpen(!isOpen);
       }
   };

   const handleClickOutside = (e) => {
      if (container.current && !container.current.contains(e.target)) {
         setIsOpen(false);
      }
   };

   const handleOptionClick = (status) => {
      // Только если новый статус отличается от текущего и не отключен
      if (status.id !== currentStatus && !disabled) {
          onStatusChange(status.id); // Передаем ID статуса родителю
      }
      setIsOpen(false); // Закрываем выпадающий список
   };

   // Находим текущее имя статуса на основе currentStatus (id)
   const currentStatusName = statusData.find(status => status.id === currentStatus)?.name_status || "Загрузка статуса..."; // Изменил текст по умолчанию

   return (
      <div className={styles.DropDownStatusContainer} ref={container}>
         <button
            type="button"
            className={`${styles.DropDownStatusButton} ${isOpen ? styles.Open : ""}`}
            onClick={handleToggle}
            disabled={disabled || statusData.length === 0} // Отключаем, если идёт обновление ИЛИ статусы ещё не загружены
         >
            {currentStatusName} {/* Отображаем текущее имя статуса */}
            <div className={styles.imageStrelochka}>
                <img src={st} alt="Стрелка" />
            </div>
         </button>
         {isOpen && statusData.length > 0 && ( // Показываем DropDown только если isOpen и статусы загружены
            <div className={styles.DropDown}>
               <ul>
                  {statusData.map((status) => (
                     <li 
                        key={status.id} 
                        onClick={() => handleOptionClick(status)}
                        className={status.id === currentStatus ? styles.ActiveStatus : ''} // Добавьте класс для активного статуса, если нужно
                     >
                        {status.name_status} {/* Отображаем имя статуса */}
                     </li>
                  ))}
               </ul>
            </div>
         )}
         {/* Если статусы не загружены и не открыто, можно показать сообщение */}
         {!isOpen && statusData.length === 0 && !disabled && <p style={{color: 'red', fontSize: '12px'}}>Не удалось загрузить статусы</p>}
      </div>
   );
};

export default DropDownStatus;

