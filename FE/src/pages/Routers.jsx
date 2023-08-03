import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import MainPage from "./MainPage";
import NotFound from "./NotFound";
<<<<<<< HEAD
import FriendListPage from "./FriendListPage";
import FriendSearchPage from "./FriendSearchPage";
import NoticeListPage from "./NoticeListPage";
import ProjectListPage from "./ProjectListPage";
import ProjectCreatePage from "./ProjectCreatePage";
import TestPage from "./TestPage";
import TestDetailPage from "./TestDetailPage";
import MyPage from "./MyPage";
import CalendarPage from "./CalendarPage";
import ArticleCreatePage from "./ArticleCreatePage";
import ProjectDetailPage from "./ProjectDetailPage";
=======
import LoginPage from "./auth/LoginPage";
import SignupPage from "./auth/SignupPage";
import MyPage from "./user/MyPage";
import CalendarForm from "../components/user/CalendarForm";
import FriendListPage from "./friend/FriendListPage";
import NoticeListPage from "./notice/NoticeListPage";
import ArticleCreatePage from "./project/ArticleCreatePage";
import ProjectDetailPage from "./project/ProjectDetailPage";
import ProjectListPage from "./project/ProjectListPage";
import ProjectCreatePage from "./project/ProjectCreatePage";
>>>>>>> 51e779e6d36067df8523b27aca0c76396e201055

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
      <Route path='/friend/search' element={<FriendSearchPage />} />
      <Route path='/notice' element={<NoticeListPage />} />

      <Route path='/mypage' element={<MyPage />} />

      <Route path='/calendar' element={<CalendarForm />} />

      <Route path='/*' element={<NotFound />} />
    </Routes>
  )
};
