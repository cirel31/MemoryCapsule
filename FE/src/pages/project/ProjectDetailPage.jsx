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
import projectExport from "../../assets/images/projectdetail/export.svg";
import before from "../../assets/images/projectdetail/before.svg";
import after from "../../assets/images/projectdetail/after.svg";
import heart from "../../assets/images/projectdetail/heart.svg";
import tag from "../../assets/images/projectdetail/tag.svg";

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
  const date = new Date;
  const [curPeriod, setCurPeriod] = useState(null);
  const [fullPeriod, setFullPeriod] = useState(null);
  const { projectId } = useParams()
  const [project, setProject] = useState([])
  const [myArticles, setMyArticles] = useState([])
  const [imgNum, setImgNum] = useState([])
  const [startCondition, setStartCondition] = useState(false)
  const [endCondition, setEndCondition] = useState(false)
  const [dateCheck, setDateCheck] = useState(true)
  useEffect(() => {
    axios.get(`${baseURL}${subURL}/${projectId}`
      , {
      headers: {
        userId: user.userId,
      },
    }
    )
      .then((response) => {
        setProject(response.data);
        const today = new Date()
        const startDate = new Date(response.data.started)
        const endedDate = new Date(response.data.ended)
        if (today.getTime() >= startDate.getTime()) {
          setStartCondition(true)
        }
        if (today.getTime() > endedDate.getTime()) {
          setEndCondition(true)
        }
      })
      .catch(() => {
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
          setMyArticles(response.data.reverse());
        })
        .catch(() => {
        });
  }, []);

  useEffect(() => {
    if (project.started && project.ended) {
      setFullPeriod(new Date(project.ended).getTime() - new Date(project.started).getTime());
      setCurPeriod(new Date(project.ended).getTime() - date);
    }
  }, [project])

  // 프로젝트 인원 수 따라서 싱글 프로젝트인지 구분하기 위한 함수
  function isSoloProject() {
    if (project.userList && (project.userList.length <= 1)) {
      // 혼자서 하는 프로젝트인 경우
      return false;
    } else {
      // 여러명이서 하는 프로젝트인 경우
      return true;
    }
  }

  const handleImgPlus = (id) => {
    setImgNum(prevNums => {
      const prevValue = prevNums[id] || 0;
      const maxValue = myArticles[id]?.images?.length - 1 || 0;
      return { ...prevNums, [id]: Math.min(prevValue + 1, maxValue) };
    });
  }
  const handleImgMinus = (id) => {
    setImgNum(prevNums => {
      const prevValue = prevNums[id] || 0;
      return { ...prevNums, [id]: Math.max(prevValue - 1, 0) };
    });
  }
  const finishProject = (e) => {
    e.preventDefault()
    axios.get(`${baseURL}${subURL}/finish/${projectId}`, {
      headers: {
        "userId": user.userId
      }
    })
      .then((response) => {
        window.location.href ='/project'
      })
      .catch(() => {
      })
  }
  
  return (
    <div className="big_body">
      <div className="detail_project_layout">
        <div className="detail_project_top"></div>
        <div className="detail_project_top_content">
          <div className="detail_project_title">
            <h1>{project.title}</h1>
            <img src={tag} alt="어떤 프로젝트" className="detail_project_title_tag"/>
            <img src={heart} alt="어떤 프로젝트" className="detail_project_title_heart"/>
          </div>
          <div className="detail_project_back">
            <Link to="/project">
              <div className="detail_project_back_button">
                <img src={go_back} alt="뒤로가기이미지" className="detail_project_back_button_img"/>
              </div>
            </Link>
          </div>
        </div>
        <div className="detail_project_order">
          <div className="detail_project_info_logs">
            <div className="detail_project_info_log">
              <div className="detail_project_info_log_start">현재까지 작성된 기록</div>
              <div className="detail_project_info_log_highlight"> {project.artielcNum} </div>
              <div className="detail_project_info_log_end">개</div>
              {
                isSoloProject() &&
                <>
                  <div className="detail_project_info_log_start">내가 작성한 기록</div>
                  <div className="detail_project_info_log_highlight">{myArticles.length}</div>
                  <div className="detail_project_info_log_end">개</div>
                </>
              }
            </div>
            <div className="detail_project_shorts_info_percentage">
              <div className="detail_project_shorts_info_percentage_text">
                {
                  curPeriod / fullPeriod < 0
                    ?<p>100%</p>
                    :
                    <p>{
                      curPeriod / fullPeriod >= 1
                      ?0
                      :curPeriod && fullPeriod && ((1 - curPeriod / fullPeriod) * 100).toFixed(1)
                    }%</p>
                }
              </div>
              <svg className="detail_project_shorts_info_percentage_graph">
                <circle
                    cx="50%"
                    cy="50%"
                    r="30"
                    fill="none"
                    stroke="#E7E1DBFF"
                    strokeWidth="8"
                />
                {
                  curPeriod / fullPeriod < 1 &&
                  <circle
                      cx="50%"
                      cy="50%"
                      r="30"
                      fill="none"
                      stroke="#FF8CA1FF"
                      strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 30 * (1 - curPeriod / fullPeriod)} ${2 * Math.PI * 30 * (curPeriod / fullPeriod)}`}
                      strokeDashoffset={2 * Math.PI * 30 * 0.25}
                  />
                }
              </svg>
            </div>
            <div className="detail_project_shorts_info_period">
              <p>캡슐 제작 기간</p>
              {project.started && project.ended && (
                  <p>
                    {project.started.slice(2,4)}년 {project.started.slice(5, 7)}월 {project.started.slice(8, 10)}일
                    ~ {project.ended.slice(2,4)}년 {project.ended.slice(5, 7)}월 {project.ended.slice(8, 10)}일
                  </p>
              )}
            </div>
          </div>
          {(endCondition && user.userId === project.owner) &&
          <div className="detail_project_project_export">
              <button className="detail_project_project_export_btn" onClick={finishProject}>
                <img src={projectExport} alt="프로젝트 완성" className="detail_project_project_export_btn_img"/>
              </button>
            </div>
          }
        </div>
        {
          isSoloProject() &&
            <div className="detail_project_order">
              <div className="detail_project_users_layout">
                <div className="detail_project_content_userImgs">
                  {
                    project.userList && project.userList.map((user, index) => (
                        <img
                          key={index}
                          src={user.imgUrl}
                          alt={user.nickname}
                          className="detail_project_content_userImg"
                        />
                    ))
                  }
                </div>
                <div className="detail_project_content_usercnt">
                  {project.userList && project.userList.length}명의 유저와 함께하고 있어요!
                </div>
              </div>
            </div>
        }
        <div  className="detail_project_history">
          <div className="detail_project_history_title">
            <h2 className="">HISTORY</h2>
            {
              isSoloProject() &&
              <span className="detail_project_history_subtitle">내가 쓴 글만 보여요!</span>
            }
          </div>
          <div className="detail_project_history_format">
            {myArticles.map((article, id) => (
                <div
                  key={id}
                >
                  {article.created && (
                      <h3 className="detail_project_history_date">{article.created.slice(2,4)}년 {article.created.slice(5, 7)}월 {article.created.slice(8, 10)}일</h3>
                  )}
                  <div className="detail_project_history_article">
                    {/*수정 필요 현재 이미지 pos 따라서 좌우 버튼 생성*/}
                    {
                      article.images &&
                      article.images.length <= 1
                      ? <div></div>
                      : <div className="detail_project_history_article_beforeafter_btn">
                          <img
                            src={before}
                            alt="이전 사진"
                            onClick={() => handleImgMinus(id)}
                            className="detail_project_history_article_beforeafter_img"
                          />
                        </div>
                    }
                    <div className="detail_project_history_article_imgbox">
                      {article.images.length >= 1 ? (
                          <img
                            src={article.images[imgNum[id] || 0]}
                            alt="서버 이미지를 불러올 수 없습니다"
                            onError={(e) => {e.target.src = kokona}}
                            className="detail_project_history_article_img"
                          />
                      ) : <img src={kokona} alt="클라이언트 이미지를 불러올 수 없습니다"  className="detail_project_history_article_img"/>
                      }
                    </div>
                    {/*수정 필요 현재 이미지 pos 따라서 좌우 버튼 생성*/}
                    {
                      article.images &&
                      article.images.length <= 1
                          ? <div></div>
                          : <div className="detail_project_history_article_beforeafter_btn">
                            <img
                              src={after}
                              alt="다음 사진"
                              onClick={() => handleImgPlus(id)}
                              className="detail_project_history_article_beforeafter_img"/>
                          </div>
                    }
                    <div className="detail_project_history_article_body">
                      {article.stamp && (
                          <img src={stamps[article.stamp - 1].stamp} alt="이미지를 불러올 수 없습니다" className="detail_project_history_article_stamp"/>
                      )}
                      <div className="detail_project_history_article_text_form">
                        <p className="detail_project_history_article_text">{article.content}</p>
                        {
                          Array.from({length: 6}).map((_, index) => (
                              <div key={index} className="detail_project_history_article_text_underline">{/*밑줄*/}</div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                </div>
            ))}
          </div>
          {(startCondition && !endCondition) &&
            <div className="detail_project_write">
              <Link to={`/project/${projectId}/article`}>
                <button className="detail_project_write_btn">
                  <img src={write} alt="write" className="detail_project_write_btn_img"/>
                </button>
              </Link>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default ProjectDetailPage;
