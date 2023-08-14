import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import {useSelector} from "react-redux";
import "../../styles/MainPage.scss"
import main_bg from "../../assets/images/mainpage/Mainback.svg"
import search_picto from "../../assets/images/mainpage/search.svg"
import clamp from "../../assets/images/mainpage/clamp.svg"
import plus_btn from "../../assets/images/mainpage/plus.svg"
import right_btn from "../../assets/images/mainpage/right.svg"
import left_btn from "../../assets/images/mainpage/left.svg"
import start_btn from "../../assets/images/mainpage/start.svg"
import end_btn from "../../assets/images/mainpage/end.svg"
import tag_label from "../../assets/images/mainpage/Tag.svg"
import kokona from "../../assets/images/kokona.png";

const ProjectListPage = () => {
  const [isHovered, setIsHovered] = useState(null)
  const [selectedPost, setSelectedPost] = useState(null)
  const [isModal, setIsModal] = useState(false)
  const baseURL = 'https://i9a608.p.ssafy.io:8000'
  const subURL = '/project/myproject'
  const user = useSelector((state) => state.userState.user) || null
  const [projects, setProjects] = useState([

  ]);
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProjects, setFilteredProjects] = useState([])
  
  
  useEffect(() => {
    const userId = user?.userId || ''
    console.log(userId)
    axios.get(`${baseURL}${subURL}`, {
      headers: {
        "userId": userId,
      }
    })
        .then((response) => {
          console.log('프로젝트 리스트 가져오기 : ', response.data)
          setProjects(response.data);
        })
        .catch((error) => {
          console.error("프로젝트 리스트 가져오기 실패", error);
          console.error(error.code)
        });
  }, []);
  
  useEffect(() => {
    const results = projects.filter(project =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(results);
  }, [searchTerm, projects])
  
  const handleMouseEnter = (id) => {
    setIsHovered(id)
  };
  const handleMouseLeave = () => {
    setIsHovered(null)
  }
  const openModal = (id) => {
    const postIndex = projects.findIndex((post => post.id === id))
    setSelectedPost(projects[postIndex])
    setIsModal(true)
  }
  const closeModal = () => {
    setSelectedPost(null)
    setIsModal(false)
  }

  const [currentSection, setCurrentSection] = useState(0);

  const currentPosts = filteredProjects.slice(
    currentSection,
    (currentSection + 3),
  );

  const startBTN = (e) => {
    setCurrentSection((prev) => 0);
  };
  const leftBTN = (e) => {
    setCurrentSection((prev) => Math.max(prev - 1, 0));
  };
  const rightBTN = (e) => {
    setCurrentSection((prev) => Math.min(prev + 1, Math.ceil(projects.length ) - 1));
  };
  const endBTN = (e) => {
    setCurrentSection((prev) => projects.length  - 1);
  };
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  Modal.setAppElement("#root");

  return (
      <div className="main_project_body">

        <img src={main_bg} className="main_project_back"/>
        <div className="bg_blur"></div>
        <div className="footerbar">
        </div>
        <div className="search_bar">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="프로젝트 검색..."
          />
          <button onClick={handleSearchChange}><img src={search_picto}/></button>
        </div>
        <div className="decoration_1"></div>
        <div className="decoration_2"></div>
        <div className="main_project_list_body">
          {filteredProjects.length === 0 ? (
            <div>

              <div className="project_is_none">
                <img src={clamp} className="deco_clamp2"/>
                <Link to='/project/create'>
                  <button>
                    <img src={plus_btn}/>
                  </button>
                </Link>
                <p>아직 제작한 캡슐이 없어요!</p>
              </div>
            </div>
          ) : (
            <div className="pjt_lst_body">

              {currentPosts.map((project) => (
                <div
                  key={project.id}
                  className={`project_shortcut ${(isHovered === project.id) ? "project_shortcut_hovered" : ""}`}
                  onMouseEnter={() => handleMouseEnter(project.id)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => openModal(project.id)}
                >
                  <img src={clamp} className="deco_clamp"/>
                  <img 
                    src={project.imgUrl} 
                    alt="이미지 없음"
                    onError={(e) => {e.target.src = kokona}}
                    className="photos"/>
                  <p>{project.title}</p>
                </div>
              ))}
            </div>
          )}

        </div>

        <Modal isOpen={isModal} onRequestClose={closeModal} className="main_modal_body">
          {selectedPost && (
            <div>
              <div>
                <img
                  src={selectedPost.imgUrl}
                  alt="이미지 없음"
                  onError={(e) => {e.target.src = kokona}}
                />
                <div className="black"></div>
                {/*{(selectedPost.userList.length === 1) ? (<p>나만의 기록</p>) : (<p>친구와의 기록</p>)}*/}
              </div>
              <img src={tag_label} className="tag_lab"/>
              <div className="detail_shortcut_contents">
                <h2>
                  {selectedPost.title}
                </h2>
                <p>현재까지 등록된 추억 : {selectedPost.artielcNum}</p>
                <h3>
                  <hr/>
                  내용 : {selectedPost.content}
                  <hr/>
                  시작 :  {selectedPost.started.slice(2,4)}년 {selectedPost.started.slice(5, 7)}월 {selectedPost.started.slice(8, 10)}일
                  <hr/>
                  종료 :  {selectedPost.ended.slice(2,4)}년 {selectedPost.ended.slice(5, 7)}월 {selectedPost.ended.slice(8, 10)}일
                </h3>
              </div>
              <Link to={`/project/${selectedPost.id}`} className="go_detail">이 캡슐에 추억쌓기</Link>
            </div>
          )}
        </Modal>
        <div className="move_btn">
          <div className="move_btn_group_1">
            <button onClick={leftBTN}><img src={left_btn}/></button>
            <button onClick={rightBTN}><img src={right_btn}/></button>
          </div>

          <div className="move_btn_group_2">
            <button onClick={startBTN}><img src={start_btn}/></button>

            <button onClick={endBTN}><img src={end_btn}/></button>

          </div>
        </div>

        <div className="project_create_btn">
          <Link to='/project/create'>
            <button className="create_button_styles">
              <p>새로운 캡슐 생성하기</p>
              <img src={plus_btn}/>
            </button>
          </Link>
        </div>

      </div>
  );
}

export default ProjectListPage;
