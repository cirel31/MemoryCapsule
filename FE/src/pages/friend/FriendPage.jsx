import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../styles/friendStyle.scss";
import go_back from "../../assets/images/frield/go_back.svg"

import {login, setUser} from '../../store/userSlice';
import FriendListPage from "./FriendListPage";
import {Link} from "react-router-dom";

const FriendPage = () => {
    const accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDA0IiwiYXV0aCI6IlVTRVIiLCJleHAiOjE2OTE0NzQ0Mjl9.sEfQti6mAsm4LGJYG46ZtkAkd-_YTKaJ-koV5aiTPsi1cvYG2AOITPSpdCNJOebSJZ4Kl_Y2ZBzre7GftUz-Cw";
    const API = '/friend';
    const [rowFriends, setRowFriends] = useState([]);
    const [friends, setFriends] = useState([]);

    const [form, setForm] = useState({
        id: "",
        search : 'id',
    });

    const [select, setSelect] = useState({
        id: "",
    });

    // 처음 한 번 실행 시, 내 친구 전부 불러오기
    useEffect(() => {
        console.log("[useEffect]");
        getFriends("id", "");
        console.log("login : ", login);
    }, []);

    function getFriends(searchId, searchValue) {
        console.log("[getFriends]");

        // 서버로부터 내 친구목록 가져오기
        axios.get(`${API}/search/2`,
      {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            }
            )
            .then((response) => {
                console.log('서버로부터 친구목록 가져오기 성공');
                console.log(API);
                console.log(response.data);
                setFriends(response.data);
            })
            .catch((error) => {
                console.error("서버로부터 친구목록 가져오기 실패", error);
                console.error(error.code);
            });
        console.log(searchId, searchValue);
    }

    // 검색
    const handleFriendData = (e) => {
        console.log("[handleFriendData]");
        e.preventDefault();
        const id = form.id.toLowerCase();
        const search = form.search;

        console.log("sendId", id);
        if (id === "") {
            for (let i = 0; i < rowFriends.length; i++) {
                console.log(rowFriends[i].name);
            }
            setFriends(rowFriends);
        } else {
            console.log("[제작예정] 불러온 친구 리스트 내부에서 검색");

            let searchFriend = rowFriends.filter((rowFriend) =>
                rowFriend.email.toLowerCase().includes(id)
            )
            console.log(searchFriend);
            setFriends(searchFriend);
        }
    };

    const handleChange = (updatedForm) => {
        console.log("[handleChange]");
        setForm(updatedForm);
    };

    return (
        <div className="big_body">
            <div className="friend_top"/>
            <div className="friend_body">
                <div className="friend_top_content">
                    <div className="friend_title">친구 목록</div>
                    <div className="friend_back">
                        <Link to={`/mypage`} className="friend_back_link">
                            <div className="friend_back_button">
                                <img src={go_back} alt="뒤로가기이미지" className="friend_back_button_img"/>
                            </div>
                        </Link>
                    </div>
                </div>
                <FriendListPage
                    friends={friends}
                    setFriends={setFriends}
                    rowFriends={rowFriends}
                    setRowFriends={setRowFriends}
                    form={form}
                    setForm={setForm}
                />
            </div>
        </div>
    )
}

export default FriendPage;
