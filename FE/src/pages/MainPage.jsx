import {Link} from "react-router-dom";

const MainPage = () => {
  return (
    <>
      <div style={{textAlign: 'center', width:'100%', height:'600px'}}>
        <h1>현재는 아무것도 없는 메인페이지</h1>

        <Link to='/project'>
          프로젝트 페이지로 이동
        </Link>
      </div>
    </>
  )
}

export default MainPage;
