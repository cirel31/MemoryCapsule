import {Link, useNavigate} from "react-router-dom";
import sample_img from "../../assets/images/kokona.png"
import friend_picto from "../../assets/images/mypage/friend_picto.svg"
import edit_picto from "../../assets/images/mypage/edit_picto.svg"
import "../../styles/MyPage.scss"
import {useSelector} from "react-redux";
const UserInfoHeaderForm = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.userState.user)
  const userNickname = user?.nickname || '김싸피'
  const userEmail = user?.email || 'jdragon@ssafy.com'
  const friendsCount = user?.totalFriend || 0
  const userProfileImg = user?.imgUrl || sample_img
  const handleEditProfile = () => {
    navigate('/profile/edit')
  }
  
  return (
    <div>
      <div className="mypage_header">

        <div className="header_sets">
          <div className="header_image">
            <img src={userProfileImg} alt="프로필 이미지" className="header_profile_img"/>

          </div>
          <div className="header_user_info1">
            <p className="header_user_name">{userNickname}</p>
            <p className="header_user_email">{userEmail}</p>
          </div>
          <div className="header_user_friend">
            <Link to="/friend" style={{textDecoration:"none"}}>
              <div className="header_friend_btn">
                <img src={friend_picto} className="header_friend_picto"/>
                <p className="header_user_friend_txt">등록된 친구</p>
              </div>
            </Link>

            <p className="header_user_friend_txt2">{friendsCount} 명</p>
          </div>
          <div className="header_edit_profile_btn" onClick={handleEditProfile}>
            <p className="profile_edit_txt">프로필 수정</p>
            <img src={edit_picto}/>
          </div>
        </div>
        
      </div>
    </div>
  )
}
export default UserInfoHeaderForm;
