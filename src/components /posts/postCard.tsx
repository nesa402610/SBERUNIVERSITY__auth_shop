import React, {FC, useState} from 'react';
import moment from "moment/moment";
import {IPost} from "../../types";
import PostFooter from "./postFooter";
import {api} from "../../APIs/API";
import {useAppDispatch} from "../../hooks/redux";
import {updatePost} from "../../store/reducers/postSlice";
import {showNotification__ERROR, showNotification__SUCCESS} from "../../store/reducers/notificationSlice";

interface PostCardProps {
  post: IPost
  handler: (image: string) => void
}

const PostCard: FC<PostCardProps> = ({post, handler}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [postData, setPostData] = useState(post);
  const dispatch = useAppDispatch()

  const updatePostHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    api.updatePost(postData._id, postData)
      .then(r => {
        dispatch(updatePost(r.data))
        dispatch(showNotification__SUCCESS())
        setIsEdit(false)
      })
      .catch(err => dispatch(showNotification__ERROR(err.respone.data.message)))
  };

  return (
    <>
      {isEdit &&
        <div className={'fixed flex items-center left-0 bg-neutral-900/95 backdrop-blur-lg w-screen top-0 h-screen z-50'}
             onClick={() => setIsEdit(false)}>
          <div className={'p-10 flex w-full'} onClick={e => e.stopPropagation()}>
            <div className={'flex flex-col gap-2 w-full'}>
              <input className={'bg-neutral-800 w-full p-2'}
                     type="text"
                     value={postData.title}
                     onChange={e => setPostData({...postData, title: e.target.value})}/>
              <input className={'bg-neutral-800 w-full p-2'}
                     type="text"
                     value={postData.text}
                     onChange={e => setPostData({...postData, text: e.target.value})}/>
              <input className={'bg-neutral-800 w-full p-2'}
                     type="text"
                     value={postData.image}
                     onChange={e => setPostData({...postData, image: e.target.value})}/>
              {/*<input className={'bg-neutral-700 w-full p-2'} type="text" value={postData.tags.join(' ')} onChange={e=>setPostData({...postData, tags: e.target.value})}/>*/}
              <button className={'bg-neutral-800 p-2'} onClick={e => updatePostHandler(e)}>Обновить пост</button>
            </div>
          </div>
        </div>
      }
      <div className={'flex flex-col gap-2 p-4 bg-neutral-700'}>
        <div className={'flex justify-between gap-4'}>
          <div className={'flex gap-2'}>
            <img className={'w-[50px] h-[50px]'} src={post.author.avatar} alt=""/>
            <div className={'flex flex-col justify-center text-sm overflow-hidden'}>
              <span className={'overflow-hidden whitespace-nowrap overflow-ellipsis'}>{post.author.name}</span>
              <span>{moment(post.created_at).fromNow()}</span>
            </div>
          </div>
        </div>
        <div className={'flex-1'}>
          <span>{post.text}</span>
          {post.image !== 'https://react-learning.ru/image-compressed/default-image.jpg' &&
            <div className={'flex justify-center relative overflow-hidden'}
                 onClick={() => handler(post.image)}>
              <div className={'absolute blur-2xl overflow-hidden'}>
                <img className={'h-[600px]'} src={post.image} alt=""/>
              </div>
              <img className={'h-[300px] object-contain z-40'} src={post.image} alt="изображение поста"/>
            </div>
          }
        </div>
        <PostFooter post={post} setIsEdit={setIsEdit}/>
      </div>
    </>
  );
};

export default PostCard;