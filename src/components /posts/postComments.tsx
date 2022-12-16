import React, {FC, useState} from 'react';
import {IPost} from "../../types";
import {api} from "../../APIs/API";
import {setComments} from "../../store/reducers/postSlice";
import {useAppDispatch} from "../../hooks/redux";
import PostComment from "./postComment";

interface PostCommentsProps {
  post: IPost
  full?: boolean
}

const PostComments: FC<PostCommentsProps> = ({post, full}) => {


  const [comment, setComment] = useState<string>('');

  const dispatch = useAppDispatch()

  const sendComment = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.key === 'Enter' && comment.length > 1) {
      api.createComment(post._id, {text: comment})
        .then((r) => {
          dispatch(setComments({comments: r.data.comments, postID: post._id}))
          setComment('')
        })
    }
  };
  return (
    <div className={'rounded-lg flex flex-col gap-2 bg-neutral-800 p-2'}>
      <input type="text"
             placeholder={'Комментарий...'}
             className={'rounded-lg bg-neutral-700 p-2 w-full'}
             value={comment}
             onChange={e => setComment(e.target.value)}
             onKeyDown={e => e.key === 'Enter' && sendComment(e)}/>
      <div className={(!full ? 'max-h-[70px] ' : '') + 'flex flex-col gap-2 overflow-scroll'}>
        <PostComment post={post}/>
      </div>
    </div>
  );
};

export default PostComments;