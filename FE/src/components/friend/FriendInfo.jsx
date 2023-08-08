import { FriendItem } from "../../styles/friendStyle";
import FriendAddDeleteButton from "./FriendAddDeleteButton";
import React, {useState} from "react";
import person from "../../assets/images/frield/person.svg"

const FriendInfo = ({select, setSelect, friend}) => {
    // 친구인지 여부
    const isFriend = true;

    const selectFriend = () => {
        const selected = {
            "id" : friend.email,
        };
        setSelect(selected);
        console.log("[selectFriend] ", friend.userId);
    }

    return (
        <FriendItem className="friendListItem">
            <div className="user_img_setting">
                <img src="../userImg" alt="유저 이미지" className="userImg"/>
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
                        <img src={person} alt="유저 자세히보기 이미지" className="userDetailButtonImg"/>
                    </div>
                    :<FriendAddDeleteButton select={select}/>
            }
        </FriendItem>
    )
}

export default FriendInfo;
