import React, {FC, useEffect, useState} from 'react';
import {IPost} from "../types";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../hooks/redux";
import moment from "moment";
import PostFooter from "../components /posts/postFooter";
import PostEditModal from "../components /posts/postEdit__Modal";
import PostComments from "../components /posts/postComments";
import Loader from "../components /UI/Loader";


const PostDetails: FC = () => {
  const {posts} = useAppSelector(state => state.posts)
  const {postID} = useParams()

  const [post, setPost] = useState<any>(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setPost(posts.filter((p: IPost) => p._id === postID)[0])
  }, [postID, posts]);
  console.log(post, posts)
  if (!post) return <Loader/>

  return (
    <div className={'m-4'}>
      <PostEditModal isEdit={isEdit} setIsEdit={setIsEdit} post={post}/>
      <div className={'p-4 rounded-lg bg-neutral-700 flex flex-col gap-4'}>
        <div className={'flex gap-4'}>
          <div className={'w-24 rounded-full overflow-hidden'}>
            <img src={post.author.avatar} alt=""/>
          </div>
          <div className={'flex flex-col'}>
            <span>{post.author.name}</span>
            <span>{moment(post.created_at).format('Опубликован DD.MM.YYYY в HH:MM')}</span>
          </div>
        </div>
        <div className={'flex-1'}>
          <span>{post.text}</span>
          {post.image !== 'https://react-learning.ru/image-compressed/default-image.jpg' &&
            <div className={'flex rounded-lg justify-center relative overflow-hidden'}>
              <div className={'absolute blur-2xl overflow-hidden'}>
                <img className={'h-[600px]'} src={post.image} alt=""/>
              </div>
              <img className={'h-[300px] object-contain z-40'} src={post.image} alt="изображение поста"/>
            </div>
          }
        </div>
        <PostFooter post={post} setIsEdit={setIsEdit}/>
        <PostComments post={post} full/>
      </div>
    </div>
  );
};

export default PostDetails;