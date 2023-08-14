import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import axios from "axios";
import Modal from "react-modal";
import {Link} from "react-router-dom";

const ProjectLockerPage = () => {
  const [isHovered, setIsHovered] = useState(null)
  const baseURL = 'https://i9a608.p.ssafy.io:8000'
  // const subURL = '/project/myproject/done'
  const subURL = '/project/myproject/done'
  const [projects, setProjects] = useState([]);
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
          console.log("완료된 프로젝트 받아오기 성공")
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
        <div style={{display: "flex", alignItems:"center"}}>
          <button onClick={startBTN}>◀◀</button>
          <button onClick={leftBTN}>◀</button>
          <div>
            {projects.length === 0 ? (
                <p>
                  완료된 프로젝트가 아직 없습니다.
                </p>
            ) : (
                <div style={{display:'flex', alignItems:'center'}}>
                  {currentPosts.map((project) => (
                      <Link
                          to={`/project/present/${project.giftUrl}`}
                          key={project.id}
                      >
                        <div
                            onMouseEnter={() => handleMouseEnter(project.id)}
                            onMouseLeave={() => handleMouseLeave(project)}
                            onMouseMove={(event) => handleMouseMove(project.id, event)}
                            style={{
                              width: '200px',
                              height: '250px',
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
                          <div style={{width:'200px', height:"300px"}}>
                            <p>{project.title}</p>
                            <img src={project.imgUrl} alt="아로나" style={{width:'200px'}}/>
                            <p>기록한 추억 : {project.artielcNum || 0}</p>
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
      </div>
  )
}

export default ProjectLockerPage