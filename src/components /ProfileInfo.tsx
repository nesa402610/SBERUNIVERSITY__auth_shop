import React, {Dispatch, FC, SetStateAction} from 'react';
import {useAppSelector} from "../hooks/redux";

interface ProfileInfoProps {
  setIsEdit: Dispatch<SetStateAction<boolean>>
}

const ProfileInfo: FC<ProfileInfoProps> = ({setIsEdit}) => {
  const {user} = useAppSelector(state => state.auth);
  return (
    <div className={'rounded-lg flex bg-neutral-800 p-4 justify-between'}>
      <div className={'flex gap-8 xs:flex-col sm:flex-row'}>
        <img className={'rounded-lg'} width={'200px'} src={user.avatar} alt=""/>
        <div className={'flex flex-col'}>
          <span>{user.name}</span>
          <span>{user.about}</span>
          <span>{user.email}</span>
        </div>
      </div>
      <div>
        <button className={'bg-blue-800 px-4 py-2'} onClick={() => setIsEdit(true)}>Редактировать</button>
      </div>
    </div>
  );
};

export default ProfileInfo;