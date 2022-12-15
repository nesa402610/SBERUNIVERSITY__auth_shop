import React, {FC, useState} from 'react';
import {IProduct} from "../../types";
import LikeButton from "../likeButton";
import {api} from "../../APIs/API";
import {addLike, deleteProduct, disLike} from "../../store/reducers/productsSlice";
import {showNotification, showNotification__ERROR} from "../../store/reducers/notificationSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {Link} from "react-router-dom";
import DeleteButton from "../deleteButton";

interface ProductCardProps {
  product: IProduct
}

const ProductCard: FC<ProductCardProps> = ({product}) => {
    const {user} = useAppSelector(state => state.auth)
    const [delReady, setDelReady] = useState<boolean>(false);
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

    const deleteProductHandler = (id: string) => {
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
    }
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
          <Link to={'#'} className={'flex justify-between'}>
            <LikeButton item={product} dislikeHandler={dislikeHandler} likeHandler={likeHandler}/>
            {product.author._id === user._id &&
              <div className={'flex gap-2'}>
                <DeleteButton deleteHandler={() => deleteProductHandler(product._id)}
                              delReady={delReady}
                              id={product._id}/>
              </div>
            }
          </Link>
          <button className={'rounded-lg bg-neutral-900 p-2 hover:bg-neutral-700 transition-all'}>В корзину</button>
        </div>
      </Link>
    );
  }
;

export default ProductCard;