import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import styles from "../layout/Header.module.css";
import NotificationButton from "./NotificationButton/NotificationButton.js";
import OrdersButton from "./OrdersButton/OrdersButton.jsx";
import BasketButton from "./BasketButton/BasketButton.jsx";
import LoginWindow from "./LoginWindow/LoginWindow.js";
import FetchWithAuth from "./LoginWindow/FetchWithAuth.js";

function Header({onOpenModal}) {
   const baseUrl = process.env.REACT_APP_API_URL;
   const navigate = useNavigate();
   const [loginModalOpen, setLoginModalOpen] = useState(false);
   const [role, setRole] = useState("");
   const [isAuth, setIsAuth] = useState(!!localStorage.getItem('accessToken'));

   const [totalItems, setTotalItems] = useState(() => {
      const savedTotalItems = localStorage.getItem('totalItems');
      return savedTotalItems ? parseInt(savedTotalItems, 10) : 0;
   });

   useEffect(() => {
      const handleCartUpdate = () => {
         const updatedTotalItems = localStorage.getItem('totalItems');
         setTotalItems(updatedTotalItems ? parseInt(updatedTotalItems, 10) : 0);
      };

      window.addEventListener('cartUpdated', handleCartUpdate);

      return () => {
         window.removeEventListener('cartUpdated', handleCartUpdate);
      };
   }, []);


   useEffect(() => {
      setIsAuth(!!localStorage.getItem('accessToken'));
      setRole(localStorage.getItem('role'));
    }, []);

    const handleLogout = async () => {
      const refreshToken = localStorage.getItem('refreshToken');
      try {
         const response = await FetchWithAuth(`${baseUrl}catalog/logout/`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refresh: refreshToken })
         });
         if (!response.ok) throw new Error('Ошибка при выходе');
         localStorage.removeItem('accessToken');
         localStorage.removeItem('refreshToken');
         localStorage.removeItem('role');
         localStorage.removeItem('totalItems');
         window.dispatchEvent(new Event('cartUpdated'));
         setIsAuth(false); 
         setRole("");   
         navigate("/");
      } catch (error) {
      }
    };

   return (
      <div className={styles.headerContainer}>
         <div className={styles.content}>
            {/* Используем Link для создания ссылки на главную страницу */}
            <Link to="/" className={styles.logoContainer}>
               <p className={styles.logo} style={{ fontWeight: 900 }}>BOOK</p>
               <p className={styles.logo} style={{ fontSize: 20, marginLeft: 7, fontWeight: 500 }}>shop</p>
            </Link>
            <div>
               <nav className={styles.navigation}>
                  <Link to="/cp" className={styles.catalogNav}>Каталог</Link>
               </nav>
            </div>
         </div>
         <div className={styles.containerButtonHeader}>
               {
                  role === 'Сотрудник'
                  ? (
                     <>
                        <OrdersButton />
                        <button className={styles.Role}>Администратор</button>
                     </>
                  )
                  : role === 'Клиент'
                  ? (
                     <>
                        <NotificationButton onClick={onOpenModal} />
                        <OrdersButton />
                        <div className={styles.BasketButtonContainer}>
                        <BasketButton />
                        <p className={styles.TotalItems}>{totalItems}</p>
                        </div>
                        <button className={styles.Role}>Покупатель</button>
                     </>
                  )
                  : (
                     <>
                        
                     </>
                  )
               }
            {isAuth 
               ? <button className={styles.loginButton} onClick={handleLogout}>Выйти</button>
               : 
               <button className={styles.loginButton} onClick={() => setLoginModalOpen(true)}>Войти</button>
            }
            <LoginWindow isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
         </div>
      </div>
   );
}

export default Header;
