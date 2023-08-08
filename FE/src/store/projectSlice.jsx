import axios from "axios";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {fetchUserInfoThunk} from "./userSlice";

export const searchProjectInvite = createAsyncThunk(
  'user/searchProjectInvite',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(`/invite`,  {
        headers: {
          "userIdx": "6"
        }
      })
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error("서버와 통신 실패로 초대된 프로젝트 탐색 에러", error)
      return rejectWithValue(error)
    }
  }
)

const projectSlice = () => {

}

// export const {
//   searchProjectInvite,
// } = projectSlice.actions

export default projectSlice.reducer