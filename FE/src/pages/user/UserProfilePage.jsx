import defaultImg from "../../assets/images/stamp/stamp_best.svg"
import {useEffect, useState} from "react";
import {fetchUserInfoThunk} from "../../store/userSlice";
import {useDispatch, useSelector} from "react-redux";
import "../../styles/LoginProfile.scss"
import profile_bg from "../../assets/images/login_profile/profile_bg.svg"

const UserProfilePage = () => {
  const dispatch = useDispatch()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const loginCheck = !!sessionStorage.getItem("accessToken")
    setIsLoggedIn(loginCheck)
    if (isLoggedIn) {
      const idx = sessionStorage.getItem("userIdx")
      dispatch(fetchUserInfoThunk(idx))
    }
  }, [sessionStorage.getItem("accessToken")])

  const user = useSelector((state) => state.userState.user)
  const user_nickname = user?.nickname || 'james'
  const user_email = user?.email || 'jimmy@raynersraiders.com'
  const user_point = user?.point
  const user_img = user?.imgUrl || defaultImg

  return (
    <>

      <div className="login_profile_body">
        <img src={profile_bg} alt="이미지 안뜨네요" className="login_profile_page"/>
        <div className="login_profile_box">
          <div className="login_profile_form">
            <img src={user_img ? user_img:defaultImg} alt="프로필 이미지를 불러올 수 없습니다."/>
            <h1>{user_nickname}</h1>
            <p>{user_email}</p>
          </div>
          {/* 마이페이지 이동 버튼 */}
          <a href='/project'>
            <button>시작하기</button>
          </a>
        </div>

      </div>
    </>
  )
}

export default UserProfilePage
