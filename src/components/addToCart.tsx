import React, {FC, useEffect, useState} from 'react';
import {ICart, IProduct} from "../types";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {addItem, decrementCart, incrementCart, removeItem} from "../store/reducers/cartSlice";

interface AddToCartProps {
  product: IProduct
}
const AddToCart: FC<AddToCartProps> = ({product}) => {
  const {cart} = useAppSelector(state => state.cart)
  const [count, setCount] = useState(0);

  const dispatch = useAppDispatch()

  const incrementHandler = (e: React.MouseEvent<HTMLButtonElement>, item: IProduct) => {
    e.preventDefault()
    if (count < item.stock) {
      dispatch(incrementCart(item._id))
    }
  }
  const decrementHandler = (e: React.MouseEvent<HTMLButtonElement>, id: string, count: number) => {
    e.preventDefault()
    if (count === 1) {
      dispatch(removeItem(id))
    } else dispatch(decrementCart(id))
  }

  const addToCartHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const cart = localStorage.getItem('cart')
    if (cart) {
      const arrCart = JSON.parse(cart)
      if (arrCart.find((p: ICart) => p.product._id === product._id)) {
        arrCart.map((i: ICart) => i.product._id === product._id ? i.count += 1 : i)
      } else {
        arrCart.push({product: product, count: 1})
        dispatch(addItem({product, count: 1}))
      }

      localStorage.setItem('cart', JSON.stringify(arrCart))
    } else {
      localStorage.setItem('cart', JSON.stringify([{product: product, count: 1}]))
      dispatch(addItem({product, count: 1}))
    }
  };

  useEffect(() => {
    const item = cart.filter((cart: ICart) => cart.product._id === product._id)[0]
    if (item) setCount(item.count)
  }, [cart, product._id]);
  return (
    <>
      {cart.filter((item: ICart) => item.product._id === product._id)[0] ?
          <div className={'flex bg-neutral-900 rounded-lg overflow-hidden gap-1 items-center'}>
            <button className={(product.stock === count ? 'bg-neutral-700 cursor-default ' : '') + 'flex-1 p-2 rounded-none hover:bg-neutral-700 transition-all'}
                    onClick={(e) => incrementHandler(e, product)}>Добавить
            </button>
            <span className={'flex-1 text-center p-2 whitespace-nowrap'}>{count} шт.</span>
            <button className={'flex-1 p-2 rounded-none hover:bg-neutral-700 transition-all'}
                    onClick={(e) => decrementHandler(e, product._id, count)}>
              {count === 1 ? 'Удалить' : 'Убавить'}
            </button>
          </div>
        :
        <div onClick={(e) => addToCartHandler(e)}
             className={'rounded-lg text-center bg-neutral-900 p-2 hover:bg-neutral-700 transition-all'}>
          В корзину
        </div>
      }
    </>
  );
};

export default AddToCart;
