import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {filterProducts} from "../store/reducers/productsSlice";

const Header = () => {
  const dispatch = useDispatch();
  const nav = useNavigate()

  return (
    <header className={'flex justify-between text-lg px-4 py-2 bg-neutral-800'}>
      <div className="flex gap-2">
        <NavLink className={'hover:text-neutral-300'} to={'/'}>Главная</NavLink>
        <NavLink className={'hover:text-neutral-300'} to={'/posts'}>Посты</NavLink>
      </div>
      <div className={'flex flex-1 justify-center'}>
        <input className={'bg-neutral-700 w-1/2 px-4 focus-visible:outline outline-1 outline-neutral-400'}
               type="text"
               placeholder={"Поиск..."}
               onKeyPress={e=> e.key === 'Enter' ? nav('/') : ''}
               onChange={e => dispatch(filterProducts(e.target.value))}
        />
      </div>
      {localStorage.getItem('token') ?
        <NavLink className={'hover:text-neutral-300'} to={'/profile'}>
          Профиль
        </NavLink>
        :
        <div>
          <NavLink className={'hover:text-neutral-300'} to={'/signUp'}>Регистрация</NavLink>
          <NavLink className={'hover:text-neutral-300'} to={'/signIn'}>Авторизация</NavLink>
        </div>
      }
    </header>
  );
};

export default Header;