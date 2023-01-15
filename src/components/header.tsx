import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {setSearch} from "../store/reducers/productsSlice";
import {MdHome, MdLogin, MdShop, MdSource} from "react-icons/md";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {RiShoppingBag3Fill} from "react-icons/ri";
import {useDebounce} from "../hooks/useDebounce";

const Header = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const {user} = useAppSelector(state => state.auth);
  const {cart} = useAppSelector(state => state.cart)
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce(searchValue, 500)

  useEffect(() => {
    dispatch(setSearch(debouncedValue))
  }, [debouncedValue, dispatch, searchValue]);

  return (
    <header className={'flex min-h-[56px] xs:gap-4 md:gap-8 justify-between text-xl px-4 py-2 bg-neutral-800'}>
      <nav className="flex xs:gap-2 xs:text-2xl md:gap-4">
        <NavLink className={'hover:text-neutral-300 flex gap-1 items-center'} to={'/'}>
          <MdHome/>
          <span className={'xs:hidden sm:block'}>Главная</span>
        </NavLink>
        <NavLink className={'hover:text-neutral-300 flex gap-1 items-center'} to={'/catalog'}>
          <MdShop/>
          <span className={'xs:hidden sm:block'}>Товары</span>
        </NavLink>
        <NavLink className={'hover:text-neutral-300 flex gap-1 items-center'} to={'/posts'}>
          <MdSource/>
          <span className={'xs:hidden sm:block'}>Посты</span>
        </NavLink>
      </nav>
      <div className={'flex flex-1 md:justify-center'}>
        <input className={'rounded-full xs:w-full bg-neutral-700 w-1/2 px-4'}
               type="text"
               placeholder={"Поиск..."}
               onKeyDown={e => e.key === 'Enter' ? nav('/catalog') : ''}
               onChange={e => setSearchValue(e.target.value)}
        />
      </div>
      <div className={'flex gap-4 items-center'}>
        <NavLink to={'/cart'} className={'relative'}>
          <RiShoppingBag3Fill className={'text-3xl text-neutral-300 hover:text-neutral-100 transition-all hover:scale-110'}/>
          {cart.length !== 0  && <div className={'absolute flex items-center justify-center text-[14px] text-neutral-100 top-0 right-0 w-4 h-4 bg-rose-800 rounded-full'}>
            <span>{cart.length}</span>
          </div>}
        </NavLink>
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