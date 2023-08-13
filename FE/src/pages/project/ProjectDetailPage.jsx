import React, {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import axios from "axios";
import stamp_angry from "../../assets/images/stamp/stamp_angry.svg";
import stamp_best from "../../assets/images/stamp/stamp_best.svg";
import stamp_hansum from "../../assets/images/stamp/stamp_hansum.svg";
import stamp_sad from "../../assets/images/stamp/stamp_sad.svg";
import stamp_sick from "../../assets/images/stamp/stamp_sick.svg";
import stamp_soso from "../../assets/images/stamp/stamp_soso.svg";
import stamp_wow from "../../assets/images/stamp/stamp_wow.svg";
import kokona from "../../assets/images/kokona.png"
import {useSelector} from "react-redux";
import "../../styles/ProjectDetail.scss"

const baseURL = 'https://i9a608.p.ssafy.io:8000'
const subURL = '/project'
const ProjectDetailPage = () => {
  const user = useSelector((state) => state.userState.user) || null
  const stamps = [
    {
      "id": 1,
      "stamp": stamp_angry,
    },
    {
      "id": 2,
      "stamp": stamp_best,
    },
    {
      "id": 3,
      "stamp": stamp_hansum,
    },
    {
      "id": 4,
      "stamp": stamp_sad,
    },
    {
      "id": 5,
      "stamp": stamp_sick,
    },
    {
      "id": 6,
      "stamp": stamp_soso,
    },
    {
      "id": 7,
      "stamp": stamp_wow,
    },
  ]
  const { projectId } = useParams()
  const [project, setProject] = useState([])
  const [myArticles, setMyArticles] = useState([])

  useEffect(() => {
    axios.get(`${baseURL}${subURL}/${projectId}`
      , {
      headers: {
        userId: user.userId,
      },
    }
    )
      .then((response) => {
        console.log('성공')
        console.log(response.data)
        setProject(response.data);
      })
      .catch((error) => {
        console.error("서버로부터 프로젝트 세부사항 실패", error);
        console.error(error.code)
      });
  }, []);

  useEffect(() => {
    axios.get(`${baseURL}${subURL}/${projectId}/article`
      , {
        headers: {
          userId: user.userId,
        },
      }
    )
      .then((response) => {
        console.log('성공', user.userId)
        console.log(response.data)
        setMyArticles(response.data);
      })
      .catch((error) => {
        console.error("서버로부터 게시물 가져오기 실패", user.userId);
        console.error(error)
      });
  }, []);


  return (
    <>
      <div className="project_detail_body">
        <div>
          <h1>프로젝트 제목 : {project.title}</h1>
        </div>
        <div>
          <div>
            <p>현재까지 작성된 기록 : {myArticles.length} 개</p>
            <p>진행도 : {(myArticles.length / 360 * 100).toFixed(2)} %</p>
            {project.started && project.ended && (
              <p>
                캡슐 제작 기간 :
                {project.started.slice(2,4)}년 {project.started.slice(5, 7)}월 {project.started.slice(8, 10)}일
                ~ {project.ended.slice(2,4)}년 {project.ended.slice(5, 7)}월 {project.ended.slice(8, 10)}일
              </p>
            )}
          </div>
          <button>삭제</button>
        </div>
        <br/>
        <hr/>
        <br/>
        <div>
          <h2>History</h2>
          {myArticles.map((article, idx) => (
            <div key={idx}>
              {article.created && (
                <h3>{article.created.slice(2,4)}년 {article.created.slice(5, 7)}월 {article.created.slice(8, 10)}일</h3>
              )}
              <div>
                <div>
                  {article.images ? (
                      <img
                          src={`${article.images}`}
                          alt="아니 서버에서...."
                          onError={(e) => {e.target.src = kokona}}
                      />
                  ) : <img src={kokona} alt="클라이언트 이미지를 불러올 수 없습니다" style={{width:"300px" }} />
                  }
                </div>
                <div>
                  {article.stamp && (
                    <img src={stamps[article.stamp - 1].stamp} alt="이미지를 불러올 수 없습니다" style={{width:"100px"}}/>
                  )}
                  <p>{article.content}</p>
                </div>
              </div>
            </div>
          ))}

        </div>
        <br/><br/>
        <Link to={`/project/${projectId}/article`}>
          <button>
            오늘의 게시글 생성
          </button>
        </Link>
        <br/><br/>
        <hr/>
        <br/>
      </div>
    </>
  )
}

export default ProjectDetailPage;
