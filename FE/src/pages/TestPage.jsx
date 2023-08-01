// import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import Modal from "react-modal";
import "../styles/testPage.css"
import {useNavigate } from "react-router-dom";
import axios from "axios";

const TestPage = () => {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(null)
  const [selectedPost, setSelectedPost] = useState(null)
  const [isModal, setIsModal] = useState(false)
  const API = 'http://i9a608.p.ssafy.io:8000/project/all'
  const [postList, setPostList] = useState([
    { id: 1, title: "게시글 1" },
    { id: 2, title: "게시글 2" },
    { id: 3, title: "게시글 3" },
    { id: 4, title: "게시글 4" },
    { id: 5, title: "게시글 5" },
    { id: 6, title: "게시글 6" },
    { id: 7, title: "게시글 7" },
    { id: 8, title: "게시글 8" },
    { id: 9, title: "게시글 9" },
    { id: 10, title: "게시글 10" },
    { id: 11, title: "게시글 11" },
    { id: 12, title: "게시글 12" },
    { id: 13, title: "게시글 13" },
    { id: 14, title: "게시글 14" },
    { id: 15, title: "게시글 15" },
    { id: 16, title: "게시글 16" },
  ])

  useEffect(() => {
    // 서버로부터 프로젝트 가져오기
    // 전체 프로젝트를 가져오고 선별 예정
    axios.get(`${API}`) // 추후 주소 갱신 예정
      .then((response) => {
        console.log('성공')
        console.log(API)
        console.log(response.data)
        setPostList(response.data);
      })
      .catch((error) => {
        console.error("서버로부터 프로젝트 가져오기 실패", error);
        console.error(error.code)
      });
  }, []);
  const handleMouseEnter = (id) => {
    setIsHovered(id)
  };
  const handleMouseLeave = () => {
    setIsHovered(null)
  }
  const openModal = (id) => {
    const postIndex = postList.findIndex((post => post.idx === id))
    setSelectedPost(postList[postIndex])
    setIsModal(true)
  }
  const closeModal = () => {
    setSelectedPost(null)
    setIsModal(false)
  }


  const [currentSection, setCurrentSection] = useState(0);
  // const postsPerPage = 3;
  const currentPosts = postList.slice(
      currentSection,
      (currentSection + 3),
  );
  const handleProjectCreatePage = () => {
    navigate('/project/create')
  }
  const leftBTN = (e) => {
    setCurrentSection((prev) => Math.max(prev - 1, 0));
  };
  const rightBTN = (e) => {
    setCurrentSection((prev) => Math.min(prev + 1, Math.ceil(postList.length ) - 1));
  };
  Modal.setAppElement("#root");
  return (
      <div>
        <hr />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {currentPosts.map((post) => (
              <div
                key={post.idx}
                className={`normal ${(isHovered === post.idx) ? "chosen" : ""}`}
                onMouseEnter={() => handleMouseEnter(post.idx)}
                onMouseLeave={handleMouseLeave}
                onClick={() => openModal(post.idx)}
              >
                <img src="" alt={`테스트 이미지 ${post.idx}`}/>
                <hr/>
                id : {post.idx}
                <br/>
                제목 : {post.title}
                {/*<Link to={`/test/${post.id}`}>*/}
                {/*</Link>*/}
                {/*currentSection : {currentSection}, id : {post.id}, 제목 : {post.title}  */}
              </div>
          ))}
        </div>
        <Modal isOpen={isModal} onRequestClose={closeModal}>
          {selectedPost && (
            <div>
              <h2>
                {selectedPost.title}
              </h2>
              <h3>
                내용 : {selectedPost.content}
                <hr/>
                시작 : {selectedPost.started}
                <hr/>
                종료 : {selectedPost.ended}
              </h3>
              <button onClick={closeModal}>닫기</button>
            </div>
          )}
        </Modal>
        <div style={{ display: 'flex', justifyContent: "space-between", marginTop: '1rem' }}>
          <div ></div>
          <button onClick={leftBTN}>◀</button>
          <button onClick={rightBTN}>▶</button>
          <div></div>
        </div>
        <hr />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={handleProjectCreatePage}>
            새로운 추억 생성
          </button>
        </div>
        <hr/>
      </div>
  );
}

export default TestPage