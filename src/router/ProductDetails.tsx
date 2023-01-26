import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {ICart, IProduct, IProductReviews} from "../types";
import {AiFillStar, AiOutlineStar} from "react-icons/ai";
import {api} from "../APIs/API";
import {FaTrashAlt} from "react-icons/fa";
import {addReview, removeReview} from "../store/reducers/productsSlice";
import {showNotification__ERROR, showNotification__SUCCESS} from "../store/reducers/notificationSlice";
import {addItem, decrementCart, incrementCart, removeItem} from "../store/reducers/cartSlice";
import Loader from "../components/UI/Loader";
import {addFavourite, removeFavourite} from "../store/reducers/authSlice";

const ProductDetails = () => {
  const {cart} = useAppSelector(state => state.cart)
  const {user, favProducts} = useAppSelector(state => state.auth)
  const [rating, setRating] = useState({rating: 1, text: ''});
  const [product, setProduct] = useState<any | IProduct>(null);
  const [count, setCount] = useState(0);

  const params = useParams()
  const dispatch = useAppDispatch()


  useEffect(() => {
    api.getProductByID(params.productID)
      .then(r => setProduct(r.data))
  }, [params.productID]);

  useEffect(() => {
    const item = cart.filter((cart: ICart) => cart.product?._id === product?._id)[0]
    if (item) setCount(item.count)
  }, [cart, product]);

  const addReviewHandler = () => {
    api.addReview(product._id, rating)
      .then(r => {
        dispatch(addReview({productID: product._id, reviews: r.data.reviews}))
        dispatch(showNotification__SUCCESS())
      })
      .catch(err => dispatch(showNotification__ERROR(err.response.data.message)))
  };
  const removeReviewHandler = (productID: string, reviewID: string) => {
    api.removeReview({productID, reviewID})
      .then(() => {
        dispatch(removeReview({productID, reviewID}))
        dispatch(showNotification__SUCCESS())
      })
      .catch(err => dispatch(showNotification__ERROR(err.response.data.message)))
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
  const favouriteHandler = () => {
    if (favProducts.includes(product._id)) {
      dispatch(removeFavourite(product._id))
      console.log(1)
    } else {
      dispatch(addFavourite(product._id))
    }
  };
  if (!product) {
    return <Loader/>
  }
  return (
    <div className={'m-4'}>
      <div className={'flex gap-4 xs:flex-col sm:flex-row'}>
        <div className={'flex sm:basis-1/3 rounded-lg overflow-hidden'}>
          <img src={product?.pictures} alt=""/>
        </div>
        <div className={'flex flex-col flex-1 gap-4'}>
          <div className={'rounded-xl bg-neutral-700 flex-1 p-4'}>
            <h2>{product?.name}</h2>
            <h3>{product?.description}</h3>
            <h2>{product?.price}</h2>
          </div>
          {cart.filter((item: ICart) => item.product._id === product._id)[0] ?
            <div className={'flex items-center justify-center'}>
              <div className={'flex flex-1 bg-neutral-700 rounded-lg overflow-hidden gap-1 items-center'}>
                <button className={(product.stock === count ? 'bg-neutral-700 cursor-default ' : '') + 'flex-1 p-2 rounded-none hover:bg-neutral-600 transition-all'}
                        onClick={(e) => incrementHandler(e, product)}>Добавить
                </button>
                <span className={'p-2 whitespace-nowrap flex-1 text-center'}>{count} шт.</span>
                <button className={'p-2 rounded-none hover:bg-neutral-600 transition-all flex-1'}
                        onClick={(e) => decrementHandler(e, product._id, count)}>
                  {count === 1 ? 'Удалить' : 'Убавить'}
                </button>
              </div>
            </div>
            :
            <div onClick={(e) => addToCartHandler(e)}
                 className={'rounded-lg text-center bg-neutral-700 p-2 hover:bg-neutral-600 transition-all'}>В
                                                                                                             корзину
            </div>
          }
          <div className={'bg-neutral-700 p-2 rounded-lg text-center hover:bg-neutral-600 transition-all cursor-pointer'}
               onClick={() => favouriteHandler()}>
            {!favProducts.includes(product._id) ? 'Добавить в избранное' : 'Удалить из избранного'}
          </div>
        </div>
      </div>
      <div className={'rounded-xl bg-neutral-800 p-4 flex mt-4 flex-col gap-4'}>
        <div className={'flex rounded-xl flex-col bg-neutral-700 p-2 gap-2'}>
          <span>Оставить отзыв</span>
          <select onChange={e => setRating({...rating, rating: +e.target.value})}
                  className={'bg-neutral-800 rounded-lg px-4 py-2'}
          >
            <option value="1">Ужасно</option>
            <option value="2">Плохо</option>
            <option value="3">Нормально</option>
            <option value="4">Хорошо</option>
            <option value="5">Отлично</option>
          </select>
          <input type="text"
                 className={'bg-neutral-800 py-2 px-4'}
                 onKeyDown={e => e.key === 'Enter' && addReviewHandler()}
                 onChange={e => setRating({...rating, text: e.target.value})}
                 placeholder={'Новый отзыв'}/>
        </div>
        <div className={'grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'}>
          {product?.reviews?.map((r: IProductReviews) =>
            <div key={r._id} className={'rounded-lg bg-neutral-700 p-2 relative'}>
              {r.author === user._id &&
                <div className={'absolute right-2 cursor-pointer'}
                     onClick={() => removeReviewHandler(product._id, r._id)}>
                  <FaTrashAlt className={'hover:text-red-500 transition-colors'}/>
                </div>
              }
              <div className={'flex gap-4'}>
                {/*<span>{r.author}</span>*/}
                {/*<span>Типо имя автора</span>*/}
              </div>
              <div className={'flex'}>
                {[...Array(r?.rating)]?.map(() => <AiFillStar/>)}
                {[...Array(5 - r?.rating)]?.map(() => <AiOutlineStar/>)}
              </div>
              <div className={'max-h-[100px] overflow-scroll'}>
                {r.text}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
