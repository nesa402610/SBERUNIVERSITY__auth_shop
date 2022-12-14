import React, {FC, useState} from 'react';
import moment from "moment/moment";
import {IPost} from "../../types";
import PostFooter from "./postFooter";
import {api} from "../../APIs/API";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {setComments} from "../../store/reducers/postSlice";
import {RxCross2} from "react-icons/rx";
import PostEditModal from "./postEdit__Modal";

interface PostCardProps {
  post: IPost
  handler: (image: string) => void
}

const PostCard: FC<PostCardProps> = ({post, handler}) => {
  const {user} = useAppSelector(state => state.auth)
  const [isEdit, setIsEdit] = useState(false);
  const [comment, setComment] = useState<string>('');
  const dispatch = useAppDispatch()


  const sendComment = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.key === 'Enter') {
      api.createComment(post._id, {text: comment})
        .then((r) => {
          dispatch(setComments({comments: r.data.comments, postID: post._id}))
        })
    }
  };

  const deleteCommentHandler = (postID: string, commentID: string) => {
    api.deleteComment(postID, commentID)
      .then((r) => {
        dispatch(setComments({comments: r.data.comments, postID}))
      })
  };

  return (
    <>
      <PostEditModal isEdit={isEdit} setIsEdit={setIsEdit} post={post}/>
      <div className={'rounded-lg flex flex-col gap-2 p-4 bg-neutral-700'}>
        <div className={'flex justify-between gap-4'}>
          <div className={'flex gap-2'}>
            <img className={'rounded-full w-[50px] h-[50px]'} src={post.author.avatar} alt=""/>
            <div className={'flex flex-col justify-center text-sm overflow-hidden'}>
              <span className={'overflow-hidden whitespace-nowrap overflow-ellipsis'}>{post.author.name}</span>
              <span>{moment(post.created_at).fromNow()}</span>
            </div>
          </div>
        </div>
        <div className={'flex-1'}>
          <span>{post.text}</span>
          {post.image !== 'https://react-learning.ru/image-compressed/default-image.jpg' &&
            <div className={'flex rounded-lg justify-center relative overflow-hidden'}
                 onClick={() => handler(post.image)}>
              <div className={'absolute blur-2xl overflow-hidden'}>
                <img className={'h-[600px]'} src={post.image} alt=""/>
              </div>
              <img className={'h-[300px] object-contain z-40'} src={post.image} alt="изображение поста"/>
            </div>
          }
        </div>
        <PostFooter post={post} setIsEdit={setIsEdit}/>
        <div className={'rounded-lg flex flex-col gap-2 bg-neutral-800 p-2'}>
          <input type="text"
                 placeholder={'Комментарий...'}
                 className={'rounded-lg bg-neutral-700 p-2 w-full'}
                 value={comment}
                 onChange={e => setComment(e.target.value)}
                 onKeyDown={e => e.key === 'Enter' && sendComment(e)}/>
          <div className={'flex flex-col gap-2 h-[70px] overflow-scroll'}>
            {post.comments.map(c =>
              <div className={'rounded-lg relative flex flex-col gap-1 bg-neutral-700 p-2 drop-shadow-md'}>
                <span>{c.author}</span>
                <span>{c.text}</span>
                {c.author === user._id &&
                  <RxCross2 onClick={() => deleteCommentHandler(post._id, c._id)}
                            className={'absolute right-2 hover:text-neutral-300 text-xl transition-all cursor-pointer'}/>
                }
              </div>
            )}
            {post.comments.length === 0 && <h2>Оставь первый комментарий</h2>}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;