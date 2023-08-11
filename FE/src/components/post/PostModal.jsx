import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import axios from "axios";
import "../../styles/AnnounceStyle.scss"

const PostModal = ({selectedPost, setSelectedPost, modalIsOpen, setModalIsOpen}) => {
    const baseURL = 'https://i9a608.p.ssafy.io:8000';
    const API = '/notice';

    Modal.setAppElement("#root");

    const [post, setPost] = useState(selectedPost);
    const [state, setState] = useState(false);
    const [disabledTitle, setDisabledTitle] = useState(false);
    const [disabledContent, setDisabledContent] = useState(false);

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    useEffect(() => {
        console.log("[PostModal]");
        console.log("selectedPost :", selectedPost);
        setPost(selectedPost);
        setState(selectedPost &&(selectedPost.noticeIdx === 0 || state));
    }, [selectedPost]);

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
    console.log(sessionStorage);
    const createPost = () => {
        console.log("[createPost]")

        const insertDto = {
            title: "test Title",
            content: "test Content",
        };

        const accessToken = sessionStorage.getItem("accessToken")

        const formData = new FormData();
        formData.append("insertDto", new Blob([JSON.stringify(insertDto)], { type: "application/json" }));
        formData.append("file", null);

        console.log("formData : ", formData);
        console.log("insertDto : ", insertDto);
        if (checkUserRole()) {
            axios.post(`${baseURL}${API}`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                         Authorization: `Bearer ${accessToken}`
                    },
            })
            .then((response) => {
                console.log('게시글 작성 POST successful : ', response.data);
                closeModal()
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
    const deletePost = () => {
        const accessToken = sessionStorage.getItem("accessToken")
        console.log("[deletePost]");

        if (checkUserRole()) {
            console.log("게시글 삭제 (제작중)", selectedPost.noticeIdx);
            console.log("게시글 삭제 (제작중)", selectedPost.noticeIdx);
            axios.delete(`${baseURL}${API}/${selectedPost.noticeIdx}`
                ,{
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                }
                )
                .then((response) => {
                    console.log('게시글 삭제 (Delete) successful : ', response.data);
                    setSelectedPost([]);
                    closeModal()
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
    const putPostDataEdit = (e) => {
        e.preventDefault();
        console.log("[putPostDataEdit]");

        const modifyDto = {
            idx: 1,
            title: "test Title",
            content: "test Content",
        };

        //formData 생성 및 데이터 input
        const formData = new FormData();
        formData.append("modifyDto", new Blob([JSON.stringify(modifyDto)], { type: "application/json" }));
        formData.append("file", null);

        const accessToken = sessionStorage.getItem("accessToken");

        if (checkUserRole()) {
            axios.put(`${baseURL}${API}`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                .then((response) => {
                    console.log('게시글 수정 성공');
                    closeModal()
                })
                .catch((error) => {
                    console.error("게시글 수정 실패", error);
                    console.error(error.code);
                });
        }
    }

    const closeModal = (e) => {
        e.preventDefault();
        setModalIsOpen(false);
        setState(false);


        const nextForm = {
            "noticeTitle" : "",
            "noticeContent" : "",
        };
        setPost(nextForm);
    }

    const addPost = (e) => {
        e.preventDefault();
        createPost()
    }

    const editPost = (e) => {
        e.preventDefault();
        setState(true);
    }

    const titleChange = (e) => {
        const { value } = e.target;
        const nextForm = {
            ...post,
            "noticeTitle" : value
        };
        setPost(nextForm);
        console.log("valueChangePost : ", post); // 수정된 값 로그로 확인
        console.log("valueChangeNextForm : ", nextForm); // 수정된 값 로그로 확인
    };

    const contentChange = (e) => {
        const { value } = e.target;
        const nextForm = {
            ...post,
            "noticeContent" : value,
        };
        setPost(nextForm);
        console.log("valueChangePost : ", post); // 수정된 값 로그로 확인
        console.log("valueChangeNextForm : ", nextForm); // 수정된 값 로그로 확인
    };

    return (
        <>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="notice_modal">
                {
                    post &&(
                        <form className="modal_contents_box">
                            {
                                state
                                ? <input
                                    disabled={disabledTitle}
                                    value={post.noticeTitle}
                                    className="modal_inner_title_input"
                                    onChange={titleChange}
                                />
                                : <h2 className="modal_inner_title">
                                    {post.noticeTitle} <hr/>
                                </h2>
                            }
                            {
                                state
                                ?
                                <textarea
                                    type="textarea"
                                    disabled={disabledContent}
                                    value={post.noticeContent}
                                    className="modal_inner_contents_input"
                                    onChange={contentChange}
                                />
                                :
                                <p className="modal_inner_contents">
                                    {post.noticeContent}
                                </p>
                            }
                            {/*몇 개의 글자를 사용했는지 표시*/}
                            {
                                post.noticeContent.length <= 5000
                                ?<div className="buttonList">{post.noticeContent.length}/5000</div>
                                :<div className="buttonList text_styled_red">{post.noticeContent.length}/5000</div>
                            }
                            {
                                state
                                ?
                                <div className="buttonList">
                                    <button onClick={closeModal}>닫기</button>
                                    {checkUserRole()&&<button onClick={addPost}>등록</button>}
                                </div>
                                :
                                <div className="buttonList">
                                    <button onClick={closeModal}>닫기</button>
                                    {checkUserRole()&&<button onClick={editPost}>수정</button>}
                                    {checkUserRole()&&<button onClick={deletePost}>삭제</button>}
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