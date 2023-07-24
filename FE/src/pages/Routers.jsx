import React from "react";
import {Route, Routes} from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import MainPage from "./MainPage";
import NotFound from "./NotFound";
import ProjectListPage from "./ProjectListPage";
import ProjectCreatePage from "./ProjectCreatePage";

export default function Routers() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/main' element={<MainPage />} />
      <Route path='/project' element={<ProjectListPage />} />
      <Route path='/project/create' element={<ProjectCreatePage />} />


      <Route path='/*' element={<NotFound />} />
    </Routes>
  )
};
