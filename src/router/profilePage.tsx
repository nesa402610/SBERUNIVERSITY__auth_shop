import React, {FC, useState} from 'react';
import ProfileInfo from "../components /ProfileInfo";
import ProfileEdit from "../components /ProfileEdit";


const ProfilePage: FC = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  return (
    <div className={'m-4'}>
      {isEdit ?
        <ProfileEdit setIsEdit={setIsEdit}/>
        : <ProfileInfo setIsEdit={setIsEdit}/>
      }
    </div>
  );
};

export default ProfilePage;