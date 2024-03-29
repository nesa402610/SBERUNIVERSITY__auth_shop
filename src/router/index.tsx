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
import CartPage from "./CartPage";
import FavouritesPage from "./favouritesPage";

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
      <Route path={'/cart'} element={<CartPage/>}/>
      <Route path={'/favourites'} element={<FavouritesPage/>}/>
    </Routes>
  );
};

export default Index;
