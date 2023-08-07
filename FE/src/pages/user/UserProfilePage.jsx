// 기본 이미지 변경 시 뒤에 경로 변경하면 됩니다
import defaultImg from "../../assets/images/stamp/stamp_best.svg"
import {useEffect, useState} from "react";
import {fetchUserInfoThunk} from "../../store/userSlice";
import {useDispatch, useSelector} from "react-redux";

const UserProfilePage = () => {
  const dispatch = useDispatch()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const loginCheck = !!sessionStorage.getItem("accessToken")
    console.log(isLoggedIn)
    setIsLoggedIn(loginCheck)
    if (isLoggedIn) {
      const idx = sessionStorage.getItem("userIdx")
      dispatch(fetchUserInfoThunk(idx))
    }
  }, [sessionStorage.getItem("accessToken")])

  const user = useSelector((state) => state.userState.user)
  const user_nickname = user?.nickname || 'james'
  const user_email = user?.email || 'jimmy@raynersraiders.com'
  const user_point = user?.point || 1000
  const user_img = user?.imgUrl || defaultImg

  return (
    <>
      <div>
        {/* 프로필 이미지 + 닉네임 + 유저 ID(email) */}
        <div>
          <img src={user_img ? user_img:defaultImg} alt="프로필 이미지를 불러올 수 없습니다." style={{width:"200px"}}/>
          <p>{user_nickname}</p>
          <p>{user_email}</p>
        </div>
        {/* 마이페이지 이동 버튼 */}
        <a href='/mypage'>
          <button>시작하기</button>
        </a>
      </div>
    </>
  )
}

export default UserProfilePage
