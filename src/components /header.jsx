import React from 'react';
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {filterProducts} from "../store/reducers/productsSlice";

const Header = () => {
  const dispatch = useDispatch();

  const searchHandler = (e) => {
    dispatch(filterProducts(e.target.value));
  };

  return (
    <header className={'flex justify-between text-lg px-4 py-2 bg-neutral-800'}>
      <div>
        <NavLink to={'/'}>Главная</NavLink>
      </div>
      <div className={'flex flex-1 justify-center'}>
        <input className={'bg-neutral-700 w-1/2 px-4 focus-visible:outline outline-1 outline-neutral-400'}
               type="text"
               placeholder={"Поиск..."}
               onChange={e => searchHandler(e)}
        />
      </div>
      {localStorage.getItem('token') ?
        <NavLink to={'/profile'}>
          Профиль
        </NavLink>
        :
        <div>
          <NavLink to={'/signUp'}>Регистрация</NavLink>
          <NavLink to={'/signIn'}>Авторизация</NavLink>
        </div>
      }
    </header>
  );
};

export default Header;