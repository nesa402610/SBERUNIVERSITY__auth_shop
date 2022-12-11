import React, {FC, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {api} from "../APIs/API";
import moment from "moment";
import 'moment/locale/ru';//строчка жизни русской локали
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {addLike, addNewPost, disLike} from "../store/reducers/postSlice";
import {
  showNotification,
  showNotification__ERROR,
  showNotification__SUCCESS
} from "../store/reducers/notificationSlice";


const PostsPage: FC = () => {
  moment.locale('ru')
  const {posts} = useAppSelector(state => state.posts)
  const {user} = useAppSelector(state => state.auth)
  const [data, setData] = useState({});
  const dispatch = useAppDispatch()

  const createNewPostHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    api.createPost(data).then(r => {
      dispatch(addNewPost(r.data))
      dispatch(showNotification__SUCCESS())
    })
  };

  const likePostHandler = (postID: string) => {
    api.likePost(postID)
      .then(() => {
        dispatch(addLike({postID, userID: user._id}))
        dispatch(showNotification({message: 'Успешный лайк'}))
      })
      .catch((err: any) => showNotification__ERROR(err.response.data.message))
  };

  const dislikePostHandler = (postID: string) => {
    api.dislikePost(postID).then(() => {
      dispatch(disLike({postID, userID: user._id}))
      dispatch(showNotification({message: 'Успешный дизлайк'}))
    })
      .catch((err: any) => showNotification__ERROR(err.response.data.message))

  };
  const [isModal, setIsModal] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const imagePreviewHandler = (image: string) => {
    setIsModal(true)
    setImagePreview(image)
  };

  return (
    <>
      {isModal &&
        <div className={'flex justify-center items-center absolute bg-neutral-900/80 backdrop-blur-lg w-screen top-0 h-screen z-50'} onClick={() => setIsModal(false)}>
          <div className={' p-10 flex items-center justify-center'}>
            <img className={'h-[90vh] object-contain'} src={imagePreview} alt=""/>
          </div>
        </div>
      }
      <div className={'m-4'}>
        <div className={'flex gap-4 items-end mb-4'}>
          <label className={'flex flex-col'}>
            title
            <input className={'bg-neutral-700 px-2'}
                   type="text"
                   onChange={e => setData({...data, title: e.target.value})}/>
          </label>
          <label className={'flex flex-col'}>
            text
            <input className={'bg-neutral-700 px-2'}
                   type="text"
                   onChange={e => setData({...data, text: e.target.value})}/>
          </label>
          <label className={'flex flex-col'}>
            image
            <input className={'bg-neutral-700 px-2'}
                   type="text"
                   onChange={e => setData({...data, image: e.target.value})}/>
          </label>
          <button onClick={e => createNewPostHandler(e)} className={'bg-neutral-700 px-2'}>Создать</button>
        </div>
        <div className={'grid grid-cols-3 gap-4'}>
          {posts.map(p =>
            <div key={p._id} className={'flex flex-col gap-2 p-4 bg-neutral-700'}>
              <div className={'flex gap-2'}>
                <img width={'50px'} src={p.author.avatar} alt=""/>
                <div className={'flex flex-col justify-center text-sm'}>
                  <span>{p.author.name}</span>
                  <span>{moment(p.created_at).fromNow()}</span>
                </div>
                <div>{p.tags.map(t => t)}</div>
              </div>
              <div className={'flex-1'}>
                <span>{p.text}</span>
                {p.image !== 'https://react-learning.ru/image-compressed/default-image.jpg' &&
                  <div className={'flex justify-center relative overflow-hidden'}
                       onClick={() => imagePreviewHandler(p.image)}>
                    <div className={'absolute blur-2xl overflow-hidden'}>
                      <img className={'h-[600px]'} src={p.image} alt=""/>
                    </div>
                    <img className={'h-[300px] object-contain z-40'} src={p.image} alt="изображение поста"/>
                  </div>
                }
              </div>
              <div className={'flex gap-4'}>
                {p.likes.includes(user._id) ?
                  <div className={'flex gap-1 bg-neutral-600 px-4 py-1 rounded-full items-center'}
                       onClick={() => dislikePostHandler(p._id)}>
                    <AiFillHeart title={'Не нравится'} className={'text-xl'}/>
                    <span>{p.likes.length}</span>
                  </div>
                  :
                  <div className={'flex gap-1 bg-neutral-600 px-4 py-1 rounded-full items-center'}
                       onClick={() => likePostHandler(p._id)}>
                    <AiOutlineHeart title={'Нравится'} className={'text-xl'}/>
                    <span>{p.likes.length}</span>
                  </div>
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PostsPage;