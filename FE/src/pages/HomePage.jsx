import { useNavigate } from "react-router-dom";
import "../styles/HomePage.scss"
import home_bg from "../assets/images/home/home_background.svg";
const HomePage = () => {
  const navigate = useNavigate()
  const handlePageLogin = () => {
    navigate('/login')
  }

  return (
    <>
      <div onClick={handlePageLogin} className="home_body">
        <img src={home_bg} className="homepage"/>
        <div className="home_text">
          <div>
            <p>추억을 쌓고 선물하기</p>
            <div className="home_text_baseline"></div>
          </div>
          <div style={{marginTop:"5%"}}>
            <div className="home_text_highlight">
              <p className="highlight_txt">메모리캡슐</p>
              <p>에서</p>
            </div>
            <div className="home_text_baseline"></div>
          </div>
          <div style={{marginTop:"5%"}}>
            <p> 소중한 사람들과  함께하세요!</p>
            <div className="home_text_baseline"></div>
          </div>
        </div>
        <div className="clickanyehere">
          <p>Click anywhere</p>
          <p>To start!</p>
        </div>
      </div>
    </>
  )
}

export default HomePage;
