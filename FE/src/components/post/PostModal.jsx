import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import axios from "axios";
import "../../styles/AnnounceStyle.scss"
import {StyledSearchBar} from "../../styles/searchBarStyle";

const PostModal = ({selectedPost, setSelectedPost, modalIsOpen, setModalIsOpen}) => {
    const baseURL = 'https://i9a608.p.ssafy.io:8000';
    const API = '/notice';

    Modal.setAppElement("#root");

    const [state, setState] = useState(false);
    const [disabledTitle, setDisabledTitle] = useState(false);
    const [disabledContent, setDisabledContent] = useState(false);

    useEffect(() => {
        console.log("[PostModal]");
        setState(selectedPost &&(selectedPost.noticeIdx === 0 || state));
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
        const accessToken = sessionStorage.getItem("accessToken")
        const user_id = sessionStorage.getItem("userIdx")*1;

        console.log("[postNoticesDataCreateServer]");
        e.preventDefault();

        if (checkUserRole()) {
            // 실제 배포는 8000
            // 테스트 및 개발 서버는 7000
            axios.post(`${API}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {}

                })
                .then((response) => {
                    console.log('게시글 작성 POST successful : ', response.data);
                })
                .catch((error) => {
                    console.error('게시글 작성 POST fail : ', error);
                });
        }
    }

    /**
     * 4. 공지사항 삭제 [delete]
     *http://localhost:8080/notice/2
     */
    const deletePost = (e) => {
        const accessToken = sessionStorage.getItem("accessToken")
        console.log("[deletePost]");
        e.preventDefault();

        if (checkUserRole()) {
            console.log("게시글 삭제 (제작중)");
            axios.delete(`${API}//${selectedPost.noticeIdx}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                })
                .then((response) => {
                    console.log('게시글 삭제 (Delete) successful : ', response.data);
                    setSelectedPost([]);
                })
                .catch((error) => {
                    console.error('게시글 삭제 (Delete) fail : ', error);
                });
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
        const accessToken = sessionStorage.getItem("accessToken")
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
            {/*<Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="notice_modal_part">*/}
            {/*    {*/}
            {/*        selectedPost &&(*/}
            {/*        <div className="modal_contents_box">*/}
            {/*            {*/}
            {/*                state*/}
            {/*                ? <input disabled={disabledTitle} value={selectedPost.noticeTitle} className="modal_inner_title_input"/>*/}
            {/*                : <h2 className="modal_inner_title">*/}
            {/*                    selectedPost.noticeTitle <hr/>*/}
            {/*                </h2>*/}
            {/*            }*/}
            {/*            <p className="modal_inner_contents">*/}
            {/*                {*/}
            {/*                    state*/}
            {/*                    ? <input disabled={disabledContent} value={selectedPost.noticeContent}/>*/}
            {/*                    : selectedPost.noticeContent*/}
            {/*                }*/}
            {/*            </p>*/}
            {/*            {*/}
            {/*                state*/}
            {/*                ?*/}
            {/*                <div>*/}
            {/*                    <button onClick={closeModal}>닫기</button>*/}
            {/*                    <button onClick={closeModal}>등록</button>*/}
            {/*                </div>*/}
            {/*                :*/}
            {/*                <div>*/}
            {/*                    <button onClick={closeModal}>닫기</button>*/}
            {/*                    <button onClick={editPost}>수정</button>*/}
            {/*                    <button onClick={deletePost}>삭제</button>*/}
            {/*                </div>*/}
            {/*            }*/}
            {/*        </div>*/}
            {/*        )*/}
            {/*    }*/}
            {/*    </Modal>*/}



            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="notice_modal">
                {
                    selectedPost &&(
                        <form className="modal_contents_box">
                            {
                                state
                                    ? <input
                                        disabled={disabledTitle}
                                         value={selectedPost.noticeTitle}
                                         // onChange={postChange}
                                         className="modal_inner_title_input"
                                    />
                                    : <h2 className="modal_inner_title">
                                        selectedPost.noticeTitle <hr/>
                                    </h2>
                            }
                            {
                                state
                                ?
                                <input
                                    disabled={disabledContent}
                                    value={selectedPost.noticeContent}
                                    // onChange={postChange}
                                    className="modal_inner_contents_input"
                                />
                                :
                                <p className="modal_inner_contents">
                                    selectedPost.noticeContent
                                </p>
                            }

                            {
                                state
                                    ?
                                    <div className="buttonList">
                                        <button onClick={closeModal}>닫기</button>
                                        <button onClick={closeModal}>등록</button>
                                    </div>
                                    :
                                    <div className="buttonList">
                                        <button onClick={closeModal}>닫기</button>
                                        <button onClick={editPost}>수정</button>
                                        <button onClick={deletePost}>삭제</button>
                                    </div>
                            }
                        </form>
                    )
                }
            </Modal>
        </>
    )
}

export default PostModal;