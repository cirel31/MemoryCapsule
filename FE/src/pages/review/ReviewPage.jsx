import React, { useState } from "react";
import {useSelector} from "react-redux";
import ReviewListPage from "./ReviewListPage";
import ReviewModal from "../../components/post/ReviewModal";

const ReviewPage = () => {
    const user = useSelector((state) => state.userState.user)

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
                <ReviewListPage/>
                {
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
                <ReviewModal
                    selectedPost={{
                        reviewIdx : 0,
                        reviewTitle : "",
                        reviewContent : "",
                    }}
                    setSelectedPost={setPost}
                    modalIsOpen={isModal}
                    setModalIsOpen={setIsModal}
                />
            </div>
        </div>
    )
}

export default ReviewPage;
