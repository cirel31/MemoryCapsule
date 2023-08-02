import React, {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import axios from "axios";

const API = 'http://i9a608.p.ssafy.io:8000/project/'

const ProjectDetailPage = () => {
  const { projectId } = useParams()
  console.log(projectId)
  const [project, setProject] = useState([]);
  useEffect(() => {
    axios.get(`${API}${projectId}`)
      .then((response) => {
        console.log('성공')
        console.log(API)
        console.log(response.data)
        setProject(response.data);
      })
      .catch((error) => {
        console.error("서버로부터 프로젝트 가져오기 실패", error);
        console.error(error.code)
      });
  }, []);

  return (
    <>
      <div>
        프로젝트 상세 페이지
      </div>
      {setProject.length === 0 ? (
          <p>프로젝트가 아직 없습니다.</p>
        ) : (
          <div>
            <p>프로젝트 제목 : {project.title}</p>
            <p>프로젝트 내용 : {project.content}</p>
            <p>시작일 : {project.started}</p>
            <p>종료일 : {project.ended}</p>
          </div>
      )
      }
      <br/>
      <hr/>
      <br/>
      <Link to={`/project/${projectId}/create`}>
        <button>
          x를 눌러서 joy를 표하시오
        </button>
      </Link>
      <br/>
      <hr/>
      <br/>
    </>
  )
}

export default ProjectDetailPage;
