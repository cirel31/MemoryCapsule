import { FriendItem } from "../../styles/friendStyle";
import FriendAddDeleteButton from "./FriendAddDeleteButton";
import React, {useState} from "react";
import add_friend from "../../assets/images/frield/add_friend.svg"

const FriendInfo = ({select, setSelect, friend, imageUrl}) => {


    const selectFriend = () => {
        const selected = {
            "id" : friend.email,
        };
        setSelect(selected);
        console.log("[selectFriend] ", friend.userId);
    }

    // 친구인지 여부
    // (친구인지 확인되면
    function isFriend(status) {
        switch (status){
            case 1 :    // 친구인 경우
                return <div onClick={selectFriend} className="user_detail_button">
                    <img src={add_friend} alt="유저 자세히보기 이미지" className="userDetailButtonImg"/>
                </div>
            default :    // 아무 관계가 아닌 경우
                return <FriendAddDeleteButton friend={friend} status={status} select={select} from="SelectFriend"/>
        }
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
                isFriend(friend.status)
            }
        </>
    )
}

export default FriendInfo;
