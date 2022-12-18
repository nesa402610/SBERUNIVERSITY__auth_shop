import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {decrementCart, incrementCart, removeItem} from "../store/reducers/cartSlice";
import {ICart} from "../types";


const CartPage: FC = () => {
  const {cart} = useAppSelector(state => state.cart)
  const dispatch = useAppDispatch()

  const incrementHandler = (id: string) => {
    dispatch(incrementCart(id))
  }
  const decrementHandler = (id: string, count: number) => {
    if (count === 1) {
      dispatch(removeItem(id))
    } else dispatch(decrementCart(id))
  }
  const getTotalPrice = () => {
    let price = 0
    cart.map((item: ICart) => price += (item.product.price * item.count * (100 - item.product.discount) / 100))
    return price
  }

  return (
    <div className={'m-4'}>
      <h1 className={'text-center text-2xl mb-4'}>Ваша корзина</h1>
      <div className={'flex flex-col gap-4'}>
        {cart.map((item: ICart) =>
          <div className={'bg-neutral-700 rounded-lg p-4 flex justify-between'}>
            <div className={'flex gap-4'}>
              <div className={'w-[150px] rounded-lg overflow-hidden'}>
                <img src={item.product.pictures} alt=""/>
              </div>
              <div>
                <h2 className={'font-bold'}>{item.product.name}</h2>
                <p>{item.product.description}</p>
              </div>
            </div>
            <div className={'flex flex-col items-center justify-center'}>
              <div className={'flex bg-neutral-800 rounded-lg overflow-hidden gap-2 items-center'}>
                <button className={'p-4 rounded-none hover:bg-neutral-600 transition-all'}
                        onClick={() => incrementHandler(item.product._id)}>Добавить
                </button>
                <span className={'p-4'}>{item.count} шт.</span>
                <button className={'p-4 rounded-none hover:bg-neutral-600 transition-all'}
                        onClick={() => decrementHandler(item.product._id, item.count)}>Убавить
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
      <h3 className={'font-bold text-3xl text-end'}>Итого к оплате: {getTotalPrice()}</h3>
    </div>
  );
};

export default CartPage;