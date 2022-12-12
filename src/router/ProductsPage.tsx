import React, {useMemo, useState} from 'react';
import {useAppSelector} from "../hooks/redux";

const ProductsPage = () => {
  const {products, searchText} = useAppSelector(state => state.products)
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
          return search.sort((a, b) =>
            b.discount - a.discount
          )
        default:
          return search
      }
    } else return products;
  }, [products, searchText, sort]);
  return (
    <div className={'m-4'}>
      <div>
        <div className={'bg-neutral-800 p-4 flex justify-center text-lg'}>
          <div className={'flex gap-4'}>
            <span className={(sort === 'popular' ? 'text-white underline cursor-default' : 'text-neutral-300 cursor-pointer')}
                  data-sort={'popular'}
                  onClick={() => setSort('popular')}>Популярные</span>
            <span className={(sort === 'new' ? 'text-white underline cursor-default' : 'text-neutral-300 cursor-pointer')}
                  data-sort={'new'}
                  onClick={() => setSort('new')}>Новинки</span>
            <span className={(sort === 'lowPrice' ? 'text-white underline cursor-default' : 'text-neutral-300 cursor-pointer')}
                  data-sort={'lowPrice'}
                  onClick={() => setSort('lowPrice')}>Сначала дешевые</span>
            <span className={(sort === 'highPrice' ? 'text-white underline cursor-default' : 'text-neutral-300 cursor-pointer')}
                  data-sort={'highPrice'}
                  onClick={() => setSort('highPrice')}>Сначала дорогие</span>
            <span className={(sort === 'mostRated' ? 'text-white underline cursor-default' : 'text-neutral-300 cursor-pointer')}
                  data-sort={'mostRated'}
                  onClick={() => setSort('mostRated')}>По рейтингу</span>
            <span className={(sort === 'sales' ? 'text-white underline cursor-default' : 'text-neutral-300 cursor-pointer')}
                  data-sort={'sales'}
                  onClick={() => setSort('sales')}>По скидке</span>
          </div>
        </div>
        {searchText &&
          <h2 className={'text-center text-2xl'}>
            По запросу
            <span className={'font-bold'}>&nbsp;{searchText}&nbsp;</span>
            найдено {filteredProducts.length} совпадений
          </h2>
        }
      </div>
      <div className={'grid grid-cols-5 gap-4 mt-4'}>
        {filteredProducts.map(item =>
          <div key={item._id} className={'relative bg-neutral-800 p-4 flex flex-col gap-2'}>
            <img src={item.pictures} alt=""/>
            {item.discount > 0 &&
              <span className={'absolute top-0 left-0 bg-red-900 text-center p-1 min-w-[40px]'}>{item.discount}</span>
            }
            {item.tags.map((t) => (
                t === 'new' &&
                <span key={t} className={'absolute top-0 right-0 bg-blue-500 text-center p-1 min-w-[40px]'}>Новинка</span>
              )
            )}
            <div className={'flex-1 flex flex-col justify-between gap-2'}>
              <div className="flex flex-col">
                <div className={'flex gap-2'}>
                  <span className={item.discount ? 'order-2 line-through text-neutral-500' : ''}>{item.price} рублей</span>
                  {item.discount > 0 &&
                    <span className={'order-1 text-red-500 font-bold'}>{item.price * (100 - item.discount) / 100} рублей</span>
                  }
                </div>
                <span>{item.stock} шт.</span>
                <span>{item.name}</span>
              </div>
              <button className={'bg-neutral-900 p-2 hover:bg-neutral-700 transition-all'}>В корзину</button>
            </div>
          </div>
        )}
      </div>
      {/*Сообщение мол ничего нет или нужна авторизация*/}
      {!localStorage.getItem('token')
        ? <h2 className={'text-center text-2xl font-bold'}>Требуется авторизация</h2>
        : filteredProducts.length === 0 &&
        <h2 className={'text-center text-2xl font-bold'}>По вашему запросу ничего не найдено..</h2>
      }
    </div>
  );
};

export default ProductsPage;