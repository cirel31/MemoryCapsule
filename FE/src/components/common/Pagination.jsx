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

    return (
        <div>
            {/* 자체 페이지네이션 */}
            {
            currentItems.map((post) => (
                <div>
                    <div
                        className="mypage_notice_part"
                        key={post.noticeIdx}
                        onClick={() => openModal(post.noticeIdx)}
                    >
                        <p>{post.noticeTitle}</p>
                    </div>
                    <div>
                        alarm
                    </div>
                    <div>
                        <p>{post.noticeIdx}</p>
                    </div>
                </div>
                ))
            }

            {/* 페이지네이션 */}
            <div>
                {Array.from(pageIndex()).map((index) => (
                    <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </button>
                ))}
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