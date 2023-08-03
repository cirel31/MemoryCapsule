import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSearchResult, addFriends, removeFriends } from "../../store/selectFriendSlice";

const ProjectAddFriends = () => {
  const dispatch = useDispatch()
  const searchUsers = ''
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchFriends = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken")
      const response = await axios.get(`${searchUsers}?query=${searchQuery}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
      });
      const searchResultsData = response.data
      dispatch(setSearchResult(searchResultsData))
    } catch (error) {
      console.error("서버에서 유저 검색에 실패했습니다", error)
    }
  }
  const addFriendsList = (userId) => {
    dispatch(addFriends(userId))
  }
  const removeFriendsList = (userId) => {
    dispatch(removeFriends(userId))
  }

  const selectedUsers = useSelector((state) => state.friend.selectedPeople)
  const searchResults = useSelector((state) => state.friend.searchResults)

  return (
    <div>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="검색할 유저를 입력하세요"
        />
        <button onClick={handleSearchFriends}>검 색</button>
      </div>
      <div>
        {searchResults.map((user, index) => (
          <div key={user.id} onClick={() => addFriendsList(user.id)}>
            <p>{user.nickname}({user.id})</p>
          </div>
        ))}
      </div>
      <div>
        <h2>선택한 유저 리스트</h2>
        <div>
          {selectedUsers.map((userId) => (
            <div key={userId} style={{display:"flex", alignItems:"center"}}>
              <p>{userId}    </p>
              <button onClick={() => removeFriendsList(userId)}>제외하기</button>
            </div>
            
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectAddFriends;
