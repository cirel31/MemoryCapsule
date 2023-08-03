import CalendarForm from "../../components/user/CalendarForm";
import UserInfoHeaderForm from "../../components/user/UserInfoHeaderForm";
import AnnounceUserViewPage from "../notice/AnnounceUserViewPage";
import {useDispatch} from "react-redux";
import {logout} from "../../store/userSlice";
import "../../styles/MyPage.scss";


const MyPage = () => {
  const dispatch = useDispatch();
  const LogoutUser = () => {
    console.log('로그아웃 버튼 작동 테스트', sessionStorage)
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("redirectToken");
    dispatch(logout());

  }

  return (
    <div className="big_body">
        <div className="mypage_layout">
            <div>
                <UserInfoHeaderForm />
            </div>
            {/*<br/>*/}
            <h1 className="mypage_h1">MYPAGE</h1>
            <div className="parting_line"></div>
            <div>
                <CalendarForm />
            </div>
            <br/>
            <h1 className="mypage_notice_h1">공지사항</h1>
            <div className="parting_line"></div>
            <div>
                <AnnounceUserViewPage />
            </div>
            <div>
                <button onClick={LogoutUser}>로그아웃 버튼</button>
            </div>
        </div>
    </div>
  )
}

export default MyPage;
