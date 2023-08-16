import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import axios from "axios";
import "../../styles/ReviewStyle.scss"
import Swal from "sweetalert2";
import {useSelector} from "react-redux";
import heart from "../../assets/images/review/heart.svg";

const ReviewModal = ({selectedPost, setSelectedPost, modalIsOpen, setModalIsOpen}) => {
    const baseURL = 'https://i9a608.p.ssafy.io:8000';
    const API = '/review';

    Modal.setAppElement("#root");

    const [post, setPost] = useState([]);
    const [imageList, setImageList] = useState([]);
    const [state, setState] = useState(false);
    const [disabledTitle, setDisabledTitle] = useState(false);
    const [disabledContent, setDisabledContent] = useState(false);

    const user = useSelector((state) => state.userState.user)
    const [userRole, setUserRole] = useState()

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    useEffect(() => {
        setPost(selectedPost);
        setState(selectedPost &&(selectedPost.reviewIdx === 0 || state));
    }, [selectedPost]);

    useEffect(() => {
        post &&
        setUserRole(((user?.userId === post.writerIdx) || (user?.admin)) || false);
    }, [post]);

    /**
     * 3. 리뷰 작성 [post]
     * http://localhost:8080/review
     */
    const createReview = () => {
        const insertDto = {
            title: post.reviewTitle,
            content: post.reviewContent
        };

        const accessToken = sessionStorage.getItem("accessToken")
        const formData = new FormData();
        formData.append("insertDto", new Blob([JSON.stringify(insertDto)], { type: "application/json" }));

        if (userRole && post.reviewTitle && post.reviewContent) {
            axios.post(`${baseURL}${API}`, formData,
                {
                    headers: {
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
     * 4. 리뷰 삭제 [delete]
     *http://localhost:8080/review/2
    */
    const deleteReview = () => {
    const accessToken = sessionStorage.getItem("accessToken")

    if (userRole) {
    axios.delete(`${baseURL}${API}/${selectedPost.reviewIdx}`
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
     * 5. 리뷰 수정 [put]
     *http://localhost:8080/review
     */
    const putPostDataEdit = () => {
        const modifyDto = {
            idx: parseInt(post.reviewIdx, 10),
            title: post.reviewTitle,
            content: post.reviewContent
        };

        //formData 생성 및 데이터 input
        const formData = new FormData();
        formData.append("modifyDto", new Blob([JSON.stringify(modifyDto)], { type: "application/json" }));
        formData.append("file", null);

        const accessToken = sessionStorage.getItem("accessToken");

        if (userRole && post.reviewTitle && post.reviewContent) {
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

    /**
     * 6. 리뷰 좋아요 누르기 [post]
     */
    const likeReviewAdd = () => {
        const idx = parseInt(post.reviewIdx, 10);
        const accessToken = sessionStorage.getItem("accessToken");

        axios.post(`${baseURL}${API}/liked/${idx}`, null,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then((response) => {
                console.log('리뷰 좋아요 누르기 성공');
                showAlert("리뷰 좋아요 누르기 성공되었습니다.");

                const nextPost = {
                    ...post,
                    "liked" : true,
                    "reviewLike": (post.reviewLike + 1)
                };
                setPost(nextPost);
            })
            .catch((error) => {
                console.error("리뷰 좋아요 누르기 실패", error);
                console.error(error.code);
            });
    }

    /**
     * 7. 리뷰 좋아요 누르기 취소 [Delete]
     */
    const likeReviewDelete = () => {
        const idx = parseInt(post.reviewIdx, 10);
        const accessToken = sessionStorage.getItem("accessToken");

        axios.delete(`${baseURL}${API}/liked/${idx}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then((response) => {
                console.log('리뷰 좋아요 취소 성공');
                showAlert("리뷰 좋아요 취소 성공되었습니다.");

                const nextPost = {
                    ...post,
                    "liked" : false,
                    "reviewLike": (post.reviewLike - 1)
                };

                setPost(nextPost);
            })
            .catch((error) => {
                console.error("리뷰 좋아요 취소 실패", error);
                console.error(error.code);
            });
    };

    const showAlert = (text) => {
        Swal.fire({
            text,
        });
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setState(false);


        const nextForm = {
            "reviewTitle" : "",
            "reviewContent" : "",
        };
        setPost(nextForm);
    }

    const addPost = (e) => {
        e.preventDefault();

        if (post.reviewIdx === 0) {
            createReview();
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
            "reviewTitle" : value
        };
        setPost(nextForm);
    };

    const contentChange = (e) => {
        const { value } = e.target;
        const nextForm = {
            ...post,
            "reviewContent" : value,
        };
        setPost(nextForm);
    };

    const likeAdd = (e) => {
        e.preventDefault()
        likeReviewAdd();
    }

    const likeDelete = (e) => {
        e.preventDefault()
        likeReviewDelete();
    }

    return (
        <>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="review_modal">
                {
                    post &&
                    (
                        <form className="modal_contents_box">
                            {
                                state
                                ? <input
                                    disabled={disabledTitle}
                                    value={post.reviewTitle}
                                    className="modal_inner_title_input"
                                    onChange={titleChange}
                                />
                                : <h2 className="modal_inner_title">
                                    <div>
                                        {post.reviewTitle}
                                    </div>
                                    <div className="review_list_heart">
                                        <p className="heartCnt">
                                            {post.reviewLike}
                                        </p>
                                        {
                                            post.liked
                                            ?
                                            <button onClick={likeDelete} className="heartButton liked">
                                                <img src={heart} alt="heart"/>
                                            </button>
                                            :
                                            <button onClick={likeAdd} className="heartButton unliked">
                                                <img src={heart} alt="heart"/>
                                            </button>
                                        }
                                    </div>
                                    <hr/>
                                </h2>
                            }
                            {
                                state
                                ?
                                <textarea
                                    type="textarea"
                                    disabled={disabledContent}
                                    value={post.reviewContent}
                                    className="modal_inner_contents_input"
                                    onChange={contentChange}
                                    maxLength={5000}
                                />
                                :
                                <p className="modal_inner_contents">
                                    {post.reviewContent}
                                </p>
                            }
                            {/*몇 개의 글자를 사용했는지 표시*/}
                            {
                                post.reviewContent &&
                                <div className="buttonList">{post.reviewContent.length}/5000</div>
                            }
                            {
                                state
                                ?
                                <div className="buttonList">
                                    <button onClick={closeModal}>닫기</button>
                                    {userRole && <button onClick={addPost}>등록</button>}
                                </div>
                                :
                                <div className="buttonList">
                                    <button onClick={closeModal}>닫기</button>
                                    {userRole && <button onClick={editPost}>수정</button>}
                                    {userRole && <button onClick={deleteReview}>삭제</button>}
                                </div>
                            }
                        </form>
                    )
                }
            </Modal>
        </>
    )
}

export default ReviewModal;