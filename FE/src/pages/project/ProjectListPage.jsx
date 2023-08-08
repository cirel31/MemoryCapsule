import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import "../../styles/testPage.css"


const ProjectListPage = () => {
  const [isHovered, setIsHovered] = useState(null)
  const [selectedPost, setSelectedPost] = useState(null)
  const [isModal, setIsModal] = useState(false)
  const baseURL = 'https://i9a608.p.ssafy.io:8000'
  const subURL = '/project/all'
  // const API = '/project/all'
  const [projects, setProjects] = useState([

  ]);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken")
    axios.get(`${baseURL}${subURL}`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
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
                    key={project.id}
                    className={`normal ${(isHovered === project.id) ? "chosen" : ""}`}
                    onMouseEnter={() => handleMouseEnter(project.id)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => openModal(project.id)}
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
