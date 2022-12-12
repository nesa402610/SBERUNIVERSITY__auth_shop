import React, {FC} from 'react';
import {IProduct} from "../../types";
import LikeButton from "../likeButton";
import {api} from "../../APIs/API";
import {addLike, disLike} from "../../store/reducers/productsSlice";
import {showNotification, showNotification__ERROR} from "../../store/reducers/notificationSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";

interface ProductCardProps {
  product: IProduct
}

const ProductCard: FC<ProductCardProps> = ({product}) => {
    const {user} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    const dislikeHandler = (id: string) => {
      api.dislikeProduct(id).then(() => {
        dispatch(disLike({id, userID: user._id}))
        dispatch(showNotification({message: 'Успешный дизлайк'}))
      })
        .catch((err: any) => showNotification__ERROR(err.response.data.message))
    };

    const likeHandler = (id: string) => {
      api.likeProduct(id)
        .then(() => {
          dispatch(addLike({id, userID: user._id}))
          dispatch(showNotification({message: 'Успешный лайк'}))
        })
        .catch((err: any) => showNotification__ERROR(err.response.data.message))
    }
    return (
      <div className={'relative bg-neutral-800 p-4 flex flex-col gap-2'}>
        <img src={product.pictures} alt=""/>
        {product.discount > 0 &&
          <span className={'absolute top-0 left-0 bg-red-900 text-center p-1 min-w-[40px]'}>{product.discount}</span>
        }
        {product.tags.map((t) => (
            t === 'new' &&
            <span key={t} className={'absolute top-0 right-0 bg-blue-500 text-center p-1 min-w-[40px]'}>Новинка</span>
          )
        )}
        <div className={'flex-1 flex flex-col justify-between gap-2'}>
          <div className="flex flex-col">
            <div className={'flex gap-2'}>
              <span className={product.discount ? 'order-2 line-through text-neutral-500' : ''}>{product.price} рублей</span>
              {product.discount > 0 &&
                <span className={'order-1 text-red-500 font-bold'}>{product.price * (100 - product.discount) / 100} рублей</span>
              }
            </div>
            <span>{product.stock} шт.</span>
            <span>{product.name}</span>
          </div>
          <div className={'flex'}>
            <LikeButton item={product} dislikeHandler={dislikeHandler} likeHandler={likeHandler}/>
          </div>
          <button className={'bg-neutral-900 p-2 hover:bg-neutral-700 transition-all'}>В корзину</button>
        </div>
      </div>
    );
  }
;

export default ProductCard;