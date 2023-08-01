// import authState from "../../store/authState";
import { IconContext } from "react-icons/lib";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import styled from "styled-components";
import icon01 from "../../../assets/images/nav_icon_test_01.png"
import icon02 from "../../../assets/images/nav_icon_test_02.png"


const SidebarNav = styled.nav`
  background: #FF7474FF;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const ImageWithText = styled.div`
  position: relative;
  width: 200px;
`;

const Image = styled.div`
  background-image: url(${icon01});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100px;
`;

const Text = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  color: white;
`;



export default function Navbar() {
  const [sidebar, setSidebar] = useState(false)
  const showSidebar = () => setSidebar(!sidebar)

  const navigate = useNavigate()
  const handlePageBack = () => {
    navigate(-1)
  }
  const handlePageHome = () => {
    navigate('/')
  }

  const location = useLocation()

  useEffect(() => {
    setSidebar(false)
  }, [location])

  return (
    <>
      <IconContext.Provider>
        <div>
          <button style={{marginTop: '2rem'}} onClick={showSidebar}>사이드바 테스트</button>
        </div>
        <SidebarNav sidebar={sidebar}>
          <nav>
            <div onClick={showSidebar} >
              <ImageWithText>
                <Image />
                <Text>안녕하세요</Text>
              </ImageWithText>
            </div>
            <div>
              <button onClick={handlePageHome}>
                Home
              </button>
            </div>
            <div>
              <button onClick={handlePageBack}>
                Back
              </button>
            </div>
            <div>
              <Link to='/login'>
                <button>
                  Login
                </button>
              </Link>
              <Link to='/signup'>
                <button>
                  signup
                </button>
              </Link>
            </div>
            <div>
              <Link to='/main'>
                <button>
                  main
                </button>
              </Link>
            </div>
            <div>
              <Link to='/project'>
                <button>
                  project
                </button>
              </Link>
            </div>
            <div>
              <Link to='/friend'>
                <button>
                  friend
                </button>
              </Link>
            </div>
            <div>
              <Link to='/notice'>
                <button>
                  notice
                </button>
              </Link>
            </div>
            <div>
              <Link to='/announce'>
                <button>
                  announce
                </button>
              </Link>
            </div>
          </nav>
        </SidebarNav>
      </IconContext.Provider>
    </>
  )
}