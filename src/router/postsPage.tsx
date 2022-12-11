import React, {FC, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {api} from "../APIs/API";
import moment from "moment";
import 'moment/locale/ru';//строчка жизни русской локали
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {addLike, disLike} from "../store/reducers/postSlice";


const PostsPage: FC = () => {
  moment.locale('ru')
  const {posts} = useAppSelector(state => state.posts)
  const {user} = useAppSelector(state => state.auth)
  const [data, setData] = useState({});
  const dispatch = useAppDispatch()

  const createNewPostHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    api.createPost(data).then(r => console.log(r.data))
  };

  const likePostHandler = (postID: string) => {
    api.likePost(postID)
      .then(() => {
        dispatch(addLike({postID, userID: user._id}))
      })
  };

  const dislikePostHandler = (postID: string) => {
    api.dislikePost(postID).then(()=>{
      dispatch(disLike({postID, userID: user._id}))
    })

  };

  return (
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
      <div className={'flex flex-col'}>
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
            <span>{p.text}</span>
            {p.image !== 'https://react-learning.ru/image-compressed/default-image.jpg' &&
              <img src={p.image} alt="изображение поста"/>}
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
  );
};

export default PostsPage;