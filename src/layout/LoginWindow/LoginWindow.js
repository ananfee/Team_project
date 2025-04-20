import React from 'react';
import styles from './LoginWindow.module.css';

function LoginWindow ({isOpen, onClose})
{
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeBtn}></button>
        <p className={styles.pEntrance}>Вход</p>
        <div style={{width: 300, height: 156, backgroundColor: 'blue'}}>

        </div>
      </div>
    </div>
  );
};

export default LoginWindow;