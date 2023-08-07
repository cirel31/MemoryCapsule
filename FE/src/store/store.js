import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session"
import authSlice from "./authSlice";
import userSlice from "./userSlice";
import selectFriendSlice from "./selectFriendSlice";

const persistConfig = {
  key: 'user',
  storage,
}

const persistedUserReducer = persistReducer(persistConfig, userSlice)

const store = configureStore({
  reducer: {
    authState: authSlice,
    userState: persistedUserReducer,
    friend: selectFriendSlice,
  }
})

export const persistor = persistStore(store)
export default store
