import React, {useState} from 'react';
import {useAppDispatch} from "../../hooks/redux";
import {addNewPost} from "../../store/reducers/postSlice";
import {showNotification__ERROR, showNotification__SUCCESS} from "../../store/reducers/notificationSlice";
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
      setData({
        title: '',
        text: '',
        image: '',
        tags: '',
      })
    })
      .catch(err => showNotification__ERROR(err.response.data.message))
  };

  return (
    <div className={'flex gap-4 mb-4 md:items-end md:flex-row xs:flex-col'}>
      <label className={'flex flex-col'}>
        Название
        <input className={'bg-neutral-700 px-4 py-2'}
               value={data.title}
               onChange={e => setData({...data, title: e.target.value})}/>
      </label>
      <label className={'flex flex-col'}>
        Тело поста
        <input className={'bg-neutral-700 px-4 py-2'}
               value={data.text}
               onChange={e => setData({...data, text: e.target.value})}/>
      </label>
      <label className={'flex flex-col'}>
        Изображение
        <input className={'bg-neutral-700 px-4 py-2'}
               value={data.image}
               onChange={e => setData({...data, image: e.target.value})}/>
      </label>
      <label className={'flex flex-col'}>
        Тэги
        <input className={'bg-neutral-700 px-4 py-2'}
               value={data.tags}
               onChange={e => setTags(e.target.value)}/>
      </label>
      <button onClick={e => createNewPostHandler(e)}
              className={'bg-neutral-700 hover:bg-neutral-500 transition-colors px-4 py-2'}>Создать
      </button>
    </div>
  );
};

export default PostCreate;