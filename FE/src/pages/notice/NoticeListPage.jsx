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
        console.log('[useEffect] 페이지 로딩 시 한 번만 실행되는 함수');
        // setPost(
        //     {
        //         id : 0,
        //         creator_id : 0,
        //         title : "VARCHAR(255)",
        //         content : "VARCHAR(5000)",
        //     }
        // )
        // getNoticesDataDetail();
     }, []);

    const openModal = () => {
        setIsModal(true)
    }

    /**
     * 2. 공지사항 자세하게 보기 [get]
     * http://localhost:8080/notice/2
     * */
    const getNoticesDataDetail = (e) => {
        console.log("[getNoticesDataDetail]");

        // 실제 배포는 8000
        // 테스트 및 개발 서버는 7000
        axios.get(`${API}/list`)
            .then((response) => {
                console.log('게시글 자세하게 (Detail) successful : ', response.data);
                setPost(response.data);
            })
            .catch((error) => {
                console.error('게시글 자세하게 (Detail) fail : ', error);
            });
    };

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
            <PostModal
                selectedPost={post}
                setSelectedPost={setPost}
                modalIsOpen={isModal}
                setModalIsOpen={setIsModal}
            />
        </>
    )
}

export default NoticeListPage;
