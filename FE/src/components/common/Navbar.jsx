// import authState from "../../store/authState";
import { IconContext } from "react-icons/lib";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import styled from "styled-components";


const SidebarNav = styled.nav`
  background: #15171c;
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
          <button onClick={showSidebar}>사이드바 테스트</button>
        </div>
        <SidebarNav sidebar={sidebar}>
          <nav>
            <div>
              <button onClick={showSidebar}>사이드바 집어넣기</button>
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