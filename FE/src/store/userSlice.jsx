import axios from "axios";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Swal from "sweetalert2";

export const loginUserThunk = createAsyncThunk(
    'user/loginUser',
    async (loginData, { dispatch, rejectWithValue }) => {
      const loginURL = 'https://i9a608.p.ssafy.io:8000/user/login'
      try {
        const response = await axios.post(`${loginURL}`, loginData, {
          headers: { "Content-Type": "application/json" }
        })
        sessionStorage.setItem("userIdx", response.data.userIdx)
        sessionStorage.setItem("accessToken", response.data.accessToken)
        sessionStorage.setItem("refreshToken", response.data.refreshToken)
        const userIdx = sessionStorage.getItem("userIdx");
        dispatch(fetchUserInfoThunk(userIdx))
        window.location.href ='/profile'
      } catch (error) {
        if (error.response?.status === 409) {
          Swal.fire(error.response.data)
        }
        return rejectWithValue(error)
      }
    }
)

export const fetchUserInfoThunk = createAsyncThunk(
    'user/fetchUserInfo',
    async (userIdx, { rejectWithValue }) => {
      const accessToken = sessionStorage.getItem("accessToken")
      try {
        const response = await axios.get(`https://i9a608.p.ssafy.io:8000/user/${userIdx}/detail`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        return response.data;
      } catch (error) {
        return rejectWithValue(error)
      }
    }
)

export const logoutUserThunk = createAsyncThunk(
    'user/logoutUser',
    async (_, { dispatch, rejectWithValue }) => {
      const accessToken = sessionStorage.getItem("accessToken")
      try {
        await axios.post(`https://i9a608.p.ssafy.io:8000/user/logout`, _, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        sessionStorage.clear();
      } catch (error) {
        return rejectWithValue(error)
      }
    }
)

export const findPassThunk = createAsyncThunk(
  'user/findPass',
  async ({email, phone}, { dispatch, rejectWithValue }) => {
    const userData = {
      "email" : {email},
      "phone" : {phone},
    }
    try {
      await axios.post(`https://i9a608.p.ssafy.io:8000/user/find_password`, userData, {
        headers: {
          "Content-Type": "application/json"
        }
      })
    } catch (error) {
      return rejectWithValue(error)
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
    },
    logout: (state) => {
      sessionStorage.clear()
    },
    setUser: (state, action) => {
      sessionStorage.setItem('userInfo', state.user)
    },
    renewToken: (state, action) => {
      state.accessToken = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(loginUserThunk.fulfilled, (state, action) => {
          state.isLoggedIn = true
        })
        .addCase(fetchUserInfoThunk.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchUserInfoThunk.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.user = action.payload;
        })
        .addCase(logoutUserThunk.fulfilled, (state, action) => {
          state.isLoggedIn = false
          window.location.href ='/login'
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
