import CalendarForm from "../../components/user/CalendarForm";
import UserInfoHeaderForm from "../../components/user/UserInfoHeaderForm";
import {useDispatch} from "react-redux";
import {logoutUserThunk} from "../../store/userSlice";
import "../../styles/MyPage.scss";
import CurrentProjectsPage from "./CurrentProjectsPage";
import InviteProject from "../project/InviteProject";
import locker_img from "../../assets/images/present_box.jpg";
import {Link} from "react-router-dom"
import AnnounceList from "../../components/announce/AnnounceList";
import ProjectLockerPage from "../project/ProjectLockerPage";


const MyPage = () => {
  const dispatch = useDispatch();
  const LogoutUser = () => {
    console.log('로그아웃 버튼 작동 테스트', sessionStorage)
    dispatch(logoutUserThunk());
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
            <h1 className="mypage_notice_h1">초대받은 캡슐</h1>
            <div className="parting_line"></div>
            <div>
              <InviteProject />
            </div>
            <br/>
            <h1 className="mypage_notice_h1">공지사항</h1>
            <div className="parting_line"></div>
            <AnnounceList page={0} size={3}/>
            <div>
            </div>
            <br/>
            <h1 className="mypage_notice_h1">제작중인 캡슐 현황</h1>
            <div className="parting_line"></div>
            <div>
              <CurrentProjectsPage />
            </div>
            <br/>
            <br/>
            <h1 className="mypage_notice_h1">보관함</h1>
            <div className="parting_line"></div>
            <div>
              <ProjectLockerPage />
            </div>

        </div>
    </div>
  )
}

export default MyPage;
