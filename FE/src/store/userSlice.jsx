import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = ''
const USER_URL = ''

const initialState = {
  userId: null,
  accessToken: null,
  redirectToken: null,
  isLoggedIn: false,
  user: null,
  point: 100,
}

const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      console.log('이메일 로그인 성공');
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.accessToken = null;
      state.redirectToken = null;
      console.log('이메일 로그아웃 성공');
    },
    setUser: (state, action) => {
      state.user = action.payload
      console.log(state.user)
    }
  }
})

export const { login, logout  , setUser} = userSlice.actions

// 비동기 액션
export const fetchUser = (token) => async (dispatch) => {
  try {
    const response = await axios.get(USER_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userData = response.data;
    dispatch(setUser(userData));
  } catch (error) {
    console.error('유저 정보를 가져오지 못함:', error);
  }
};

export default userSlice.reducer
