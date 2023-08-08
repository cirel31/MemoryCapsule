import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../styles/friendStyle.scss";
import go_back from "../../assets/images/frield/go_back.svg"

import {login, setUser} from '../../store/userSlice';
import FriendList from "../../components/friend/FriendList";
import {Link} from "react-router-dom";
import FriendSearch from "../../components/friend/FriendSearch";

const FriendPage = () => {
    const accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDA0IiwiYXV0aCI6IlVTRVIiLCJleHAiOjE2OTE0NzQ0Mjl9.sEfQti6mAsm4LGJYG46ZtkAkd-_YTKaJ-koV5aiTPsi1cvYG2AOITPSpdCNJOebSJZ4Kl_Y2ZBzre7GftUz-Cw";
    const API = '/friend';

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

    /**
     * 1. 전체 내 친구 목록 불러오기
     *
     * Method : get
     * URL : /friend/search/{user_id}
     * */
    // function addFriends(searchId) {
    //     console.log("[addFriends]");
    //
    //     // 서버로부터 내 친구목록 가져오기
    //     // axios.get(`${API}/search/${user_id}`,
    //     axios.post(`${API}/add`,
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${accessToken}`,
    //                 //userId
    //                 //searchId
    //             },
    //         }
    //     )
    //         .then((response) => {
    //             console.log('친구 추가 성공');
    //             console.log(API);
    //             console.log(response.data);
    //         })
    //         .catch((error) => {
    //             console.error("친구 추가 실패", error);
    //             console.error(error.code);
    //         });
    // }

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
    )
}

export default FriendPage;
