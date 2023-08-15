import {Link} from "react-router-dom";
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
  const [projects, setProjects] = useState([])
  const user = useSelector((state) => state.userState.user) || null

  const handleMouseMove = (projectId, event) => {
    const div = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - (div.left + div.width / 2);
    const y = event.clientY - (div.top + div.height / 2);
    const degX = (y / div.height) * 90;
    const degY = -(x / div.width) * 90;
    
    setProjects(prevProjects => prevProjects.map(project => {
      if (project.id === projectId) {
        return { ...project, rotationX: degX, rotationY: degY };
      }
      return project;
    }));
  };

  useEffect(() => {
    const userId = user?.userId || ''
    axios.get(`${baseURL}${subURL}`, {
      headers : {
        "userId": userId,
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
      {/* 모양 때문에 일단 정렬만 해둠 */}
      <div className="wip_project_card">
        {/*<div>*/}
        {/*  <button onClick={startBTN}>◀◀</button>*/}
        {/*  <button onClick={leftBTN}>◀</button>*/}
        {/*</div>*/}

        <div>
          {projects.length === 0 ? (
            <p>
              프로젝트가 아직 없습니다.
            </p>
          ) : (
            <div style={{display:'flex', alignItems:'center'}}>
              {projects.map((project) => (
                
                <Link
                  to={`/project/${project.id}`}
                  key={project.id}
                  className="capsule_cards"
                  style={{

                    transform: `rotateX(${project.rotationX}deg) rotateY(${project.rotationY}deg)`,
                    transition: 'transform 0.1s'
                  }}
                >
                  <div
                    onMouseEnter={() => handleMouseEnter(project.id)}
                    onMouseLeave={() => handleMouseLeave(project)}
                    onMouseMove={(event) => handleMouseMove(project.id, event)}


                  >
                    <div className="card_contents">
                      <div className="card_title"><p>{project.title}</p></div>
                      <img src={project.imgUrl} alt="아로나"/>
                      <div className="card_contents_info">
                        <p>기록한 추억 </p>
                        <h2> {project.artielcNum || 0}</h2>
                      </div>
                    </div>
                    
                  </div>
                  
                </Link>
              ))}
            </div>
          )}
        </div>
        {/*<div>*/}
        {/*  <button onClick={rightBTN}>▶</button>*/}
        {/*  <button onClick={endBTN}>▶▶</button>*/}
        {/*</div>*/}
      </div>

    </div>
  );
}

export default CurrentProjectsPage