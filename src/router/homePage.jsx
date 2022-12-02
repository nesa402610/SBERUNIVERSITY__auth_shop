import React, {useEffect, useState} from 'react';
import axios from "axios";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get('https://api.react-learning.ru/products')
      .then(r => setProducts(r.data.products));
  }, []);
  return (
    <div className={'m-4'}>
      <div className={'grid grid-cols-5 gap-4'}>
        {products.map(item =>
          <div key={item._id} className={'relative bg-neutral-800 p-4 flex flex-col gap-2'}>
            <img src={item.pictures} alt=""/>
            {item.discount > 0 &&
              <span className={'absolute top-0 left-0 bg-red-900 text-center p-1 min-w-[40px]'}>{item.discount}</span>
            }
            {item.tags.map((t) => (
              t === 'new' && <span className={'absolute top-0 right-0 bg-blue-500 text-center p-1 min-w-[40px]'}>Новинка</span>
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
    </div>
  );
};

export default HomePage;