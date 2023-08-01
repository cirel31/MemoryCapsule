import CalendarPage from "./CalendarPage";
import UserInfoHeaderPage from "./UserInfoHeaderPage";
import AnnounceUserViewPage from "./AnnounceUserViewPage";
import {useDispatch} from "react-redux";
import {logout} from "../store/userSlice";

const MyPage = () => {
  const dispatch = useDispatch();
  const LogoutUser = () => {
    console.log('로그아웃 버튼 작동 테스트', sessionStorage)
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("redirectToken");
    dispatch(logout());

  }

  return (
    <div>
      <div>
        <UserInfoHeaderPage />
      </div>
      <br/>
      <div>
        <CalendarPage />
      </div>
      <br/>
      <div>
        <AnnounceUserViewPage />
      </div>
      <div>
        <button onClick={LogoutUser}>로그아웃 버튼</button>
      </div>
    </div>
  )
}

export default MyPage;
