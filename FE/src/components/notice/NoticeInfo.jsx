import {NoticeItem} from "../../styles/noticeStyle";
import Modal from "react-modal";
import React, {useState} from "react";
import PostModal from "../post/PostModal";

const NoticeInfo = ({notice}) => {
    const [noticeModalIsOpen, setNoticeModalIsOpen] = useState(0);

    const noticeDetailModal = () => {
        setNoticeModalIsOpen(notice.id);
    }
    return (
        <NoticeItem>
            <div className="NoticeItem" onClick={noticeDetailModal}>
                <div className="info">
                    <span className="author_info">
                        {/*userId : {userId} |*/}
                        title : {notice.title}
                        {/*body : {body}<br/>*/}
                    </span>
                    <div>
                        {/*신규 공지사항은 신규마크*/}
                        {
                            (1 === 1)
                                ?<div className="CustomButtonFriend"> + </div>
                                :<div className="CustomButtonFriend"> - </div>
                        }
                    </div>
                    <div>
                        {/*날짜*/}
                        0000-00-0{notice.id}
                    </div>
                </div>
            </div>
            {/* 모달 창 */}
            <PostModal notice={notice} noticeModalIsOpen={noticeModalIsOpen} setNoticeModalIsOpen={setNoticeModalIsOpen}/>
        </NoticeItem>
    )
}

export default NoticeInfo;
