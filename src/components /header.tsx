import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {setSearch} from "../store/reducers/productsSlice";
import {MdHome, MdLogin, MdShop, MdSource} from "react-icons/md";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {RiShoppingBag3Fill} from "react-icons/ri";

const Header = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const {user} = useAppSelector(state => state.auth);

  return (
    <header className={'flex min-h-[56px] gap-8 justify-between text-xl px-4 py-2 bg-neutral-800'}>
      <nav className="flex gap-4">
        <NavLink className={'hover:text-neutral-300 flex gap-1 items-center'} to={'/'}>
          <MdHome/>
          Главная
        </NavLink>
        <NavLink className={'hover:text-neutral-300 flex gap-1 items-center'} to={'/catalog'}>
          <MdShop/>
          Товары
        </NavLink>
        <NavLink className={'hover:text-neutral-300 flex gap-1 items-center'} to={'/posts'}>
          <MdSource/>
          Посты
        </NavLink>
      </nav>
      <div className={'flex flex-1 justify-center'}>
        <input className={'rounded-full bg-neutral-700 w-1/2 px-4'}
               type="text"
               placeholder={"Поиск..."}
               onKeyDown={e => e.key === 'Enter' ? nav('/catalog') : ''}
               onChange={e => dispatch(setSearch(e.target.value))}
        />
      </div>
      <div className={'flex gap-4 items-center'}>
        <NavLink to={'/cart'}><RiShoppingBag3Fill className={'text-3xl text-neutral-300 hover:text-neutral-100 transition-all hover:scale-110'}/></NavLink>
        {localStorage.getItem('token') ?
          <NavLink className={'hover:text-neutral-300'} to={'/profile'}>
            <div className={'w-[40px] hover:scale-110 transition-all rounded-full overflow-hidden bg'}>
              <img src={user.avatar} alt=""/>
            </div>
          </NavLink>
          :
          <NavLink className={'hover:text-neutral-300 flex items-center gap-1'} to={'/signIn'}>
            Войти
            <MdLogin className={'text-xl'}/>
          </NavLink>
        }
      </div>

    </header>
  );
};

export default Header;