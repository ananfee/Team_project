import React, {useState, useRef, useEffect} from "react";
import styles from './LoginWindow.module.css';

function LoginWindow ({isOpen, onClose})
{
  const [isRegistering, setIsRegistering] = useState(false);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Выберите роль');
  const container = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState({email: "", password: "", repeatPassword: "", name: "", phone: "", role: "", companyCode: "", common: ""});
  
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

  const handleLogin = async (e) => {
    e.preventDefault();
    let valid = true;
    let errors = {
      email: "",
      password: "",
      repeatPassword: "",
      name: "",
      phone: "",
      role: "",
      companyCode: "",
      common: ""
    };
    if (!email) {
      errors.email = "Заполните поле";
      valid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      errors.email = "Введите корректный e-mail";
      valid = false;
    }
    if (!password) {
      errors.password = "Заполните поле";
      valid = false;
    }

    if (password && (password.length < 8 || !/[a-zA-Z]/.test(password))) {
      errors.password = "Пароль должен быть не менее 8 символов и содержать хотя бы одну букву";
      valid = false;
    }

    setError(errors);
    if (valid) {
      try {
        const response = await fetch('http://127.0.0.1:8000/catalog/token/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password})
        });
        if (!response.ok) throw new Error('Ошибка авторизации');
        const data = await response.json();
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('role', data.role);
        localStorage.setItem('refreshToken', data.refresh);
        window.location.reload(); 
        onClose();
      } catch {
        setError({ email: "", password: "", common: "Неверный email или пароль" });
      }
    }
  };

  const handleRegistering = async(e) => {
    e.preventDefault();
    let newErrors = {
      email: "",
      password: "",
      repeatPassword: "",
      name: "",
      phone: "",
      role: "",
      companyCode: "",
      common: ""
    };
    let hasError = false;
  
    if (selectedRole == 'Выберите роль') {
      newErrors.role = "Выберите роль";
      hasError = true;
    }
  
    if (!name) {
      newErrors.name = "Заполните поле";
      hasError = true;
    }
    
    if (!phone) {
      newErrors.phone = "Заполните поле";
      hasError = true;
    } else if (!/^(\+7|8)\d{10}$/.test(phone)) {
      newErrors.phone = "некорректный номер телефона";
      hasError = true;
    }
    
    if (!email) {
      newErrors.email = "Заполните поле";
      hasError = true;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Введите корректный e-mail";
      hasError = true;
    }
  
    if (!password) {
      newErrors.password = "Заполните поле";
      hasError = true;
    }

    if (password && (password.length < 8 || !/[a-zA-Z]/.test(password))) {
        newErrors.password = "Пароль должен быть не менее 8 символов и содержать хотя бы одну букву";
        hasError = true;
    }

    if (!repeatPassword) {
      newErrors.repeatPassword = "Повторите пароль";
      hasError = true;
    }

    if (password !== repeatPassword) {
      newErrors.repeatPassword = "Пароли не совпадают";
      hasError = true;
    }
  
    if (selectedRole === "Администратор") {
      if (companyCode !== "BookHouse284792750") {
        newErrors.companyCode = "Неверный код компании";
        hasError = true;
      }
    }
  
    if (hasError) {
      setError(newErrors);
      return;
    }
    
    try {
      const response = await fetch('http://127.0.0.1:8000/catalog/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
        email: email,
        username: name,
        phone_number: phone,
        password: password,
        password2: repeatPassword,
        role: selectedRole == "Администратор" ? "Сотрудник" : "Клиент"})
      });
      const data = await response.json();
      if (!response.ok) {
        if (data.email) {
          newErrors.email = "Пользователь с такой почтой уже существует";
        }
        if (data.phone_number) {
          newErrors.phone = "Пользователь с таким телефоном уже существует";
        }
        if (data.password){
          newErrors.password = "Данный пароль слишком простой";
        }

        setError(newErrors);
        return;
      }
      
      setIsRegistering(false);
    } catch {
        setError({
        ...newErrors,
        common: "Ошибка сервера. Попробуйте еще раз."
      });
    }
  };

  useEffect(() => {
      setEmail('');
      setPassword('');
      setRepeatPassword('');
      setName('');
      setPhone('');
      setCompanyCode('');
      setError({email: "", password: "", repeatPassword: "", name: "", phone: "", role: "", companyCode: "", common: ""})
  }, [isRegistering]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        
        <button onClick={() => {onClose(); 
          setIsRegistering(false); 
          setSelectedRole('Выберите роль'); 
          setError({email: "", password: "", repeatPassword: "", name: "", phone: "", role: "", companyCode: "", common: ""});
          setEmail('');
          setPassword('');
          setRepeatPassword('');
          setName('');
          setPhone('');
          setCompanyCode('');}} 
          className={styles.closeBtn}
          ></button>
        {isRegistering && (
          <button onClick={() => setIsRegistering(false)} className={styles.backBtn}></button>
        )}
        <p className={styles.pEntrance}>
          {isRegistering ? "Регистрация" : "Вход"}
        </p>
        <form onSubmit={isRegistering ? handleRegistering : handleLogin}>
          <div className={styles.InputContainer}>
          <div className={styles.InputContainerInner}>
            
            {isRegistering && (
                <>
                  <p>Роль</p>
                  <div className={styles.DropDownSortContainer} ref={container}>
                    <button type="button" className={`${styles.DropDownSortButton} ${isOpenDropDown ? styles.Open : ""}`} onClick={handleToggle}
                    style={{
                      border: error.role ? '1px solid #e13939' : undefined,
                      color: selectedRole === "Покупатель" || selectedRole === "Администратор" ? "#000" : "#9b9b9b"
                    }}
                    value={selectedRole}
                    onChange={e => {
                      setError(prev => ({ ...prev, role: ""}));
                    }}>
                      {selectedRole}
                    </button>
                    {isOpenDropDown && (
                        <div className={styles.DropDown}>
                          <ul>
                              <li className={selectedRole === 'Покупатель' ? styles.Selected : ""} onClick={() => {setSelectedRole('Покупатель'); setIsOpenDropDown(false)}}>
                                Покупатель
                              </li>
                              <li className={selectedRole === 'Администратор' ? styles.Selected : ""} onClick={() => {setSelectedRole('Администратор'); setIsOpenDropDown(false)}}>
                                Администратор
                              </li>
                          </ul>
                        </div>
                    )}
                  </div>
                  {error.role && <div className={styles.Error}>{error.role}</div>}
                  {selectedRole == 'Администратор' ? (
                    <>
                    <p>Код компании</p>
                    <input
                      value={companyCode}
                      onChange={e => {
                        setCompanyCode(e.target.value);
                        setError(prev => ({ ...prev, companyCode: ""}));
                      }}
                      style={error.companyCode ? { border: '1px solid #e13939' } : {}}
                    />
                    </>
                  ): ''}
                  {error.companyCode && <div className={styles.Error}>{error.companyCode}</div>}
                  <p>Имя</p>
                  <input 
                    value={name}
                    onChange={e => {
                      setName(e.target.value);
                      setError(prev => ({ ...prev, name: ""}));
                    }}
                    style={error.name ? { border: '1px solid #e13939' } : {}}
                  />
                  {error.name && <div className={styles.Error}>{error.name}</div>}
                  <p>Номер телефона</p>
                  <input 
                    value={phone}
                    onChange={e => {
                      setPhone(e.target.value);
                      setError(prev => ({ ...prev, phone: ""}));
                    }}
                    style={error.phone ? { border: '1px solid #e13939' } : {}}
                   />
                  {error.phone && <div className={styles.Error}>{error.phone}</div>}
                </>
            )}
              <p>E-mail</p>
              <input 
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  setError(prev => ({ ...prev, email: "", common: ""}));
                }}
                style={error.email ? { border: '1px solid #e13939' } : {}}
              />
              {error.email && 
                <div className={styles.Error}>
                  {error.email}
                </div>
              }
              <p>Пароль</p>
              <input 
                type="password"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  setError(prev => ({ ...prev, password: "", common: ""}));
                }}
                style={error.password ? { border: '1px solid #e13939' } : {}}
              />
              {error.password && (
                <div className={styles.Error}>
                  {error.password}
                </div>
              )}
              {error.common && (
                <div className={styles.Error}>
                  {error.common}
                </div>
              )}
            {isRegistering && (
                <>
                  <p>Повторите пароль</p>
                  <input 
                    type="password"
                    value={repeatPassword}
                    onChange={e => {
                      setRepeatPassword(e.target.value);
                      setError(prev => ({ ...prev, repeatPassword: ""}));
                    }}
                    style={error.repeatPassword ? { border: '1px solid #e13939' } : {}}
                  />
                </>
            )}
            {error.repeatPassword && <div className={styles.Error}>{error.repeatPassword}</div>}
            {isRegistering && error.common ? (
              <div className={styles.Error}>{error.common}</div>
            ) : (
              <></>
            )}
          </div>
          </div>
            
            <button className={styles.ButtonLogin} type="submit">
              {isRegistering ? "Зарегистрироваться" : "Вход"}
            </button>
        </form>
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