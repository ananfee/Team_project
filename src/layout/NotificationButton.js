import React from "react";
import styles from "../layout/Header.module.css";

const NotificationButton = ({ onClick }) => {
    return (
        <button className={styles.deliveryButton} onClick={onClick}>
            <img src="messages-2.svg" alt="" />
        </button>
    );
};

export default NotificationButton;