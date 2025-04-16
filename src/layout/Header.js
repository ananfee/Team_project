import React from "react";
import { Link } from "react-router-dom"; // Импортируем Link
import styles from "../layout/Header.module.css";
import NotificationButton from "./NotificationButton/NotificationButton.js";
import OrdersButton from "./OrdersButton/OrdersButton.jsx";

function Header({onOpenModal}) {
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
         <OrdersButton /> {/* Используем новый компонент */}
            <button className={styles.deliveryButton}>
               <img src="shopping-cart.svg" alt="корзина" />
            </button>
            <button className={styles.loginButton}>Войти</button>
         </div>
      </div>
   );
}

export default Header;
