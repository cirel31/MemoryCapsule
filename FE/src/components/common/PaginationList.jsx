import React, { useState } from 'react';
import NoticeInfo from "../notice/NoticeInfo";

const PaginationList = ({ itemsPerPage, notices }) => {
    const [currentPage, setCurrentPage] = useState(1);

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
        const indexOfMinPage = currentPage-2 < 0 ? 5 : currentPage-2;
        const indexOfMaxPage = currentPage+2 >= totalPages ? totalPages-5 : currentPage+2;

        const showIndexList = Array(indexOfMinPage, indexOfMaxPage).map(i => i);
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

            {/* Pagination buttons */}
            <div>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </button>
                ))}
                {/*{Array.from(pageIndex()).map((_, index) => (*/}
                {/*    <button key={index + 1} onClick={() => handlePageChange(index + 1)}>*/}
                {/*        {index + 1}*/}
                {/*    </button>*/}
                {/*))}*/}
            </div>
        </div>
    );
};

export default PaginationList;