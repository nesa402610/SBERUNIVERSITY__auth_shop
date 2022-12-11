import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import {api} from "../APIs/API";
import {updateUserData} from "../store/reducers/authSlice";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {IUser} from "../types";

interface ProfileEditProps {
  setIsEdit: Dispatch<SetStateAction<boolean>>
}

const ProfileEdit: FC<ProfileEditProps> = ({setIsEdit}) => {
  const {user} = useAppSelector(state => state.auth);
  const [data, setData] = useState<IUser>({
    avatar: user.avatar,
    name: user.name,
    about: user.about,
    // email: user.email
  });
  const dispatch = useAppDispatch();

  const updateProfileHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (data.avatar !== user.avatar) {
      api.updateUserAvatar({avatar: data.avatar})
        .then(r => dispatch(updateUserData(r.data)));
    }
    const {avatar, ...datas} = data;
    api.updateUserData(datas).then((r) => {
      dispatch(updateUserData(r.data));
      setIsEdit(false);
    });
  };

  return (
    <div className={'flex bg-neutral-800 p-4 justify-between'}>
      <div className={'flex gap-8'}>
        <div className="flex flex-col gap-2">
          <img src={user.avatar} alt=""/>
          <input placeholder={'Ссылка на аватар'}
                 className={'bg-neutral-700'}
                 type="text"
                 onChange={e => setData({...data, avatar: e.target.value})}/>
        </div>
        <div className={'flex flex-col gap-2'}>
          <input className={'bg-neutral-700 px-4 focus-within:outline outline-1 outline-neutral-400'}
                 type="text"
                 value={data.name}
                 onChange={e => setData({...data, name: e.target.value})}
          />
          <input className={'bg-neutral-700 px-4 focus-within:outline outline-1 outline-neutral-400'}
                 type="text"
                 value={data.about}
                 onChange={e => setData({...data, about: e.target.value})}
          />
          <input className={'bg-neutral-700 text-neutral-400 cursor-default px-4 focus-within:outline outline-1 outline-neutral-400'}
                 type="text"
                 value={user.email}
                 readOnly
                 onChange={e => setData({...data, email: e.target.value})}
          />
        </div>
      </div>
      <div className={'flex flex-col gap-2'}>
        <button onClick={e=> updateProfileHandler(e)} className={'bg-green-800 px-4 py-2'}>Сохранить</button>
        <button onClick={() => setIsEdit(false)} className={'bg-red-800 px-4 py-2'}>Отмена</button>
      </div>
    </div>
  );
};

export default ProfileEdit;