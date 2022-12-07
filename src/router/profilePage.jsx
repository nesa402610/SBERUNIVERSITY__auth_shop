import React from 'react';
import {useSelector} from "react-redux";

const ProfilePage = () => {
  const {user} = useSelector(state => state.auth);
  return (
    <div className={'m-4'}>
      <div className={'flex bg-neutral-800 p-4'}>
        <div className={'flex gap-8'}>
          <img width={'200px'} src={user.avatar} alt=""/>
          <div className={'flex flex-col'}>
            <span>{user.name}</span>
            <span>{user.about}</span>
            <span>{user.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;