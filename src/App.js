import React, {useEffect} from 'react';
import Index from "./router";
import './APIs/auth';
import Header from "./components /header";
import {fetchUser} from "./store/actions/fetchUser";
import {useDispatch} from "react-redux";
import {fetchProducts} from "./store/actions/fetchProducts";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchProducts());
  }, []);
  return (
    <>
      <Header/>
      <Index/>
    </>
  );
};

export default App;