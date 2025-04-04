import React from "react";
import { Link } from "react-router-dom"; // Импортируем Link
import styles from "../layout/Header.module.css";

function Header() {
   return (
      <div className={styles.headerContainer}>
         <div className={styles.content}>
            <div className={styles.logoContainer}>
               <p className={styles.logo} style={{fontWeight: 900}}>BOOK</p>
               <p className={styles.logo} style={{fontSize: 20, marginLeft: 7, fontWeight: 500}}>house</p>
            </div>
            <div>
               <nav className={styles.navigation}>
                  <Link to="/" className={styles.mainNav}>Главная</Link> {/* Замена на Link */}
                  <Link to="/cp" className={styles.catalogNav}>Каталог</Link> {/* Используем Link для каталога */}
               </nav>
            </div>
         </div>
         <div className={styles.containerButtonHeader}>
            <button className={styles.deliveryButton}>
               <img src="messages-2.svg" alt="уведомления" />
            </button>
            <button className={styles.deliveryButton}>
               <img src="group.svg" alt="доставка" />
            </button>
            <button className={styles.deliveryButton}>
               <img src="shopping-cart.svg" alt="корзина" />
            </button>
            <button className={styles.loginButton}>Войти</button>
         </div>
      </div>
   );
}

export default Header;
