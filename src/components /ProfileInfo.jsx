import React from 'react';
import {useSelector} from "react-redux";

const ProfileInfo = ({setIsEdit}) => {
  const {user} = useSelector(state => state.auth);
  return (
    <div className={'flex bg-neutral-800 p-4 justify-between'}>
      <div className={'flex gap-8'}>
        <img width={'200px'} src={user.avatar} alt=""/>
        <div className={'flex flex-col'}>
          <span>{user.name}</span>
          <span>{user.about}</span>
          <span>{user.email}</span>
        </div>
      </div>
      <div>
        <button className={'bg-blue-800 px-4 py-2'} onClick={()=>setIsEdit(true)}>Редактировать</button>
      </div>
    </div>
  );
};

export default ProfileInfo;