import CalendarForm from "../../components/user/CalendarForm";
import UserInfoHeaderForm from "../../components/user/UserInfoHeaderForm";
import {useDispatch} from "react-redux";
import {logout} from "../../store/userSlice";
import "../../styles/MyPage.scss";
import CurrentProjectsPage from "./CurrentProjectsPage";
import InviteProject from "../project/InviteProject";
import AnnounceList from "../../components/announce/AnnounceList";


const MyPage = () => {
  const dispatch = useDispatch();
  const LogoutUser = () => {
    console.log('로그아웃 버튼 작동 테스트', sessionStorage)
    dispatch(logout());
    window.location.href ='/login'
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
            <div>
              <InviteProject />
            </div>
            <br/>
            <h1 className="mypage_notice_h1">공지사항</h1>
            <div className="parting_line"></div>
            <div>
                <AnnounceList page={0} size={3}/>
            </div>
            <br/>
            <h1 className="mypage_notice_h1">제작중인 캡슐 현황</h1>
            <div className="parting_line"></div>
            <div>
              <CurrentProjectsPage />
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
