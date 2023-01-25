import React, {useEffect} from 'react';
import Index from "./router";
import Header from "./components/header";
import {fetchUser} from "./store/actions/fetchUser";
import {fetchProducts} from "./store/actions/fetchProducts";
import {fetchPosts} from "./store/actions/fetchPosts";
import {useAppDispatch} from "./hooks/redux";
import Notification from "./components/Notification";
import {showNotification__AUTH} from "./store/reducers/notificationSlice";
import {useNavigate} from "react-router-dom";
import {setCart} from "./store/reducers/cartSlice";
import {setFavourite} from "./store/reducers/authSlice";

const App = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      dispatch(showNotification__AUTH())
      nav('/signIn')
    } else {
      //я не знаю что с этим делать, по гайду все четко работает и не ругается, да и в доках так же описано
      // @ts-ignore
      dispatch(fetchUser());
      // @ts-ignore
      dispatch(fetchProducts());
      // @ts-ignore
      dispatch(fetchPosts());
      if (localStorage.getItem('cart')) {
        // @ts-ignore
        dispatch(setCart(JSON.parse(localStorage.getItem('cart'))))
      }
      if (localStorage.getItem('favs')) {
        // @ts-ignore
        dispatch(setFavourite(JSON.parse(localStorage.getItem('favs'))))
      }
    }
  }, [dispatch, nav]);
  return (
    <>
      <Header/>
      <Notification/>
      <Index/>
    </>
  );
};

export default App;
