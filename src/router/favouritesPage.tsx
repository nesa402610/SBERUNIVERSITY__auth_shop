import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../hooks/redux";
import {api} from "../APIs/API";
import {IProduct} from "../types";
import ProductCard from "../components/products/productCard";

const FavouritesPage = () => {
  const {favProducts} = useAppSelector(state => state.auth)
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    for (const favProduct of favProducts) {
      api.getProductByID(favProduct).then(r => {
        setProducts(prev => [...prev, r.data])
      })
    }
  }, [favProducts]);
  return (
    <div className={'m-4'}>
     <div className={'grid grid-cols-4 gap-4'}>
       {products.map(item => <ProductCard product={item} key={item._id}/>)}
     </div>
    </div>
  );
};

export default FavouritesPage;
