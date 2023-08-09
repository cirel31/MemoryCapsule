import React, { useState, useEffect } from "react";
import AnnounceUserViewPage from "./AnnounceUserViewPage";
import PostModal from "../../components/post/PostModal";
import Modal from "react-modal";

const NoticeListPage = () => {
    Modal.setAppElement("#root");

    const [isModal, setIsModal] = useState(false)

    const [post, setPost] = useState(
        /** Notice Data Format*/
        {
            noticeIdx : 0,
            noticeHit : 0,
            noticeTitle : "",
            noticeContent : "",
            noticeImgurl : "",
            noticeCreated : "",
        }
    )

    // 처음 한 번 실행해서, 모든 공지사항 불러오기
    useEffect(() => {
        console.log('[useEffect] 페이지 로딩 시 한 번만 실행되는 함수')
     }, []);

    const openModal = () => {
        setIsModal(true)
    }

    return (
        <div className="big_body">
            <div className="content_body">
                <AnnounceUserViewPage/>
                <div className="create_post">
                    <button
                        className="create_post"
                        key={post.id}
                    // onClick={() => openModal(post.id)}
                        onClick={() => openModal(post.title)}
                    >
                        글작성
                    </button>
                </div>
                <PostModal
                    selectedPost={{
                        noticeIdx : 0,
                        noticeHit : 0,
                        noticeTitle : "",
                        noticeContent : "",
                        noticeCreated : "",
                    }}
                    setSelectedPost={setPost}
                    modalIsOpen={isModal}
                    setModalIsOpen={setIsModal}
                />
            </div>

        </div>
    )
}

export default NoticeListPage;
