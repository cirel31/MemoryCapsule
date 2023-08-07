import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "../../styles/testPage.css"


const ProjectListPage = () => {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(null)
  const [selectedPost, setSelectedPost] = useState(null)
  const [isModal, setIsModal] = useState(false)
  const API = 'http://i9a608.p.ssafy.io:8000/project/all'
  // const API = '/project/all'
  const [projects, setProjects] = useState([

  ]);

  useEffect(() => {
    // 서버로부터 프로젝트 가져오기
    // 전체 프로젝트를 가져오고 선별 예정
    axios.get(`${API}`
    //   , {
    //   headers: {
    //     userId: 1001,
    //   }
    // }
    ) // 추후 주소 갱신 예정
        .then((response) => {
          console.log('성공')
          console.log(API)
          console.log(response.data)
          setProjects(response.data);
        })
        .catch((error) => {
          console.error("서버로부터 프로젝트 가져오기 실패", error);
          console.error(error.code)
        });
  }, []);

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

  const currentPosts = projects.slice(
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

  Modal.setAppElement("#root");

  return (
      <div>
        <h1>현재 진행 중인 프로젝트</h1>
        {projects.length === 0 ? (
            <p>프로젝트가 아직 없습니다.</p>
        ) : (
            <div>
              {currentPosts.map((project) => (
                  <div
                    key={project.idx}
                    className={`normal ${(isHovered === project.idx) ? "chosen" : ""}`}
                    onMouseEnter={() => handleMouseEnter(project.idx)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => openModal(project.idx)}
                  >
                    프로젝트 제목 : {project.title}
                  </div>
              ))}
            </div>
        )}
        <Modal isOpen={isModal} onRequestClose={closeModal}>
          {selectedPost && (
            <div>
              <h2>
                {selectedPost.idx}
                <hr/>
                {selectedPost.title}
              </h2>
              <h3>
                내용 : {selectedPost.content}
                <hr/>
                시작 : {selectedPost.started}
                <hr/>
                종료 : {selectedPost.ended}
              </h3>
              <hr/>
              <br/>
              <Link to={`/project/${selectedPost.idx}`}>상세 페이지로 이동</Link>
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
