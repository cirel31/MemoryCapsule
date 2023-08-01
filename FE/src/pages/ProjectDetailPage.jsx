import React from "react";
import {useParams, Link} from "react-router-dom";

const ProjectDetailPage = () => {
  const { projectId } = useParams()
  console.log(projectId)

  return (
    <>
      <div>
        프로젝트 상세 페이지
      </div>
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
