import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Импортируем Link
import styles from "../layout/Header.module.css";
import NotificationButton from "./NotificationButton/NotificationButton.js";
import OrdersButton from "./OrdersButton/OrdersButton.jsx";
import LoginWindow from "./LoginWindow/LoginWindow.js";
import FetchWithAuth from "./LoginWindow/FetchWithAuth.js";


function Header({onOpenModal}) {
   const [loginModalOpen, setLoginModalOpen] = useState(false);
   const role = "Сотрудник"
   // const [role, setRole] = useState("");
   // const [isAuth, setIsAuth] = useState(!!localStorage.getItem('accessToken'));

   // useEffect(() => {
   //    setIsAuth(!!localStorage.getItem('accessToken'));
   //    setRole(localStorage.getItem('role'));
   //  }, []);

   //  const handleLogout = async () => {
   //    const refreshToken = localStorage.getItem('refreshToken');
   //    try {
   //       const response = await FetchWithAuth('http://127.0.0.1:8000/catalog/logout/', {
   //          method: 'POST',
   //          headers: {
   //             'Content-Type': 'application/json'
   //          },
   //          body: JSON.stringify({ refresh: refreshToken })
   //       });
   //       if (!response.ok) throw new Error('Ошибка при выходе');
   //       localStorage.removeItem('accessToken');
   //       localStorage.removeItem('refreshToken');
   //       localStorage.removeItem('role');
   //       setIsAuth(false); 
   //       setRole("");   
   //       window.location.reload(); 
   //    } catch (error) {
   //    }
   //  };

   return (
      <div className={styles.headerContainer}>
         <div className={styles.content}>
            <div className={styles.logoContainer}>
               <p className={styles.logo} style={{fontWeight: 900}}>BOOK</p>
               <p className={styles.logo} style={{fontSize: 20, marginLeft: 7, fontWeight: 500}}>house</p>
            </div>
            <div>
               <nav className={styles.navigation}>
                  <Link to="/" className={styles.mainNav}>Главная</Link>
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
                        <button className={styles.deliveryButton}>
                        <img src="shopping-cart.svg" alt="корзина" />
                        </button>
                        <button className={styles.Role}>Покупатель</button>
                     </>
                  )
                  : (
                     <>
                        <NotificationButton onClick={onOpenModal} />
                        <OrdersButton />
                        <button className={styles.deliveryButton}>
                        <img src="shopping-cart.svg" alt="корзина" />
                        </button>
                     </>
                  )
               }
            {/* {isAuth 
               ? <button className={styles.loginButton} onClick={handleLogout}>Выйти</button>
               :  */}
               <button className={styles.loginButton} onClick={() => setLoginModalOpen(true)}>Войти</button>
            {/* } */}
            <LoginWindow isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
         </div>
      </div>
   );
}

export default Header;
