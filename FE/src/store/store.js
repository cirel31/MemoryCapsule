import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import userSlice from "./userSlice";
import selectFriendSlice from "./selectFriendSlice";

const store = configureStore({
  reducer: {
    authState: authSlice,
    userState: userSlice,
    friend: selectFriendSlice,
  }
})

export default store