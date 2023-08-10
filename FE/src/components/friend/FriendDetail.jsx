import {AuthFormBlock, CustomButtonFriend, FormBody, WhiteBox} from "../../styles/friendStyle";
import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import FriendAddDeleteButton from "./FriendAddDeleteButton";
import close from "../../assets/images/frield/close.svg"

const FriendDetail = ({select, setSelect, closeFriendDetail}) => {
    const [curStatus, setCurStatus] = useState(select.status)

    return (
        <div className="friend_detail_guide">
            <div className="friend_detail_item">
                <div className="close_user_detail">
                    <div onClick={closeFriendDetail} className="close_user_detail_btn">
                        <img src={close} alt="닫기" className="close_user_detail_btn_img"/>
                    </div>
                </div>
                <div className="user_img_setting">
                    <img src={select.imgUrl} alt="유저 이미지" className="userImg"/>
                </div>
                <div className="user_info">
                    <div className="user_info_username">
                        {select.nickname}
                    </div>
                </div>
                    <div className="user_project_info">
                        <p className="user_project_text">
                            친구가 현재까지 작성한 기록
                            <span className="user_project_text_hl"> {select.totalWriteCnt} </span>
                            개
                        </p>
                        <p className="user_project_text">
                            친구가 현재 제작중인 캡슐
                                <span className="user_project_text_hl"> {select.totalInProjectCnt} </span>
                            개
                        </p>
                    </div>
                <FriendAddDeleteButton
                    friend={select}
                    status={select.status}
                    curStatus={curStatus}
                    setCurStatus={setCurStatus}
                    from="FriendDetail"
                />
            </div>
        </div>
    );
};

export default FriendDetail;
