import React, {FC, useState} from 'react';
import {api} from "../../APIs/API";
import {useAppDispatch} from "../../hooks/redux";
import {addProduct} from "../../store/reducers/productsSlice";
import {showNotification__ERROR, showNotification__SUCCESS} from "../../store/reducers/notificationSlice";

interface AddNewProductModalProps {
  isModal: boolean
  setIsModal: any
}

const AddNewProductModal: FC<AddNewProductModalProps> = ({isModal, setIsModal}) => {
  const [product, setProduct] = useState({
    available: true,
    pictures: '',
    name: '',
    price: 0,
    discount: 0,
    stock: 0,
    wight: '0 г',
    description: ''
  });
  const dispatch = useAppDispatch()
  const createProductHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    api.uploadProduct(product)
      .then(r => {
        dispatch(addProduct(r.data))
        dispatch(showNotification__SUCCESS())
        setIsModal(false)
      })
      .catch(err => {
      dispatch(showNotification__ERROR(err.response.data.message))
      })
  }
  return (
    <>
      {isModal &&
        <div className={'flex justify-center items-center absolute bg-neutral-900/80 backdrop-blur-lg w-screen top-0 h-screen z-50'}
             onClick={() => setIsModal(false)}>
          <div className={'bg-neutral-700 p-4'} onClick={e => e.stopPropagation()}>
            <form className={'flex flex-col gap-4'}>
              <div className={'grid grid-cols-3 gap-4'}>
                <div className={'flex flex-col'}>
                  <span>Название</span>
                  <input value={product.name}
                         onChange={e => setProduct({...product, name: e.target.value})}
                         type="text"
                         className={'bg-neutral-800 px-2'}/>
                </div>
                <div className={'flex flex-col'}>
                  <span>Описание</span>
                  <input value={product.description}
                         onChange={e => setProduct({...product, description: e.target.value})}
                         type="text"
                         className={'bg-neutral-800 px-2'}/>
                </div>
                <div className={'flex flex-col'}>
                  <span>Изображение</span>
                  <input value={product.pictures}
                         onChange={e => setProduct({...product, pictures: e.target.value})}
                         type="text"
                         className={'bg-neutral-800 px-2'}/>
                </div>
                <div className={'flex flex-col'}>
                  <span>Количество</span>
                  <input value={product.stock}
                         onChange={e => setProduct({...product, stock: +e.target.value})}
                         type="text"
                         className={'bg-neutral-800 px-2'}/>
                </div>
                <div className={'flex flex-col'}>
                  <span>Цена</span>
                  <input value={product.price}
                         onChange={e => setProduct({...product, price: +e.target.value})}
                         type="text"
                         className={'bg-neutral-800 px-2'}/>
                </div>
                <div className={'flex flex-col'}>
                  <span>Вес</span>
                  <input value={product.wight}
                         onChange={e => setProduct({...product, wight: e.target.value})}
                         type="text"
                         className={'bg-neutral-800 px-2'}/>
                </div>
                <div className={'flex flex-col'}>
                  <span>Скидка</span>
                  <input value={product.discount}
                         onChange={e => setProduct({...product, discount: +e.target.value})}
                         type="text"
                         className={'bg-neutral-800 px-2'}/>
                </div>
                <div className={'flex flex-col'}>
                  <span>Доступен?</span>
                  <select value={1} onChange={e => setProduct({...product, available: (+e.target.value === 1)})}
                          className={'bg-neutral-800 px-2'}>
                    <option value={1}>Доступен</option>
                    <option value={0}>Не доступен</option>
                  </select>
                </div>
              </div>
              <div className={'flex'}>
                <button onClick={e => createProductHandler(e)}
                        className={'flex-1 bg-neutral-800 px-2 py-1'}>Создать
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </>
  );
};

export default AddNewProductModal;