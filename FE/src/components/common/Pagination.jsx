import React, { useState } from 'react';
import PostModal from "../post/PostModal";

const Pagination = ({ itemsPerPage, postList, currentPage, setCurrentPage }) => {

    const totalPages = Math.ceil(postList.length / itemsPerPage);

    // pagenation 처리를 위한 값들
    const indexOfLastItem = (currentPage+1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = postList.slice(indexOfFirstItem, indexOfLastItem);

    // 모달창 컨트롤을 위한 값
    const [selectedPost, setSelectedPost] = useState(null)
    const [isModal, setIsModal] = useState(false)

    const openModal = (id) => {
        // const index = postList.findIndex((post => post.id === id))
        const index = postList.findIndex((post => post.noticeIdx === id))
        setSelectedPost(postList[index])
        console.log("index : ", index);
        setIsModal(true)
    }

    // Handle page changes
    const handlePageChange = (pageNumber) => {
        console.log(currentItems);
        setCurrentPage(pageNumber);
    };

    const pageIndex = () => {
        const range = 2; // 앞뒤로 보여줄 페이지 개수
        let indexOfMinPage = currentPage-range -1 < 0 ? 0 : currentPage-range -1;
        let indexOfMaxPage;
        if (indexOfMinPage === 0) {
            indexOfMaxPage = (totalPages < range*2+1 ? totalPages : range*2+1);
        } else {
            indexOfMaxPage = (currentPage+range >= totalPages ? totalPages : currentPage+range);
        }

        if (indexOfMaxPage === totalPages) {
            indexOfMinPage = (totalPages - (range*2+1) >= 0 ? totalPages - (range*2+1) : 0);
        }

        console.log(indexOfMinPage, indexOfMaxPage);

        // 보여줄 페이지 리스트
        const showIndexList = [];

        //보여줄 페이지 저장
        for (let i = indexOfMinPage ; i < indexOfMaxPage ; i++) {
            showIndexList.push(i);
        }

        console.log("showIndexList : ", showIndexList);
        return showIndexList;
    }

    // 날짜 처리
    function addLeadingZero(number) {
        return number < 10 ? `0${number}` : number;
    }

    function getTime(getTime) {
        const getTimeChange = new Date(getTime);
        const Year = getTimeChange.getFullYear();
        const Month = getTimeChange.getMonth() + 1;
        const Day = getTimeChange.getDate();



        return(`${Year}-${addLeadingZero(Month)}-${addLeadingZero(Day)}`);
    }

    // 새 알람인지 구분 (일주일 기준)
    function isNewAlame(getTime) {
        const getTimeDate = new Date(getTime);
        const curTimeDate = new Date() - (7 * 24 * 60 * 60 * 1000);
        if (curTimeDate < getTimeDate) {
            return true;
        }
        return false;
    }

    return (
        <div className="announce_pagenation">
            {/* 자체 페이지네이션 */}
            {
            currentItems.map((post) => (
                <div className="announce_list_items">
                    <div
                        className="announce_list_item"
                        key={post.noticeIdx}
                        onClick={() => openModal(post.noticeIdx)}
                    >
                        <p>{post.noticeTitle}</p>
                    </div>
                    {
                        isNewAlame(post.noticeCreated)
                        ?
                        <div className="announce_list_alarm"/>
                        :
                        <div> </div>
                    }

                    <div>
                        <p>
                            {/*function으로 return 값을 date.getDate() 같은거 써서 return*/}
                            {getTime(post.noticeCreated)}
                        </p>
                    </div>
                </div>
                ))
            }

            {/* 페이지네이션 */}
            <div className="announce_pagenation_buttons">
                {
                    Array.from(pageIndex()).map((index) => (
                        currentPage===index
                        ?
                        <button key={index + 1} onClick={() => handlePageChange(index)} className="selected_announce_pagenation_button">
                            {index + 1}
                        </button>
                        :
                        <button key={index + 1} onClick={() => handlePageChange(index)} className="announce_pagenation_button">
                            {index + 1}
                        </button>
                    ))
                }
            </div>
            <PostModal
                selectedPost={selectedPost}
                setSelectedPost={setSelectedPost}
                modalIsOpen={isModal}
                setModalIsOpen={setIsModal}
            />
        </div>
    );
};

export default Pagination;