import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import axios from "axios";
import "../../styles/AnnounceStyle.scss"
import Swal from "sweetalert2";
import {useSelector} from "react-redux";

const NoticeModal = ({selectedPost, setSelectedPost, modalIsOpen, setModalIsOpen}) => {
    const baseURL = 'https://i9a608.p.ssafy.io:8000';
    const API = '/notice';

    Modal.setAppElement("#root");

    const [post, setPost] = useState(selectedPost);
    const [imageList, setImageList] = useState([]);
    const [state, setState] = useState(false);
    const [disabledTitle, setDisabledTitle] = useState(false);
    const [disabledContent, setDisabledContent] = useState(false);

    const user = useSelector((state) => state.userState.user)
    const admin = user?.admin || false

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    useEffect(() => {
        setPost(selectedPost);
        setState(selectedPost &&(selectedPost.noticeIdx === 0 || state));
    }, [modalIsOpen]);

    /**
     * 3. 공지사항 작성 [post]
     * http://localhost:8080/notice
     */
    const createPost = () => {
        const insertDto = {
            title: post.noticeTitle,
            content: post.noticeContent
        };

        const accessToken = sessionStorage.getItem("accessToken")

        const formData = new FormData();
        formData.append("insertDto", new Blob([JSON.stringify(insertDto)], { type: "application/json" }));

        imageList && imageList.forEach(image => {
            formData.append('file', image);
        });

        if (admin && post.noticeTitle && post.noticeContent) {
            axios.post(`${baseURL}${API}`, formData,
                {
                    headers: {
                        // "Content-Type": "application/json",
                        "Content-Type": "multipart/form-data",
                         Authorization: `Bearer ${accessToken}`
                    },
            })
            .then((response) => {
                setSelectedPost([]);
                showAlert("게시글이 등록되었습니다.");
                closeModal()
            })
            .catch((error) => {
                console.error('게시글 작성 POST fail : ', error);
            });
        } else {
            showAlert("제목과 내용을 적어주세요.");
        }
    }

    /**
     * 4. 공지사항 삭제 [delete]
     *http://localhost:8080/notice/2
     */
    const deletePost = () => {
        const accessToken = sessionStorage.getItem("accessToken")

        if (admin) {
            axios.delete(`${baseURL}${API}/${selectedPost.noticeIdx}`
                ,{
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                }
                )
                .then((response) => {
                    showAlert("게시글이 삭제되었습니다.");
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
    const putPostDataEdit = () => {
        const modifyDto = {
            idx: parseInt(post.noticeIdx, 10),
            title: post.noticeTitle,
            content: post.noticeContent
        };

        //formData 생성 및 데이터 input
        const formData = new FormData();
        formData.append("modifyDto", new Blob([JSON.stringify(modifyDto)], { type: "application/json" }));
        formData.append("file", null);

        const accessToken = sessionStorage.getItem("accessToken");

        if (admin) {
            axios.put(`${baseURL}${API}`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                .then((response) => {
                    showAlert("게시글이 수정되었습니다.");
                    closeModal()
                })
                .catch((error) => {
                    console.error("게시글 수정 실패", error);
                    console.error(error.code);
                });
        }
    }

    const showAlert = (text) => {
        Swal.fire({
            text,
        });
    };

    const closeModal = () => {
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

        if (post.noticeIdx === 0) {
            createPost();
        } else {
            putPostDataEdit();
        }
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
    };

    const contentChange = (e) => {
        const { value } = e.target;
        const nextForm = {
            ...post,
            "noticeContent" : value,
        };
        setPost(nextForm);
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
                                    maxLength={5000}
                                />
                                :
                                <p className="modal_inner_contents">
                                    {post.noticeContent}
                                </p>
                            }
                            {/*몇 개의 글자를 사용했는지 표시*/}
                            {
                                post.noticeContent.length < 5000
                                ?<div className="buttonList">{post.noticeContent.length}/5000</div>
                                :<div className="buttonList text_styled_red">{post.noticeContent.length}/5000</div>
                            }
                            {
                                state
                                ?
                                <div className="buttonList">
                                    <button onClick={closeModal}>닫기</button>
                                    {admin&&<button onClick={addPost}>등록</button>}
                                </div>
                                :
                                <div className="buttonList">
                                    <button onClick={closeModal}>닫기</button>
                                    {admin&&<button onClick={editPost}>수정</button>}
                                    {admin&&<button onClick={deletePost}>삭제</button>}
                                </div>
                            }
                        </form>
                    )
                }
            </Modal>
        </>
    )
}

export default NoticeModal;