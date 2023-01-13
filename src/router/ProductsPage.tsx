import React, {useMemo, useState} from 'react';
import {useAppSelector} from "../hooks/redux";
import SortBox from "../components/products/sortBox";
import ProductCard from "../components/products/productCard";
import AddNewProductModal from "../components/products/addNewProduct__modal";
import Loader from "../components/UI/Loader";

const ProductsPage = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const {products, searchText, isLoading} = useAppSelector(state => state.products)
  const [sort, setSort] = useState('popular');
  const filteredProducts = useMemo(() => {
    if (searchText || sort) {
      const search = products.filter(p => p.name.toLowerCase().includes(searchText.toLowerCase()));
      switch (sort) {
        case 'news':
          return search.filter(p => p.tags.includes('new'))
        case 'lowPrice':
          return search.sort((a, b) =>
            a.price - b.price
          )
        case 'highPrice':
          return search.sort((a, b) =>
            b.price - a.price
          )
        case 'mostRated':
          return search.sort((a, b) =>
            a.reviews.length - b.reviews.length
          )
        case 'sales':
          const sales = search.filter(p => p.discount !== 0)
          return sales.sort((a, b) =>
            b.discount - a.discount
          )
        default:
          return search
      }
    } else return products;
  }, [products, searchText, sort]);
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