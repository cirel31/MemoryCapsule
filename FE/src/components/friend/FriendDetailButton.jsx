import React, {useState} from "react";
import axios from "axios";
import follower from "../../assets/images/frield/follower.svg";
import following from "../../assets/images/frield/following.svg";
import person from "../../assets/images/frield/person.svg";



const FriendDetailButton = ({ friend, select, setSelect}) => {
    const onSelectUser = () => {
        setSelect(friend);
    }

    return (
        <>
            {
                friend.status === 1
                ?
                <div onClick={onSelectUser} className="user_detail_button_friend">
                    <img src={person} alt="유저 자세히보기 이미지" className="userDetailButtonImg"/>
                </div>
                :
                    friend.status === 2
                    ?
                    <div onClick={onSelectUser} className="user_detail_button_following">
                        <img src={following} alt="유저 자세히보기 이미지" className="userDetailButtonImg"/>
                    </div>
                    :
                    <div onClick={onSelectUser} className="user_detail_button_follower">
                        <img src={follower} alt="유저 자세히보기 이미지" className="userDetailButtonImg"/>
                    </div>
            }

        </>
    );
};

export default FriendDetailButton;
