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
import "../../styles/ProjectDetailSytle.scss";
import go_back from "../../assets/images/frield/go_back.svg";
import write from "../../assets/images/projectdetail/write.svg";
import discard from "../../assets/images/projectdetail/discard.svg";

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

  // 프로젝트 인원 수 따라서 싱글 프로젝트인지 구분하기 위한 함수
  function isSoloProject() {
    if (1 <= 1) {
      // 혼자서 하는 프로젝트인 경우
      return true;
    } else {
      // 여러명이서 하는 프로젝트인 경우
      return false;
    }
  }

  // 뒤로가기
  const handleBack = () => {
    window.history.back()
  }

  return (
    <div className="big_body">
      <div className="detail_project_layout">
        <div className="detail_project_top"></div>
        <div className="detail_project_top_content">
          <div className="detail_project_title">
            <h1>프로젝트 제목 : {project.title}</h1>
          </div>
          <div className="detail_project_back">
            <div onClick={handleBack} className="detail_project_back_button">
              <img src={go_back} alt="뒤로가기이미지" className="detail_project_back_button_img"/>
            </div>
          </div>
        </div>
        <div className="detail_project_order">
          <div className="detail_project_info_logs">

            <div className="detail_project_shorts_info_logs">
              <p>현재까지 작성된 기록 : {myArticles.length} 개</p>
              <p>오늘 작성된 기록 : {myArticles.length} 개</p>
            </div>
            <div className="detail_project_shorts_info_percentage">
              <p>진행도 : {myArticles.length} / {project.length} %</p>
            </div>
            <div>
              <p>캡슐 제작 기간</p>
              {project.started && project.ended && (
                  <p>
                    {project.started.slice(2,4)}년 {project.started.slice(5, 7)}월 {project.started.slice(8, 10)}일
                    ~ {project.ended.slice(2,4)}년 {project.ended.slice(5, 7)}월 {project.ended.slice(8, 10)}일
                  </p>
              )}
            </div>
          </div>
          <div className="detail_project_project_delete">
            <button className="detail_project_project_delete_btn">
              <img src={discard} alt="삭제" className="detail_project_project_delete_btn_img"/>
            </button>
          </div>
        </div>
        {
          isSoloProject() &&
            <div className="detail_project_order">
              <div className="detail_project_users_layout">
                <div className="detail_project_content_imgs">
                  프로젝트에 들어와있는 유저 목록 img
                </div>
                <div className="detail_project_content_usercnt">
                  {0}명의 유저와 함께하고 있어요!
                </div>
              </div>
            </div>
        }
        <hr/>
        <br/>
        <div  className="detail_project_history">
          <div className="detail_project_history_title">
            <h2 className="">HISTORY</h2>
            <span className="detail_project_history_subtitle">내가 쓴 글만 보여요!</span>
          </div>
          {myArticles.map((article, idx) => (
            <div key={idx} className="detail_project_history_format">
              {article.created && (
                <h3>{article.created.slice(2,4)}년 {article.created.slice(5, 7)}월 {article.created.slice(8, 10)}일</h3>
              )}
              <div>
                <div>
                  {article.images ? (
                      <img src={`${article.images}`} alt="서버 이미지를 불러올 수 없습니다"/>
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
          <div className="detail_project_write">
            <Link to={`/project/${projectId}/article`}>
              <button className="detail_project_write_btn">
                <img src={write} alt="write" className="detail_project_write_btn_img"/>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetailPage;
