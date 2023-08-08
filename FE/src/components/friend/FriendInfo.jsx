import { FriendItem } from "../../styles/friendStyle";
import FriendAddDeleteButton from "./FriendAddDeleteButton";
import React, {useState} from "react";
import add_friend from "../../assets/images/frield/add_friend.svg"

const FriendInfo = ({select, setSelect, friend, imageUrl}) => {
    // 친구인지 여부
    // (친구인지 확인되면
    function isFriend() {
        if (friend) {
            return true;
        }
        return false;
    }


    const selectFriend = () => {
        const selected = {
            "id" : friend.email,
        };
        setSelect(selected);
        console.log("[selectFriend] ", friend.userId);
    }

    return (
        <>
            <div className="user_img_setting">
                <img src={imageUrl} alt="유저 이미지" className="userImg"/>
            </div>
            <div className="user_info">
                <div className="user_info_username">
                    {friend.nickname}
                </div>
                <div className="user_info_email">
                    ({friend.email})
                </div>
            </div>
            {
                // 처음 로딩 시 친구여야 자세히보기 제공
                isFriend
                    ?<div onClick={selectFriend} className="user_detail_button">
                        <img src={add_friend} alt="유저 자세히보기 이미지" className="userDetailButtonImg"/>
                    </div>
                    :<FriendAddDeleteButton select={select}/>
            }
        </>
    )
}

export default FriendInfo;
