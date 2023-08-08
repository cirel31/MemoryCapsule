import Modal from "react-modal";
import React, {useEffect, useState} from "react";
import "../../styles/AnnounceStyle.scss"
import PostModal from "../post/PostModal";
import Pagination from "../common/Pagination";
import axios from "axios";
import {useSelector} from "react-redux";

const AnnounceUserViewPage = ({page, size, setCurrentPage}) => {
    const baseURL = 'https://i9a608.p.ssafy.io:8000'
    const subURL = '/notice'
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
        console.log(size, page)
        getNoticesData();
    }, []);
    
    const getNoticesData = () => {
        axios.get(`${baseURL}${subURL}/list`)
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


    const getNoticesDataDetail = (e) => {
        const accessToken = sessionStorage.getItem("accessToken") || null
        const index = e;
        axios.get(`${baseURL}${subURL}/${index}`,
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