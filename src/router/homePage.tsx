import React, {FC} from 'react';
import {useAppSelector} from "../hooks/redux";
import ProductCard from "../components/products/productCard";
import Loader from "../components/UI/Loader";


const HomePage: FC = () => {
  const {products, isLoading} = useAppSelector(state => state.products);
  if (isLoading) return <Loader/>
  return (
    <div className={'m-4'}>
      <div className={'grid sm:grid-cols-3 md:grid-cols-5 sm:grid-cols-1 gap-4'}>
        {products.map(item =>
          <ProductCard key={item._id} product={item}/>
        )}
      </div>
      {/*Сообщение, мол нужна авторизация*/}
      {!localStorage.getItem('token')
        && <h2 className={'text-center text-2xl font-bold'}>Требуется авторизация</h2>
      }
    </div>
  );
};

export default HomePage;