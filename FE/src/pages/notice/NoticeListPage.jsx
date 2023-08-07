import { NoFriendList, AuthFormGrid, CustomButton } from "../../styles/friendStyle";

import React, { useState, useEffect } from "react";
// import NoticeInfo from "../components/notice/NoticeInfo";
import SearchBar from "../../components/SearchBar"
import axios from "axios";
import Pagination from "../../components/common/Pagination";
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
            noticeTitle : "VARCHAR(255)",
            noticeContent : "VARCHAR(5000)",
            noticeImgurl : "VARCHAR(2048)",
            noticeCreated : "TIMESTAMP",
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
        <>
            <div>
                <h2>공지사항</h2>
            </div>
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
        </>
    )
}

export default NoticeListPage;
