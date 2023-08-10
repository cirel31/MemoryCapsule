import { FriendItem } from "../../styles/friendStyle";
import FriendAddDeleteButton from "./FriendAddDeleteButton";
import React, {useState} from "react";
import add_friend from "../../assets/images/frield/add_friend.svg"
import axios from "axios";
import FriendDetailButton from "./FriendDetailButton";

const FriendInfo = ({from, select, setSelect, friend, imageUrl}) => {

    return (
        <div className="friend_list_item">
            <div className="user_img_setting">
                <img src={imageUrl} alt="유저 이미지" className="userImg"/>
            </div>
            <div className="user_info">
                <div className="user_info_username">
                    {friend.nickname}
                </div>
            </div>
            {
                !(from==="FriendList")
                ?
                <FriendAddDeleteButton
                    friend={friend}
                    status={friend.status}
                    from="FriendList"
                />
                :
                // 클릭 시 자세히보기
                <FriendDetailButton
                    friend={friend}
                    select={select}
                    setSelect={setSelect}
                />
            }
        </div>
    )
}

export default FriendInfo;
