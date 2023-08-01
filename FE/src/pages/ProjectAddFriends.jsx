import { useState } from "react";
import axios from "axios";

const ProjectAddFriends = () => {
  const searchUsers = ''
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([
    {
      id: '김태경',
      nickname: '김태경'
    },
    {
      id: '정도현',
      nickname: '김태경'
    },
    {
      id: '김재현',
      nickname: '김태경'
    },
    {
      id: '김영도',
      nickname: '김태경'
    },
    {
      id: '김명진',
      nickname: '김태경'
    },
    {
      id: '이정명',
      nickname: '김태경'
    }
  ]);
  const [selectedUsers, setSelectedUsers] = useState([])

  const handleSearchFriends = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken")
      const response = await axios.get(`${searchUsers}?query=${searchQuery}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
      });
      const searchResultsData = response.data
      setSearchResults(searchResultsData)
    } catch (error) {
      console.error("서버에서 유저 검색에 실패했습니다", error)
    }
  }
  const addFriendsList = (userId) => {
    setSelectedUsers([...selectedUsers, userId])
  }
  const removeFriendsList = (userId) => {
    const updateFriends = selectedUsers.filter((id) => id !== userId)
    setSelectedUsers(updateFriends)
  }
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
            <p key={userId} onClick={() => removeFriendsList(userId)}>{userId}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectAddFriends;
