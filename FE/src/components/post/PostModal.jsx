import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import {Link} from "react-router-dom";
import {CustomButton} from "../../styles/friendStyle";

const PostModal = (notice, noticeModalIsOpen, setNoticeModalIsOpen) => {
    console.log("notice : ", notice.noticeModalIsOpen);

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

    /**
     * 4. 공지사항 삭제 [delete]
     *http://localhost:8080/notice/2
     */
    const deleteNoticesDataServer = (e) => {
        console.log("[deleteNoticesDataServer]");
        e.preventDefault();

        if (checkUserRole()) {
            console.log("게시글 삭제 (제작중)");
            // axios.delete(`${API}/list`,{
            //       params:{
            //         id: 12345
            //       }
            //     });
            //     .then((response) => {
            //         console.log('게시글 삭제 (Delete) successful : ', response.data);
            //         setNoticeDetail("");
            //         getAllNoticesDataServer(currentPage, itemsPerPage);
            //     })
            //     .catch((error) => {
            //         console.error('게시글 삭제 (Delete) fail : ', error);
            //     });
        }
    }

    return (
        <>
            <Modal isOpen={notice.noticeModalIsOpen !== 0}>
                <div style={{width:'100%', height:'100%'}}>
                    <div onClick={() => notice.setNoticeModalIsOpen(0)}>
                        ✖
                    </div>
                    <div>
                        title : {notice.notice.title}
                    </div>
                    <div>
                        createdAt : {notice.notice.created}
                        | updatedAt : {notice.notice.updated}
                    </div>
                    <div>
                        body : {notice.notice.body}
                    </div>
                </div>
                <div>
                    <Link to='/notice/postcreate'>
                        <CustomButton>
                            글수정
                        </CustomButton>
                    </Link>
                    <CustomButton onClick={deleteNoticesDataServer}>
                        글삭제
                    </CustomButton>
                </div>
            </Modal>
        </>
    )
}

export default PostModal;