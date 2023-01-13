import React, {FC, useState} from 'react';
import {useAppSelector} from "../hooks/redux";
import moment from "moment";
import 'moment/locale/ru'; //строчка жизни русской локали
import PostCreate from "../components/posts/postCreate";
import ImagePreviewModal from "../components/posts/imagePreview_Modal";
import PostCard from "../components/posts/postCard";
import Loader from "../components/UI/Loader";


const PostsPage: FC = () => {
  moment.locale('ru')
  const {posts, isLoading} = useAppSelector(state => state.posts)


  const [isModal, setIsModal] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const imagePreviewHandler = (e: React.MouseEvent<HTMLDivElement>, image: string) => {
    e.preventDefault()
    setIsModal(true)
    setImagePreview(image)
  };
  if (isLoading) return <Loader/>
  return (
    <>
      <ImagePreviewModal isModal={isModal} setIsModal={setIsModal} image={imagePreview}/>
      <div className={'m-4'}>
        <PostCreate/>
        <div className={'grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'}>
          {posts.map(p =>
            <PostCard key={p._id} post={p} handler={imagePreviewHandler}/>
          )}
        </div>
      </div>
    </>
  );
};

export default PostsPage;