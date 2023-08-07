import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import MainPage from "./MainPage";
import NotFound from "./NotFound";
import LoginPage from "./auth/LoginPage";
import SignupPage from "./auth/SignupPage";
import MyPage from "./user/MyPage";
import UserProfilePage from "./user/UserProfilePage";
import CalendarForm from "../components/user/CalendarForm";
import FriendPage from "./friend/FriendPage";
import FriendSearchPage from "./friend/FriendSearchPage";
import NoticeListPage from "./notice/NoticeListPage";
import PostCreatePage from "./PostCreatePage";
import ArticleCreatePage from "./project/ArticleCreatePage";
import ProjectDetailPage from "./project/ProjectDetailPage";
import ProjectListPage from "./project/ProjectListPage";
import ProjectCreatePage from "./project/ProjectCreatePage";

export default function Routers() {

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/profile' element={<UserProfilePage />} />
      <Route path='/main' element={<MainPage />} />
      <Route path='/project' element={<ProjectListPage />} />
      <Route path='/project/create' element={<ProjectCreatePage />} />
      <Route path='/project/:projectId' element={<ProjectDetailPage />} />
      <Route path='/project/article/write/:projectId' element={<ArticleCreatePage />} />
      <Route path='/friend' element={<FriendPage />} />
      <Route path='/friend/search' element={<FriendSearchPage />} />
      <Route path='/notice' element={<NoticeListPage />} />
      <Route path='/notice/postcreate' element={<PostCreatePage />} />

      <Route path='/mypage' element={<MyPage />} />

      <Route path='/calendar' element={<CalendarForm />} />

      <Route path='/*' element={<NotFound />} />
    </Routes>
  )
};
