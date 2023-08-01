import {NoticeItem} from "../../styles/noticeStyle";
import Modal from "react-modal";
import React, {useState} from "react";

const NoticeInfo = ({userId, id, title, body}) => {
    const [noticeModalIsOpen, setNoticeModalIsOpen] = useState(0);

    const noticeDetailModal = (e) => {
        setNoticeModalIsOpen(id);
    }
    return (
        <NoticeItem>
            <div className="NoticeItem" onClick={noticeDetailModal}>
                <div className="info">
                    <span className="author_info">
                        {/*userId : {userId} |*/}
                        title : {title}
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
                        0000-00-0{id}
                    </div>
                </div>
            </div>
            {/* 모달 창 */}
            <Modal isOpen={noticeModalIsOpen !== 0}>
                <div style={{width:'100%', height:'100%'}} onClick={() => setNoticeModalIsOpen(0)}>
                    <div>
                        title : {title}
                    </div>
                    <div>
                        body : {body}
                    </div>
                </div>
            </Modal>
        </NoticeItem>
    )
}

export default NoticeInfo;
