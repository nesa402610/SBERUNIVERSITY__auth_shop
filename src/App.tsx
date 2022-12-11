import React, {useEffect} from 'react';
import Index from "./router";
import Header from "./components /header";
import {fetchUser} from "./store/actions/fetchUser";
import {fetchProducts} from "./store/actions/fetchProducts";
import {fetchPosts} from "./store/actions/fetchPosts";
import {useAppDispatch} from "./hooks/redux";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    //я не знаю что с этим делать, по гайду все четко работает и не рубгается
    // @ts-ignore
    dispatch(fetchUser());
    // @ts-ignore
    dispatch(fetchProducts());
    // @ts-ignore
    dispatch(fetchPosts());
  }, [dispatch]);
  return (
    <>
      <Header/>
      <Index/>
    </>
  );
};

export default App;