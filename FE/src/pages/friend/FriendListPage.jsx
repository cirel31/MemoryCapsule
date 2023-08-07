import { NoFriendList, AuthFormGrid, CustomButton } from "../../styles/friendStyle";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FriendForm from "../../components/friend/FriendForm";
import FriendInfo from "../../components/friend/FriendInfo";
import FriendDetail from "../../components/friend/FriendDetail";
import {Link} from "react-router-dom";
import "../../styles/friendStyle.scss";
import brand_gradation from "../../assets/images/frield/brand_gradation.svg"
import searchIcon from "../../assets/images/frield/searchIcon.svg"

const FriendListPage = ({friends, setFriends, rowFriends, setRowFriends, form, setForm}) => {
    const accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDA0IiwiYXV0aCI6IlVTRVIiLCJleHAiOjE2OTE0NzQ0Mjl9.sEfQti6mAsm4LGJYG46ZtkAkd-_YTKaJ-koV5aiTPsi1cvYG2AOITPSpdCNJOebSJZ4Kl_Y2ZBzre7GftUz-Cw";
    const API = '/friend';

    const [isValidSearch, setIsValidSearch] = useState(true);

    const [select, setSelect] = useState({
        id: "",
    });

    const closeFriendDetail = () => {
        setSelect({id : ""});
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
                    <Link to={`/friend/search`} className="search_friends_link">
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
        </>
    )
}

export default FriendListPage;
