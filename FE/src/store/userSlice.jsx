import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  accessToken: null,
  isLoggedIn: false,
  user: null,
}

const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true
      state.accessToken = action.payload
      console.log('이메일 로그인 성공', state.accessToken)
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.accessToken = null
      console.log('이메일 로그아웃 성공')
    }
  }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
