import { FriendItem } from "../../styles/friendStyle";
import FriendAddDeleteButton from "./FriendAddDeleteButton";
import {useState} from "react";

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
        <FriendItem>
            <div className="FriendItem">
                <div className="info">
                    <span className="author_info">
                        e-mail : {email}<br/>
                        name : {name}<br/>
                        nickname : {username}<br/>
                    </span>
                    {
                        // 처음 로딩 시 친구여야 자세히보기 제공
                        isFriend
                        ?<div onClick={selectFriend}> 자세히보기 </div>
                        :<FriendAddDeleteButton select={select}/>
                    }

                </div>
            </div>
        </FriendItem>
    )
}

export default FriendInfo;
