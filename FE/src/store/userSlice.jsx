import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialState = {
  userIdx: null,
  isLoggedIn: false,
  accessToken: null,
  user: null,
  // accessList : 출석
  point: 100,
}

const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = JSON.stringify(action.payload)
      sessionStorage.setItem('loginData', state.isLoggedIn)
      console.log(state.userIdx, ' : 이메일 로그인 성공')
      console.log(sessionStorage)
    },
    logout: (state) => {
      sessionStorage.clear()
      console.log('이메일 로그아웃 성공');
    },
    setUser: (state, action) => {
      state.user = JSON.stringify(action.payload)
      console.log(state.user)
      sessionStorage.setItem('userInfo', state.user)
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
