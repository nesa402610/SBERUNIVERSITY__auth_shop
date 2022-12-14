import React, {FC} from 'react';
import {useAppSelector} from "../hooks/redux";
import ProductCard from "../components /products/productCard";

const HomePage: FC = () => {
  const {products} = useAppSelector(state => state.products);

  return (
    <div className={'m-4'}>
      <div className={'grid grid-cols-5 gap-4'}>
        {products.map(item =>
          <ProductCard product={item}/>
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