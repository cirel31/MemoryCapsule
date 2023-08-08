import {AuthFormBlock, CustomButtonFriend, FormBody, WhiteBox} from "../../styles/friendStyle";
import React, {useState} from "react";
import Modal from "react-modal";
import FriendAddDeleteButton from "./FriendAddDeleteButton";

const FriendDetail = ({select, closeFriendDetail}) => {

    return (
        <>
            <div className="close_user_detail">
                <div onClick={closeFriendDetail} className="close_user_detail_btn">
                    ✖
                </div>
            </div>
            <div className="user_img_setting">
                <img src="../userImg" alt="유저 이미지" className="userImg"/>
            </div>
            <div className="user_info">
                <div className="user_info_username">
                    {select.nickname} 닉네임
                </div>
                <div className="user_info_email">
                    ({select.id})
                </div>
            </div>
                <div className="user_project_info">
                    <p className="user_project_text">
                        친구가 현재까지 작성한 기록
                        <span className="user_project_text_hl"> 10{} </span>
                        개
                    </p>
                    <p className="user_project_text">
                        친구가 현재 제작중인 캡슐
                        <span className="user_project_text_hl"> 3{} </span>
                        개
                    </p>
                </div>
            <FriendAddDeleteButton friend={select} status={select.status} from="FriendDetail"/>
        </>
    );
};

export default FriendDetail;
