import React, {FC, useMemo} from 'react';
import {useAppSelector} from "../hooks/redux";

const HomePage: FC = () => {
  const {products, searchText} = useAppSelector(state => state.products);

  const filteredProducts = useMemo(() => {
    if (searchText) return products.filter(p => p.name.toLowerCase().includes(searchText.toLowerCase()));
    else return products;
  }, [products, searchText]);

  return (
    <div className={'m-4'}>
      <div className={'grid grid-cols-5 gap-4'}>
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
      {filteredProducts.length === 0 &&
        <h2 className={'text-center text-2xl font-bold'}>По вашему запросу ничего не найдено..</h2>}
    </div>
  );
};

export default HomePage;