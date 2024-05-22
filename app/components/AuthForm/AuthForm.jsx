"use client";
import { useEffect, useState } from 'react';
import { authorize, isResponseOk } from '@/app/api/api-utils';
import { endpoints } from '@/app/api/config';
import { useStore } from '@/app/store/app-store';
import Styles from './AuthForm.module.css';


export const AuthForm = (props) => {
  const [authData, setAuthData] = useState({email: "", password: ""});
  const [message, setMessage] = useState({status: null, text: null});

  const authContext = useStore();

  useEffect(() => {
    let timer;
    if(authContext.user) {
      timer = setTimeout(() => {
        props.close();
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [authContext.user])

  const handleInput = (e) => {
    setAuthData({...authData, [e.target.name]: e.target.value});
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    const userData = await authorize(endpoints.auth, authData);

    if(isResponseOk(userData)) {
      authContext.login({id: userData._id, username: userData.username, email: userData.email}, userData.jwt);
      setMessage({status: "success", text: "Вы авторизовались!"});
    } else {
      setMessage({status: "error", text: "Неверные почта или пароль"});
    }
  }

  return (
    <form className={Styles['form']} onSubmit={handleSubmit}>
      <h2 className={Styles['form__title']}>Авторизация</h2>
      <div className={Styles['form__fields']}>
        <label className={Styles['form__field']}>
          <span className={Styles['form__field-title']}>Email</span>
          <input className={Styles['form__field-input']} name="email" type="email" placeholder="hello@world.com" onInput={handleInput}/>
        </label>
        <label className={Styles['form__field']}>
          <span className={Styles['form__field-title']}>Пароль</span>
          <input className={Styles['form__field-input']} name="password" type="password" placeholder='***********' onInput={handleInput}/>
        </label>
      </div>
      {message.status && (
        <p className={Styles['form__message']}>{message.text}</p>
      )}
      <div className={Styles['form__actions']}>
        <button className={Styles['form__reset']} type="reset">Очистить</button>
        <button className={Styles['form__submit']} type="submit">Войти</button>
      </div>
    </form>
  ) 
};
