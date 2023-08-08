import Modal from "react-modal";
import React, {useEffect, useState} from "react";
import "../../styles/AnnounceStyle.scss"
import PostModal from "../../components/post/PostModal";
import Pagination from "../../components/common/Pagination";
import axios from "axios";
import go_back from "../../assets/images/frield/go_back.svg";

const AnnounceUserViewPage = ({page, size, setCurrentPage}) => {
    const API = '/notice'
    const [selectedPost, setSelectedPost] = useState(null)
    const [isModal, setIsModal] = useState(false)

    const [postList, setPostList] = useState([
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
        axios.get(`${API}/list`)
            .then((response) => {
                console.log('게시글 전체 (All) successful : ', response.data);
                setPostList(response.data);
            })
            .catch((error) => {
                console.error('게시글 전체 (All) fail : ', error);
            });

        // axios.get(`${API}/list?size=${size}&page=${page}`)
        //     .then((response) => {
        //       console.log('게시글 선택 (size, page) successful : ', response.data);
        //       setPostList(response.data);
        //     })
        //     .catch((error) => {
        //       console.error('게시글 전체 (All) fail : ', error);
        //     });
    };

    /**
     * 2. 공지사항 자세하게 보기 [get]
     * http://localhost:8080/notice/2
     * */
    const getNoticesDataDetail = (e) => {
        const accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDA0IiwiYXV0aCI6IlVTRVIiLCJleHAiOjE2OTE0NzQ0Mjl9.sEfQti6mAsm4LGJYG46ZtkAkd-_YTKaJ-koV5aiTPsi1cvYG2AOITPSpdCNJOebSJZ4Kl_Y2ZBzre7GftUz-Cw";

        console.log("[getNoticesDataDetail]");

        const index = e;

        // 실제 배포는 8000
        // 테스트 및 개발 서버는 7000

        console.log(index);
        axios.get(`${API}/${index}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            }
        )
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

    // 뒤로가기
    const handleBack = () => {
        window.history.back()
    }

    Modal.setAppElement("#root");

    return (
        <>
            <div className="announce_list">
                {
                    postList.length === 0
                        ?
                        <div className="announce_nothing">
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
                                        onClick={() => openModal(post.noticeIdx)}
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