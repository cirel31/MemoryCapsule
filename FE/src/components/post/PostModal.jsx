import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import axios from "axios";

const PostModal = ({selectedPost, setSelectedPost, modalIsOpen, setModalIsOpen}) => {
    const API = '/notice';

    const [state, setState] = useState(false);
    const [disabledTitle, setDisabledTitle] = useState(false);
    const [disabledContent, setDisabledContent] = useState(false);

    useEffect(() => {
        console.log("[PostModal]");
        setState(selectedPost &&(selectedPost.id === 0 || state));
    });

    // 공지사항 데이터 접근자가 관리자인지 확인
    function checkUserRole() {
        console.log("[checkUserRole]");
        // 관리자 권한 확인
        if (true) {
            console.log("관리자로 확인되었습니다.");
            return true;
        } else {
            console.log("관리자 권한이 없습니다.");
            return false;
        }
    }

    /**
     * 3. 공지사항 작성 [post]
     * http://localhost:8080/notice
     *{
     *  "noticeTitle" : "테스트",
     *  "noticeContent" : "테스트content",
     *  "noticeImgurl" : null
     *}  
     */

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        imgurl: '',
    });

    const postNoticesDataCreateServer = (e) => {
        console.log("[postNoticesDataCreateServer]");
        e.preventDefault();

        // if (checkUserRole()) {
        //     // 실제 배포는 8000
        //     // 테스트 및 개발 서버는 7000
        //     axios.post(`${API}/`, formData)
        //         .then((response) => {
        //             console.log('게시글 작성 POST successful : ', response.data);
        //         })
        //         .catch((error) => {
        //             console.error('게시글 작성 POST fail : ', error);
        //         });++++
        // }
    }

    /**
     * 4. 공지사항 삭제 [delete]
     *http://localhost:8080/notice/2
     */
    const deletePost = (e) => {
        console.log("[deletePost]");
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

    /**
     * 5. 공지사항 수정 [put]
     *http://localhost:8080/notice
     * {
     *  "idx" : "3",
     *  "noticeTitle" : "테스트수정",
     *  "noticeContent" : "테스트content",
     *  "noticeImgurl" : null
     * }
     */
    const putNoticesDataEditServer = (e) => {
        // console.log("[putNoticesDataEditServer]");
        // e.preventDefault();
        //
        // if (checkUserRole()) {
        //     axios.put(`${API}/`, formData)
        //         .then((response) => {
        //             console.log('게시글 수정 PUT successful : ', response.data);
        //         })
        //         .catch((error) => {
        //             console.error('게시글 수정 PUT fail : ', error);
        //         });
        // }
    }


    const closeModal = () => {
        setModalIsOpen(false);
        setState(false);
    }

    const editPost = () => {
        setState(true);
    }

    return (
        <>
                <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="notice_modal_part">
                    {
                        selectedPost &&(
                        <div className="modal_contents_box">
                            <h2 className="modal_inner_title">
                                {
                                    state
                                    ? <input disabled={disabledTitle} value={selectedPost.title}/>
                                    : selectedPost.title
                                }
                                <hr/>
                            </h2>
                            <p className="modal_inner_contents">
                                {/*이걸로 바꿔야 합니다*/}
                                {/*{*/}
                                {/*    state*/}
                                {/*        ?<input disabled={disabledContent} value={selectedPost.content}/>*/}
                                {/*        :selectedPost.content*/}
                                {/*}*/}
                                {
                                    state
                                    ? <input disabled={disabledContent} value={selectedPost.body}/>
                                    : selectedPost.body
                                }
                            </p>
                            {
                                state
                                ?
                                <div>
                                    <button onClick={closeModal}>닫기</button>
                                    <button onClick={closeModal}>등록</button>
                                </div>
                                :
                                <div>
                                    <button onClick={closeModal}>닫기</button>
                                    <button onClick={editPost}>수정</button>
                                    <button onClick={deletePost}>삭제</button>
                                </div>
                            }
                        </div>
                        )
                    }
                    </Modal>

        </>
    )
}

export default PostModal;