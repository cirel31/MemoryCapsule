import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import axios from "axios";
import Modal from "react-modal";
import {Link, useNavigate} from "react-router-dom";
import "../../styles/EndPage.scss"
import main_bg from "../../assets/images/mainpage/Mainback.svg"
import search_picto from "../../assets/images/mainpage/search.svg"
import clamp from "../../assets/images/mainpage/clamp.svg"
import right_btn from "../../assets/images/mainpage/right.svg"
import left_btn from "../../assets/images/mainpage/left.svg"
import start_btn from "../../assets/images/mainpage/start.svg"
import end_btn from "../../assets/images/mainpage/end.svg"
import kokona from "../../assets/images/kokona.png";

const ProjectLockerPage = () => {
  const navigate = useNavigate()

  const baseURL = 'https://i9a608.p.ssafy.io:8000'
  const subURL = '/project/myproject/done'

  const [isHovered, setIsHovered] = useState(null)
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProjects, setFilteredProjects] = useState([])

  const user = useSelector((state) => state.userState.user) || null

  useEffect(() => {
    const accessToken = sessionStorage?.getItem("accessToken")
    if (!accessToken) {
      navigate('/login')
    }
  }, [user])

  useEffect(() => {
    const userId = user?.userId || ''
    axios.get(`${baseURL}${subURL}`, {
      headers: {
        "userId": userId,
      }
    })
      .then((response) => {
        setProjects(response.data);
      })
      .catch(() => {
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
  const handleMouseLeave = (id) => {
    setIsHovered(null)
  }

  // 프로젝트 3개씩 보이는 함수
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

  Modal.setAppElement("#root");
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

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
          placeholder="완료된 프로젝트 검색..."
        />
        <button onClick={handleSearchChange}><img src={search_picto}/></button>
      </div>
      <div className="decoration_1"></div>
      <div className="decoration_2"></div>
      <div className="main_project_list_body">
          <div className="pjt_lst_body">
            {currentPosts.map((project) => (
              <Link
                to={`/project/present/${project.giftUrl}`}
                key={project.id}
              >
                <div
                  className={`project_shortcut ${(isHovered === project.id) ? "project_shortcut_hovered" : ""}`}
                  onMouseEnter={() => handleMouseEnter(project.id)}
                  onMouseLeave={() => handleMouseLeave(project)}
                >
                  <img src={clamp} className="deco_clamp"/>
                  <img
                    src={project.imgUrl}
                    alt="이미지 없음"
                    onError={(e) => {e.target.src = kokona}}
                    className="photos"/>
                  <p>{project.title}</p>
                </div>
              </Link>
            ))}
          </div>
        )
      </div>
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
      
    </div>
  )
}

export default ProjectLockerPage