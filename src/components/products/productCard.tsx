import React, {FC, useEffect, useState} from 'react';
import {ICart, IProduct} from "../../types";
import {api} from "../../APIs/API";
import {addLike, deleteProduct, disLike} from "../../store/reducers/productsSlice";
import {showNotification, showNotification__ERROR} from "../../store/reducers/notificationSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {Link} from "react-router-dom";
import LikeButton from "../UI/likeButton";
import DeleteButton from "../UI/deleteButton";
import {addItem, decrementCart, incrementCart, removeItem} from "../../store/reducers/cartSlice";

interface ProductCardProps {
  product: IProduct
}

const ProductCard: FC<ProductCardProps> = ({product}) => {
    const {user} = useAppSelector(state => state.auth)
    const [delReady, setDelReady] = useState<boolean>(false);
    const {cart} = useAppSelector(state => state.cart)
    const [count, setCount] = useState(0);
    const dispatch = useAppDispatch()

    const dislikeHandler = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
      e.preventDefault()
      api.dislikeProduct(id).then(() => {
        dispatch(disLike({id, userID: user._id}))
        dispatch(showNotification({message: 'Успешный дизлайк'}))
      })
        .catch((err: any) => showNotification__ERROR(err.response.data.message))
    };

    const likeHandler = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
      e.preventDefault()

      api.likeProduct(id)
        .then(() => {
          dispatch(addLike({id, userID: user._id}))
          dispatch(showNotification({message: 'Успешный лайк'}))
        })
        .catch((err: any) => showNotification__ERROR(err.response.data.message))
    }


    const deleteProductHandler = (e: any, id: string) => {
      e.preventDefault()
      setTimeout(() => {
        setDelReady(false)
      }, 5000)
      if (delReady) {

        api.deleteProduct(id)
          .then(() => {
            dispatch(deleteProduct(id))
            dispatch(showNotification({message: 'Успешное удаление продукта'}))
          })
          .catch((err: any) => showNotification__ERROR(err.response.data.message))
      } else {
        dispatch(showNotification__ERROR('Подтвердите удаление'))
        setDelReady(true)
      }
    };

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
      <Link className={'rounded-lg relative bg-neutral-800 p-4 flex flex-col gap-2'} to={'/catalog/' + product._id}>
        <div className={'flex justify-center'}>
          <img className={'rounded-lg max-h-[250px] object-contain'} src={product.pictures} alt=""/>
        </div>
        {product.discount > 0 &&
          <span className={'rounded-lg absolute top-2 left-2 bg-red-900 text-center p-1 min-w-[40px]'}>{product.discount}</span>
        }
        {product.tags.map((t) => (
            t === 'new' &&
            <span key={t}
                  className={'rounded-lg absolute top-2 right-2 bg-blue-500 text-center p-1 min-w-[40px]'}>Новинка</span>
          )
        )}
        <div className={'flex-1 flex flex-col justify-between gap-2'}>
          <div className="flex flex-col flex-1">
            <div className={'flex gap-2'}>
              <span className={product.discount ? 'order-2 line-through text-neutral-500' : ''}>{product.price} рублей</span>
              {product.discount > 0 &&
                <span className={'order-1 text-red-500 font-bold'}>{product.price * (100 - product.discount) / 100} рублей</span>
              }
            </div>
            <span>{product.stock} шт.</span>
            <span>{product.name}</span>
          </div>
          <div className={'flex justify-between'}>
            <LikeButton item={product} dislikeHandler={dislikeHandler} likeHandler={likeHandler}/>
            {product.author._id === user._id &&
              <div className={'flex gap-2'}>
                <DeleteButton id={product._id} deleteHandler={deleteProductHandler}
                              delReady={delReady}/>
              </div>
            }
          </div>
          {cart.filter((item: ICart) => item.product._id === product._id)[0] ?
            <div className={'flex flex-col items-center justify-center'}>
              <div className={'flex bg-neutral-900 rounded-lg overflow-hidden gap-1 items-center'}>
                <button className={(product.stock === count ? 'bg-neutral-700 cursor-default ' : '') + 'p-2 rounded-none hover:bg-neutral-700 transition-all'}
                        onClick={(e) => incrementHandler(e, product)}>Добавить
                </button>
                <span className={'p-2 whitespace-nowrap'}>{count} шт.</span>
                <button className={'p-2 rounded-none hover:bg-neutral-700 transition-all'}
                        onClick={(e) => decrementHandler(e, product._id, count)}>
                  {count === 1 ? 'Удалить' : 'Убавить'}
                </button>
              </div>
            </div>
            :
            <div onClick={(e) => addToCartHandler(e)}
                 className={'rounded-lg text-center bg-neutral-900 p-2 hover:bg-neutral-700 transition-all'}>В
                                                                                                             корзину
            </div>
          }

        </div>
      </Link>
    );
  }
;

export default ProductCard;