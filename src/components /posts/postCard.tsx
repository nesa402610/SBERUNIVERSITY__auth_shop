import React, {FC} from 'react';
import moment from "moment/moment";
import {IPost} from "../../types";
import PostFooter from "./postFooter";

interface PostCardProps {
  post: IPost
  handler: (image: string) => void
}

const PostCard: FC<PostCardProps> = ({post, handler}) => {
  return (
    <div className={'flex flex-col gap-2 p-4 bg-neutral-700'}>
      <div className={'flex gap-2'}>
        <img width={'50px'} src={post.author.avatar} alt=""/>
        <div className={'flex flex-col justify-center text-sm'}>
          <span>{post.author.name}</span>
          <span>{moment(post.created_at).fromNow()}</span>
        </div>
        <div>{post.tags.map(t => t)}</div>
      </div>
      <div className={'flex-1'}>
        <span>{post.text}</span>
        {post.image !== 'https://react-learning.ru/image-compressed/default-image.jpg' &&
          <div className={'flex justify-center relative overflow-hidden'}
               onClick={() => handler(post.image)}>
            <div className={'absolute blur-2xl overflow-hidden'}>
              <img className={'h-[600px]'} src={post.image} alt=""/>
            </div>
            <img className={'h-[300px] object-contain z-40'} src={post.image} alt="изображение поста"/>
          </div>
        }
      </div>
      <PostFooter post={post}/>
    </div>
  );
};

export default PostCard;