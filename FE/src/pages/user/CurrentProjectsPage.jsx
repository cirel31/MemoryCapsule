import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Modal from "react-modal";

const CurrentProjectsPage = () => {
  const [isHovered, setIsHovered] = useState(null)
  const [selectedPost, setSelectedPost] = useState(null)
  const [isModal, setIsModal] = useState(false)
  const API = '/project/myproject/current'
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const userId = JSON.parse(sessionStorage.getItem("loginData"))?.userId || ''
    // const userId = 1001
    axios.get(`${API}`, {
      headers : {
        userId: `${userId}`,
      }
    })
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error(error.code)
      });
  }, [JSON.parse(sessionStorage.getItem("loginData"))?.userId]);

  const handleMouseEnter = (id) => {
    setIsHovered(id)
  };
  const handleMouseLeave = () => {
    setIsHovered(null)
  }

  // 프로젝트 3개씩 보이는 함수
  const [currentSection, setCurrentSection] = useState(0);
  const currentPosts = projects.slice(
    currentSection,
    (currentSection + 3),
  );

  // 버튼 함수
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
      {/* 모양 때문에 일단 정렬만 해둠 */}
      <div style={{display: "flex", alignItems:"center"}}>
        <button onClick={startBTN}>◀◀</button>
        <button onClick={leftBTN}>◀</button>
        <div>
          {projects.length === 0 ? (
            <p>
              프로젝트가 아직 없습니다.
            </p>
          ) : (
            <div>
              {currentPosts.map((project) => (
                <Link
                  to={`/project/${project.idx}`}
                  key={project.idx}
                >
                  {/* normal chosen을 원하는 효과 넣은 클래스로 변경 ㄱㄱ */}
                  <div
                    className={`normal ${(isHovered === project.idx) ? "chosen" : ""}`}
                    onMouseEnter={() => handleMouseEnter(project.idx)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <p>{project.title}</p>
                    <p>기록한 추억 : 나중에 추가할 article 갯수</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        <button onClick={rightBTN}>▶</button>
        <button onClick={endBTN}>▶▶</button>
      </div>
    </div>
  );
}

export default CurrentProjectsPage