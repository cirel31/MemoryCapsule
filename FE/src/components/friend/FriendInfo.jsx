import { FriendItem } from "../../styles/friendStyle";
import FriendAddDeleteButton from "./FriendAddDeleteButton";
import React, {useState} from "react";
import person from "../../assets/images/frield/person.svg"

const FriendInfo = ({select, setSelect, id, name, username, email, address, phone, website}) => {
    // 친구인지 여부
    const isFriend = true;

    const selectFriend = () => {
        const selected = {
            "id" : email,
        };
        setSelect(selected);
        console.log("[selectFriend] ", select);
    }

    return (
        <FriendItem className="friendListItem">
            <div className="user_img_setting">
                <img src="../userImg" alt="유저 이미지" className="userImg"/>
            </div>
            <div className="user_info">
                <div className="user_info_username">
                    {username}
                </div>
                <div className="user_info_email">
                    ({email})
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
