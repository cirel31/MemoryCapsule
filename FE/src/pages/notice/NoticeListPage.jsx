import { NoFriendList, AuthFormGrid, CustomButton } from "../../styles/friendStyle";

import React, { useState, useEffect } from "react";
// import NoticeInfo from "../components/notice/NoticeInfo";
import SearchBar from "../../components/SearchBar"
import axios from "axios";
import Pagination from "../../components/common/Pagination";
import AnnounceUserViewPage from "./AnnounceUserViewPage";

import {Link} from "react-router-dom";


const NoticeListPage = () => {
    const API = '/notice'
    // 검색어 저장
    const [search, setSearch] = useState("");

    // 페이지네이션마다 보여줄 페이지 개수
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // 페이지네이션 페이지 저장
    const [currentPage, setCurrentPage] = useState(1);

    // 현재 띄워줄 공지사항 리스트
    const [notices, setNotices] = useState([
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
            idx : "BIGINT(20)",
            creator_idx : "BIGINT(20)",
            title : "VARCHAR(255)",
            content : "VARCHAR(5000)",
            imgurl : "VARCHAR(2048)",
            deleted : "TINYINT(1)",
            created : "TIMESTAMP",
            updated : "TIMESTAMP",
            hit : "INT(11)",
        }
         */
    ]);

    const [noticeDetail, setNoticeDetail] = useState({
        /** Notice Data Format
         {
            idx : "BIGINT(20)",
            creator_idx : "BIGINT(20)",
            title : "VARCHAR(255)",
            content : "VARCHAR(5000)",
            imgurl : "VARCHAR(2048)",
            deleted : "TINYINT(1)",
            created : "TIMESTAMP",
            updated : "TIMESTAMP",
            hit : "INT(11)",
        }
         */
    });

    // 처음 한 번 실행해서, 모든 공지사항 불러오기
    useEffect(() => {
        console.log('[useEffect] 페이지 로딩 시 한 번만 실행되는 함수');
        getAllNoticesData();
     }, []);

    /**
     * 1. 전체 공지사항 [get]
     * http://localhost:8080/notice/list?page=0&size=10
     * */
    const getAllNoticesData = () => {
        console.log("[getAllNoticesData]");

        // [ TEST ]
        // ========== ERASE ==========
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(response => response.json())
            .then((json) => {
                setNotices(json);
            });
        // ========== //ERASE ==========

        // 실제 배포는 8000
        // 테스트 및 개발 서버는 7000
        //axios.get(`${API}/list`,
        //       params:{
        //         page : currentPage,
        //         size : itemsPerPage
        //       }
        //     });
        //     .then((response) => {
        //         console.log('게시글 전체 (All) successful : ', response.data);
        //         setNoticeDetail(response.data);
        //     })
        //     .catch((error) => {
        //         console.error('게시글 전체 (All) fail : ', error);
        //     });
    };

    /**
     * 2. 공지사항 자세하게 보기 [get]
     * http://localhost:8080/notice/2
     * */
    const getNoticesDataDetail = (e) => {
        console.log("[getNoticesDataDetail]");
        e.preventDefault();

        // 실제 배포는 8000
        // 테스트 및 개발 서버는 7000
        //axios.get(`${API}/`,
        //       params:{
        //         id: 12345
        //       }
        //     });
        //     .then((response) => {
        //         console.log('게시글 자세하게 (Detail) successful : ', response.data);
        //         setNoticeDetail(response.data);
        //     })
        //     .catch((error) => {
        //         console.error('게시글 자세하게 (Detail) fail : ', error);
        //     });
    }


    // 검색
    const handleNoticeData = (e) => {
        e.preventDefault();

        // 공지사항 데이터 호출
        getAllNoticesData();

        // 전체 리스트에서 FE 자체 검색
        const sendSearch = search.toLowerCase();

        if (!sendSearch) {
            console.log("SearchAll :", notices.length);
        } else {
            const searchNotice = notices.filter((notice) =>
                notice.title.includes(sendSearch)
            );
            setNotices(searchNotice);
            setCurrentPage(1);
        }
    };

    const handleChange = (updatedSearch) => {
        console.log([handleChange]);
        setSearch(updatedSearch);
        handleNoticeData();
    };

    return (
        <>
            <div>
                <h2>공지사항</h2>
            </div>
            <AnnounceUserViewPage page={currentPage} size={itemsPerPage} setCurrentPage={setCurrentPage}/>
            <AuthFormGrid>
                {
                    // 모든 리스트 출력
                    // :<div className="AuthFormGrid">
                    //     { notices.map((notice) => (
                    //         <NoticeInfo key={notice.id} {...notice} />
                    //     ))}
                    // </div>
                }
            </AuthFormGrid>
            <Link to='/notice/postcreate'>
                <CustomButton>
                    글작성
                </CustomButton>
            </Link>
        </>
    )
}

export default NoticeListPage;
