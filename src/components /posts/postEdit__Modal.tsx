import React, {FC, useState} from 'react';
import {IPost} from "../../types";
import {api} from "../../APIs/API";
import {updatePost} from "../../store/reducers/postSlice";
import {showNotification__ERROR, showNotification__SUCCESS} from "../../store/reducers/notificationSlice";
import {useAppDispatch} from "../../hooks/redux";

interface PostEditModalProps {
  isEdit: boolean
  setIsEdit: any
  post: IPost
}

const PostEditModal: FC<PostEditModalProps> = ({post, isEdit, setIsEdit}) => {
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
          <div className={'p-10 bg-neutral-700 flex w-full'} onClick={e => e.stopPropagation()}>
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
      }</>
  );
};

export default PostEditModal;