import React, {FC, useState} from 'react';
import moment from "moment/moment";
import {IPost} from "../../types";
import PostFooter from "./postFooter";
import PostEditModal from "./postEdit__Modal";
import {Link} from "react-router-dom";
import PostComments from "./postComments";

interface PostCardProps {
  post: IPost
  handler: (image: string) => void
}

const PostCard: FC<PostCardProps> = ({post, handler}) => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <>
      <PostEditModal isEdit={isEdit} setIsEdit={setIsEdit} post={post}/>
      <Link to={'/posts/' + post._id} className={'rounded-lg flex flex-col gap-2 p-4 bg-neutral-700'}>
        <div className={'flex justify-between gap-4'}>
          <div className={'flex gap-2'}>
            <img className={'rounded-full w-[50px] h-[50px]'} src={post.author.avatar} alt=""/>
            <div className={'flex flex-col justify-center text-sm overflow-hidden'}>
              <span className={'overflow-hidden whitespace-nowrap overflow-ellipsis'}>{post.author.name}</span>
              <span>{moment(post.created_at).fromNow()}</span>
            </div>
          </div>
        </div>
        <div className={'flex-1'}>
          <span>{post.text}</span>
          {post.image !== 'https://react-learning.ru/image-compressed/default-image.jpg' &&
            <div className={'flex rounded-lg justify-center relative overflow-hidden'}
                 onClick={() => handler(post.image)}>
              <div className={'absolute blur-2xl overflow-hidden'}>
                <img className={'h-[600px]'} src={post.image} alt=""/>
              </div>
              <img className={'h-[300px] object-contain z-40'} src={post.image} alt="изображение поста"/>
            </div>
          }
        </div>
        <PostFooter post={post} setIsEdit={setIsEdit}/>
        <PostComments post={post}/>
      </Link>
    </>
  );
};

export default PostCard;