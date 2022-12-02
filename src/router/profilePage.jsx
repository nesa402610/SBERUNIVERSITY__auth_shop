import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const ProfilePage = () => {
  const nav = useNavigate();
  const [user, setUser] = useState({});
  useEffect(() => {
    if (localStorage.getItem('token')) {
      axios.get('https://api.react-learning.ru/v2/sm8/users/me')
        .then(r => setUser(r.data))
        .catch(err => nav('/signIn'));
    } else {
      nav('/signIn');
    }
  }, []);

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