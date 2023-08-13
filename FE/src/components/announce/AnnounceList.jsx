import Modal from "react-modal";
import React, {useEffect, useState} from "react";
import "../../styles/AnnounceStyle.scss"
import PostModal from "../post/PostModal";
import Pagination from "../common/Pagination";
import axios from "axios";

const AnnounceUserViewPage = ({page, size}) => {
    const baseURL = 'https://i9a608.p.ssafy.io:8000';
    const API = '/notice';
    Modal.setAppElement("#root");

    // 페이지네이션 현재 페이지 저장
    const [currentPage, setCurrentPage] = useState(page);
    // 페이지네이션 보여줄 페이지 개수
    const [itemsPerPage, setItemsPerPage] = useState(size);

    const [selectedPost, setSelectedPost] = useState(null)
    const [isModal, setIsModal] = useState(false)

    const [postList, setPostList] = useState(null)

    useEffect(() => {
        console.log('[AnnounceUserViewPage] 페이지 로딩 시 한 번만 실행되는 함수');
        getNoticesData(page, size);
    }, []);

    useEffect(() => {
        console.log('[AnnounceUserViewPage]');
        getNoticesData(page, size);
    }, [currentPage]); // currentPage 변경시에만 실행

    /**
     * 1. 전체 공지사항 [get]
     * http://localhost:8080/notice/list?page=0&size=10
     * */
    const getNoticesData = (e) => {
        console.log("[getNoticesData]");
        axios.get(`${baseURL}${API}/list?size=${itemsPerPage}&page=${currentPage}&sort=noticeIdx,desc`)
            .then((response) => {
              console.log('게시글 선택 (size, page) successful : ', response.data);
              setPostList(response.data);
            })
            .catch((error) => {
              console.error('게시글 전체 (size, page) fail : ', error);
            });
    };

    /**
     * 2. 공지사항 자세하게 보기 [get]
     * http://localhost:8080/notice/2
     * */
    const getNoticesDataDetail = (e) => {
        console.log("[getNoticesDataDetail]");

        const index = e;

        // 실제 배포는 8000
        // 테스트 및 개발 서버는 7000

        console.log(index);
        axios.get(`${baseURL}${API}/${index}`)
            .then((response) => {
                console.log('게시글 자세하게 (Detail) successful : ', response.data);
                setSelectedPost(response.data);
            })
            .catch((error) => {
                console.error('게시글 자세하게 (Detail) fail : ', error);
            });
    };

    const openModal = (idx) => {
        getNoticesDataDetail(idx);
        setIsModal(true)
    }

    function isPostGetSuccess() {
        try {
            if(postList.length === 0) {
                return true;
            }
            return false;
        } catch (error) {
            return true;
        }
    }

    const isUpdateNotice = (updatedNotice) => {
        console.log("[isUpdateNotice]");
        getNoticesData();
        isPostGetSuccess();
    }

    return (
        <>
            <div className="announce_list">
                {
                    isPostGetSuccess()
                    ?
                    <div className="announce_nothing">
                        <p>등록된 공지사항이 없습니다.</p>
                    </div>
                    :
                    (
                        postList.content &&
                        size <= 3
                        ?
                        postList.content.map((post) => (
                            <div
                                className="mypage_notice_part"
                                key={post.noticeIdx}
                                onClick={() => openModal(post.noticeIdx)}
                            >
                                <p>{post.noticeTitle}</p>
                            </div>
                        ))
                        :
                        <Pagination
                            postList={postList}
                            setPostList={setPostList}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            onChange={isUpdateNotice}
                        />
                    )
                }
            </div>
            {/*모달 창*/}
            <PostModal
                selectedPost={selectedPost}
                setSelectedPost={setSelectedPost}
                modalIsOpen={isModal}
                setModalIsOpen={setIsModal}
            />
        </>
    )
}
export default AnnounceUserViewPage;