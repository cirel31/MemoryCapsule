// import authState from "../../store/authState";
import { IconContext } from "react-icons/lib";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import styled from "styled-components";
import icon01 from "../../../assets/images/nav_icon_test_01.png";
import logo_white from "../../../assets/images/resource/Logo&text_white.svg";
import "../../../styles/NavBar.scss";
import nav_line from "../../../assets/images/resource/nav_bar_line.svg"
import btn_deco from "../../../assets/images/resource/nav_button_deco.svg"
import profile_img from "../../../assets/images/stamp/stamp_best.svg"
import navbar_activate from "../../../assets/images/resource/nav_bar_activate_inactivate_btn.svg"
import icon02 from "../../../assets/images/nav_icon_test_02.png"


const SidebarNav = styled.nav`
  width: 26%;
  min-width: 400px;
  height: 100%;
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
            <button onClick={showSidebar} className="nav_bar_active_btn"><img src={navbar_activate} className="navbar_pictogram"/></button>
          </div>

          <SidebarNav sidebar={sidebar}>

            <nav className="nav_bar">


              <div className="nav_bar2">
                <div onClick={handlePageHome} >

                  <img src={logo_white} alt="LOGO" className="logo"/>

                </div>
                <img src={nav_line} className="line"/>

                {/*<div>*/}
                {/*  <button onClick={handlePageBack}>*/}
                {/*    Back*/}
                {/*  </button>*/}
                {/*</div>*/}
                <div className="profile_box">
                  <div className="profile_img_setting">
                    {/*프로필 사진 있을경우 아래 className="profile_img" 달려있는
                부분에 프로필사진, 프로필사진이 없을 경우 디폴트 이미지는 현재 지정된 사진으로*/}
                    <img src={profile_img} className="profile_img"/>
                  </div>

                  {/*USER ID 있는 부분 닉네임 뜨게*/}
                  <p className="profile_id">USER ID</p>

                  {/*example@kakao.com 부분 이메일 뜨게*/}
                  <p className="profile_email">example@kakao.com</p>

                  <div className="point_box">
                    <p className="point_box_txt"> my points</p>

                    {/*이 아래껀 포인트 떠야함*/}
                    <p className="point_box_txt2">44444</p>
                  </div>
                  {/*<div>*/}
                  {/*  <Link to='/login'>*/}
                  {/*    <button>*/}
                  {/*      Login*/}
                  {/*    </button>*/}
                  {/*  </Link>*/}
                  {/*  <Link to='/signup'>*/}
                  {/*    <button>*/}
                  {/*      signup*/}
                  {/*    </button>*/}
                  {/*  </Link>*/}
                  {/*</div>*/}
                </div>
                <div className="nav_btn_group">
                  <div>
                    <Link to='/main' className="link_txt" >
                      <button className="nav_button" >
                        <img src={btn_deco} className="button_deco"/>
                        <p>MY PAGE</p>
                      </button>
                    </Link>
                  </div>
                  <div>
                    <Link to='/project' className="link_txt">
                      <button className="nav_button" >
                        <img src={btn_deco} className="button_deco"/>
                        <p>MY MEMORY</p>
                      </button>
                    </Link>
                  </div>
                  <div>
                    <Link to='/friend' className="link_txt">
                      <button className="nav_button" >
                        <img src={btn_deco} className="button_deco"/>
                        <p>CAPSULE BOX</p>
                      </button>
                    </Link>
                  </div>
                  <div>
                    <Link to='/announce' className="link_txt">
                      <button className="nav_button" >
                        <img src={btn_deco} className="button_deco"/>
                        <p>NOTICE</p>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              <button onClick={showSidebar} className="nav_bar_active_btn2"><img src={navbar_activate} className="navbar_pictogram"/></button>

              {/*<div onClick={showSidebar}>*/}
              {/*  <ImageWithText>*/}
              {/*    <Image />*/}
              {/*    <Text>안녕하세요</Text>*/}
              {/*  </ImageWithText>*/}
              {/*</div>*/}
            </nav>
          </SidebarNav>
        </IconContext.Provider>
      </>
  )
}