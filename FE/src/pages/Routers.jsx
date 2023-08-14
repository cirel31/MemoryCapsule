import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import MainPage from "./MainPage";
import NotFound from "./NotFound";
import LoginPage from "./auth/LoginPage";
import FindPassWordPage from "./auth/FindPassWordPage";
import SignupPage from "./auth/SignupPage";
import MyPage from "./user/MyPage";
import EditProfilePage from "./user/EditProfilePage";
import UserProfilePage from "./user/UserProfilePage";
import CalendarForm from "../components/user/CalendarForm";
import FriendPage from "./friend/FriendPage";
import NoticeListPage from "./notice/NoticeListPage";
import PostCreatePage from "./PostCreatePage";
import ArticleCreatePage from "./project/ArticleCreatePage";
import ProjectDetailPage from "./project/ProjectDetailPage";
import ProjectListPage from "./project/ProjectListPage";
import ProjectCreatePage from "./project/ProjectCreatePage";
import InviteProject from "./project/InviteProject";
import KakaoLoginPage from "./auth/KakaoLoginPage";
import ProjectLockerPage from "./project/ProjectLockerPage";
import SendPresentPage from "./project/SendPresentPage";
import KakaoSharePage from "./user/KakaoSharePage";

export default function Routers() {

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/find-password' element={<FindPassWordPage />} />
      <Route path='/profile' element={<UserProfilePage />} />
      <Route path='profile/edit' element={<EditProfilePage />} />
      <Route path='/main' element={<MainPage />} />
      <Route path='/project' element={<ProjectListPage />} />
      <Route path='/project/create' element={<ProjectCreatePage />} />
      <Route path='/project/:projectId' element={<ProjectDetailPage />} />
      <Route path='/project/:projectId/article' element={<ArticleCreatePage />} />
      <Route path='/project/invite' element={<InviteProject />}/>
      <Route path='/project/locker' element={<ProjectLockerPage />} />
      <Route path='/project/present/:giftUrl' element={<SendPresentPage />} />
      <Route path='/friend' element={<FriendPage />} />
      <Route path='/notice' element={<NoticeListPage />} />
      <Route path='/notice/postcreate' element={<PostCreatePage />} />
      

      <Route path='/mypage' element={<MyPage />} />
      <Route path='/share' element={<KakaoSharePage />} />

      <Route path='/calendar' element={<CalendarForm />} />
      
      {/* 카카오 테스트 Router */}
      <Route path='/login/kakao' element={<KakaoLoginPage />} />

      <Route path='/*' element={<NotFound />} />
    </Routes>
  )
};
