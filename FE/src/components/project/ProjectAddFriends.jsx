import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSearchResult, addFriends, removeFriends } from "../../store/selectFriendSlice";
import Swal from "sweetalert2";

const ProjectAddFriends = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userState.user) || null
  const searchUsers = user.userId
  const [searchQuery, setSearchQuery] = useState("");
  const baseURL = 'https://i9a608.p.ssafy.io:8000'
  const subURL = '/friend/find'
  const handleSearchFriends = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken")
      const response = await axios.get(`${baseURL}${subURL}/${searchQuery}?host_id=${searchUsers}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
      });
      dispatch(setSearchResult(response.data))
    } catch (error) {
      console.error("서버에서 유저 검색에 실패했습니다", error)
      Swal.fire({
        icon: "error",
        text: "해당 유저가 존재하지 않습니다."
      })
    }
  }
  const addFriendsList = (userId) => {
    dispatch(addFriends(userId))
  }
  const removeFriendsList = (userId) => {
    dispatch(removeFriends(userId))
  }

  const selectedUsers = useSelector((state) => state.friend.selectedPeople)
  const searchResult = useSelector((state) => state.friend.searchResults)

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
        <div onClick={() => addFriendsList(searchResult.userId)}>
          <p>{searchResult.nickname}</p>
        </div>
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
