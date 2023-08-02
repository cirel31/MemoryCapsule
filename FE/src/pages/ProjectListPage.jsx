import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// axios.defaults.withCredentials = true
// const serverURL = 'http://i9a608.p.ssafy.io:9090'
const API = 'http://i9a608.p.ssafy.io:8000/project/all'
const ProjectListPage = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    // 서버로부터 프로젝트 가져오기
    // 전체 프로젝트를 가져오고 선별 예정
    axios.get(`${API}`) // 추후 주소 갱신 예정
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
  const testFunction = async () => {
    try {
      const response = await axios.get("/project/all");
      console.log('일단 접속 성공')
      console.log(response.data)
    } catch (error) {
      console.error("서버연결실패", error);
    }
  }

  return (
      <div  style={{textAlign: 'center', width:'100%', height:'600px'}}>
        <h1>현재 진행 중인 프로젝트</h1>
        {projects.length === 0 ? (
            <p>프로젝트가 아직 없습니다.</p>
        ) : (
            <ul>
              {/* 스토리지에 저장된 user.id 이용해 참여자에 있는 프로젝트만 뽑아낼 예정 */}
              {projects.map((project) => (
                  <li key={project.idx}>
                    {/* 주소 어떻게 할당 할 지 토의 후 갱신 예정 */}
                    <Link to={`/project/${project.idx}`}>
                      {project.title}
                    </Link>
                  </li>
              ))}
            </ul>
        )}
        <div>
          <Link to='/project/create'>
            <h3>새 프로젝트 생성</h3>
          </Link>
        </div>
        <div>
          <button onClick={testFunction}>테스트버튼</button>
        </div>
      </div>
  );
}

export default ProjectListPage;
