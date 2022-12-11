import React, {useState} from 'react';
import {useAppDispatch} from "../../hooks/redux";
import {addNewPost} from "../../store/reducers/postSlice";
import {showNotification__SUCCESS} from "../../store/reducers/notificationSlice";
import {api} from "../../APIs/API";

const PostCreate = () => {
  const [data, setData] = useState<any>({});
  const [tags, setTags] = useState('');
  const dispatch = useAppDispatch()

  const createNewPostHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const postData = ({...data, tags: tags.split(' ')})
    console.log(postData)
    api.createPost(postData).then(r => {
      dispatch(addNewPost(r.data))
      dispatch(showNotification__SUCCESS())
    })
  };

  return (
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
      <label className={'flex flex-col'}>
        Tags
        <input className={'bg-neutral-700 px-2'}
               type="text"
               onChange={e => setTags(e.target.value)}/>
      </label>
      <button onClick={e => createNewPostHandler(e)} className={'bg-neutral-700 px-2'}>Создать</button>
    </div>
  );
};

export default PostCreate;