import React from 'react';
import {Route, Routes} from "react-router-dom";
import SignIn from "./signIn";
import SignUp from "./signUp";
import HomePage from "./homePage";
import ProfilePage from "./profilePage";
import PostsPage from "./postsPage";
import PasswordReset from "./passwordReset";

const Index = () => {
  return (
    <Routes>
      <Route path={'/'} element={<HomePage/>}/>
      <Route path={'profile'} element={<ProfilePage/>}/>
      <Route path={'posts'} element={<PostsPage/>}/>
      <Route path={'/signIn'} element={<SignIn/>}/>
      <Route path={'/signUp'} element={<SignUp/>}/>
      <Route path={'/reset-password'} element={<PasswordReset/>}/>
    </Routes>
  );
};

export default Index;