import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResults: [
    {
      id: '1',
      nickname: '태경'
    },
    {
      id: '2',
      nickname: '도현'
    },
    {
      id: '3',
      nickname: '재현'
    },
    {
      id: '4',
      nickname: '영도'
    },
    {
      id: '5',
      nickname: '명진'
    },
    {
      id: '6',
      nickname: '정명'
    }
  ],
  selectedPeople: [],
}

const friendSlice = createSlice({
  name: 'friendState',
  initialState,
  reducers: {
    setSearchResult: (state, action) => {
      state.searchResults = action.payload
    },
    addFriends: (state, action) => {
      state.selectedPeople.push(action.payload)
    },
    removeFriends: (state, action) => {
      state.selectedPeople = state.selectedPeople.filter((user) => user.userId !== action.payload)
    },
    removeAll: (state) => {
      state.selectedPeople = []
    }
  }
})

export const { setSearchResult, addFriends, removeFriends, removeAll } = friendSlice.actions

export default friendSlice.reducer
