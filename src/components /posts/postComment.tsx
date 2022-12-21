import React, {FC} from 'react';
import {RxCross2} from "react-icons/rx";
import {IPost} from "../../types";
import {api} from "../../APIs/API";
import {setComments} from "../../store/reducers/postSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {showNotification__ERROR} from "../../store/reducers/notificationSlice";

interface PostCommentProps {
  post: IPost
}

const PostComment: FC<PostCommentProps> = ({post}) => {
  const {user} = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
//коммент удаляем, принимаем постИД и комментИД
  const deleteCommentHandler = (postID: string, commentID: string) => {
    //вызываем из класса функцию, в нее передаем данные
    api.deleteComment(postID, commentID)
      .then((r) => {
      //добавляем коммент в стор
        dispatch(setComments({comments: r.data.comments, postID}))
      })
      //ошибку ловим и нотиф отображаем
      .catch(err => showNotification__ERROR(err.response.data.message))
  };
  return (
    <>
      {post.comments.map((c) =>
        <div key={c._id} className={'rounded-lg relative flex flex-col gap-1 bg-neutral-700 p-2 drop-shadow-md'}>
          <span>{c.author}</span>
          <span>{c.text}</span>
          {c.author === user._id &&
            <RxCross2 onClick={() => deleteCommentHandler(post._id, c._id)}
                      className={'absolute right-2 hover:text-neutral-300 text-xl transition-all cursor-pointer'}/>
          }
        </div>
      )}
      {post.comments.length === 0 && <h2>Оставь первый комментарий</h2>}
    </>
  );
};

export default PostComment;