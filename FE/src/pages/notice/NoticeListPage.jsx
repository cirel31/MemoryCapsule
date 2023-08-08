import { NoFriendList, AuthFormGrid, CustomButton } from "../../styles/friendStyle";

import React, { useState, useEffect } from "react";
// import NoticeInfo from "../components/notice/NoticeInfo";
import AnnounceUserViewPage from "./AnnounceUserViewPage";

import {Link} from "react-router-dom";
import PostModal from "../../components/post/PostModal";


const NoticeListPage = () => {
    const API = '/notice'

    const [isModal, setIsModal] = useState(false)

    // 페이지네이션 보여줄 페이지 개수
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // 페이지네이션 현재 페이지 저장
    const [currentPage, setCurrentPage] = useState(0);

    const [post, setPost] = useState(
        /** Notice Data Format*/
        {
            noticeIdx : 0,
            noticeHit : 0,
            noticeTitle : "",
            noticeContent : "",
            noticeImgurl : "",
            noticeCreated : "",
        }
    )

    // 처음 한 번 실행해서, 모든 공지사항 불러오기
    useEffect(() => {
        console.log('[useEffect] 페이지 로딩 시 한 번만 실행되는 함수')
     }, []);

    const openModal = () => {
        setIsModal(true)
    }

    return (
        <div className="big_body">
            <AnnounceUserViewPage page={currentPage} size={itemsPerPage} setCurrentPage={setCurrentPage}/>
            <div>
            <CustomButton
                key={post.id}
                // onClick={() => openModal(post.id)}
                onClick={() => openModal(post.title)}
            >
                글작성
            </CustomButton>
            </div>

            <PostModal
                selectedPost={{
                    noticeIdx : 0,
                    noticeHit : 0,
                    noticeTitle : "",
                    noticeContent : "",
                    noticeCreated : "",
                }}
                setSelectedPost={setPost}
                modalIsOpen={isModal}
                setModalIsOpen={setIsModal}
            />
        </div>
    )
}

export default NoticeListPage;
