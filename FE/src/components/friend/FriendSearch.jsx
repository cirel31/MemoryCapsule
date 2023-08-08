import { NoFriendList, AuthFormGrid, CustomButton } from "../../styles/friendStyle";

import React, {useEffect, useState} from "react";
import FriendForm from "./FriendForm";
import FriendInfo from "./FriendInfo";
import axios from "axios";
import searchIcon from "../../assets/images/frield/searchIcon.svg";

const FriendSearch = ({friends, setFriends, select, setSelect, setSelectPage}) => {
    const accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDA0IiwiYXV0aCI6IlVTRVIiLCJleHAiOjE2OTE0NzQ0Mjl9.sEfQti6mAsm4LGJYG46ZtkAkd-_YTKaJ-koV5aiTPsi1cvYG2AOITPSpdCNJOebSJZ4Kl_Y2ZBzre7GftUz-Cw";
    const API = '/friend';

    const [form, setForm] = useState({
        id: "",
        search : 'id',
    });

    const [isValidSearch, setIsValidSearch] = useState(true);

    // 처음 한 번 실행 시, 내 친구리스트 초기화
    useEffect(() => {
        setFriends([]);
        setSelect("");
    }, []);

    /**
     * 1. 전체 친구 목록 중 검색한 것 불러오기
     *
     * Method : get
     * URL : /friend/search/{user_id}
     * */
    function getFriendsByServer(searchId, searchValue) {
        console.log("[getFriendsByServer]");

        // 서버로부터 내 친구목록 가져오기
        axios.get(`${API}/find/${searchId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            })
            .then((response) => {
                console.log('서버로부터 친구목록 가져오기 성공');
                console.log(API);
                console.log(response.data);
                setFriends([response.data]);
            })
            .catch((error) => {
                console.error("서버로부터 친구목록 가져오기 실패", error);
                console.error(error.code);
            });
    }

    // 검색
    const sendFriendDataServer = (e) => {
        console.log("[sendFriendDataServer]");
        e.preventDefault();

        const sendId = form.id;
        const sendSearch = form.search;

        if (sendId.length > 0) {
            getFriendsByServer(sendId, sendSearch);
        } else {
            console.log("한 글자 이상 입력해주세요");
            setIsValidSearch(false);
        }
    };


    const validateSearchValue = (searchValue) => {
        console.log("[validateSearchValue]");

        if (!searchValue) {
            console.log("!searchValue ", searchValue);
            return false;
        }
        const pattern = /^[a-zA-Z0-9._%+-]/;
        return pattern.test(searchValue);
    };

    const handleChange = (updatedForm) => {
        console.log("[handleChange]");
        setForm(updatedForm);
    };

    return (
        <>
            <div className="search_server_info">
                <div className="friend_form">
                    <FriendForm
                        form={form}
                        setForm={setForm}
                        isValidSearch={isValidSearch}
                        setIsValidSearch={setIsValidSearch}
                        onChange={handleChange}
                    />
                </div>
                <div className="search_buttons">
                    <button onClick={sendFriendDataServer} className="search_friends_button button_front">
                        <img src={searchIcon} alt="검색 아이콘" className="search_friends_button_img"/>
                    </button>
                </div>
            </div>
            <div className="search_friend_list">
                <div className="friendListItems">
                    {
                        friends.length === 0
                            ?
                            <div className="no_friend_list">
                                <div className="textBlock">
                                    새로운 친구를 찾아보세요
                                </div>
                            </div>
                            // 스크롤 구현해야 하는 부분
                            :<div>
                                {
                                    friends.map((friend) => (
                                        <FriendInfo select={select} setSelect={setSelect} key={friend.userId} friend={friend} />
                                    ))
                                }
                            </div>
                    }
                </div>
            </div>
        </>
    )
}

export default FriendSearch;
