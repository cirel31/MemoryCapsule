import axios from "axios";
import Modal from "react-modal";
import React, {useEffect, useState} from "react";
import "../../styles/ReviewStyle.scss"
import ReviewModal from "../post/ReviewModal";
import ReviewPagination from "../post/ReviewPagination";

const ReviewList = ({page, size}) => {
    const baseURL = 'https://i9a608.p.ssafy.io:8000';
    const API = '/review';
    Modal.setAppElement("#root");

    // 페이지네이션 현재 페이지 저장
    const [currentPage, setCurrentPage] = useState(page);
    // 페이지네이션 보여줄 페이지 개수
    const [itemsPerPage, setItemsPerPage] = useState(size);

    const [selectedPost, setSelectedPost] = useState(null)
    const [isModal, setIsModal] = useState(false)
    const [postList, setPostList] = useState(null)

    useEffect(() => {
        console.log('[reviewList] 페이지 로딩 시 한 번만 실행되는 함수');
        getReviewsData(page, size);
    }, []);

    useEffect(() => {
        console.log('[reviewUserViewPage]');
        getReviewsData(page, size);
    }, [currentPage]); // currentPage 변경시에만 실행

    /**
     * 1. 전체 리뷰 [get]
     * http://localhost:8080/review/list?page=0&size=10
     * */
    const getReviewsData = (e) => {
        console.log("[getReviewsData]");
        const accessToken = sessionStorage.getItem("accessToken")

        // 리뷰 역순 정렬
        axios.get(`${baseURL}${API}/list?size=${itemsPerPage}&page=${currentPage}&sort=reviewIdx,desc`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        })
            .then((response) => {
              console.log('게시글 선택 (size, page) successful : ', response.data);
              setPostList(response.data);
            })
            .catch((error) => {
              console.error('게시글 전체 (size, page) fail : ', error);
            });
    };

    function isPostGetSuccess() {
        try {
            if(postList.length === 0) {
                return true;
            }
            return false;
        } catch (error) {
            return true;
        }
    }

    const isUpdateReview = (updatedReview) => {
        console.log("[isUpdateReview]");
        getReviewsData();
        isPostGetSuccess();
    }

    return (
        <>
            <div className="review_list">
                {
                    isPostGetSuccess()
                    ?
                    <div className="review_nothing">
                        <p>등록된 리뷰가 없습니다.</p>
                    </div>
                    :
                    (
                        postList &&
                        size <= 3
                        ?
                        postList.map((post) => (
                            <div
                                className="mypage_review_part"
                                key={post.reviewIdx}
                            >
                                <p>{post.reviewTitle}</p>
                            </div>
                        ))
                        :
                        <ReviewPagination
                            postList={postList}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            itemsPerPage={itemsPerPage}
                            onChange={isUpdateReview}
                        />
                    )
                }
            </div>
            {/*모달 창*/}
            <ReviewModal
                selectedPost={selectedPost}
                setSelectedPost={setSelectedPost}
                modalIsOpen={isModal}
                setModalIsOpen={setIsModal}
            />
        </>
    )
}
export default ReviewList;