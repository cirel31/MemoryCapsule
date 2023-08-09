import React, {useState} from "react";
import axios from "axios";
import person from "../../assets/images/frield/person.svg";


const FriendDetailButton = ({ friend, select, setSelect}) => {
    const onSelectUser = () => {
        setSelect(friend);
    }

    return (
        <>
            <div onClick={onSelectUser} className="user_detail_button">
                <img src={person} alt="유저 자세히보기 이미지" className="userDetailButtonImg"/>
            </div>
        </>
    );
};

export default FriendDetailButton;
