import React, { useState } from "react";
import AnnounceUserViewPage from "./AnnounceUserViewPage";
import NoticeModal from "../../components/post/NoticeModal";
import {useSelector} from "react-redux";

const NoticeListPage = () => {
    const user = useSelector((state) => state.userState.user)
    const admin = user?.admin || false

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

    const openModal = () => {
        setIsModal(true)
    }

    return (
        <div className="big_body">
            <div className="content_body">
                <AnnounceUserViewPage/>
                {
                    admin &&
                    <div className="create_post">
                        <button
                            className="create_post_button"
                            key={post.id}
                            onClick={() => openModal(post.title)}
                        >
                            글작성
                        </button>
                    </div>
                }
                <NoticeModal
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
