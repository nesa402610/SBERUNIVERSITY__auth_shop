import React, {useEffect, useMemo, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import SortBox from "../components/products/sortBox";
import ProductCard from "../components/products/productCard";
import AddNewProductModal from "../components/products/addNewProduct__modal";
import Loader from "../components/UI/Loader";
import {fetchProducts} from "../store/actions/fetchProducts";

const ProductsPage = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const {products, searchText, isLoading} = useAppSelector(state => state.products)
  const [sort, setSort] = useState('popular');
  const dispatch = useAppDispatch()

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchProducts(searchText))
    console.log(searchText)
  }, [dispatch, searchText]);

  const filteredProducts = useMemo(() => {
    const copy = [...products]
    if (sort) {
      switch (sort) {
        case 'news':
          return copy.filter(p => p.tags.includes('new'))
        case 'lowPrice':
          return copy.sort((a, b) =>
           a.price - b.price
        )
        case 'highPrice':
          return copy.sort((a, b) =>
            b.price - a.price
          )
        case 'mostRated':
          return copy.sort((a, b) =>
            a.reviews.length - b.reviews.length
          )
        case 'sales':
          const sales = copy.filter(p => p.discount !== 0)
          return sales.sort((a, b) =>
            b.discount - a.discount
          )
        default:
          return products
      }
    } else return products;
  }, [products, sort]);
  console.log(filteredProducts)
  if (isLoading) return <Loader/>
  return (
    <div className={'m-4'}>
      <AddNewProductModal isModal={isModal} setIsModal={setIsModal}/>
      <SortBox sort={sort} setSort={setSort}/>
      {searchText &&
        <h2 className={'text-center text-2xl'}>
          По запросу
          <span className={'font-bold'}>&nbsp;{searchText}&nbsp;</span>
          найдено {filteredProducts.length} совпадений
        </h2>
      }
      <div className={'grid xs:grid-cols-1 md:grid-cols-5 sm:grid-cols-3 gap-4 mt-4'}>
        <div className={'rounded-lg bg-neutral-800 p-4'} onClick={() => setIsModal(true)}>
          <h2>Добавить новый продукт</h2>
        </div>
        {filteredProducts.map(item =>
          <ProductCard key={item._id} product={item}/>
        )}
      </div>
      {/*Сообщение мол, ничего нет или нужна авторизация*/}
      {!localStorage.getItem('token')
        ? <h2 className={'text-center text-2xl font-bold'}>Требуется авторизация</h2>
        : filteredProducts.length === 0 &&
        <h2 className={'text-center text-2xl font-bold'}>По вашему запросу ничего не найдено..</h2>
      }
    </div>
  );
};

export default ProductsPage;
