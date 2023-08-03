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
            <br/>
            <h1 className="mypage_notice_h1">제작중인 캡슐 현황</h1>
            <div className="parting_line"></div>
            <div>
              <p>알약들 나오는 페이지 만들어줘 만들어 줘 만들어 "줘"</p>
              <button onClick={LogoutUser}>로그아웃 버튼</button>
            </div>
            <br/>
            <br/>
            <h1 className="mypage_notice_h1">보관함</h1>
            <div className="parting_line"></div>

        </div>
    </div>
  )
}

export default MyPage;
