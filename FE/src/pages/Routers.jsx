import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import MainPage from "./MainPage";
import NotFound from "./NotFound";
import FriendListPage from "./FriendListPage";
import NoticeListPage from "./NoticeListPage";
import ProjectListPage from "./ProjectListPage";
import ProjectCreatePage from "./ProjectCreatePage";
import TestPage from "./TestPage";
import TestDetailPage from "./TestDetailPage";
import MyPage from "./MyPage";
import CalendarPage from "./CalendarPage";
import ArticleCreatePage from "./ArticleCreatePage";
import ProjectDetailPage from "./ProjectDetailPage";

export default function Routers() {

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/main' element={<MainPage />} />
      <Route path='/project' element={<ProjectListPage />} />
      <Route path='/project/create' element={<ProjectCreatePage />} />
      <Route path='/project/:projectId' element={<ProjectDetailPage />} />
      <Route path='/project/article/write/:projectId' element={<ArticleCreatePage />} />
      <Route path='/friend' element={<FriendListPage />} />
      <Route path='/notice' element={<NoticeListPage />} />

      <Route path='/mypage' element={<MyPage />} />
      <Route path='/test' element={<TestPage />} />
      <Route path='/test/:postId' element={<TestDetailPage />} />
      <Route path='/calendar' element={<CalendarPage />} />

      <Route path='/*' element={<NotFound />} />
    </Routes>
  )
};
