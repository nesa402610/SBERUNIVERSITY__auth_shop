import React from 'react';
import {NavLink} from "react-router-dom";

const Header = () => {
  return (
    <header className={'flex justify-between text-lg px-4 py-2 bg-neutral-800'}>
      <div>
      <NavLink to={'/'}>Главная</NavLink>
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