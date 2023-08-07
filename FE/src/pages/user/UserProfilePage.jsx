import {Link} from "react-router-dom";
// 기본 이미지 변경 시 뒤에 경로 변경하면 됩니다
import defaultImg from "../../assets/images/stamp/stamp_best.svg"

const UserProfilePage = () => {
  const userNickname = JSON.parse(sessionStorage.getItem("userInfo")).nickname
  const userId = JSON.parse(sessionStorage.getItem("userInfo")).email
  const userImg = JSON.parse(sessionStorage.getItem("userInfo")).file
  console.log('닉네임 : ', userNickname)
  console.log('아이디 : ', userId)
  return (
    <>
      <div>
        {/* 프로필 이미지 + 닉네임 + 유저 ID(email) */}
        <div>
          <img src={userImg ? userImg:defaultImg} alt="프로필 이미지를 불러올 수 없습니다." style={{width:"200px"}}/>
          <p>{userNickname}</p>
          <p>{userId}</p>
        </div>
        {/* 마이페이지 이동 버튼 */}
        <Link to='/mypage'>
          <button>시작하기</button>
        </Link>
      </div>
    </>
  )
}

export default UserProfilePage
