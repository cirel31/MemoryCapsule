import { createSlice } from "@reduxjs/toolkit";
import {create} from "axios";

const initialState = {
  point: 150,
}

const pointSlice = createSlice({
  name: 'pointState',
  initialState,
  reducers: {
    setPoint: (state, action) => {
      state.point = action.payload
    },
  }
})

export const { setPoint } = pointSlice.actions
export default pointSlice.reducer