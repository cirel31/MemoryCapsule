import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate()
  const handlePageLogin = () => {
    navigate('/login')
  }

  return (
    <>
      <div onClick={handlePageLogin} style={{textAlign: 'center'}}>
        <div>
            <p>
              추억을 쌓고 선물하기
            </p>
            <p>
              메모리 캡슐에서
            </p>
            <p> 소중한 사람들과  함께하세요!</p>
        </div>
      </div>
    </>
  )
}

export default HomePage;
