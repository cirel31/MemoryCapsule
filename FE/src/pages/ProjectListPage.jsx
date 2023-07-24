import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProjectListPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // 서버로부터 프로젝트 가져오기
    // 전체 프로젝트를 가져오고 선별 예정
    axios.get("http://localhost:8080/api/project/") // 추후 주소 갱신 예정
        .then((response) => {
          setProjects(response.data);
        })
        .catch((error) => {
          console.error("서버로부터 프로젝트 가져오기 실패", error);
          // 에러 처리 로직 추가 예정
        });
  }, []);

  return (
      <div  style={{textAlign: 'center', width:'100%', height:'600px'}}>
        <h1>현재 진행 중인 프로젝트</h1>
        {projects.length === 0 ? (
            <p>프로젝트가 아직 없습니다.</p>
        ) : (
            <ul>
              {/* 스토리지에 저장된 user.id 이용해 참여자에 있는 프로젝트만 뽑아낼 예정 */}
              {projects.map((project) => (
                  <li key={project.id}>
                    {/* 주소 어떻게 할당 할 지 토의 후 갱신 예정 */}
                    <Link to={`/project/${project.id}`}>
                      <strong>{project.title}</strong>
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
      </div>
  );
}

export default ProjectListPage;
