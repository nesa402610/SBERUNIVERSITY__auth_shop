import React, {FC, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {IPost} from "../../types";
import {api} from "../../APIs/API";
import {addLike, deletePost, disLike} from "../../store/reducers/postSlice";
import {
  showNotification,
  showNotification__ERROR,
  showNotification__SUCCESS
} from "../../store/reducers/notificationSlice";
import LikeButton from "../UI/likeButton";
import EditButton from "../UI/editButton";
import DeleteButton from "../UI/deleteButton";

interface PostFooterProps {
  post: IPost
  setIsEdit: any
}

const PostFooter: FC<PostFooterProps> = ({post, setIsEdit}) => {
  const {user} = useAppSelector(state => state.auth)
  const [delReady, setDelReady] = useState(false);
  const dispatch = useAppDispatch()

  const likePostHandler = (e: React.MouseEvent<HTMLDivElement>, postID: string) => {
    e.preventDefault()
    api.likePost(postID)
      .then(() => {
        dispatch(addLike({postID, userID: user._id}))
        dispatch(showNotification({message: 'Успешный лайк'}))
      })
      .catch((err: any) => showNotification__ERROR(err.response.data.message))
  };

  const dislikePostHandler = (e: React.MouseEvent<HTMLDivElement>, postID: string) => {
    e.preventDefault()
    api.dislikePost(postID).then(() => {
      dispatch(disLike({postID, userID: user._id}))
      dispatch(showNotification({message: 'Успешный дизлайк'}))
    })
      .catch((err: any) => showNotification__ERROR(err.response.data.message))
  };

  const deletePostHandler = (e: React.MouseEvent<HTMLDivElement>, postID: string) => {
    e.preventDefault()
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
        <LikeButton item={post} likeHandler={likePostHandler} dislikeHandler={dislikePostHandler}/>
        {post.author._id === user._id &&
          <div className={'flex gap-4 items-center text-xl'}>
            <EditButton setIsEdit={setIsEdit}/>
            <DeleteButton deleteHandler={deletePostHandler} delReady={delReady}/>
          </div>
        }
      </div>
    </div>
  );
};

export default PostFooter;