import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {decrementCart, incrementCart, removeItem} from "../store/reducers/cartSlice";
import {ICart} from "../types";
import {fetchProducts} from "../store/actions/fetchProducts";


const CartPage: FC = () => {
  const [toBuy, setToBuy] = useState<string[]>([]);
  const {cart} = useAppSelector(state => state.cart)
  const dispatch = useAppDispatch()

  const incrementHandler = (item: ICart) => {
    if (item.count < item.product.stock) {
      dispatch(incrementCart(item.product._id))
    }
  }
  const decrementHandler = (id: string, count: number) => {
    if (count === 1) {
      dispatch(removeItem(id))
    } else dispatch(decrementCart(id))
  }
  const getTotalPrice = () => {
    let price = 0
    cart.map((item: ICart) => {
      if (toBuy.includes(item.product._id)) {
        return price += (item.product.price * item.count * (100 - item.product.discount) / 100)
      }
      return item
    })
    return price
  }
  const getTotalItems = () => {
    let items = 0
    cart.map((item: ICart) => {
      if (toBuy.includes(item.product._id)) {
        return items += item.count
      }
      return item
    })
    return items
  }
  const setBuyHandler = (id: string) => {
    if (toBuy.includes(id)) {
      setToBuy(prevState => prevState.filter(arrID => arrID !== id))
    } else {
      setToBuy(prev => [id, ...prev])
    }
  }
  useEffect(() => {
    // @ts-ignore доп запрос на случай обновления данных о товаре
    dispatch(fetchProducts)
  }, [dispatch]);

  return (
    <div className={'m-4'}>
      <h1 className={'text-center text-2xl mb-4'}> {cart.length >= 1 ? 'Ваша корзина' : ' В вашей корзине пусто'}</h1>
      <div className={'flex gap-8 flex-col md:flex-row'}>
        <div className={'flex flex-1 flex-col gap-4'}>
          {cart.map((item: ICart) =>
            <div key={item.product._id}
                 className={'bg-neutral-700 rounded-lg p-4 flex justify-between gap-36 xs:gap-4 md:flex-row xs:flex-col'}>
              <input type="checkbox" className={'absolute'} onChange={() => setBuyHandler(item.product._id)}/>
              <div className={'flex gap-4'}>
                <div className={'min-w-[150px] rounded-lg w-[150px] h-[150px] overflow-hidden flex justify-center bg-white'}>
                  <img className={'h-full'} src={item.product.pictures} alt=""/>
                </div>
                <div>
                  <h2 className={'font-bold'}>{item.product.name}</h2>
                  <p>{item.product.description}</p>
                </div>
              </div>
              <div className={'flex flex-col items-center justify-center'}>
                <div className={'flex bg-neutral-800 rounded-lg overflow-hidden gap-2 items-center'}>
                  <button className={(item.product.stock === item.count ? 'bg-neutral-600 cursor-default ' : '') + 'p-4 rounded-none hover:bg-neutral-600 transition-all'}
                          onClick={() => incrementHandler(item)}>Добавить
                  </button>
                  <span className={'p-4 whitespace-nowrap'}>{item.count} шт.</span>
                  <button className={'p-4 rounded-none hover:bg-neutral-600 transition-all'}
                          onClick={() => decrementHandler(item.product._id, item.count)}>
                    {item.count === 1 ? 'Удалить' : 'Убавить'}
                  </button>
                </div>
                <div className={'flex flex-col gap-2 w-full'}>
                  <div className={'flex gap-2'}>
                    <span className={item.product.discount ? 'line-through italic text-neutral-400' : 'text-center w-full'}>{item.product.price} рублей</span>
                    {item.product.discount !== 0 &&
                      <span className={'font-bold'}>{item.product.price * (100 - item.product.discount) / 100} рублей со скидкой</span>}
                  </div>
                  <h2 className={'text-end text-xl border-t-2'}>Итого: <span className={'font-bold'}>{item.product.price * item.count * (100 - item.product.discount) / 100}</span> рублей
                  </h2>
                </div>
              </div>
            </div>
          )}
        </div>
        <aside className={'basis-1/4'}>
          <div className={'bg-neutral-700 rounded-lg flex flex-col'}>
            <span className={'text-lg font-bold border-b border-b-neutral-500 flex-1 p-4'}>Условаия заказа</span>
            <div className={'flex flex-col p-4'}>
              <div className={'flex justify-between gap-4 font-bold'}>
                <div className={'flex flex-col'}>
                  <span>Товаров: {toBuy.length} шт.</span>
                  <span className={'text-sm text-neutral-400'}> в количестве {getTotalItems()} шт.</span>
                </div>
                <span>{getTotalPrice()} рублей</span>
              </div>
            </div>
            <div className={'p-4 text-center flex'}>
              <button className={'bg-neutral-800 transition-all hover:bg-neutral-600 flex-1 py-2 rounded-lg'}>Оформить</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CartPage;