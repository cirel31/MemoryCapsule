import { NoFriendList, AuthFormGrid, CustomButton } from "../../styles/friendStyle";

import React, { useState } from "react";
// import NoticeInfo from "../components/notice/NoticeInfo";
import SearchBar from "../../components/SearchBar"
import axios from "axios";
import Pagination from "../../components/common/Pagination";

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
            // 실제 배포는 8000
            // 테스트 및 개발 서버는 7000
            axios.post("http://localhost:7000/", noticeData)
                .then((response) => {
                    console.log(response.data)
                })
                .catch((error) => {
                    console.error("Notice List 호출 과정에서 에러 발생", error)
                })
        }
    };

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
        </>
    )
}

export default NoticeListPage;
