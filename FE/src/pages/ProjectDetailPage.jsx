import React, {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import axios from "axios";

const MAIN_API = 'http://i9a608.p.ssafy.io:8000/project/'
const SUB_API = '/article'
const ProjectDetailPage = () => {
  const stamps = [

  ]
  const { projectId } = useParams()
  const [project, setProject] = useState([]);
  const [myArticles, setMyArticles] = useState([
    {
      'article_created': '2023-07-01',
      'article_updated': '2023-07-02',
      'article_img': null,
      'article_stamp': '6',
      'article_title': '테스트 파일 001',
      'article_content': '더미 데이터 001',
      'article_idx': '1',
    }
  ])

  useEffect(() => {
    axios.get(`${projectId}`
      , {
      headers: {
        userId: 1001,
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
    axios.get(`${projectId}${SUB_API}`
      , {
        headers: {
          userId: 1001,
        },
      }
    )
      .then((response) => {
        console.log('성공')
        console.log(response.data)
        setMyArticles(response.data);
      })
      .catch((error) => {
        console.error("서버로부터 게시물 가져오기 실패", error);
        console.error(error.code)
      });
  }, []);


  return (
    <>
      <div style={{width: "800px"}}>
        <div>
          <h1>프로젝트 제목 : {project.title}</h1>
        </div>
        <div>
          <div>
            <p>현재까지 작성된 기록 : {myArticles.length} 개</p>
            <p>진행도 : {myArticles.length} / {project.articles_length} %</p>
            <p>캡슐 제작 기간 : {project.started} ~ {project.ended}</p>
          </div>
          <button>삭제</button>
        </div>
        <br/>
        <hr/>
        <br/>
        <div>
          <h2>History</h2>
          {myArticles.map((article) => (
            <div key={article.idx} >
              <h3 style={{margin: "1rem"}}>{article.article_created}</h3>
              <div style={{margin: "1rem", width:"95%", display:"flex", alignItems:"center", justifyContent:"space-around", border: "solid 0.5px black"}}>
                <div>
                  {article.article_img && (
                    <img src={`data:image/png;base64,${article.article_img}`} alt="이미지를 불러올 수 없습니다"/>
                  )}
                </div>
                <div>
                  {article.article_stamp && (
                    <img src={stamps[article.article_stamp - 1]} alt="이미지를 불러올 수 없습니다"/>
                  )}
                  <p>{article.article_content}</p>
                </div>
              </div>
            </div>
          ))}

        </div>
        <br/><br/>
        <Link to={`/project/article/write/${projectId}`}>
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
