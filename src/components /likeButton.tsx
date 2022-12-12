import React, {FC} from 'react';
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {useAppSelector} from "../hooks/redux";

interface LikeButtonProps {
  item: any
  dislikeHandler: (id: string) => void
  likeHandler: (id: string) => void
}

const LikeButton: FC<LikeButtonProps> = ({item, dislikeHandler, likeHandler}) => {
  const {user} = useAppSelector(state => state.auth)
  return (
    <>
      {item.likes.includes(user._id) ?
        <div className={'flex cursor-pointer gap-1 bg-neutral-600 hover:bg-neutral-500 transition-all px-4 py-1 rounded-full items-center'}
             onClick={() => dislikeHandler(item._id)}>
          <AiFillHeart color={'pink'} title={'Не нравится'} className={'text-xl'}/>
          <span className={'leading-none'}>{item.likes.length}</span>
        </div>
        :
        <div className={'flex gap-1 cursor-pointer bg-neutral-600 hover:bg-neutral-500 transition-all px-4 py-1 rounded-full items-center'}
             onClick={() => likeHandler(item._id)}>
          <AiOutlineHeart title={'Нравится'} className={'text-xl'}/>
          <span className={'leading-none'}>{item.likes.length}</span>
        </div>
      }
    </>
  );
};

export default LikeButton;