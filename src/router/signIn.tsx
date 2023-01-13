import React, {FC, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {api} from "../APIs/API";
import {useAppDispatch} from "../hooks/redux";
import {setToken} from "../store/reducers/authSlice";

interface IData {
  token?: any
  email: string
  password: string
}

const SignIn: FC = () => {
  const [data, setData] = useState<any>({
    email: '',
    password: ''
  });
  const [fieldError, setFieldError] = useState({email: '', password: ''});
  const [msg, setMsg] = useState<any>(null);
  const dispatch = useAppDispatch()

  const signInHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (fieldError.email || fieldError.password) {
      return
    }
    axios.post<IData>('https://api.react-learning.ru/signin', data)
      .then(r => {
        localStorage.setItem('token', r.data.token)
        document.location.replace('/')
        dispatch(setToken(r.data.token))
      })
      .catch(err => {
        setMsg({err: err.response.data.message});
      });
  };

  const resetPasswordHandler = () => {
    api.resetPassword({email: data.email})
      .then((r) => {
        setMsg({ok: r.data.message})

      })
      .catch(err => setMsg({err: err.response.data.message}))
  };

  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'email':
        if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) && value.length > 0) {
          setFieldError({...fieldError, email: 'Проверьте правильность заполнения'})
        } else {
          setFieldError({...fieldError, email: ''})
        }
        break
      case 'password':
        value.length < 6 && value.length > 0 ? setFieldError({
          ...fieldError,
          password: 'Пароль слишком короткий'
        }) : setFieldError({...fieldError, password: ''})
        break
    }
  }

  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name
    const value = e.target.value
    setData({...data, [name]: value})
    validateField(name, value)

  }

  return (
    <div className={'h-screen'}>
      <div className={'flex justify-center h-full items-center'}>
        <form className={'flex flex-col bg-neutral-700 p-4 gap-2 rounded-lg w-[350px]'}>
          <h1 className={'text-center text-xl'}>Авторизация</h1>
          {msg?.ok && <h2>{msg.ok}</h2>}
          {msg?.err && <h2>{msg.err}</h2>}
          <label className={''}>
            Email
            <input type="email"
                   name={'email'}
                   className={'w-full p-2 bg-stone-900'}
                   value={data.email}
                   onChange={e => inputHandler(e)}/>
            {fieldError.email && <span className={'text-red-500 text-sm'}>{fieldError.email}</span>}
          </label>
          <label className={''}>
            Пароль
            <input type="password"
                   name={'password'}
                   className={'w-full p-2 bg-stone-900'}
                   value={data.password}
                   onChange={e => inputHandler(e)}/>
            {fieldError.password && <span className={'text-red-500 text-sm'}>{fieldError.password}</span>}
          </label>
          <div className={'flex justify-between text-sm'}>
            <Link to={'/reset-password'} onClick={() => resetPasswordHandler()}
                  className={'cursor-pointer hover:text-neutral-300 transition-all'}>
              Забыли пароль?
            </Link>
            <Link to={'/signUp'} className={'cursor-pointer hover:text-neutral-300 transition-all'}>
              Создать аккаунт
            </Link>
          </div>
          <button className={(fieldError.email && fieldError.password ? 'cursor-default bg-neutral-800 text-neutral-300' : 'hover:bg-neutral-800 bg-neutral-900') + ' p-2 mt-2 transition-all'}
                  onClick={e => signInHandler(e)}>
            Авторизация
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;