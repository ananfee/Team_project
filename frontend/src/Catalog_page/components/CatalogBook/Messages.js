import React, { useEffect } from 'react';
import styles from './MessageAlert.module.css'; // Подключаем стили

const MessageAlert = ({ message, onRemove }) => {
  // Удаляем уведомление через 5 секунд
  useEffect(() => {
    const timer = setTimeout(onRemove, 5000);
    return () => clearTimeout(timer);
  }, [onRemove]);

  return <div className={styles.messageAlert}>{message}</div>;
};

export const Messages = ({ alerts, removeAlert }) => (
  <div className={styles.messageAlertsContainer}>
    {alerts.map((alert, index) => (
      <MessageAlert
        key={index}
        message={alert}
        onRemove={() => removeAlert(index)}
      />
    ))}
  </div>
);

export default Messages;