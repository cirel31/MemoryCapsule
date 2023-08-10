import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import "../../styles/testPage.css"
import {useSelector} from "react-redux";
import "../../styles/MainPage.scss"
import main_bg from "../../assets/images/mainpage/Mainback.svg"


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
    const postIndex = projects.findIndex((post => post.idx === id))
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
      <div>
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="프로젝트 검색..."
          />
          <button onClick={handleSearchChange}>검색</button>
        </div>
        <h1>현재 진행 중인 프로젝트</h1>
        {filteredProjects.length === 0 ? (
          <div
            style={{ width: '200px', height: "400px", border:'solid black 1px' }}
          >
            <Link to='/project/create'>
              <button>
                새로운 추억 생성
              </button>
            </Link>
          </div>
        ) : (
          <div>
            {currentPosts.map((project) => (
              <div
                key={project.id}
                className={`normal ${(isHovered === project.idx) ? "chosen" : ""}`}
                onMouseEnter={() => handleMouseEnter(project.idx)}
                onMouseLeave={handleMouseLeave}
                onClick={() => openModal(project.idx)}
                style={{ width: '200px' }}
              >
                프로젝트 제목 : {project.title}
                <img src={project.imgUrl} alt="" style={{ width: '200px' }} />
              </div>
            ))}
          </div>
        )}
        <Modal isOpen={isModal} onRequestClose={closeModal}>
          {selectedPost && (
            <div>
              {console.log(selectedPost)}
              <img src="https://ssafysanta.s3.ap-northeast-2.amazonaws.com/34f4345d4f324844896e975f27abfb98.svg" alt=""/>
              <h2>
                <hr/>
                {selectedPost.title}
              </h2>
              <p>현재까지 등록된 추억 : {selectedPost.artielcNum}</p>
              <h3>
                <hr/>
                내용 : {selectedPost.content}
                <hr/>
                시작 : {selectedPost.started.slice(0, 10)}
                <hr/>
                종료 : {selectedPost.ended.slice(0, 10)}
              </h3>
              <hr/>
              <br/>
              <Link to={`/project/${selectedPost.id}`}>상세 페이지로 이동</Link>
              <br/><br/>
              <button onClick={closeModal}>닫기</button>
            </div>
          )}
        </Modal>
        <div>
          <div ></div>
          <button onClick={startBTN}>◀◀</button>
          <button onClick={leftBTN}>◀</button>
          <button onClick={rightBTN}>▶</button>
          <button onClick={endBTN}>▶▶</button>
          <div></div>
        </div>
        <div>
          <Link to='/project/create'>
            <button>
              새로운 추억 생성
            </button>
          </Link>
        </div>
      </div>
  );
}

export default ProjectListPage;
