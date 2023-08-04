import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import {Link} from "react-router-dom";
import {CustomButton} from "../../styles/friendStyle";

const PostModal = ({selectedPost, setSelectedPost, modalIsOpen, setModalIsOpen}) => {
    console.log("[PostModal]");
    console.log("selectedPost : ", selectedPost);
    console.log("setSelectedPost : ", setSelectedPost);
    console.log("modalIsOpen : ", modalIsOpen);
    console.log("setModalIsOpen : ", setModalIsOpen);

    const [state, setState] = useState(false);
    const [disabledTitle, setDisabledTitle] = useState(false);
    const [disabledContent, setDisabledContent] = useState(false);

    // 공지사항 데이터 접근자가 관리자인지 확인
    function checkUserRole() {
        console.log("[checkUserRole]");
        // 관리자 권한 확인
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

    const closeModal = () => {
        setModalIsOpen(null)
        setModalIsOpen(false)
    }

    return (
        <>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="notice_modal_part">
                {selectedPost && (
                    <div className="modal_contents_box">
                        <h2 className="modal_inner_title">
                            {
                                state
                                ?<input disabled={disabledTitle} value={selectedPost.title}/>
                                :selectedPost.title
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
                                ?<input disabled={disabledContent} value={selectedPost.body}/>
                                :selectedPost.body
                            }
                        </p>
                        <button onClick={closeModal}>닫기</button>
                        <button onClick={closeModal}>수정</button>
                        <button onClick={deletePost}>삭제</button>
                    </div>
                )}
            </Modal>


            {/*<Modal isOpen={modalIsOpen !== 0}>*/}
            {/*    <div style={{width:'100%', height:'100%'}}>*/}
            {/*        <div onClick={() => modalIsOpen(0)}>*/}
            {/*            ✖*/}
            {/*        </div>*/}
            {/*        <div>*/}
            {/*            title : {selectedPost.title}*/}
            {/*        </div>*/}
            {/*        <div>*/}
            {/*            createdAt : {selectedPost.created}*/}
            {/*            | updatedAt : {selectedPost.updated}*/}
            {/*        </div>*/}
            {/*        <div>*/}
            {/*            body : {selectedPost.body}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <Link to='/notice/postcreate'>*/}
            {/*            <CustomButton>*/}
            {/*                글수정*/}
            {/*            </CustomButton>*/}
            {/*        </Link>*/}
            {/*        <CustomButton onClick={deletePost}>*/}
            {/*            글삭제*/}
            {/*        </CustomButton>*/}
            {/*    </div>*/}
            {/*</Modal>*/}
        </>
    )
}

export default PostModal;