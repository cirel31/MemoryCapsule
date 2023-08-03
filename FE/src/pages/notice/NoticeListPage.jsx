import { NoFriendList, AuthFormGrid, CustomButton } from "../../styles/friendStyle";

import React, { useState, useEffect } from "react";
// import NoticeInfo from "../components/notice/NoticeInfo";
import SearchBar from "../../components/SearchBar"
import axios from "axios";
import Pagination from "../../components/common/Pagination";

import {Link} from "react-router-dom";


const NoticeListPage = () => {

    // 검색어 저장
    const [search, setSearch] = useState("");

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
            notice_idx : "BIGINT(20)",
            notice_creator_idx : "BIGINT(20)",
            notice_title : "VARCHAR(255)",
            notice_content : "VARCHAR(5000)",
            notice_imgurl : "VARCHAR(2048)",
            notice_deleted : "TINYINT(1)",
            notice_created : "TIMESTAMP",
            notice_updated : "TIMESTAMP",
            notice_hit : "INT(11)",
        }
         */
    ]);

    // 처음 한 번 실행해서, 모든 공지사항 불러오기
    useEffect(() => {
        console.log('[useEffect] 페이지 로딩 시 한 번만 실행되는 함수');
        getNotices("");
     }, []);

    /**
     * 1. 전체 공지사항 [get]
     * http://localhost:8080/notice/list?page=0&size=10
     * */
    const getAllNoticesDataServer = (e) => {
        console.log("[getAllNoticesDataServer]");
        e.preventDefault();

        // 실제 배포는 8000
        // 테스트 및 개발 서버는 7000
        //axios.get("http://localhost:8080/notice/list", page, size)
    };

    /**
     * 2. 공지사항 자세하게 보기 [get]
     * http://localhost:8080/notice/2
     * */
    const getNoticesDataDetailServer = (e) => {
        console.log("[getNoticesDataDetailServer]");
        e.preventDefault();

        // 실제 배포는 8000
        // 테스트 및 개발 서버는 7000
        //axios.get("http://localhost:8080/notice/", id)
    }

    /**
     * 4. 공지사항 삭제 [delete]
     *http://localhost:8080/notice/2
     */
    const deleteNoticesDataServer = (e) => {
        console.log("[deleteNoticesDataServer]");
        e.preventDefault();

        if (checkUserRole()) {
            // axios.delete("http://localhost:8080/notice/", id)
            //     .then((response) => {
            //         console.log('게시글 삭제 Delete successful : ', response.data);
            //     })
            //     .catch((error) => {
            //         console.error('게시글 삭제 Delete fail : ', error);
            //     });
        }
    }

    // 서버와 통신
    const sendNoticesDataServer = (e) => {
        e.preventDefault();
        const sendSearch = search;

        if (!sendSearch) {
            console.log("한 글자라도 입력해주십시오");
        } else {
            console.log(sendSearch);
        }

        if (sendSearch.length > 0) {
            const noticeData = {
                search: sendSearch
            }

        }
    };

    // 공지사항 데이터 접근자가 관리자인지 확인
    function checkUserRole() {
        console.log("[checkUserRole]");
        if (true) {
            return true;
        } else {
            console.log("관리자 권한이 없습니다.");
            return false;
        }
    }

    // 공지사항 데이터 수신
    function getNotices(searchValue) {
        console.log("[getNotices]");
        if (!searchValue){
            //test data 받아오기
            console.log("NoSearchValue");
            axios.get("http://localhost:7000/friend/search")
                .then((response) => {
                    console.log(response.data)
                })
                .catch((error) => {
                    console.error("Notice List 호출 과정에서 에러 발생", error)
                })
        } else {
            console.log("HasSearchValue : ", searchValue);
            axios.get("http://localhost:7000/friend/find", {
                    params : {
                        user_id : searchValue
                    }
                })
                .then((response) => {
                    console.log(response.data)
                })
                .catch((error) => {
                    console.error("Notice List 호출 과정에서 에러 발생", error)
                })
            }
            fetch("https://jsonplaceholder.typicode.com/posts")
                .then(response => response.json())
                .then((json) => {
                    setNotices(json);
                }
        );
        console.log(notices);

        // 성공했다면
        return true;
    }

    // 검색
    const handleNoticeData = (e) => {
        e.preventDefault();

        // 공지사항 데이터 호출
        getNotices(search);

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
                <SearchBar search={search} setSearch={setSearch} onChange={handleChange} />
            </div>
            <AuthFormGrid>
                <div className="AuthFormGrid">
                    <CustomButton onClick={sendNoticesDataServer}>
                        서버에서 찾기
                    </CustomButton>
                    <CustomButton onClick={handleNoticeData}>
                        내부에서 찾기
                    </CustomButton>
                </div>
            </AuthFormGrid>
            <AuthFormGrid>
                {
                    notices.length === 0
                    ?
                    <NoFriendList>
                        <div className="NoFriendList">
                            {/*on load는 시작하자마자 게시글을 불러오기 위해서 임시로 작성*/}
                            <div className="textBlock">
                                등록된 공지사항이 없습니다.
                            </div>
                        </div>
                    </NoFriendList>
                    :<Pagination notices={notices} itemsPerPage={5} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
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
