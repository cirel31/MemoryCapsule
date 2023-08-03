import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialState = {
  userId: null,
  isLoggedIn: false,
  accessToken: null,
  user: null,
  point: 100,
}

const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      console.log('이메일 로그인 성공')
    },
    logout: (state) => {
      state.isLoggedIn = false;
      console.log('이메일 로그아웃 성공');
    },
    setUser: (state, action) => {
      state.user = action.payload
      console.log(state.user)
    },
    renewToken: (state, action) => {
      state.accessToken = action.payload
    }
  }
})

export const {
  login,
  logout  ,
  setUser,
  renewToken,
} = userSlice.actions

export default userSlice.reducer
