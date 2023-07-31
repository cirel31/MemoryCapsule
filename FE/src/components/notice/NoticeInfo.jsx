import {NoticeItem} from "../../styles/noticeStyle";

const NoticeInfo = ({userId, id, title, body}) => {
    return (
        <NoticeItem>
            <div className="NoticeItem">
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
        </NoticeItem>
    )
}

export default NoticeInfo;
