import React, {useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

const SignUp = () => {
  const [data, setData] = useState({
    email: '',
    group: '',
    password: ''
  });
  const [msg, setMsg] = useState(null);
  const signUpHandler = (e) => {
    e.preventDefault();
    axios.post('https://api.react-learning.ru/signup', data)
      .then(()=> setMsg({ok: 'Успешная регистрация'}))
      .catch(err => {
        setMsg({err: err.response.data.message});
      });
  };
  return (
    <div className={'h-screen'}>
      <div className={'flex justify-center h-full items-center'}>
        <form className={'flex flex-col bg-neutral-700 p-4 gap-2'}>
          <h1>Регистрация</h1>
          {msg?.ok && <h2>{msg.ok}</h2>}
          {msg?.err && <h2>{msg.err}</h2>}
          <label className={''}>
            email
            <input type="email"
                   name={'email'}
                   className={'w-full p-2 bg-stone-900'}
                   value={data.email}
                   onChange={e => setData({...data, email: e.target.value})}/>
          </label>
          <label className={''}>
            Группа
            <input type="text" name={'group'}
                   className={'w-full p-2 bg-stone-900'}
                   value={data.group}
                   onChange={e => setData({...data, group: e.target.value})}/>
          </label>
          <label className={''}>
            Пароль
            <input type="password"
                   name={'password'}
                   className={'w-full p-2 bg-stone-900'}
                   value={data.password}
                   onChange={e => setData({...data, password: e.target.value})}/>
          </label>
          {/*TODO*/}
          <div className={'flex justify-between text-sm'}>
            <span className={'cursor-pointer hover:text-neutral-300 transition-all'}>Забыли пароль?</span>
            <Link to={'/signIn'} className={'cursor-pointer hover:text-neutral-300 transition-all'}>Войти в аккаунт</Link>
          </div>
          <button className={'bg-neutral-900 p-2 mt-2 hover:bg-neutral-800 transition-all'}
                  onClick={e => signUpHandler(e)}>
            Регистрация
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;