import axios from "axios";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const loginUserThunk = createAsyncThunk(
    'user/loginUser',
    async (loginData, { dispatch, rejectWithValue }) => {
      try {
        const response = await axios.post(`/user/login`, loginData, {
          headers: { "Content-Type": "application/json" }
        })
        console.log(response.data)
        sessionStorage.setItem("userIdx", response.data.userIdx)
        sessionStorage.setItem("accessToken", response.data.accessToken)
        sessionStorage.setItem("refreshToken", response.data.refreshToken)
        console.log(sessionStorage)
        const userIdx = sessionStorage.getItem("userIdx");
        console.log(userIdx)
        dispatch(fetchUserInfoThunk(userIdx))
      } catch (error) {
        console.error("서버와 통신 실패로 로그인 에러 발생", error)
        return rejectWithValue(error)
      }
    }
)

export const fetchUserInfoThunk = createAsyncThunk(
    'user/fetchUserInfo',
    async (userIdx, { rejectWithValue }) => {
      const accessToken = sessionStorage.getItem("accessToken")
      console.log(accessToken)
      try {
        const response = await axios.get(`/user/${userIdx}/detail`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        console.log(response.data)
        return response.data;
      } catch (error) {
        console.error('유저 정보를 가져오지 못함:', error)
      }
    }
)

export const logoutUserThunk = createAsyncThunk(
    'user/logoutUser',
    async (_, { dispatch, rejectWithValue }) => {
      try {
        // await axios.post('/user/logout');

        sessionStorage.clear();
        console.log('이메일 로그아웃 성공');
      } catch (error) {
        console.error('로그아웃 중 에러 발생:', error)
      }
    }
)

const userSlice = createSlice({
  name: 'userState',
  initialState: {
    isLoggedIn: null,
    accessToken: null,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      console.log('이메일 로그인 성공')
      console.log(sessionStorage)
    },
    logout: (state) => {
      sessionStorage.clear()
      console.log('이메일 로그아웃 성공');
    },
    setUser: (state, action) => {
      console.log('유저 정보 저장 됨 : ', state.user)
      sessionStorage.setItem('userInfo', state.user)
    },
    renewToken: (state, action) => {
      state.accessToken = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(loginUserThunk.fulfilled, (state, action) => {
        })
        .addCase(fetchUserInfoThunk.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchUserInfoThunk.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.user = action.payload;
          console.log(state.user)
        })
        .addCase(logoutUserThunk.fulfilled, (state, action) => {
        })
  }
})

export const {
  login,
  logout  ,
  setUser,
  renewToken,
} = userSlice.actions

export default userSlice.reducer
