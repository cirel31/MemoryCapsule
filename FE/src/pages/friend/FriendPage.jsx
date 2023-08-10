import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../styles/friendStyle.scss";
import go_back from "../../assets/images/frield/go_back.svg"

import {login, setUser} from '../../store/userSlice';
import FriendList from "../../components/friend/FriendList";
import FriendSearch from "../../components/friend/FriendSearch";

const FriendPage = () => {
    const [friends, setFriends] = useState([
        {
            email:"email",
            imgUrl:"imgUrl",
            nickname:"nickname",
            userId:0
        }
    ]);
    const [selectPage, setSelectPage] = useState(false);
    const [select, setSelect] = useState({
        id: "",
    });

    // 뒤로가기
    const handleBack = () => {
        if (selectPage) {
            setSelectPage(false);
        } else {
            window.history.back()
        }
    }

    return (
        <div className="big_body">
            <div className="content_body">
                <div className="friend_top"/>
                <div className="friend_body">
                    <div className="friend_top_content">
                        <div className="friend_title">{
                            selectPage
                                ?"친구 찾기"
                                :"친구 목록"
                        }</div>
                        <div className="friend_back">
                            <div onClick={handleBack} className="friend_back_button">
                                <img src={go_back} alt="뒤로가기이미지" className="friend_back_button_img"/>
                            </div>
                        </div>
                    </div>
                    <div className="main_content_body">
                        {
                            !selectPage
                            ?
                            <FriendList
                                rowFriends={friends}
                                setRowFriends={setFriends}
                                select={select}
                                setSelect={setSelect}
                                setSelectPage={setSelectPage}
                            />
                            :
                            <FriendSearch
                                friends={friends}
                                setFriends={setFriends}
                                select={select}
                                setSelect={setSelect}
                                setSelectPage={setSelectPage}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FriendPage;
