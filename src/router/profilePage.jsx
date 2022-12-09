import React, {useState} from 'react';
import ProfileInfo from "../components /ProfileInfo";
import ProfileEdit from "../components /ProfileEdit";


const ProfilePage = () => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className={'m-4'}>
      {isEdit ?
        <ProfileEdit isEdit={isEdit} setIsEdit={setIsEdit}/>
        : <ProfileInfo isEdit={isEdit} setIsEdit={setIsEdit}/>
      }
    </div>
  );
};

export default ProfilePage;