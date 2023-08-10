import {Link} from "react-router-dom";
import ProjectListPage from "./project/ProjectListPage";

const MainPage = () => {
  return (
    <>
      <div>

        <ProjectListPage />

        <Link to='/main'>
          프로젝트 페이지로 이동
        </Link>
      </div>
    </>
  )
}

export default MainPage;
