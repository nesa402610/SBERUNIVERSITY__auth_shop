import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {IProduct, IProductReviews} from "../types";
import {AiFillStar, AiOutlineStar} from "react-icons/ai";
import {api} from "../APIs/API";
import {FaTrashAlt} from "react-icons/fa";
import {addReview, removeReview} from "../store/reducers/productsSlice";
import {showNotification__ERROR, showNotification__SUCCESS} from "../store/reducers/notificationSlice";

const ProductDetails = () => {
  const {products} = useAppSelector(state => state.products)
  const {user} = useAppSelector(state => state.auth)
  const [rating, setRating] = useState({rating: 1, text: ''});
  const [product, setProduct] = useState<any>({});

  const params = useParams()
  const dispatch = useAppDispatch()


  useEffect(() => {
    setProduct(products.filter((p: IProduct) => p._id === params.productID)[0])
  }, [params, products]);


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

  return (
    <div className={'m-4'}>
      <div className={'flex gap-4'}>
        <div className={'flex basis-1/3'}>
          <img src={product?.pictures} alt=""/>
        </div>
        <div>
          <h2>{product?.name}</h2>
          <h3>{product?.description}</h3>
          <h2>{product?.price}</h2>
        </div>
      </div>
      <div className={'bg-neutral-800 p-4 flex mt-4 flex-col gap-4'}>
        <div className={'flex flex-col bg-neutral-700 p-2 gap-2'}>
          <span>Оставить отзыв</span>
          <select onChange={e => setRating({...rating, rating: +e.target.value})} className={'bg-neutral-800 '}
          >
            <option value="1">Ужасно</option>
            <option value="2">Плохо</option>
            <option value="3">Нормально</option>
            <option value="4">Хорошо</option>
            <option value="5">Отлично</option>
          </select>
          <input type="text"
                 className={'bg-neutral-800 py-2 px-4'}
                 onKeyDown={e => e.key === 'Enter' && addReviewHandler(e)}
                 onChange={e => setRating({...rating, text: e.target.value})}
                 placeholder={'Новый отзыв'}/>
        </div>
        {product?.reviews?.map((r: IProductReviews) =>
          <div key={r._id} className={'bg-neutral-700 p-2 relative'}>
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
  );
};

export default ProductDetails;