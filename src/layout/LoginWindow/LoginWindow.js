import React, {useState, useRef, useEffect} from "react";
import styles from './LoginWindow.module.css';

function LoginWindow ({isOpen, onClose})
{
  const [isRegistering, setIsRegistering] = useState(false);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Выберите роль');
  const container = useRef();
  
  useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown",  handleClickOutside);
  }, []);
  
  const handleToggle = () => setIsOpenDropDown(!isOpenDropDown);
  
  const handleClickOutside = (e) => {
    if (container.current && !container.current.contains(e.target)) {
      setIsOpenDropDown(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={() => {onClose(); setIsRegistering(false); setSelectedRole('Выберите роль');}} className={styles.closeBtn}></button>
        {isRegistering && (
          <button onClick={() => setIsRegistering(false)} className={styles.backBtn}></button>
        )}
        <p className={styles.pEntrance}>
          {isRegistering ? "Регистрация" : "Вход"}
        </p>
        <div className={styles.InputContainer}>
        <div className={styles.InputContainerInner}>
          {isRegistering && (
              <>
                <p>Роль</p>
                <div className={styles.DropDownSortContainer} ref={container}>
                  <button type="button" className={`${styles.DropDownSortButton} ${isOpenDropDown ? styles.Open : ""}`} onClick={handleToggle}
                  style={{
                    color: selectedRole === "Покупатель" || selectedRole === "Администратор" ? "#000" : "#9b9b9b"
                  }}>
                    {selectedRole}
                  </button>
                  {isOpenDropDown && (
                      <div className={styles.DropDown}>
                        <ul>
                            <li className={selectedRole === 'Покупатель' ? styles.Selected : ""} onClick={() => setSelectedRole('Покупатель')}>
                              Покупатель
                            </li>
                            <li className={selectedRole === 'Администратор' ? styles.Selected : ""} onClick={() => setSelectedRole('Администратор')}>
                              Администратор
                            </li>
                        </ul>
                      </div>
                  )}
                </div>
                {selectedRole == 'Администратор' ? (
                  <>
                  <p>Код компании</p>
                  <input />
                  </>
                ): ''}
                <p>Имя</p>
                <input />
                <p>Номер телефона</p>
                <input />
              </>
          )}
            <p>E-mail</p>
            <input />
            <p>Пароль</p>
            <input />
          {isRegistering && (
              <>
                <p>Повторите пароль</p>
                <input />
              </>
          )}
        </div>
        </div>
        <button className={styles.ButtonLogin}>
          {isRegistering ? "Зарегистрироваться" : "Вход"}
        </button>
        {!isRegistering && (
          <div className={styles.pRegistration}>
            <p>Нет аккаунта?</p>
            <a onClick={() => setIsRegistering(true)}>
              Зарегистрируйся
            </a>
          </div>
        )}
      </div>
      </div>
  );
};

export default LoginWindow;