import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Modal from "react-modal";
import {useSelector} from "react-redux";

const CurrentProjectsPage = () => {
  const [isHovered, setIsHovered] = useState(null)
  // const [selectedPost, setSelectedPost] = useState(null)
  // const [isModal, setIsModal] = useState(false)
  const baseURL = 'https://i9a608.p.ssafy.io:8000'
  const subURL = '/project/myproject/current'
  const [projects, setProjects] = useState([
    {'id': 1, rotationX: 0, rotationY: 0},
    {'id': 2, rotationX: 0, rotationY: 0},
    {'id': 3, rotationX: 0, rotationY: 0},
  ]);
  const user = useSelector((state) => state.userState.user) || null
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  
  const handleMouseMove = (projectId, event) => {
    const div = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - (div.left + div.width / 2);
    const y = event.clientY - (div.top + div.height / 2);
    const degX = (y / div.height) * 90;
    const degY = -(x / div.width) * 90;
    
    setProjects(prevProjects => prevProjects.map(project => {
      if (project.idx === projectId) {
        return { ...project, rotationX: degX, rotationY: degY };
      }
      return project;
    }));
  };

  useEffect(() => {
    const userId = user?.userId || ''
    axios.get(`${baseURL}${subURL}`, {
      headers : {
        // "userId": `${userId}`,
        "userId": 1004,
      }
    })
      .then((response) => {
        setProjects(response.data);
        console.log("현재 진행 중인 프로젝트 받아오기 성공")
      })
      .catch((error) => {
        console.error(error.code)
      });
  }, [JSON.parse(sessionStorage.getItem("loginData"))?.userId]);

  const handleMouseEnter = (id) => {
    setIsHovered(id)
  };
  const handleMouseLeave = (id) => {
    id.rotationX = 0
    id.rotationY = 0
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
      <h1>제작 중인 캡슐 현황</h1>
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
            <div style={{display:'flex', alignItems:'center'}}>
              {currentPosts.map((project) => (
                <Link
                  to={`/project/${project.idx}`}
                  key={project.idx}
                >
                  
                  {/* normal chosen을 원하는 효과 넣은 클래스로 변경 ㄱㄱ */}
                  <div
                    onMouseEnter={() => handleMouseEnter(project.idx)}
                    onMouseLeave={() => handleMouseLeave(project)}
                    onMouseMove={(event) => handleMouseMove(project.idx, event)}
                    style={{
                        width: '200px',
                        height: '200px',
                        margin: '1rem',
                        background: 'lightblue',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        perspective: '1000px',
                        transform: `rotateX(${project.rotationX}deg) rotateY(${project.rotationY}deg)`,
                        transition: 'transform 0.1s'
                      }}
                  >
                    <div
                      style={{padding: '0.5rem'}}
                    >
                      {console.log(project.ar)}
                      <p>{project.title}</p>
                      <p>기록한 추억 : {project.articleNum || 0}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        <button onClick={rightBTN}>▶</button>
        <button onClick={endBTN}>▶▶</button>
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

export default CurrentProjectsPage