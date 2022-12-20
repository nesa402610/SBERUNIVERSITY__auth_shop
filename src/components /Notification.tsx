import React, {FC} from 'react';
import {MdInfoOutline} from "react-icons/md";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {hideNotification} from "../store/reducers/notificationSlice";

const Notification: FC = () => {
  const {message, isActive, error, closeable} = useAppSelector(state => state.notification)
  const dispatch = useAppDispatch()
  return (
    <>
      {isActive &&
        <div onClick={() => dispatch(hideNotification())}
             className={(!closeable ? 'cursor-not-allowed ' : 'cursor-pointer ') + 'z-50 backdrop-blur-lg fixed rounded-xl mr-4 mt-4 right-0 p-4 font-bold' + (error ? ' bg-red-900/80' : ' bg-green-900/80')}>
          <div className={'flex items-center gap-1 justify-end'}>
            <span>{message}</span>
            <MdInfoOutline size={'1.5rem'}/>
          </div>
          <span>{error}</span>
        </div>

      }
    </>
  );
};

export default Notification;