import React, { useState } from "react";
import { Link } from "react-router-dom"; // Импортируем Link
import styles from "../layout/Header.module.css";
import NotificationButton from "./NotificationButton/NotificationButton.js";
import OrdersButton from "./OrdersButton/OrdersButton.jsx";
import LoginWindow from "./LoginWindow/LoginWindow.js";


function Header({onOpenModal}) {
   const [loginModalOpen, setLoginModalOpen] = useState(false);

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
         <NotificationButton onClick={onOpenModal} />
         <OrdersButton /> 
            <button className={styles.deliveryButton}>
               <img src="shopping-cart.svg" alt="корзина" />
            </button>
            <button className={styles.loginButton} onClick={() => setLoginModalOpen(true)} >Войти</button>
            <LoginWindow isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
         </div>
      </div>
   );
}

export default Header;
