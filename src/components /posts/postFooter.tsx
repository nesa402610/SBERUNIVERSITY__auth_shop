import React, {FC, useState} from 'react';
import {AiFillHeart, AiOutlineHeart, AiTwotoneDelete, AiTwotoneEdit} from "react-icons/ai";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {IPost} from "../../types";
import {api} from "../../APIs/API";
import {addLike, deletePost, disLike} from "../../store/reducers/postSlice";
import {
  showNotification,
  showNotification__ERROR,
  showNotification__SUCCESS
} from "../../store/reducers/notificationSlice";

interface PostFooterProps {
  post: IPost
  setIsEdit: any
}

const PostFooter: FC<PostFooterProps> = ({post, setIsEdit}) => {
  const {user} = useAppSelector(state => state.auth)
  const [delReady, setDelReady] = useState(false);
  const dispatch = useAppDispatch()

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

  const deletePostHandler = (postID: string) => {
    setTimeout(() => {
      setDelReady(false)
    }, 5000)
    if (delReady) {
      api.deletePost(postID)
        .then(() => {
          dispatch(showNotification__SUCCESS())
          dispatch(deletePost(postID))
          setDelReady(false)
        })
        .catch(err => {
          dispatch(showNotification__ERROR(err.response.data.message))
          setDelReady(false)

        })
    } else {
      dispatch(showNotification__ERROR('Подтвердите удаление'))
      setDelReady(true)
    }
  };
  return (
    <div className={'flex flex-col gap-2'}>
      <div className={'flex text-neutral-300 text-sm '}>
        {post.tags.map(t => <span key={t}>{t}&nbsp;</span>)}
      </div>
      <div className={'flex gap-4 justify-between'}>
        {post.likes.includes(user._id) ?
          <div className={'flex cursor-pointer gap-1 bg-neutral-600 hover:bg-neutral-500 transition-all px-4 py-1 rounded-full items-center'}
               onClick={() => dislikePostHandler(post._id)}>
            <AiFillHeart color={'pink'} title={'Не нравится'} className={'text-xl'}/>
            <span className={'leading-none'}>{post.likes.length}</span>
          </div>
          :
          <div className={'flex gap-1 cursor-pointer bg-neutral-600 hover:bg-neutral-500 transition-all px-4 py-1 rounded-full items-center'}
               onClick={() => likePostHandler(post._id)}>
            <AiOutlineHeart title={'Нравится'} className={'text-xl'}/>
            <span className={'leading-none'}>{post.likes.length}</span>
          </div>
        }
        {post.author._id === user._id &&
          <div className={'flex gap-4 items-center text-xl'}>
            <div className={'flex gap-1 cursor-pointer bg-neutral-600 hover:bg-neutral-500 transition-all px-4 py-1 rounded-full items-center'}
                 onClick={() => setIsEdit(true)}>
              <AiTwotoneEdit/>
            </div>
            <div className={'flex gap-1 cursor-pointer bg-neutral-600 hover:bg-neutral-500 transition-all px-4 py-1 rounded-full items-center'}
                 onClick={() => deletePostHandler(post._id)}>
              <AiTwotoneDelete className={(delReady ? 'text-red-600' : 'text-neutral-400') + ' transition-all'}/>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default PostFooter;