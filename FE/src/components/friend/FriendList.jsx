import { NoFriendList, AuthFormGrid, CustomButton } from "../../styles/friendStyle";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FriendForm from "./FriendForm";
import FriendInfo from "./FriendInfo";
import FriendDetail from "./FriendDetail";
import {Link} from "react-router-dom";
import "../../styles/friendStyle.scss";
import brand_gradation from "../../assets/images/frield/brand_gradation.svg"
import searchIcon from "../../assets/images/frield/searchIcon.svg"
import {login} from "../../store/userSlice";

const FriendList = ({rowFriends, setRowFriends, select, setSelect, setSelectPage}) => {
    const accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDA0IiwiYXV0aCI6IlVTRVIiLCJleHAiOjE2OTE0NzQ0Mjl9.sEfQti6mAsm4LGJYG46ZtkAkd-_YTKaJ-koV5aiTPsi1cvYG2AOITPSpdCNJOebSJZ4Kl_Y2ZBzre7GftUz-Cw";
    const API = '/friend';

    const [friends, setFriends] = useState([]);

    const [form, setForm] = useState({
        id: "",
        search : 'id',
    });

    const [isValidSearch, setIsValidSearch] = useState(true);

    const closeFriendDetail = () => {
        setSelect({id : ""});
    }

    // 처음 한 번 실행 시, 내 친구 전부 불러오기
    useEffect(() => {
        console.log("[useEffect]");
        setSelect("");
        getFriends("id", "");
        console.log("login : ", login);
    }, []);

    /**
     * 1. 전체 내 친구 목록 불러오기
     *
     * Method : get
     * URL : /friend/search/{user_id}
     * */
    function getFriends(searchId, searchValue) {
        console.log("[getFriends]");

        // 서버로부터 내 친구목록 가져오기
        // axios.get(`${API}/search/${user_id}`,
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
                setRowFriends(response.data);
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

    // searchPage로 이동
    const searchPage = () => {
        setSelectPage(true);
    }

    return (
        <>
            <div className="search_info">
                <div className="friend_counter">
                    <div className="friend_counter_text">등록된 친구</div>
                    <div className="friend_counter_text">{friends.length}</div>
                </div>
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
                    <button onClick={handleFriendData} className="search_friends_button button_front">
                        <img src={searchIcon} alt="검색 아이콘" className="search_friends_button_img"/>
                    </button>
                    <button onClick={searchPage} className="search_friends_button button_server">
                        친구찾기
                    </button>
                </div>
            </div>
            <div className="friendList">
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
                                { friends.map((friend) => (
                                    <FriendInfo select={select} setSelect={setSelect} key={friend.id} friend={friend} />
                                ))}
                            </div>
                    }
                </div>
                <div className="friendDetailItems">
                    {
                        !select.id
                        ?
                        <div className="no_friend_list">
                            <div className="textBlock">
                                <img src={brand_gradation} alt="로고" className="brand_logo"/>
                            </div>
                        </div>
                        :
                        <div className="friend_detail_guide">
                            <div className="friend_detail_item">
                                <FriendDetail select={select} setSelect={setSelect} closeFriendDetail={closeFriendDetail}/>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default FriendList;
