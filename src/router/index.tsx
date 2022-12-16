import React from 'react';
import {Outlet, Route, Routes} from "react-router-dom";
import SignIn from "./signIn";
import SignUp from "./signUp";
import HomePage from "./homePage";
import ProfilePage from "./profilePage";
import PostsPage from "./postsPage";
import PasswordReset from "./passwordReset";
import ProductsPage from "./ProductsPage";
import ProductDetails from "./ProductDetails";
import PostDetails from "./postDetails";

const Index = () => {
  return (
    <Routes>
      <Route path={'/'} element={<HomePage/>}/>
      <Route path={'/profile'} element={<ProfilePage/>}/>
      <Route path={'/posts'} element={<Outlet/>}>
        <Route path={''} element={<PostsPage/>}/>
        <Route path={':postID'} element={<PostDetails/>}/>
      </Route>
      <Route path={'/catalog'} element={<Outlet/>}>
        <Route path={''} element={<ProductsPage/>}/>
        <Route path={':productID'} element={<ProductDetails/>}/>
      </Route>
      <Route path={'/signIn'} element={<SignIn/>}/>
      <Route path={'/signUp'} element={<SignUp/>}/>
      <Route path={'/reset-password'} element={<PasswordReset/>}/>
    </Routes>
  );
};

export default Index;