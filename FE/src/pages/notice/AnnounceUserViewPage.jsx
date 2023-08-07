import Modal from "react-modal";
import React, {useEffect, useState} from "react";
import "../../styles/MyPage.scss"
import PostModal from "../../components/post/PostModal";
import Pagination from "../../components/common/Pagination";
import axios from "axios";

const AnnounceUserViewPage = ({page, size, setCurrentPage}) => {
  const API = '/notice'
  const [selectedPost, setSelectedPost] = useState(null)
  const [isModal, setIsModal] = useState(false)

  const [postList, setPostList] = useState([
    /** Notice "TEST" Data Format
     {
            title: "",
            content : 'id',
            url : "test.com",
            deleted : "",
            createdAt : "",
            updatedAt : ""
        }
     */

    /** Notice Data Format
     {
            noticeIdx : "BIGINT(20)",
            noticeTitle : "VARCHAR(255)",
            noticeContent : "VARCHAR(5000)",
            noticeImgurl : "VARCHAR(2048)",
            noticeCreated : "TIMESTAMP",
            noticeHit : "INT(11)",
        }
     */
  ])


  useEffect(() => {
    console.log('[AnnounceUserViewPage] 페이지 로딩 시 한 번만 실행되는 함수');
    console.log(size, page)
    getNoticesData();
  }, []);

  /**
   * 1. 전체 공지사항 [get]
   * http://localhost:8080/notice/list?page=0&size=10
   * */
  const getNoticesData = () => {
    console.log("[getNoticesData]");

    // 실제 배포는 8000
    // 테스트 및 개발 서버는 7000
    // axios.get(`${API}/list?page=${page}&size=${size}`)
    //     .then((response) => {
    //       console.log('게시글 전체 (All) successful : ', response.data);
    //       setPostList(response.data);
    //     })
    //     .catch((error) => {
    //       console.error('게시글 전체 (All) fail : ', error);
    //     });

    axios.get(`${API}/list?size=${size}&page=${page}`)
        .then((response) => {
          console.log('게시글 전체 (All) successful : ', response.data);
          setPostList(response.data);
        })
        .catch((error) => {
          console.error('게시글 전체 (All) fail : ', error);
        });
  };

  const openModal = (id) => {
    const index = postList.findIndex((post => post.noticeTitle === id))
    setSelectedPost(postList[index])
    setIsModal(true)
  }

  Modal.setAppElement("#root");

  return (
    <div style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center', justifyItems: 'center'}}>
    {/*  <div>*/}
    {/*    <div>*/}
    {/*      {console.log("[postList] : " , postList)}*/}
    {/*      {postList.map((post) => (*/}
    {/*          <div*/}
    {/*              className="mypage_notice_part"*/}
    {/*              key={post.id}*/}
    {/*              // onClick={() => openModal(post.id)}*/}
    {/*              onClick={() => openModal(post.title)}*/}
    {/*          >*/}
    {/*            <p>{post.title}</p>*/}
    {/*          </div>*/}
    {/*      ))}*/}
    {/*    </div>*/}
    {/*</div>*/}
    <div>
      <div>
      {
      postList.length === 0
        ?
        <div className="mypage_notice_part">
          <p>등록된 공지사항이 없습니다.</p>
        </div>
        :
          (
            size === 3
            ?
              postList.map((post) => (
                <div
                  className="mypage_notice_part"
                  key={post.noticeIdx}
                  // onClick={() => openModal(post.id)}
                  onClick={() => openModal(post.noticeTitle)}
                >
                  <p>{post.noticeTitle}</p>
                </div>
              ))
            :
              <Pagination
                itemsPerPage={size}
                postList={postList}
                currentPage={page}
                setCurrentPage={setCurrentPage}
              />
          )
      }
      </div>
    </div>
      <PostModal
          selectedPost={selectedPost}
          setSelectedPost={setSelectedPost}
          modalIsOpen={isModal}
          setModalIsOpen={setIsModal}
      />
  </div>
  )
}
export default AnnounceUserViewPage;