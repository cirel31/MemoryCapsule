import React, { useState } from 'react';
import NoticeInfo from "../notice/NoticeInfo";

const Pagination = ({ itemsPerPage, notices, currentPage, setCurrentPage }) => {

    // Calculate the total number of pages
    const totalPages = Math.ceil(notices.length / itemsPerPage);

    // Get the current items to display on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = notices.slice(indexOfFirstItem, indexOfLastItem);

    // Handle page changes
    const handlePageChange = (pageNumber) => {
        console.log(currentItems);
        setCurrentPage(pageNumber);
    };

    const pageIndex = () => {
        const range = 2; // 앞뒤로 보여줄 페이지 개수
        // const indexOfMinPage = Math.max(0, currentPage - range);
        // const indexOfMaxPage = Math.min(totalPages, currentPage + range+1);
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
            {currentItems.map((notice) => (
                <div className="AuthFormGrid">
                    <NoticeInfo key={notice.id} {...notice} />
                </div>
            ))}

            {/* 페이지네이션 */}
            <div>
                {Array.from(pageIndex()).map((index) => (
                    <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Pagination;