import CalendarForm from "../../components/user/CalendarForm";
import UserInfoHeaderForm from "../../components/user/UserInfoHeaderForm";
import "../../styles/MyPage.scss";
import CurrentProjectsPage from "./CurrentProjectsPage";
import InviteProject from "../project/InviteProject";
import {Link, useNavigate} from "react-router-dom"
import AnnounceList from "../../components/announce/AnnounceList";
import {useEffect} from "react";
import {useSelector} from "react-redux";


const MyPage = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.userState.user) || null

  useEffect(() => {
    const accessToken = sessionStorage?.getItem("accessToken")
    if (!accessToken) {
      navigate('/login')
    }
  }, [user])

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

            <div className="capsule_box">
              <Link to="/project/locker">
                <div className="box_graphic">

                </div>
              </Link>
            </div>
            <div>
              {/*<ProjectLockerPage />*/}
            </div>

        </div>
    </div>
  )
}

export default MyPage;
