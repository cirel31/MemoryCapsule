import React, { useState } from 'react';
import Modal from "react-modal";
import ReviewModal from "../post/ReviewModal";
import heart from "../../assets/images/review/heart.svg";
import axios from "axios";

const ReviewPagination = ({ postList, currentPage, setCurrentPage, updatePage }) => {
    const baseURL = 'https://i9a608.p.ssafy.io:8000';
    const API = '/review';

    //페이지네이션 처리해야 함
    const totalPages = postList.totalPages;
    Modal.setAppElement("#root");

    // 모달창 컨트롤을 위한 값
    const [selectedPost, setSelectedPost] = useState(null)
    const [isModal, setIsModal] = useState(false)

    /**
     * 2. 공지사항 자세하게 보기 [get]
     * http://localhost:8080/review/2
     * */
    const getReviewsDataDetail = (idx) => {
        console.log("[getReviewsDataDetail]", selectedPost, idx);

        const index = parseInt(idx);
        const accessToken = sessionStorage.getItem("accessToken")

        console.log(index);
        axios.get(`${baseURL}${API}/${index}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        })
            .then((response) => {
                console.log('게시글 자세하게 (Detail) successful : ', response.data);
                setSelectedPost(response.data);
                setIsModal(true)
            })
            .catch((error) => {
                console.error('게시글 자세하게 (Detail) fail : ', error);
            });
    };

    const openModal = (id) => {
        // const index = postList.findIndex((post => post.id === id))
        getReviewsDataDetail(id);
        console.log("selectedPost : ", selectedPost);
        setIsModal(true);
    }

    const handlePageChange = (pageNumber) => {
        console.log("currentPage:", currentPage);
        console.log("pageNumber:", pageNumber);
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

        console.log("showIndexList : ", totalPages);
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

    // 새 알람인지 구분 (3일 기준)
    function isNewAlame (getTime) {
        const getTimeDate = new Date(getTime);
        const curTimeDate = new Date() - (3 * 24 * 60 * 60 * 1000);
        if (curTimeDate < getTimeDate) {
            return true;
        }
        return false;
    }

    return (
        <div className="review_pagenation">
            {
            postList.content &&
            postList.content.map((post) => (
                <div className="review_list_items">
                    <div
                        className="review_list_item"
                        key={post.reviewIdx}
                        onClick={() => post && openModal(post.reviewIdx)}
                    >
                        <p>{post.reviewTitle}</p>
                    </div>
                    {
                        post && isNewAlame(post.reviewCreated)
                        ?
                        <div className="review_list_alarm"/>
                        :
                        <div> </div>
                    }

                    <div className="review_list_heart">
                        <p className="heartCnt">
                            {/*function으로 return 값을 date.getDate() 같은거 써서 return*/}
                            {post.reviewHit}
                        </p>
                        <div className="reviewHit">
                            <img src={heart} alt="heart"/>
                        </div>
                    </div>
                </div>
                ))
            }


            <div className="review_pagenation_buttons">
                {
                    pageIndex() &&
                    Array.from(pageIndex()).map((index) => (
                        currentPage===index
                        ?
                        <button key={index + 1} className="selected_review_pagenation_button">
                            {index + 1}
                        </button>
                        :
                        <button key={index + 1} onClick={() => handlePageChange(index)} className="review_pagenation_button">
                            {index + 1}
                        </button>
                    ))
                }
            </div>
            <ReviewModal
                selectedPost={selectedPost}
                setSelectedPost={setSelectedPost}
                modalIsOpen={isModal}
                setModalIsOpen={setIsModal}
            />
        </div>
    );
};

export default ReviewPagination;