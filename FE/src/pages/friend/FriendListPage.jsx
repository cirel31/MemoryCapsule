import { NoFriendList, AuthFormGrid, CustomButton } from "../../styles/friendStyle";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FriendForm from "../../components/friend/FriendForm";
import FriendInfo from "../../components/friend/FriendInfo";
import FriendDetail from "../../components/friend/FriendDetail";
import {Link} from "react-router-dom";
import "../../styles/friendStyle.scss";
import go_back from "../../assets/images/frield/go_back.svg"
import brand_gradation from "../../assets/images/frield/brand_gradation.svg"

import {login, setUser} from '../../store/userSlice';

const FriendListPage = () => {
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

    const closeFriendDetail = () => {
        setSelect({id : ""});
    }

    // 처음 한 번 실행 시, 내 친구 전부 불러오기
    useEffect(() => {
        console.log("[useEffect]");
        getFriends("id", "");
        console.log("login : ", login);
    }, []);


    // const userInfoUpdate = (userIdx) => {
    //     const accessToken = JSON.parse(sessionStorage.getItem("loginData")).accessToken
    //     console.log(accessToken)
    //     try {
    //         axios.get(`/user/${userIdx}${infoURL}`, {
    //             headers: {
    //                 Authorization: `Bearer ${accessToken}`,
    //             }
    //         })
    //             .then(res => {
    //                 const userData = res.data
    //                 dispatch(setUser(userData))
    //             })
    //             .then(() => {
    //                 navigate('/profile')
    //             })
    //             .catch(err => {
    //                 console.error('유저 정보를 가져오지 못함:', err)
    //             })
    //     }
    //     catch (err) {
    //         console.error('유저 정보를 가져오지 못함:', err)
    //     }
    // }

    function getFriends(searchId, searchValue) {
        console.log("[getFriends]");

        // 서버로부터 내 친구목록 가져오기
        // axios.get(`${API}/${user_id}`
        axios.get(`${API}/search/hharce1@cdbaby.com`,
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

        //======== Erase ========
        //test 데이터
        // fetch("https://jsonplaceholder.typicode.com/users")
        //     .then(response => response.json())
        //     .then((json) => {
        //             setRowFriends(json);
        //             setFriends(json);
        //         }
        //     );
        //======== //Erase ========

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
            let searchFriend = [];

            searchFriend = rowFriends.filter((rowFriend) =>
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
                        <div className="friend_back_button">
                            <img src={go_back} alt="뒤로가기이미지" className="friend_back_button_img"/>
                        </div>
                    </div>
                </div>
                <div className="search_info">
                    <div className="friend_counter">
                        <div className="friend_counter_text">등록된 친구</div>
                        <div className="friend_counter_text">{friends.length}</div>
                    </div>
                    <div className="friend_form">
                        <FriendForm form={form} setForm={setForm} onChange={handleChange} />
                    </div>

                    <div className="search_buttons">
                        <button onClick={handleFriendData} className="search_friends_button button_front">
                            친구검색
                        </button>
                        <Link to={`/friend/search`}>
                            <button className="search_friends_button button_server">
                                친구찾기
                            </button>
                        </Link>
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
                                        <FriendInfo select={select} setSelect={setSelect} key={friend.id} {...friend} />
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
            </div>
        </div>
    )
}

export default FriendListPage;
