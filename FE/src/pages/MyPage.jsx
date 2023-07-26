import CalendarPage from "./CalendarPage";
import UserInfoHeaderPage from "./UserInfoHeaderPage";
import AnnouncePage from "./AnnouncePage";
import AnnounceUserViewPage from "./AnnounceUserViewPage";

const MyPage = () => {

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
    </div>
  )
}

export default MyPage;
