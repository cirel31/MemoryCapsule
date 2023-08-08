import { NoFriendList, AuthFormGrid, CustomButton } from "../../styles/friendStyle";

import React, {useEffect, useState} from "react";
import FriendForm from "./FriendForm";
import FriendInfo from "./FriendInfo";
import axios from "axios";
import searchIcon from "../../assets/images/frield/searchIcon.svg";

const FriendSearch = ({friends, setFriends, select, setSelect, setSelectPage}) => {
    const baseURL = 'https://i9a608.p.ssafy.io:8000';
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
    function getFriendsByServer(searchId) {
        console.log("[getFriendsByServer]", searchId);
        const accessToken = sessionStorage.getItem("accessToken")
        const Idx = parseInt(sessionStorage.getItem("userIdx"))

        console.log(sessionStorage)
        console.log(accessToken)
        console.log(Idx)
        console.log(searchId)

        // 서버로부터 내 친구목록 가져오기
        axios.get(`${baseURL}${API}/find/${searchId}`,
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
            getFriendsByServer(sendId);
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
                        setIsValidSearch={setIsValidSearch}
                        onChange={handleChange}
                    />
                </div>
                <div className="search_buttons">
                    <button onClick={sendFriendDataServer} className="search_friends_button button_front">
                        <div className="search_friends_button_cover">
                            <img src={searchIcon} alt="검색 아이콘" className="search_friends_button_img"/>
                        </div>
                    </button>
                </div>
            </div>
            <div className="search_server_info">
                {!isValidSearch && <div style={{ color: 'red' }}>한 글자 이상 입력해주세요</div>}
            </div>
            <div className="search_friend_list">
                <div className="search_friend_list_items">
                    {
                        friends.length === 0
                            ?
                            <div className="no_friend_list">
                                <div className="textBlock">
                                    새로운 친구를 찾아보세요
                                </div>
                            </div>
                            // 스크롤 구현해야 하는 부분
                            :<div className="search_friend_list_item">
                                {
                                    friends.map((friend) => (
                                        <FriendInfo
                                            select={select}
                                            setSelect={setSelect}
                                            key={friend.userId}
                                            friend={friend}
                                            imageUrl={friend.imgUrl}
                                        />
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
