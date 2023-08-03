import {Link} from "react-router-dom";
import ProjectListPage from "./project/ProjectListPage";

const MainPage = () => {
  return (
    <>
      <div style={{textAlign: 'center', width:'100%', height:'600px'}}>
        <ProjectListPage />

        <Link to='/project'>
          프로젝트 페이지로 이동
        </Link>
      </div>
    </>
  )
}

export default MainPage;
